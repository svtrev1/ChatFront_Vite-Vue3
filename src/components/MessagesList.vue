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
import { ref, watch, onMounted } from 'vue';
import { useSignalR } from "@dreamonkey/vue-signalr";
import { getMessagesByChatId } from '../api';

export default {
  props: ['selectedChat'],
  // onMounted(async (dsas) => {
  // const signalr = useSignalR();

  // signalr.on("my-event", (x) => {

  // })
  // ),
  setup(props, { emit }) {
    const messages = ref([]);
    const signalr= useSignalR();
    signalr.on("ReceiveMessage", (message) => {
      messages.value.push(message);
    })
    watch(() => props.selectedChat, async (newChatId) => {
      if (newChatId) {
        try {
          messages.value = await getMessagesByChatId(newChatId);
        } catch (error) {
          messages.value = null;
          console.error(error);
          emit('show-error-modal', error.response.data);
        
        }
      }
    }), { immediate: true };
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
