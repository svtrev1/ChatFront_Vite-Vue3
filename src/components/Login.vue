<script>
import { ref } from 'vue';
import { loginUser } from '../api';
import { useRouter } from 'vue-router';
const isErrorModalVisible = ref(false);
const errorMessage = ref('');


export default {
    setup() {
        const logUsername = ref('');
        const logPassword = ref('');
        const router = useRouter();
   
        const login = async () => {
            const username1 = logUsername.value;
            const password1 = logPassword.value;
            try {
                const response = await loginUser(username1, password1);
                  isErrorModalVisible.value = true;
                  errorMessage.value = 'Auth successfully!';
                  localStorage.setItem('user_id', response.data);
                  setTimeout(() => {
                        isErrorModalVisible.value = false;
                        router.push('/main'); // Переходим на страницу /login после успешной регистрации
                    }, 2000); 
            } catch (error) {
              isErrorModalVisible.value = true;
                errorMessage.value = error.message;
            }
        };

        const closeModal = () => {
               isErrorModalVisible.value = false;
           };


        return {
            logUsername,
            logPassword,
            isErrorModalVisible,
            errorMessage,
            login,
            closeModal
        };
    }
};
</script>

<template>
  <div class="lol">
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <h2 style="color:#ed5624">Авторизация</h2>
        <img src="../assets/logo.png" alt="Лого" class="logo">
        <input type="text" placeholder="Login" v-model="logUsername" class="form-input">
        <input type="password" placeholder="Password" v-model="logPassword" class="form-input">
        <button type="submit" @click="login" class="submit-button">LOGIN</button>
        <h1 style="color: orange;">Нет аккаунта? <br><router-link style="color: #ed5624;" to="/register">Регистрация</router-link></h1>
      </form>
      <!-- Модальное окно -->
      <div v-if="isErrorModalVisible" class="error-modal">
        <p style="font-size: 40px;">{{ errorMessage }}</p>
        <button @click="closeModal" style="background-color: aliceblue; color: #f06f44; font-size: 25px;">Close</button>
      </div>
    </div>
  </div>
</template>
  
<style>
.lol {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to bottom right, #ff8a00, #e52e71);
}
.login-container {
 background-color: antiquewhite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  outline: 1px solid black;
  border-radius: 20px;
  margin-top: 20px;
  min-width: 600px;
  max-width: 800px;
}

h2 {
  font-size: 60px;
  font-family: 'Montserrat';
  font-weight: 900;
}

.form-input {
  font-size: 30px;
  display: block;
  width: 70%;
  padding: 20px;
  margin: 0 auto 30px;
  border: none;
  border-bottom: 1px solid;
  border-radius: 20px;
  border-color: #f06f44;
  background-color: #f1e98c;
}

.submit-button {
  border: none;
  width: 50%;
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-family: 'Montserrat';
  font-size: 40px;
  cursor: pointer;
  margin-bottom: 40px;
  margin-top: 20px;
}

.link-primary {
  font-size: 15px;
  text-decoration: none;
  color: #0a58ca;
}
.logo {
  display: block;
  margin: 0 auto;
  width: 300px;
  height: auto; 
  margin-bottom: 80px;
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

</style>
