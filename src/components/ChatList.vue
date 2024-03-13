<template>
    <div class="chatlist">
      <h2 style="text-align: center;">Chats:</h2>
      <ul style="list-style: none; padding: 0;">
        <li v-for="chat in chats" :key="chat" class="chat-item" @click="ChatClick(chat)">
          <div class="chat-item-container">{{ chat }}</div></li>
      </ul>
    </div>
    <div v-if="isErrorModalVisible" class="error-modal">
        <p style="font-size: 40px;">{{ errorMessage }}</p>
        <button @click="closeModal" style="background-color: aliceblue; color: #f06f44; font-size: 25px;">Close</button>
      </div>
  </template>
  
  <script>
  import { getUserChats } from '../api.js';
  import { getChatIdByName } from '../api.js';
  import { ref } from 'vue';

  export default {
    props: ['userId'],
    setup(props) {
        const chats = ref([]);
        const isErrorModalVisible = ref(false);
        const errorMessage = ref('');

        const fetchChats = async () => {
            try {
                chats.value = await getUserChats(props.userId);
            } catch (error) {
                console.error(error);
                isErrorModalVisible.value = true;
                errorMessage.value = error.message;
            }
        };

        const getChatId = async (chat) => {
            try {
              const chat_id = await getChatIdByName(chat);
              localStorage.setItem('select_chat_id', chat_id);
            }
            catch (error)
            {
              console.error(error);
                isErrorModalVisible.value = true;
                errorMessage.value = error.message;
            }
        };

        const ChatClick = (chat) => {
          console.log('Clicked chat: ', chat);
          getChatId(chat);
        }
        fetchChats();
        return {
            chats,
            isErrorModalVisible,
            errorMessage,
            fetchChats,
            ChatClick
        };
    }
};
</script>

  
<style scoped>
.chatlist {
  width: 33.33%; /* 1/3 of the screen width */
  height: 100%;
  overflow-y: auto;
  border: 2px solid gold;
}
.chat-item {
  padding: 30px;
  text-align: center;
  border: 2px solid gold;
  font-size: 40px;
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
/* .chat_item {
  list-style-type: none;
  padding: 5px;
    margin: 5px;
    border: 2px solid #fff;
    border-radius: 5px;
    background-color: #f3f3f3;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s, font-weight 0.3s;
}
.chat-item-container {
  border: 2px solid #fff;
    border-radius: 5px;
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.chat-item:hover {
    background-color: #e0e0e0; 
    font-weight: bold; 
} */

</style>

  