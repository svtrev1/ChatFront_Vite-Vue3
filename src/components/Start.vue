<template>
    <div class="start_container">
         <router-link to="/register">Регистрация</router-link>
         <router-link to="/login">Вход</router-link>
         <router-view></router-view>
       </div>
  </template>
  <style>
  .start_container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    background: linear-gradient(to bottom right, #ff8a00, #e52e71);
  }
  </style>