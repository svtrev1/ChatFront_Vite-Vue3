<template>
    <div class="main">
        <ChatList :userId="userId" class="chatlist" />
      <div class="chat-area">
        <MessagesList class="messageslist"/>
        <div class="message-input">
        <InputChat class="inputchat"/>
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
    data() {
    return {
      userId: null // Устанавливаем начальное значение в null
    };
  },
  created() {
    // Получаем userId из localStorage при создании компонента
    this.userId = JSON.parse(localStorage.getItem('user_id'));
  }
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
    height: 10%; /* 1/4 of the screen height */
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
  