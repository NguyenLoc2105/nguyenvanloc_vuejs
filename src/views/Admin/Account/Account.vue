<script setup>
let url = "http://localhost/vuejs-server/api.php/users";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
const listUsers = ref([]);
onMounted(() => {
  callApi();
});
const callApi = async () => {
  let response = await axios.get(url);
  listUsers.value = response.data;
  console.log(listUsers);
  
};

const handleDelete = async (idUser) => {
  let check = confirm("Bạn có muốn xóa không?");
  if(check){

let response=await axios.delete(url + "/" + idUser)
console.log(response);

if(response){
  alert(response.data.message)
  callApi();
}
}
};
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Trang quản lí người dùng</h1>
    <RouterLink to="/admin/addaccount" class="btn btn-primary">
      Thêm mới
    </RouterLink>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in listUsers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.note }}</td>
          <td>
            <RouterLink :to="`updateaccount/${user.id}`" class="btn btn-warning">Sửa</RouterLink>
            <button class="btn btn-danger" @click="handleDelete(user.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>