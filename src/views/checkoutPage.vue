<template>
  <div class="checkout-section-container">
    <div class="checkout-section-content">
      <div class="order-message mb-4">
        <div class="mb-3">
          <img src="../assets/icons/thanks-icon.svg" alt="" loading="lazy" />
        </div>
        <h1 class="heading-primary">Thank you for your trust</h1>
        <div class="actions">
          <button class="btn">
            <router-link to="/">Continue Shopping</router-link>
          </button>
        </div>
      </div>
      <div class="single-order">
        <div class="single-order-header">
          <div class="order-item">
            <h2>Status</h2>
            <p class="unpaid">Unpaid amount</p>
          </div>
          <div class="order-item">
            <h2>Payment Information</h2>
            <p>Cash on delivery</p>
          </div>
        </div>
        <table class="table mb-0" v-if="orderInfo && orderInfo.productList">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Product price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderInfo.productList" :key="index">
              <td class="product-detail">
                <img
                  :src="imageUrl(index)"
                  :alt="item.product.name"
                  loading="lazy"
                />
                <div class="detail-text">
                  <router-link
                    :to="{
                      name: 'SingleProductPage',
                      params: {
                        path: item.product.name.split(' ').join('-'),
                      },
                      query: { id: item.product._id },
                    }"
                    class="title"
                    >{{ item.product.name }}</router-link
                  >
                  <ul class="p-0">
                    <li>
                      <span>Size: </span>
                      {{ item.size }}
                    </li>
                    <li>
                      <span>Color:</span>
                      {{ item.color }}
                    </li>
                  </ul>
                </div>
              </td>
              <td>€{{ item.product.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>€{{ totalProductPrice(index) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="pricing-detail-resume" v-if="orderInfo">
          <ul class="p-0">
            <li>
              <div class="title">Total price:</div>
              <div class="text">€{{ orderInfo.total }}</div>
            </li>
            <li>
              <div class="title">Shipping (Free shipping):</div>
              <div class="text">€0</div>
            </li>
            <li>
              <div class="title last-title">Total amount:</div>
              <div class="text last-text">€{{ orderInfo.total }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Footer from "../components/Footer.vue";
import { reactive, ref, onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const orderInfo = ref();
const productInfo = ref();

const totalProductPrice = (index) => {
  const productInfo = orderInfo.value.productList[index];
  return productInfo.quantity * productInfo.product.price;
};

const imageUrl = (index) => {
  const productInfo = orderInfo.value.productList[index];
  const image = productInfo.product.images.find(
    (elem) => elem.color === productInfo.color
  );
  const imageUrl = `https://blackshop-store-api.onrender.com/Images/${image.file}`;
  return imageUrl;
};

onBeforeMount(() => {
  const route = useRoute();
  const orderId = route.query.id;
  console.log("orderId", orderId);
  productStore.fetchOrderById(orderId).then((res) => {
    orderInfo.value = res;
    console.log("orderInfo", orderInfo.value);
  });
  // .then(() => {
  //   productStore.fetchProductById(orderInfo.value.productId).then((res) => {
  //     productInfo.value = res;
  //     console.log("productInfo", productInfo.value);
  //   });
  // });
});
</script>
<style>
.checkout-section-content {
  padding: 8rem 1rem;
}
.checkout-section-content .order-message {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.checkout-section-content .order-message img {
  width: 90px;
}
.checkout-section-content .order-message .heading-primary {
  margin-bottom: 2.5rem;
}
.checkout-section-content .actions button {
  border: none;
  transition: background-color 0.5s, border 0.5s;
}
.checkout-section-content .actions button a {
  background-color: #1a1a1a;
  border: #1a1a1a 1px solid;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  padding: 12px;
  transition: background-color 0.5s, border 0.5s;
}
.checkout-section-content .actions button a:hover {
  background-color: #bf8c4e;
  border: #bf8c4e 1px solid;
}
.checkout-section-content .single-order {
  max-width: 700px;
  background-color: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  margin: auto;
  padding: 15px;
}
.checkout-section-content .single-order-header {
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  margin-bottom: 15px;
}
.checkout-section-content .single-order-header .order-item {
  width: 50%;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 12px;
  text-align: center;
}
.checkout-section-content .single-order-header .order-item h2 {
  color: #a7a7a7;
  font-size: 14px;
  font-weight: 400;
}
.checkout-section-content .single-order-header .order-item p {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0;
}
.checkout-section-content .single-order-header .order-item .unpaid {
  color: #c80000;
}
.checkout-section-content .table thead tr {
  border: 1px solid #f0f0f0;
}
.checkout-section-content .table thead th {
  color: #a7a7a7;
  font-size: 14px;
  padding: 15px;
}
.checkout-section-content .table td {
  font-size: 14px;
  padding: 10px 15px;
}
.checkout-section-content .table .product-detail {
  color: #a7a7a7;
  display: flex;
  gap: 12px;
}
.checkout-section-content .table .product-detail img {
  width: 73px;
  height: 85px;
  border-radius: 4px;
  cursor: pointer;
}
.checkout-section-content .table .product-detail li {
  display: flex;
  gap: 10px;
}
.checkout-section-content .table .product-detail .title {
  color: #1a1a1a;
  font-weight: 600;
  line-height: 1.5;
}
.checkout-section-content ul {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}
.checkout-section-content .pricing-detail-resume {
  background-color: #fff;
  padding: 15px;
  font-size: 14px;
}
.checkout-section-content .pricing-detail-resume ul {
  display: flex;
  align-items: end;
}
.checkout-section-content .pricing-detail-resume ul li {
  display: flex;
  gap: 2rem;
  margin-bottom: 10px;
}
.checkout-section-content .pricing-detail-resume ul li .title {
  display: flex;
  width: 200px;
  color: #a7a7a7;
  font-size: 1rem;
}
.checkout-section-content .pricing-detail-resume ul li .text {
  width: 50px;
}
.checkout-section-content .pricing-detail-resume ul li .last-title {
  color: #1a1a1a;
  font-weight: bold;
}
.checkout-section-content .pricing-detail-resume ul li .last-text {
  color: #1a1a1a;
  font-weight: 600;
}
</style>
