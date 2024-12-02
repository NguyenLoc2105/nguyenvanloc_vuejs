<script setup>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
let url="http://localhost/vuejs-server/api.php/login"

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router= useRouter()
const email=ref("")
const password=ref("")
const emailError=ref("")
const passwordError=ref("")

const handleSubmit= async ()=>{
    
try {
    let data={
        email:email.value,
        password:password.value
    }
let response= await axios.post(url,data)
let message=response.data
if(message.status==true){
    localStorage.removeItem('userLogin')

    let userLogin={
        id:message.data.id,
        name:message.data.name,
        email:message.data.email,
        role:message.data.role,
    }
 localStorage.setItem('userLogin',JSON.stringify(userLogin))
    if(message.data.role=="user"){
        router.push("/")
    }
    else if(message.data.role=="admin"){
        router.push("/admin")
    }

}
else{
    alert("Tài khoản hoặc mật khẩu không đúng")
}
console.log(message)
} catch (error) {
    console.log(error)
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

    }

}
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <h1>Login</h1>
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
        <span class="register">Chưa có tài khoản <RouterLink to="/register">Đăng kí</RouterLink>  </span>

        <button class="btn btn-primary" type="">Đăng nhập</button>
    </form>

</template>
<style scoped lang="css">
form{
    width: 60%;
    margin: auto;
    margin-top: 50px;
   

} 
.register{
        display: block;
        margin-bottom: 10px;

    }

</style>