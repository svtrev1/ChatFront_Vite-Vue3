<template>
  <div class="main">
    <ChatList :userId="userId" @chat-selected="ChatSelection" @show-error-modal="ShowErrorModal" class="chatlist" />
    <div class="chat-area">
      <MessagesList :selectedChat="selectedChat" @show-error-modal="ShowErrorModal" class="messageslist" />
      <div class="message-input">
        <InputChat :userId="userId" :selectedChat="selectedChat" class="inputchat" @show-error-modal="ShowErrorModal"/>
      </div>
    </div>
    <div v-if="isErrorModalVisible" class="error-modal">
      <p style="font-size: 40px;">{{ errorMessage }}</p>
      <button @click="closeModal" style="background-color: aliceblue; color: #f06f44; font-size: 25px;">Close</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ChatList from './ChatList.vue';
import MessagesList from './MessagesList.vue';
import InputChat from './InputChat.vue';
const isErrorModalVisible = ref(false);
const errorMessage = ref('');

export default {
  components: {
    ChatList,
    MessagesList,
    InputChat
  },
  setup() {
    const userId = ref(null);
    const selectedChat = ref(null);
    const ChatSelection = (chat) => {
      selectedChat.value = chat;
    };
    const ShowErrorModal = (message) => {
      isErrorModalVisible.value = true;
      errorMessage.value = message;
    }
    const closeModal = () => {
      isErrorModalVisible.value = false;
    };
    return {
      userId,
      selectedChat,
      ChatSelection,
      ShowErrorModal,
      closeModal, 
      isErrorModalVisible,
      errorMessage,
    };
  },
  created() {
    this.userId = JSON.parse(localStorage.getItem('user_id'));
  },
}
</script>

<style>
.main {
  background: linear-gradient(to bottom right, #ff8a00, #e52e71);
  display: flex;
  height: 100vh;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-input {
  height: 10%;
  /* 1/4 of the screen height */
}

.error-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f06f44;
  padding: 20px;
  border: 2px solid red;
  width: 500px;
}
</style>