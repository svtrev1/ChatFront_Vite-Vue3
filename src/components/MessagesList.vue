<template>
  <div class="messages-list" style="margin-top: 0px;">
    <div class="chat-header" style="display: flex; justify-content: space-between; align-items: center; border: 3px solid gold;">
      <h2 style=" margin: 0 auto; text-align: center; justify-content: center; align-items: center;" class="chat-title" >{{ chatTitle }}</h2>
      <button @click="openUserForm" class="add-users-btn">Add user <br> to chat</button>
    </div>
    <div v-if="isUserFormOpen" class="user-form" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <button @click="closeUserForm" class="close-btn">X</button>
      <input v-model="newUserName" placeholder="Введите имя пользователя" style="margin-bottom: 20px; padding: 8px;" />
      <button @click="addUserToChat">Добавить</button>
    </div>

    <ul class="message-container">
      <li v-for="message in messages" :key="message.id">
        <div class="message-info">
          <span>User ID: {{ message.user_id }}</span>
          <span>Time: {{ message.datetime }}</span>
        </div>
        <div class="message-content">{{ message.content }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch} from 'vue';
import { useSignalR } from "@dreamonkey/vue-signalr";
import { getMessagesByChatId } from '../api';
import { getChatNameByChatId } from '../api';
import { addUserInChat } from '../api';

export default {
  props: ['selectedChat'],
  setup(props, { emit }) {
    const isUserFormOpen = ref(false);
    const newUserName = ref('');

    const messages = ref([]);
    const chatTitle = ref('');

    const openUserForm = () => {
      isUserFormOpen.value = true;
    };

    const closeUserForm = () => {
      isUserFormOpen.value = false;
    };

    const addUserToChat = async () => {
      if (newUserName.value.trim() !== '') {
        try {
          await addUserInChat(props.selectedChat, newUserName.value);
          newUserName.value = '';
          isUserFormOpen.value = false;
        } catch (error) {
          console.error(error);
          emit('show-error-modal', error);
        }
      }
    };

    const signalr= useSignalR();
    signalr.on("ReceiveMessage", (message) => {
      if (message.chat_id === props.selectedChat) {
        messages.value.push(message);
      }
    })

    watch(() => props.selectedChat, async (newChatId) => {
      if (newChatId) {
        try {
          messages.value = await getMessagesByChatId(newChatId);
          chatTitle.value = await getChatNameByChatId(newChatId);
        } catch (error) {
          messages.value = null;
          console.error(error);
          emit('show-error-modal', error);
        
        }
      }
    }), { immediate: true };
    return {
      messages, 
      chatTitle,
      openUserForm,
      isUserFormOpen,
      addUserToChat,
      newUserName,
      closeUserForm
    };
  }
};
</script>

<style scoped>
.messages-list {
  margin-top: 20px;
  flex: 3;
}
.message-container {
  max-height: 80vh; /* Установка максимальной высоты 80% от высоты экрана */
  overflow: auto;  /* Добавление прокрутки при необходимости */
}
.message-info {
  font-size: 36px;
  font-weight: bold;
}

.message-content {
  margin-left: 20px;
  font-size: 30px;
}
.add-users-btn {
  padding: 8px 16px;
  background-color: #f06c64;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-users-btn:hover {
  background-color: #e64a3a;
}

.add-users-btn:focus {
  outline: none;
}

.user-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border: 2px solid red;
  width: 500px;
  height: 100px;
}
.close-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: red;
}

</style>
