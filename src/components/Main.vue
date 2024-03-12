<template>
    <div class="main-container">
     
      <ChatList :userId="userId" @selectChat="handleChatSelection" />
      <MessagesList class="messageslist"/>
      <InputChat class="inputchat"/>
    </div>
  </template>
  
  <script>
  import ChatList from './ChatList.vue';
  import MessagesList from './MessagesList.vue';
  import InputChat from './InputChat.vue';
  
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
  methods: {
    handleChatSelection(chatId) {
      console.log(chatId);
    }
  },
  created() {
    // Получаем userId из localStorage при создании компонента
    this.userId = JSON.parse(localStorage.getItem('user_id'));
  }
  }
  </script>
  
  <style>
  .main-container {
    display: flex;
    height: 100vh; /* или другое значение высоты по вашему усмотрению */
  }
  
  .chatlist {
    justify-content: flex-start;
    width: 30%; /* ширина для ChatList */
  }
  
  .messageslist {
    flex: 1; /* MessagesList занимает оставшееся пространство */
  }
  
  .inputchat {
    width: 100%; /* InputChat занимает всю ширину MessagesList */
  }
  </style>
  