<template>
    <div class="message_container">
      <input class="message_input" v-model="message" placeholder="Введите сообщение..." @keydown.enter="sendMessage">
      <button class="message_button" @click="sendMessage">Отправить</button>
    </div>
  </template>
  
  <script>
  import { useSignalR } from "@dreamonkey/vue-signalr";
  import { addMessage } from '../api.js';
  export default {
    props: [ 'userId', 'selectedChat'],
    data() {
      return {
        message: ''
      };
    },
    methods: {
      sendMessage(props) {
        if (this.message.trim() !== '') {
          console.log("Props Id:", this.selectedChat);
          addMessage(this.selectedChat ,this.message, this.userId);
          const signalr = useSignalR();
          signalr.send("SendMessages", {content: this.message, user_id: this.userId, chat_id: this.selectedChat});
          this.message = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
.message_container {
  height: 70%;
  padding: 20px; 
  border: 2px solid gold; 
  display: flex; 
  align-items: center;
}
.message_input {
  width: 80%;
  height: 90%;
  font-size: 30px;
  border: 5px solid goldenrod; 
}
.message_button {
  width: 20%;
  height: 100%;
  font-size: 30px;
}
</style>

  