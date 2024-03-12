<template>
  <div class="app_container">
       <router-view></router-view>
     </div>
</template>

<!-- <script>
import ChatList from './components/ChatList.vue'
export default {
  components: {
    ChatList,
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
};
</script> -->



<style>
.app_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, #ff8a00, #e52e71); /* Градиентный фон */
}
</style>
