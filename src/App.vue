<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import LED from './LED.vue'
import NotFound from './NotFound.vue'
import Header from './Header.vue'
const routes = {
  '/': Home,
  '/about': About,
  '/led':LED
}
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>  
  <Header /> <!-- Add the Header component here -->  
  <component :is="currentView" />  
</template>  