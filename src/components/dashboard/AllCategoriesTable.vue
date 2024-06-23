<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Products</h2>
    <div class="outer-block content-wrapper-container">
      <div class="outer-block-body">
        <div class="search-filters">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-dark" type="submit">Search</button>
          </form>
        </div>
        <table class="table">
          <thead>
            <tr class="table-secondary">
              <th scope="col">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" />
                </div>
              </th>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Visibility</th>
              <th scope="col">Date of creation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categoryList" :key="index">
              <th scope="row">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" />
                </div>
              </th>
              <td>
                <img
                  :src="category.image"
                  :alt="category.name"
                  loading="lazy"
                />
              </td>
              <td>{{ category.name }}</td>
              <td>
                <span class="table-label">Visible</span>
              </td>
              <td>{{ category.createdAt }}</td>
              <td>
                <div class="table-actions">
                  <router-link to="#" class="action-button">
                    <i class="bi bi-eye"></i>
                  </router-link>
                  <router-link
                    :to="{
                      name: 'UpdateCategoryPage',
                      params: { id: category._id },
                    }"
                    class="action-button"
                  >
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <div
                    class="action-button"
                    @click="removeCategory(category._id)"
                  >
                    <i class="bi bi-trash"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="page-footer">
    <router-link
      class="btn btn-dark my-auto"
      :to="{
        name: 'CreateCategoryPage',
      }"
    >
      <i class="bi bi-plus-lg"></i>
      <span>New Category</span>
    </router-link>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const categoryList = reactive([]);

onMounted(() => {
  productStore.fetchCategories().then((res) => {
    const data = res.map((value) => {
      value.image = `https://blackshop-store-api.onrender.com/Images/${value.image}`;
      const date = new Date(value.createdAt);

      value.createdAt = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return value;
    });
    categoryList.splice(0, categoryList.length, ...data);
    console.log("categoryList", categoryList);
  });
});

const removeCategory = (id) => {
  productStore.deleteCategory(id);
};
</script>
<style>
.search-filters {
  margin-bottom: 1rem;
}
.dashboard-view-container table {
  border: var(--bs-border-width) solid var(--bs-border-color);
}
.dashboard-view-container table img {
  border-radius: 3px;
  width: 50px;
  height: 50px;
}
.table .table-label {
  color: #00c853;
  border-radius: 3px;
  padding: 5px 10px;
  text-align: center;
  background-color: #00c85333;
}
.table .action-button {
  background-color: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 50%;
  box-shadow: 0 1px 2px #1219260d;
  cursor: pointer;
  text-align: center;
  padding: 3px 6px;
}
.table .action-button:hover {
  background-color: #e1dedb;
}
.table .table-actions {
  display: flex;
  gap: 8px;
}
.table .table-actions .action-button i {
  color: #697586;
}
</style>
