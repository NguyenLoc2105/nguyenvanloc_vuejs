<script setup>
import anh6 from '@/assets/4.jpg'
let urlProductDetail=" http://localhost/vuejs-server/api.php/product-detail"
let urlImage = "http://localhost/vuejs-server/uploads/product/"
let urlCart="http://localhost/vuejs-server/api.php/cart"
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
const route=useRoute()
const router=useRouter()
const product= ref({})

const callAPI = async ()=>{
    try {
        let url=urlProductDetail + "?product_id="+route.params.id
        let response= await axios.get(url)
        if(response.data.status==true){
            product.value=response.data.products
        }
    } catch (error) {
        console.log(error)
    }   
 
}
onMounted(()=>{
    callAPI();

})
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN")
}
const addCart= async()=>{
    if(quantity.value>=1){
        try {
            let url=urlCart +"/"+"?product_id="+product.value.id+"&quantity="+quantity.value
            + "&user_id="+JSON.parse(localStorage.getItem('userLogin')).id
            let response= await axios.get(url)
            console.log(response.data)
        } catch (error) {
            
        }
        // let link=`/giohang/${product.value.id}/${quantity.value}`
        router.push('/giohang')
    }

}
const quantity=ref(1)
</script>
<template>

    <div class="container my-5">
        <div class="row">
            <div class="col-md-3">
                <!-- Sidebar -->
                  
                    
                <h5>Nhân vật</h5>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Luffy
                        <span class="badge bg-secondary">5</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Marco
                        <span class="badge bg-secondary">3</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Mani
                        <span class="badge bg-secondary">7</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Ussop
                        <span class="badge bg-secondary">9</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Zinbei
                        <span class="badge bg-secondary">11</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Zoro
                        <span class="badge bg-secondary">15</span>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <!-- Product Details -->
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img v-if="product.image != null " :src=" urlImage+product.image" class="img-fluid rounded-start" alt="Product Image">
                            <img v-else :src="anh6"  class="img-fluid rounded-start" alt="Product Image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text">
                                    <strong> • Đơn giá:</strong> <span style="font-weight: bold;" class="text-danger">{{ convertPrice(Number(product.price)) }} VND</span><br>
                                
                                    <strong> • Danh mục:</strong> {{ product.categoryName }}<br>
                                    <strong> • Mô tả:</strong>  {{ product.description }}<br>
                                 
                                </p>
                                <div class="d-flex mt-5">
                                    <button class="btn btn-success me-2" @click="addCart">Thêm vào
                                         giỏ hàng</button>
                                    <span class="fw-bold"> Số lượng</span> <br>
                                    <input  style="width: 80px; text-align: center;"  class="form-control" type="text" v-model="quantity">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>