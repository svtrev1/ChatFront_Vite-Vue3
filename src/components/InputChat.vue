<template>
    <div class="message-input">
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
.message-input {
  height: 100%;
}
</style>

  