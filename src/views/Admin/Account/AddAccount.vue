<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password=ref('')
const role = ref("");
const note=ref('')

const router = useRouter();

let url = "http://localhost/vuejs-server/api.php/users";
const errors = ref({
  name: "",
  email: "",
  note: "",
  role: "",
  password: "",
});

const handleSubmit = async () => {
  if (!checkValidate()) {
    return;
  }
   let formData= new FormData();

formData.append("name",name.value)
formData.append("email",email.value)
formData.append("role",role.value)
formData.append("note",note.value)
formData.append("password",password.value)

let response = await axios.post(url,formData,{
  headers:{
    "Content-Type":"multipart/form-data"
  },
})
  if (response) {
    alert(response.data.message)
    router.push("/admin/account");
  }
};

const checkValidate = () => {
  // Reset errors
  errors.value = {
    name: "",
    email: "",
    note: "",
    role: "",
    password:"",
  };

  let isValid = true;

  if (name.value === "") {
    errors.value.name = "Không được để trống Tên người dùng";
    isValid = false;
  }
  if (email.value === "") {
    errors.value.email = "Không được để trống email người dùng";
    isValid = false;
  }
  if (note.value === "") {
    errors.value.note = "Không được để trống note người dùng";
    isValid = false;
  }
  if (role.value === "") {
    errors.value.role = "Không được để trống chức vụ người dùng";
    isValid = false;
  }
  if (password.value === "") {
    errors.value.password = "Không được để trống mật khẩu người dùng";
    isValid = false;
  }

  return isValid;
};
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Trang thêm mới người dùng</h1>
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
        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
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
        <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
      </div>
      <div class="mb-3">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          class="form-control"
          v-model="password"
        />
        <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
      </div>
      <div class="mb-3">
        <label for="note">Note</label>
        <input
          type="text"
          placeholder="Note"
          id="note"
          class="form-control"
          v-model="note"
        />
        <span v-if="errors.note" class="text-danger">{{ errors.note }}</span>
      </div>
      <div class="mb-3">
        <label for="role">Chức vụ</label>
        <select
          id="role"
          class="form-control"
          v-model="role"
        >
          <option value="">Chọn chức vụ</option>
          <option value="Admin">admin</option>
          <option value="User">user</option>
        </select>
        <span v-if="errors.role" class="text-danger">{{ errors.role }}</span>
      </div>
      <button class="btn btn-success">Thêm mới</button>
    </form>
  </div>
</template>