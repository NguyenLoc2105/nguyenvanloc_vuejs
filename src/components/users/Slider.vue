<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import anh1 from '@/assets/436379182_4185384755021270_3855561984935209441_n.jpg'
import anh2 from '@/assets/436491101_4185384818354597_3820006754041112681_n.jpg'
import anh3 from '@/assets/436491101_4185384818354597_3820006754041112681_n.jpg'
import anh4 from '@/assets/441571919_4185384715021274_3178353514631622392_n.jpg'
import anh5 from '@/assets/444935976_4185384798354599_2169103540848166978_n.jpg'
</script>
<template>
    <div class="row">
      <div class="header col-12 ">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="anh1" class="d-block w-100" alt="..." height="400px">
            </div>
            <div class="carousel-item">
              <img :src="anh2" class="d-block w-100" alt="..." height="400px">
            </div>
            <div class="carousel-item">
              <img :src="anh3" class="d-block w-100" alt="..." height="400px">
            </div>
            <div class="carousel-item">
              <img :src="anh4" class="d-block w-100" alt="..." height="400px">
            </div>
            <div class="carousel-item">
              <img :src="anh5" class="d-block w-100" alt="..." height="400px">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
</template>