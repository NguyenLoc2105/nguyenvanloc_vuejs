<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const name = ref("");
const description=ref("")

const router = useRouter();

let urlAPI ="http://localhost/vuejs-server/api.php/categories";
const handleSubmit = async () => {
  if (!checkValidate()) {
    return;
  }
  let formData= new FormData();

  formData.append("name",name.value)
  formData.append("description",description.value)
  let response = await axios.post(urlAPI,formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    },
  })

  if (response) {
    alert(response.data.message)
    router.push("/admin/category");
  }
};

const errors = ref({
  name: "",
  description: "",

});
const checkValidate = () => {
  errors.value = {
    name: "",
    description: "",
  
  };

  let isValid = true;

  if (name.value === "") {
    errors.value.name = "Không được để trống tên danh mục";
    isValid = false;
  }
  if (description.value === "") {
    errors.value.description = "Không được để trống mô tả danh mục";
    isValid = false;
  }


  return isValid;
};
</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Trang thêm mới danh mục</h1>
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
        <label for="description">Mô tả danh mục</label>
        <input
          type="text"
          placeholder="Description"
          id="description"
          class="form-control"
          v-model="description"
        />
        <span v-if="errors.description" class="text-danger">{{ errors.description }}</span>
      </div>
      <button class="btn btn-success">Thêm mới</button>
    </form>
  </div>
</template>