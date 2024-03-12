<template>
    <div>
      <h2>Список чатов:</h2>
      <ul>
        <li v-for="chat in chats" :key="chat" @click="handleChatSelection(chat)">{{ chat }}</li>

      </ul>
    </div>
    <div v-if="isErrorModalVisible" class="error-modal">
        <p style="font-size: 40px;">{{ errorMessage }}</p>
        <button @click="closeModal" style="background-color: aliceblue; color: #f06f44; font-size: 25px;">Close</button>
      </div>
  </template>
  
  <script>
  import { getUserChats } from '../api.js';
  import { ref } from 'vue';
  const isErrorModalVisible = ref(false);
const errorMessage = ref('');
  export default {
    props: ['userId'],
    data() {
      return {
        chats: []
      };
    },
    methods: {
        async fetchChats() {
        try {
            this.chats = await getUserChats(this.userId);
        } catch (error) {
            console.error(error);
            isErrorModalVisible.value = true;
                    errorMessage.value = error.message;
        }
        },
        handleChatSelection(chat) {
        this.$emit('selectChat', chat);
        }
    },
    async created() {
        this.fetchChats();
    }
    };
</script>

  
<style scoped>
  .chat-list {
    width: 30%;
    border-right: 1px solid #ccc;
  }
</style>
  