<script setup>
import { RouterLink } from 'vue-router';
import {  reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
let userLogin=reactive({})
const router=useRouter()
if(localStorage.getItem('userLogin')!=null){
  userLogin=  JSON.parse( localStorage.getItem('userLogin'))
}
const handleLogout= ()=>{
  localStorage.removeItem('userLogin')
router.push("/login")
}

</script>
<template>
   <div class="row">
      <div class="menu col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-primary ">
          <div class="container-fluid ">
            <RouterLink class="navbar-brand text-white" to="/">Trang chủ</RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active text-white "  aria-current="page" href="#">Điện thoại</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled text-white" aria-disabled="true" href="#">Laptop</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled text-white" aria-disabled="true">Đồng hồ</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link disabled text-white  dropdown-toggle" aria-disabled="true" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Phụ kiện
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
               
              </ul>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <!-- Biểu tượng giỏ hàng -->
                  <RouterLink class="nav-link text-white" to="/giohang">
                    <i class="bi bi-cart"></i> Giỏ hàng
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <div v-if="userLogin.id" class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ userLogin.name }}
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Tài khoản</a></li>
                      <li><RouterLink class="dropdown-item" to="/donhang">Đơn hàng</RouterLink></li>
                      <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Đăng xuất</a></li>
                    </ul>
                  </div>
                  <RouterLink v-else class="btn btn-primary" to="/login">Đăng nhập</RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>