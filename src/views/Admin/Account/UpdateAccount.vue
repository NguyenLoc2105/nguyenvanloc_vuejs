<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const note=ref("")

const errors = ref({
  name: "",
  email: "",
  password: "",
  role: "",
  note: "",
});

let url = "http://localhost/vuejs-server/api.php/users";

const route = useRoute();
const router = useRouter();

const callAPI = async () => {
  try {
    let response = await axios.get(url + "/"+ route.params.id);
    if(response){
  name.value = response.data.name;
  email.value = response.data.email;
  role.value = response.data.role;
  password.value = response.data.password;
  note.value = response.data.note;
 }
  } catch (err) {
    alert(err.message);
  }
};

onMounted(() => {
  callAPI();
});

const validate = () => {
  let isValid = true;

  if (!name.value) {
    errors.value.name = "Tên không được để trống.";
    isValid = false;
  } else {
    errors.value.name = "";
  }

  if (!email.value) {
    errors.value.email = "Email không được để trống.";
    isValid = false;
  } else {
    errors.value.email = "";
  }

  if (!password.value) {
    errors.value.password = "Mật khẩu không được để trống.";
    isValid = false;
  } else {
    errors.value.password = "";
  }

  
  if (!note.value) {
    errors.value.note = "Ghi chú không được để trống.";
    isValid = false;
  } else {
    errors.value.note = "";
  }

  if (!role.value) {
    errors.value.role = "Chức vụ không được để trống.";
    isValid = false;
  } else {
    errors.value.role = "";
  }

  return isValid;
};

const handleSubmit = async () => {


  if (!validate()) {
    return;
  }
  let formData= new FormData();
  formData.append("_method","PUT")
  formData.append("name",name.value)
  formData.append("email",email.value)
  formData.append("password",password.value)
  formData.append("role",role.value)
  formData.append("note",note.value)

  let response = await axios.post(url + "/" + route.params.id,
  formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    },
  }

  )

  if (response) {
    alert(response.data.message);
    router.push("/admin/account");
  }
};
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Chỉnh sửa người dùng</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          class="form-control"
          v-model="name"
        />
        <span class="text-danger">{{ errors.name }}</span>
      </div>
      <div class="mb-3">
        <label for="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="email"
          class="form-control"
          v-model="email"
        />
        <span class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3">
        <label for="password">Nhập mật khẩu mới</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          class="form-control"
          v-model="password"
        />
        <span class="text-danger">{{ errors.password }}</span>
      </div>
      <div class="mb-3">
        <label for="note">Ghi chú</label>
        <input
          type="text"
          placeholder="note"
          id="note"
          class="form-control"
          v-model="note"
        />
        <span class="text-danger">{{ errors.note }}</span>
      </div>
      <div class="mb-3">
        <label for="role">Chức vụ</label>
        <select
          id="role"
          class="form-control"
          v-model="role"
        >
          <option value="">Chọn chức vụ</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <span class="text-danger">{{ errors.role }}</span>
      </div>
      <button class="btn btn-warning">Chỉnh sửa</button>
    </form>
  </div>
</template>