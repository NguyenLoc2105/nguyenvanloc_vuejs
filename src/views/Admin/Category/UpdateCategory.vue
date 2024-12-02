<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const name = ref("");
const description=ref("");
let url = "http://localhost/vuejs-server/api.php/categories";


const route = useRoute();
const router = useRouter();

const callAPI = async () => {
  let response = await axios.get(url + "/" + route.params.id);
 if(response){
  name.value = response.data.name;
  description.value = response.data.description;
 }
 
};

onMounted(() => {
  callAPI();
});
const errors = ref({
  name: "",
  description: "",

});
const error = ref("");
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

const handleSubmit = async () => {
  if (!checkValidate()) {
    return;
  }
  let formData= new FormData();
  formData.append("_method","PUT")
  formData.append("name",name.value)
  formData.append("description",description.value)

  let response = await axios.post(url + "/" + route.params.id,
  formData,{
    headers:{
      "Content-Type":"multipart/form-data"
    },
  }

  )

  if (response) {
    alert(response.data.message);
    router.push("/admin/category");
  }
};

</script>

<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Chỉnh sửa danh mục</h1>
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
        <label for="description">Description</label>
        <input
          type="text"
          placeholder="description"
          id="description"
          class="form-control"
          v-model="description"
        />
        <span v-if="errors.description" class="text-danger">{{ errors.description }}</span>
      </div>
      <button class="btn btn-warning">Chỉnh sửa</button>
    </form>
  </div>
</template>
