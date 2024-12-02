<script setup>
import anh6 from '@/assets/4.jpg'
import { RouterLink } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
let url = "http://localhost/vuejs-server/api.php/products"
let urlImage = "http://localhost/vuejs-server/uploads/product/"
let urlAPICategory = "http://localhost/vuejs-server/api.php/categories"
const route = useRoute()

const listProduct = ref([])

const callAPI = async () => {
    try {
        let response = await axios.get(url + '?idCategory=' + route.params.idCategory)
        listProduct.value = response.data
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }

}
const convertPrice = (number) => {
    return number.toLocaleString("vi-VN")
}

//
const listCategory = ref([])
const callAPICategory = async () => {
    try {
        let response = await axios.get(urlAPICategory)
        listCategory.value = response.data
    } catch (error) {
        console.log("lỗi api")
    }
}

onMounted(() => {
    callAPI();
    callAPICategory();
})

watch(() => route.params.idCategory, newIdCategory => {
    callAPI();
})
</script>
<template>
    <div class="row mt-5">
      <div class="main col-9">
        <!-- Hiển thị danh sách sản phẩm -->
        <div class="d-flex flex-wrap justify-content-evenly" v-if="listProduct.length > 0">
          <div class="card" v-for="(product, index) in listProduct" :key="index" style="width: 18rem;">
            <img v-if="product.image != null" :src="urlImage + product.image" class="card-img-top" alt="...">
            <img v-else :src="anh6" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p style="color: red;" class="card-price">{{ convertPrice(Number(product.price)) }} vnđ</p>
              <p class="card-text">{{ product.description }}</p>
              <RouterLink :to="`/users/detail/${product.id}`" class="btn btn-primary">Xem chi tiết</RouterLink>
            </div>
          </div>
        </div>
  
        <!-- Thông báo không có sản phẩm -->
        <div class="alert alert-danger text-center" v-else role="alert">
          Không có sản phẩm trong danh mục này.
        </div>
      </div>
  
      <!-- Sidebar -->
      <div class="silebar col-3">
        <div class="list-group">
           <RouterLink to="/" class="list-group-item list-group-item-action" aria-current="true">
            Danh mục sản phẩm
           </RouterLink>
          <RouterLink v-for="(category, index) in listCategory" :key="index" :to="`/sanpham/${category.id}`"
            class="list-group-item list-group-item-action"
            :class="{ active: category.id == route.params.idCategory }">
            {{ category.name }}
          </RouterLink>
        </div>
        <br><br>
        <div class="card">
          <div class="card-header">
            <i class="bi bi-info-circle"></i> Thông tin liên hệ
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="">
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">Tên khách hàng</label>
                <input type="text" class="form-control" id="name" placeholder="">
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" id="phone" placeholder="">
              </div>
              <button type="submit" class="btn btn-warning">Gửi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>