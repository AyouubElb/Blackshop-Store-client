<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Orders</h2>
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
              <th scope="col">Ref</th>
              <th scope="col">Date of creation</th>
              <th scope="col">Client</th>
              <th scope="col">Payment status</th>
              <th scope="col">Sending status</th>
              <th scope="col">Total</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orderList" :key="index">
              <th scope="row"></th>
              <td>{{ order.createdAt }}</td>
              <td>{{ order.fullname }}</td>
              <td>
                <span class="table-label unpaid">Unpaid</span>
              </td>
              <td>
                <span class="table-label default">Not filled</span>
              </td>
              <td>{{ totalPrice(index) }}</td>
              <td>
                <div class="table-actions">
                  <router-link class="action-button" to="#">
                    <i class="bi bi-pencil"></i>
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- <div class="page-footer">
    <router-link
      class="btn btn-dark my-auto"
      :to="{
        name: 'CreateProductPage',
      }"
    >
      <i class="bi bi-plus-lg"></i>
      <span>New Product</span>
    </router-link>
  </div> -->
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const orderList = reactive([]);

onMounted(() => {
  productStore.fetchAllOrders().then((res) => {
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
    orderList.splice(0, orderList.length, ...data);
  });
});

const totalPrice = (index) => {
  return orderList[index].product.price * orderList[index].quantity;
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
  border-radius: 3px;
  padding: 5px 10px;
  text-align: center;
}
.table .unpaid {
  background-color: #fb323f33;
  color: #fb323f;
}
.table .default {
  background-color: #f2f6f7;
  color: #8a9ca0;
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
