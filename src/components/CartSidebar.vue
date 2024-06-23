<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="productCart"
    aria-labelledby="productCartLabel"
  >
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Your Cart</h5>
    </div>
    <div class="offcanvas-body">
      <div
        class="commerce-cart default-state"
        v-if="productStore.cartList.length > 0"
      >
        <div
          class="cart-item"
          v-for="(item, index) in productStore.cartList"
          :key="index"
        >
          <img :src="item.image" alt="" loading="lazy" />
          <div class="product-details-holder">
            <div class="product-name">{{ item.name }}</div>
            <div class="price-text"><span>€</span>{{ item.price }}</div>
            <div class="quantity-container">
              <div class="quantity-text">Quantity:</div>
              <button
                class="btn"
                @click="decreaseNumb(item.product)"
                v-if="productQuantity(item.product) > 1"
              >
                <i class="bi bi-dash"></i>
              </button>
              <span>{{ item.quantity }}</span>
              <button class="btn" @click="increaseNumb(item.product)">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div class="remove-button" @click="removeFromCart(item.product)">
            <i class="bi bi-x-circle"></i>
          </div>
        </div>
        <div class="cart-footer">
          <div class="cart-line-item">
            <div class="subtotal">Total:</div>
            <div class="card-product-pice"><span>€</span>{{ totalPrice }}</div>
          </div>
          <button class="add-to-card-button button">
            <router-link to="/client-info">
              <i class="bi bi-cart2 me-2"></i>
              Proceed To Checkout
            </router-link>
          </button>
        </div>
      </div>
      <div class="commerce-cart empty-state" v-else>
        <div class="text">No items found.</div>
        <router-link to="/products" class="button" data-bs-dismiss="offcanvas"
          >Go See Products</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const productQuantity = (id) => {
  let index = productStore.cartList.findIndex((item) => item.product === id);
  return productStore.cartList[index].quantity;
};

const removeFromCart = (id) => {
  let index = productStore.cartList.findIndex((item) => item.product === id);
  productStore.cartList.splice(index, 1);
};

const decreaseNumb = (id) => {
  let index = productStore.cartList.findIndex((item) => item.product === id);
  if (productStore.cartList[index].quantity > 1) {
    productStore.cartList[index].quantity--;
  }
};

const increaseNumb = (id) => {
  let index = productStore.cartList.findIndex((item) => item.product === id);
  productStore.cartList[index].quantity++;
};

const totalPrice = computed(() => {
  let total = 0;
  productStore.cartList.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
});
</script>
<style>
.offcanvas {
  width: 350px !important;
}
.offcanvas-header,
.offcanvas-body {
  padding: 1rem !important;
}
.offcanvas-header {
  display: flex;
  flex-direction: row-reverse;
}
.offcanvas-header .btn-close {
  margin-left: 0 !important;
}
.offcanvas-title {
  font-size: 30px;
  font-weight: 400;
  margin-right: auto;
}
.empty-state {
  color: #bf8c4e;
  font-weight: 500;
  border: 2px solid #bf8c4e;
  border-radius: 8px;
  justify-content: center;
  padding-block: 100px;
}
.default-state {
  height: 100%;
}
.commerce-cart {
  font-size: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.commerce-cart .button {
  color: #fff;
  text-transform: uppercase;
  background-color: #1a1a1a;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 14px;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: 500;
  transition: background-color 0.5s;
}
.commerce-cart .button:hover {
  background-color: #bf8c4e;
  border: #bf8c4e 1px solid;
  color: #fff;
}
.commerce-cart .cart-item {
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  margin-block: 12px;
  padding: 10px;
  width: 100%;
}
.commerce-cart .cart-item img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: 50% 0%;
  border-radius: 2px;
}
.commerce-cart .cart-item .product-details-holder {
  display: flex;
  height: 63px;
  min-height: 100%;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
  margin-right: 16px;
  font-size: 14px;
}
.cart-item .product-details-holder .product-name {
  font-weight: 500;
}
.cart-item .product-details-holder .price-text {
  color: #bf8c4e;
}
.cart-item .product-details-holder .quantity-container {
  grid-column-gap: 4px;
  display: flex;
  align-items: center;
}
.cart-item .product-details-holder .quantity-container .quantity-text {
  color: #888;
  font-weight: 200;
}
.cart-item .product-details-holder .quantity-container .btn {
  font-size: 20px;
  padding: 0;
  border: none;
}
.commerce-cart .cart-item .remove-button {
  width: 20px;
  height: 20px;
  min-height: 20px;
  min-width: 20px;
  margin-block: auto;
  cursor: pointer;
}
.commerce-cart .cart-item .remove-button .bi-x-circle {
  color: #888;
}
.commerce-cart .cart-item .remove-button .bi-x-circle::before {
  font-weight: 600 !important;
}
.cart-footer {
  margin-top: auto;
  width: 100%;
}
.cart-footer .cart-line-item {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cart-footer .cart-line-item .subtotal {
  color: #bf8c4e;
  font-size: 1.5rem;
}
.cart-footer .cart-line-item .card-product-pice {
  font-size: 30px;
  font-weight: 700;
}
.cart-footer .add-to-card-button {
  width: 100%;
  padding: 12px 0;
}
.cart-footer .add-to-card-button i {
  font-size: 1.25rem;
}

.add-to-card-button a {
  color: #fff;
}
</style>
