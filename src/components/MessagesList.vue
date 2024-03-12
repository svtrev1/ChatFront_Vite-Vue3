<template>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id">{{ message.text }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['selectedChat'],
    data() {
      return {
        messages: [] // Здесь нужно будет заполнить сообщения для выбранного чата
      };
    },
    mounted() {
      // Здесь нужно выполнить запрос к API для получения сообщений для выбранного чата
    }
  };
  </script>
  
  <style scoped>
  .chat-messages {
    width: 70%;
    height: 80vh; /* Примерная высота области сообщений */
    overflow-y: scroll;
  }
  </style>
  