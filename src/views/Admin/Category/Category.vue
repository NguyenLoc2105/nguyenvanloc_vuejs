<script setup>
import {handleError, onMounted, ref} from "vue";
import axios from "axios";
const categogiesList=ref([])
import { RouterLink } from "vue-router";
let urlAPI ="http://localhost/vuejs-server/api.php/categories";

    onMounted(async () =>{
      try {
    let response= await axios.get(urlAPI)
    categogiesList.value=response.data
    console.log(categogiesList)
      } catch (error) {
        console.log('call api loi')
      }

    })

const handleDelete= async (idCategory)=>{
  const check=confirm('Bạn có muốn xóa không?')
 if(check){

  let response=await axios.delete(urlAPI + "/" + idCategory)
  if(response){
    alert(response.data.message)
    let response2= await axios.get(urlAPI)
    categogiesList.value=response2.data
  }
 }

}
</script>
<template>
    <div class="p-4" style="min-height: 800px">
        <h1>Trang quản trị danh mục</h1>
        <router-link to="/admin/addcategory" class="btn btn-primary"  >Thêm danh mục </router-link>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Thao tác</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(categori, index) in categogiesList" >
                    <td>{{index+1 }}</td>
                    <td>{{categori.name }}</td>
                    <td>{{categori.description }}</td>
                    <td>
                      <router-link :to="`/admin/updatecategory/${categori.id}`" class="btn btn-warning"> Sửa</router-link>
                     
                      <button @click="handleDelete(categori.id)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>