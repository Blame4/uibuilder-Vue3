<template>  
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">  
      <!-- Centered Bootstrap card with large text and border -->  
      <div class="card text-center border-primary" style="cursor: pointer; max-width: 18rem;" @click="navigateToLED">  
        <div class="card-body">  
          <h1 class="display-3 text-primary">LED</h1>  
        </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  function navigateToLED() {  
    window.location.hash = '#/led'  
  }  
  </script>  
  
  <style>  
  .card {  
    transition: transform 0.2s, box-shadow 0.2s;  
  }  
  
  .card:hover {  
    transform: translateY(-5px);  
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  
  }  
  </style>