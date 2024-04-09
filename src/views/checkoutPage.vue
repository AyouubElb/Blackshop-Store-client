<template>
  <div class="checkout-section-container">
    <div class="checkout-section-content">
      <div class="order-message mb-4">
        <div class="mb-3">
          <img src="../assets/icons/thanks-icon.svg" alt="" />
        </div>
        <h1 class="heading-primary">شكرا جزيلاً على ثقتكم</h1>
        <div class="actions">
          <button class="btn btn-dark px-4 py-2">
            <router-link to="/">استمر في التسوق</router-link>
          </button>
        </div>
      </div>
      <div class="single-order">
        <div class="single-order-header">
          <div class="order-item">
            <h2>الوضعيات</h2>
            <p class="unpaid">مبلغ غير مدفوع</p>
          </div>
          <div class="order-item">
            <h2>معلومات الدفع</h2>
            <p>الدفع نقدا عند التسليم</p>
          </div>
        </div>
        <table class="table mb-0" v-if="orderInfo && orderInfo.product">
          <thead>
            <tr>
              <th scope="col">المجموع</th>
              <th scope="col">الكمية</th>
              <th scope="col">ثمن القطعة</th>
              <th scope="col">المنتج</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MAD {{ orderInfo.product.price }}</td>
              <td>{{ orderInfo.quantity }}</td>
              <td>MAD {{ totalPrice }}</td>
              <td class="product-detail">
                <img :src="imageUrl" :alt="orderInfo.product.name" />
                <div class="detail-text">
                  <router-link
                    :to="{
                      name: 'SingleProductPage',
                      params: {
                        path: orderInfo.product.name.split(' ').join('-'),
                      },
                      query: { id: orderInfo.product._id },
                    }"
                    class="title"
                    >{{ orderInfo.product.name }}</router-link
                  >
                  <ul>
                    <li class="ms-auto">
                      <span>:المقاس</span>
                      {{ orderInfo.size }}
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="pricing-detail-resume"
          v-if="orderInfo && orderInfo.product"
        >
          <ul>
            <li>
              <div class="title">المجموع :</div>
              <div class="text">MAD {{ totalPrice }}</div>
            </li>
            <li>
              <div class="title">الشحن (شحن مجاني) :</div>
              <div class="text">MAD 0</div>
            </li>
            <li>
              <div class="title last-title">المبلغ الإجمالي :</div>
              <div class="text last-text">MAD {{ totalPrice }}</div>
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
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const orderInfo = ref();

const totalPrice = computed(() => {
  if (orderInfo.value && orderInfo.value.product) {
    return orderInfo.value.product.price * orderInfo.value.quantity;
  } else return "";
});

const imageUrl = computed(() => {
  const image = orderInfo.value.product.images.find(
    (elem) => elem.color === orderInfo.value.color
  );
  image.file = `http://localhost:8000/Images/${image.file}`;
  return image.file;
});

onMounted(() => {
  const route = useRoute();
  const orderId = route.query.id;
  productStore.fetchOrderById(orderId).then((res) => {
    orderInfo.value = res;
    console.log("orderInfo", orderInfo.value);
  });
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
  background-color: #1a1a1a;
  border-radius: 4px;
  transition: background-color 0.5s, border 0.5s;
}
.checkout-section-content .actions button a {
  color: #fff;
  text-decoration: none;
}
.checkout-section-content .actions button:hover {
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
  text-align: right;
  padding: 15px;
}
.checkout-section-content .table td {
  font-size: 14px;
  padding: 10px 15px;
  text-align: end;
}
.checkout-section-content .table .product-detail {
  color: #a7a7a7;
  display: flex;
  flex-direction: row-reverse;
  gap: 12px;
}
.checkout-section-content .table .product-detail img {
  width: 73px;
  height: 70px;
  border-radius: 4px;
  cursor: pointer;
}
.checkout-section-content .table .product-detail li {
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
}
/* .checkout-section-content .table .product-detail li span {
  direction: rtl;
} */
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
.checkout-section-content .pricing-detail-resume ul li {
  display: flex;
  flex-direction: row-reverse;
  /* gap: 3rem; */
  margin-right: auto;
  margin-bottom: 10px;
}
.checkout-section-content .pricing-detail-resume ul li .title {
  display: flex;
  direction: rtl;
  width: 150px;
  color: #a7a7a7;
}
.checkout-section-content .pricing-detail-resume ul li .text {
  width: 150px;
}
.checkout-section-content .pricing-detail-resume ul li .last-title {
  color: #1a1a1a;
}
.checkout-section-content .pricing-detail-resume ul li .last-text {
  color: #1a1a1a;
  font-weight: 600;
}
</style>
