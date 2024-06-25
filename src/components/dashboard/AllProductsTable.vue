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
              <th scope="col">Price</th>
              <th scope="col">Orders</th>
              <th scope="col">Visibility</th>
              <th scope="col">Date of creation</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="index">
              <th scope="row">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" />
                </div>
              </th>
              <td>
                <AdvancedImage
                  :cldImg="product.images[0]"
                  :alt="product.name"
                  loading="lazy"
                />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>0</td>
              <td>
                <span class="table-label">Visible</span>
              </td>
              <td>{{ product.createdAt }}</td>
              <td>
                <div class="table-actions">
                  <router-link
                    class="action-button"
                    :to="{
                      name: 'SingleProductPage',
                      params: {
                        path: product.name.split(' ').join('-'),
                      },
                      query: { id: product._id },
                    }"
                  >
                    <i class="bi bi-eye"></i>
                  </router-link>
                  <router-link class="action-button" to="#">
                    <i class="bi bi-pencil"></i>
                  </router-link>
                  <div
                    class="action-button"
                    @click="removeProduct(product._id)"
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
        name: 'CreateProductPage',
      }"
    >
      <i class="bi bi-plus-lg"></i>
      <span>New Product</span>
    </router-link>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const productList = reactive([]);

onMounted(() => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxupeynms",
    },
  });

  let sortBy = "";
  let order = "";
  productStore.fetchAllProducts(sortBy, order).then((res) => {
    const data = res.map((value) => {
      value.images[0] = cld
        .image(value.images[0].cloudinary_id)
        .format("auto")
        .quality("auto");

      const date = new Date(value.createdAt);

      value.createdAt = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      return value;
    });
    productList.splice(0, productList.length, ...data);
  });
});

const removeProduct = (id) => {
  productStore.deleteProduct(id);
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
