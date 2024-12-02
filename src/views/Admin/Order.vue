<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { ref,onMounted, reactive } from 'vue';
let urlOrderAll="http://localhost/vuejs-server/api.php/show_order_admin"
let urlChangeStatus="http://localhost/vuejs-server/api.php/change-status"
const listOrder= ref([])
const statusOrder= reactive([])
const callAPI= async ()=>{
    try {
        let response= await axios.get(urlOrderAll)
        if(response.status==200){
            listOrder.value=response.data
            listOrder.value.forEach((item) =>{
                statusOrder[item.order_id]=item.status

            })
          
            
        }
    } catch (error) {
        console.log(error);
         
    }
}

onMounted(()=>{
    callAPI()
})
const convertPrice = (number) => {
  return number.toLocaleString("vi-VN")
}
function converToDateFormat(input){
    const dateParts= input.split("-")
    if(dateParts.length!==3) return "Invalid date format"
    const year=dateParts[0];
    const month=dateParts[1];
    const day=dateParts[2]
    return `${day}/${month}/${year}`
}

const handleStatusChange= async(OrderID,newStatus) =>{

    try {
        let response=await axios.get (urlChangeStatus + "?order_id=" +OrderID+ "&status_code=" +newStatus)
        if(response.status==200){
            alert("Cập nhật thành công")
            callAPI()
        }
    } catch (error) {
        console.log(error);
        
    }
}
</script>
<template>
    <div class="p-4" style="min-height: 800px">
        <h1>Trang quản lí đơn hàng</h1>
        <table class="table">

            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                
                <tr v-for="(item,index) in listOrder" :key="index">

                    <td>{{ index+1 }}</td>
                    <td>{{ item.customer_name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.phone }}</td>
                    <td>{{converToDateFormat(item.order_date ) }}</td>
                    <td>{{convertPrice(item.total_price)  }}VND</td>
                    <td> 
                            <select name="" id="" class="form-control" @change="handleStatusChange(item.order_id,statusOrder[item.order_id])" v-model="statusOrder[item.order_id]">
                                <option value="1">Chưa xác nhận</option>
                                <option value="2"> Đã xác nhận</option>
                                <option value="3">Đã hủy</option>
                                <option value="4">Đang giao hàng</option>
                                <option value="5">Đã giao hàng</option>
                            </select>
                        <!-- <span  v-if="item.status==1" class="badge text-bg-warning">Chưa xác nhận</span>
                                    <span v-else-if="item.status==2" class="badge text-bg-info">Đã xác nhận</span>
                                    <span v-else-if="item.status==3" class="badge text-bg-danger">Đã hủy</span>
                                    <span v-else-if="item.status==4" class="badge text-bg-success">Đang giao hàng</span>
                                    <span v-else class="badge text-bg-success">Đã giao hàng</span> -->
                                </td>
                    <td>
                        <RouterLink :to="`/order-detail/${item.order_id}`" class="btn btn-sm btn-info" >Xem chi tiết</RouterLink>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>