<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter,RouterLink } from 'vue-router';
let urlCartDetail="http://localhost/vuejs-server/api.php/cart-detail"
let urlCheckout="http://localhost/vuejs-server/api.php/check-out"
const name=ref('')
const address=ref('')
const email=ref('')
const phone=ref('')

const cartDetail=ref([])
const router=useRouter();
const callAPI= async()=>{
    try {
        let user_id= JSON.parse(localStorage.getItem('userLogin')).id
        let response= await axios.get(urlCartDetail +"?user_id=" +user_id)
        if(response.status==200){
            console.log(response.data)
            cartDetail.value=response.data.cart_details
        }
    } catch (error) {
        console.log(error);
        
    }
}

const handleSubmit= async()=>{
    if (!checkValidate()) {
    return;
  }
    try {
        let user_id= JSON.parse(localStorage.getItem('userLogin')).id

        let formData= new FormData()
        formData.append('user_id',user_id)
        formData.append('name',name.value)
        formData.append('address',address.value)
        formData.append('email',email.value)
        formData.append('phone',phone.value)
        let response= await axios.post(urlCheckout,formData)
        if(response.status==200){
            alert("Thanh toán thành công")
            router.push("/donhang")
        }
    } catch (error) {
        console.log(error);
        
    }
}
onMounted (()=>{

    callAPI();
})
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN")
}
const errors = ref({
  name: "",
  address: "",
  phone: "",
  email:""


});
const checkValidate = () => {
  errors.value = {
    name: "",
    description: "",
    price: "",
    category_id:""
  };

  let isValid = true;

  if (name.value === "") {
    errors.value.name = "Không được để trống tên";
    isValid = false;
  }
  if (email.value === "") {
    errors.value.email = "Không được để trống email";
    isValid = false;
  }
  if (phone.value === "") {
    errors.value.phone = "Không được để trống sdt";
    isValid = false;
  }
  if (address.value === "") {
    errors.value.address = "Không được để trống địa chỉ";
    isValid = false;
  }
  


  return isValid;
};
</script>
<template>
    <div class="row main-website justify-content-center mt-5">
        <div class="col-12">
            <div class="container">
                <div class="row">
                    <div class="col-7">
                        <h4>Thông tin thanh toán</h4>
                        <form  @submit.prevent="handleSubmit">
                            <div class="mb-4">
                                <label for="name">Name</label>
                                <input type="text" id="name" placeholder="Name" v-model="name" class="form-control">
                                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
                            </div>
                            <div class="mb-4">
                                <label for="address">Address</label>
                                <input type="text" id="address" placeholder="Address"  v-model="address" class="form-control">
                                <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
                            </div>
                            <div class="mb-4">
                                <label for="phone">Phone</label>
                                <input type="text" id="phone" placeholder="Phone"   v-model="phone" class="form-control">
                                <span v-if="errors.phone" class="text-danger">{{ errors.phone }}</span>
                            </div>
                            <div class="mb-4">
                                <label for="email">Email</label>
                                <input type="text" id="email" placeholder="Email"  v-model="email" class="form-control">
                                <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
                            </div>
                            <button class="btn btn-success"> Xác nhận thanh toán</button>

                        </form>
                    </div>
                    
                    <div class="col-5">
                        <h4>Danh sách sản phẩm</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item , index ) in cartDetail " :key="index">

                                    <td>{{ index+1}}</td>
                                    <td>{{ item.product_name }}</td>
                                    <td>{{ convertPrice( item.price)  }} VND</td>
                                    <td>{{ item.quantity }}</td>
                                    <td> {{ convertPrice(Number(item.price)  * Number(item.quantity)) }} VND</td>
                                  
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
                
            </div>
        </div>


    </div>


</template>