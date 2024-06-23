<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Create Category</h2>
    <div class="dashboard-view-content category-page-content d-flex">
      <div class="outer-block main-bar">
        <div class="outer-block-body grid-3">
          <form class="category-name-desc">
            <div class="mb-3">
              <label for="categoryName" class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                id="categoryName"
                v-model="categoryName"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="categoryDesc"
              >
              </textarea>
            </div>
          </form>
          <div class="image-actions" @click="uploadImage" v-if="categoryImage">
            <img :src="imageUrl" loading="lazy" alt="" />
          </div>
          <div class="uploader" @click="uploadImage" v-else>
            <i class="bi bi-cloud-upload"></i>
            <span>Choose the file to download</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <button class="btn btn-dark my-auto" @click="updateCategory">
        <i class="bi bi-floppy"></i>
        <span>Update Category</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, toRefs } from "vue";
import { useProducStore } from "@/stores/product";
import { useRouter } from "vue-router";

const productStore = useProducStore();

const categoryId = ref(null);
const categoryName = ref("");
const categoryDesc = ref("");
const categoryImage = ref(null);
const imageUrl = ref(null);

onMounted(() => {
  const router = useRouter();
  categoryId.value = router.currentRoute.value.params.id;
  productStore.fetchCategoryById(categoryId.value).then((res) => {
    categoryName.value = res.name;
    categoryDesc.value = res.description;
    categoryImage.value = res.image;
    imageUrl.value = `https://blackshop-store-api.onrender.com/Images/${res.image}`;
  });
});

const uploadImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    const file = e.target.files[0];
    imageUrl.value = URL.createObjectURL(file);
    categoryImage.value = file;
  };
  input.click();
};

const updateCategory = () => {
  const formData = new FormData();
  formData.append("name", categoryName.value);
  formData.append("description", categoryDesc.value);
  formData.append("image", categoryImage.value);

  productStore.updateCategory(categoryId.value, formData).then((res) => {
    console.log("updated category", res);
  });
};
</script>
<style>
.outer-block-body .category-name-desc {
  grid-column: 1 / span 2;
  margin-right: 1rem;
}
.outer-block-body .uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  cursor: pointer;
}
.outer-block-body .uploader i {
  font-size: 45px;
}
.outer-block-body .uploader span {
  font-size: 14px;
  font-weight: 500;
}
.outer-block-body .image-actions {
  cursor: pointer;
}
</style>
