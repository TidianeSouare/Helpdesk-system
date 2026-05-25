<template>
  <nav class="navbar">
    <div class="nav-left">
      <div class="nav-brand">Helpdesk Response Library</div>
      <div class="nav-credit">Developed by Tidiane</div>
    </div>

    <div class="nav-links" v-if="isLoggedIn">
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/entries">Responses</router-link>
      <router-link to="/add">Add Response</router-link>
      <router-link to="/quiz">Training Quiz</router-link>
      <span class="nav-user">{{ userName }}</span>
      <button class="btn danger" @click="logout">Logout</button>
    </div>

    <div class="nav-links" v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const isLoggedIn = computed(() => {
  route.fullPath;
  return !!localStorage.getItem("token");
});

const userName = computed(() => {
  route.fullPath;
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.name ? `Hi, ${user.name}` : "";
});

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/login");
};
</script>