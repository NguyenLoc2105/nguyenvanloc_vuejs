<script setup>
import {onMounted, ref} from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
const productsList=ref([])
let urlAPI ="http://localhost/vuejs-server/api.php/products";
let urlImage="http://localhost/vuejs-server/uploads/product/"

onMounted( () =>{
    callAPI();

})
    const callAPI = async()=>{
        try {
 let reponse= await axios.get(urlAPI)
 productsList.value=reponse.data
   } catch (error) {
    console.log('call api loi')
   }

    }

const handleDelete = async (id)=>{
    let check=confirm("Bạn có muốn xóa không");
    if(check){
        try {
            let response = await axios.delete(urlAPI + "/" + id);
            if(response.status===200){
                alert("Xóa thành công")
                callAPI();
            }
        } catch (error) {
            console.log('Callapi lỗi')
        }
    }
}


</script>
<template>
    <div class="p-4" style="min-height: 800px">
        <h1>Trang quản trị sản phẩm</h1>
        <router-link to="/admin/addproduct" class="btn btn-primary"  >Thêm sản phẩm </router-link>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>


                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in productsList" >
                    <td>{{index+1 }}</td>
                    <td>{{product.name }}</td>
                    <td>{{ product.categoryName }}</td>
                    <td>{{product.description }}</td>
                    <td>{{product.price }}</td>
                    <td> 
                        <img v-if="product.image!=null" :src="urlImage+product.image" alt="" width="50px">
                        <span v-else class="badge text-bg-warning">Không có ảnh</span>
                    </td>
                    <td>
                      <router-link :to="`/admin/updateproduct/${product.id}`"  class="btn btn-warning">Sửa</router-link>
                     
                      <button @click="handleDelete(product.id)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>