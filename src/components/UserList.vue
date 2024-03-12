<template>
  <div>
    <h2>Список пользователей:</h2>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://localhost:7115/User/users'); 
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error);
        this.users = [];
      }
    }
  }
};
</script>
