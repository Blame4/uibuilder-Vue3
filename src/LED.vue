<template>  
    <div class="text-center">  
      <h1 class="text-4xl font-bold text-blue-600 mb-4 my-3">远程控制LED</h1>
      <a @click="toggleLED">  
        <img  
          :src="ledState ? ledOnImage : ledOffImage"  
          class="w-1/2 max-w-xs shadow-lg rounded-lg mx-auto"  
          alt="LED Control"  
        >  
      </a>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref, onMounted } from 'vue'  

  
  const ledState = ref(false)  
  const ledOffImage = 'https://common.new-be.top/resource/img/led_off.png'  
  const ledOnImage = 'https://common.new-be.top/resource/img/led_on.png'  
  
  function toggleLED() {  
    
    // Send a "switch" message to the server  
    uibuilder.send({ topic: 'LED', payload: 'switch' })  
  }  
  
  onMounted(() => { 
    uibuilder.send({ topic: 'LED', payload: 'status' }) 
    // Listen for incoming messages  
    uibuilder.onChange('msg', (msg) => {  
      if (msg.payload === 'ON') {  
        ledState.value = true  
      } else if (msg.payload === 'OFF') {  
        ledState.value = false  
      }  
    })  
  })  
  </script>  
  
  <style>  
  /* Add any custom styles for your component here, or leave it empty if not needed */  
  </style>