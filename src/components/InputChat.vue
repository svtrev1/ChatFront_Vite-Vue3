<template>
    <div class="chat-input">
      <input v-model="message" placeholder="Введите сообщение..." @keydown.enter="sendMessage">
      <button @click="sendMessage">Отправить</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      sendMessage() {
        if (this.message.trim() !== '') {
          this.$emit('sendMessage', this.message);
          this.message = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-input {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 10px;
    background-color: #f4f4f4;
  }
  
  .chat-input input {
    flex: 1;
    margin-right: 10px;
  }
  
  .chat-input button {
    padding: 5px 10px;
  }
  </style>
  