<template>
  <div class="chatlist">
    <h2 style="text-align: center;">Chats:</h2>
    <ul style="list-style: none; padding: 0;">
      <li v-for="chat in chats" :key="chat" class="chat-item" @click="selectChat(chat)">
        <div class="chat-item-container">{{ chat }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserChats } from '../api.js';
import { getChatIdByName } from '../api.js';
import { ref } from 'vue';
export default {
  props: [ 'userId' ],

  setup(props, { emit }) {
    const chats = ref([]);
    const selectChat = (chat) => {
      let newChatId;
      getChatIdByName(chat).then((chatId) => {
        newChatId = chatId;
        emit('chat-selected', newChatId);
      }).catch((error) => {
        console.error(error);
        emit('show-error-modal', error.message);
      });
    };

    const fetchChats = async () => {
      try {
        chats.value = await getUserChats(props.userId);
      } catch (error) {
        console.error(error);
        emit('show-error-modal', error.message);
      }
    };
    fetchChats();
    return {
      chats,
      fetchChats,
      selectChat
    };
  }
};
</script>


<style scoped>
.chatlist {
  width: 33.33%;
  /* 1/3 of the screen width */
  height: 100%;
  overflow-y: auto;
  border: 2px solid gold;
}

.chat-item {
  padding: 30px;
  text-align: center;
  border: 2px solid gold;
  font-size: 40px;
}

.chat-item:hover {
    background-color: #e0e0e0; 
    font-weight: bold; 
} 
</style>