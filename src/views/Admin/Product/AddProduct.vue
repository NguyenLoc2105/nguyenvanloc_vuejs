<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
let urlAPI = "http://localhost/vuejs-server/api.php/products";
let urlAPICategory = "http://localhost/vuejs-server/api.php/categories"


const name = ref('')
const description = ref('')
const price = ref('')
const image = ref(null)
const category_id=ref("")
const router = useRouter();
const handleChange = (event) => {
  const file = event.target.files[0]
  image.value = file
}

let listCategory = ref([])
const callApiCate = async () => {
  const reponse = await axios.get(urlAPICategory)
  listCategory.value = reponse.data
}
onMounted(() => {
  callApiCate();

})
const handleSubmit = async () => {
  if (!checkValidate()) {
    return;
  }
  try {
    let formData = new FormData();

    formData.append("name", name.value)
    formData.append("description", description.value)
    formData.append("price", price.value)
    formData.append("image", image.value)
    formData.append("category_id", category_id.value)
    let response = await axios.post(urlAPI, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
    if (response) {
      alert(response.data.message)
      router.push("/admin/product");
    }
  }
  catch (error) {
    console.log(error)
  }

};

const errors = ref({
  name: "",
  description: "",
  price: "",
  category_id:""


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
    errors.value.name = "Không được để trống tên sản phẩm";
    isValid = false;
  }
  if (description.value === "") {
    errors.value.description = "Không được để trống mô tả sản phẩm";
    isValid = false;
  }
  if (price.value === "") {
    errors.value.price = "Không được để trống giá";
    isValid = false;
  }
  if (category_id.value === "") {
    errors.value.category_id = "Vui lòng chọn danh mục";
    isValid = false;
  }
  


  return isValid;
};

</script>
<template>
  <div class="p-4" style="min-height: 800px">
    <h1>Thêm mới sản phẩm</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name">Name</label>
        <input type="text" placeholder="Name" id="name" class="form-control" v-model="name" />
        <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
      </div>

      <div class="mb-3">
        <label for="categori">Category</label>
        <select name="" id="category" class="form-control" v-model="category_id">
          <option value="" hidden>Chọn danh mục</option>
          <option :value="category.id" v-for="(category, index) in listCategory" :key="index">{{ category.name }}
          </option>
        </select>
        <span v-if="errors.category_id" class="text-danger">{{ errors.category_id }}</span>
      </div>


      <div class="mb-3">
        <label for="description">Mô tả</label>
        <input type="text" placeholder="Description" id="description" class="form-control" v-model="description" />
        <span v-if="errors.description" class="text-danger">{{ errors.description }}</span>
      </div>
      <div class="mb-3">
        <label for="price">Price</label>
        <input type="text" placeholder="price" id="price" class="form-control" v-model="price" />
        <span v-if="errors.price" class="text-danger">{{ errors.price }}</span>
      </div>
      <div class="mb-3">
        <label for="image">Image</label>
        <input type="file" id="image" class="form-control" accept="image/*" @change="handleChange" />
        <!-- <span v-if="errors.image" class="text-danger">{{ errors.image }}</span> -->
      </div>
      <button class="btn btn-success">Thêm mới</button>
    </form>
  </div>
</template>