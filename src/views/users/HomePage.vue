<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Slider from '@/components/users/Slider.vue';
import Header from '@/components/users/Header.vue';
import Footer from '@/components/users/Footer.vue';
import { RouterView } from 'vue-router';
</script>
<template>
    <div class="container">
        <Slider/>
        <Header/>
   
        <RouterView/>
    <Footer/>
  </div>
</template>