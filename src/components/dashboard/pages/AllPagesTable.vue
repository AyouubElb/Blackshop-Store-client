<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Pages</h2>
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
              <th scope="col">Name</th>
              <th scope="col">Visibility</th>
              <th scope="col">Date of creation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(page, index) in pagesList" :key="index">
              <td class="highlighted-td">
                <router-link to="#">{{ page.name }}</router-link>
              </td>
              <td>
                <span class="table-label">Visible</span>
              </td>
              <td>{{ page.createdAt }}</td>
              <td>
                <div class="table-actions">
                  <router-link
                    class="action-button"
                    :to="{
                      name: 'InfoPage',
                      params: { path: page.slug },
                      query: { id: page._id },
                    }"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                  <router-link
                    class="action-button"
                    :to="{
                      name: 'UpdatePage',
                      params: { id: page._id },
                    }"
                  >
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <div
                    class="action-button"
                    @click="removePage(page._id, index)"
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
        name: 'CreateNewPage',
      }"
    >
      <i class="bi bi-plus-lg"></i>
      <span>New Page</span>
    </router-link>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const pagesList = reactive([]);

onMounted(() => {
  productStore.fetchAllPages().then((res) => {
    const data = res.map((value) => {
      const date = new Date(value.createdAt);

      value.createdAt = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return value;
    });
    pagesList.splice(0, pagesList.length, ...data);
  });
});

const removePage = (id, index) => {
  productStore.deletePage(id);
  pagesList.splice(index, 1);
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
.table .highlighted-td a {
  color: #0e64b4;
  font-weight: 500;
  text-decoration: none;
}
.table td {
  padding: 0.5rem 1rem;
}
</style>
