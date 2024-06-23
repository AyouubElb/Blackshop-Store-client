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
            <img :src="imageUrl" alt="" loading="lazy" />
          </div>
          <div class="uploader" @click="uploadImage" v-else>
            <i class="bi bi-cloud-upload"></i>
            <span>Choose the file to download</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <button class="btn btn-dark my-auto" @click="saveCategory">
        <i class="bi bi-floppy"></i>
        <span>Save Category</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const categoryName = ref("");
const categoryDesc = ref("");
const categoryImage = ref(null);
const imageUrl = ref(null);

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

const saveCategory = () => {
  const formData = new FormData();
  formData.append("name", categoryName.value);
  formData.append("description", categoryDesc.value);
  formData.append("image", categoryImage.value);

  productStore.createCategory(formData);
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
