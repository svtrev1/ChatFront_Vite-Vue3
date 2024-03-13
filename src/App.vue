<template>
  <router-view />
</template>

<script>
import Main from './components/Main.vue';
import Start from './components/Start.vue';
import Login from './components/Login.vue';
import Registration from './components/Registration.vue';

export default {
  components: {
    Main,
    Start,
    Login,
    Registration
  }
}
</script>

