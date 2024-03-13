<template>
  <div class="messages-list">
    <ul>
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
import { ref } from 'vue';
import { getMessagesByChatId } from '../api';
import { onMounted } from '@vue/runtime-core'; 

export default {
  setup() {
    const messages = ref([]);

    // Используем onMounted напрямую здесь
    onMounted(async () => {
      try {
        const chat_id = JSON.parse(localStorage.getItem('select_chat_id'));
        messages.value = await getMessagesByChatId(chat_id); // Передаем нужный chat_id здесь
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    });

    return {
      messages
    };
  }
};
</script>

<style scoped>
.messages-list {
  margin-top: 20px;
  flex: 3;
}

.message-info {
  font-size: 36px;
  font-weight: bold;
}

.message-content {
  margin-left: 20px;
  font-size: 30px;
}
</style>
