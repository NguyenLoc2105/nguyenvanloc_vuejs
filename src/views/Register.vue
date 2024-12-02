<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
let url="http://localhost/vuejs-server/api.php/register"
import axios from 'axios';
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
const name=ref('')
const email=ref('')
const password=ref('')
const nameError=ref('')
const emailError=ref("")
const passwordError=ref("")
const router= useRouter();

    const handleSubmit=async()=>{
        try {
         let data={
        name:name.value,
        email:email.value,
        password:password.value
     }
        let response= await axios.post(url,data)
        if(response.data.message){
            console.log(response.data.message)
            alert("Đăng kí thành công")
            router.push("/login")
        }
        } catch (error) {
            console.log("Lỗi callapi")
        }

    }





const handleValidate =(feild)=>{
    switch(feild){
        case 'email':{
           
                emailError.value=email.value=="" ? "Không được để trống email" : ""
                break;
    
        }
        case 'password':{
           
             passwordError.value=password.value=="" ? "Không được để trống password" : ""
           break;

   }
   case 'name':{
           
           nameError.value=name.value=="" ? "Không được để trống tên người dùng" : ""
           break;

   }

    }

}

</script>

<template>
    
     <form @submit.prevent="handleSubmit">
        <h1>Đăng kí</h1>
        <div class="mb-4">
            <label for="name">Name</label>
            <input type="text" placeholder="Name" id="name" class="form-control" @keyup="handleValidate('name')" v-model="name">
            <span class="text-danger" v-if="nameError!='' ">{{ nameError }}</span>
        </div>
       
        <div class="mb-4">
            <label for="email">Email</label>
            <input type="text" placeholder="Email" id="email" class="form-control" @keyup="handleValidate('email')" v-model="email">
            <span class="text-danger" v-if="emailError!='' ">{{ emailError }}</span>
        </div>
        <div class="mb-4">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" class="form-control" @keyup="handleValidate('password')" v-model="password">
            <span class="text-danger" v-if="passwordError!='' ">{{ passwordError }}</span>
        </div>
        <span class="login">Đã có tài khoản <RouterLink to="/login">Đăng nhập</RouterLink>  </span>

        <button class="btn btn-primary" type="">Đăng kí</button>
    </form>
</template>
<style>

form{
    width: 60%;
    margin: auto;
    margin-top: 50px;
   

} 
.login{
        display: block;
        margin-bottom: 10px;

    }
    </style>