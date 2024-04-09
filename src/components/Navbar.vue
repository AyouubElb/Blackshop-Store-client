<template>
  <nav class="nav-bar">
    <div
      class="cart my-auto"
      data-bs-toggle="offcanvas"
      href="#productCart"
      role="button"
      aria-controls="offcanvasExample"
    >
      <i class="bi bi-cart2"></i>
      <div class="cart-quantity">0</div>
    </div>
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="productCart"
      aria-labelledby="productCartLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">سلة التسوق</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
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
            <img :src="item.productInfo.images[0].file" alt="" />
            <div class="product-details-holder">
              <div class="product-name">{{ item.productInfo.name }}</div>
              <div class="price-text">
                <span>MAD</span>
                {{ item.productInfo.price }}
              </div>
              <div class="quantity-container">
                <div class="quantity-text">العدد:</div>
                <button
                  class="btn"
                  @click="decreaseNumb(item.productInfo._id)"
                  v-if="productQuantity(item.productInfo._id) > 1"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <span>{{ item.quantity }}</span>
                <button class="btn" @click="increaseNumb(item.productInfo._id)">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <div
              class="remove-button"
              @click="removeFromCart(item.productInfo._id)"
            >
              <i class="bi bi-x-circle"></i>
            </div>
          </div>
          <div class="cart-footer">
            <div class="cart-line-item">
              <div class="subtotal">المجموع</div>
              <div class="card-product-pice">
                <span>MAD</span>
                {{ totalPrice }}
              </div>
            </div>
            <button class="add-to-card-button button">
              المضي قدما في الشراء
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
    <div class="search-button">
      <i class="bi bi-search"></i>
    </div>
    <ul class="nav-bar-categories ms-auto my-auto" v-if="screenWidth > 768">
      <li v-for="(category, index) in categoryList" :key="index">
        <router-link
          :to="{
            name: 'ProductsPage',
            params: { id: category.name.split(' ').join('-') },
          }"
          @click="productStore.selectedCategory = category"
        >
          {{ category.name }}
        </router-link>
      </li>
      <li class="ms-auto">
        <router-link to="#">اتصل بنا</router-link>
      </li>
    </ul>
    <div class="nav-bar-brand ms-auto">
      <router-link to="/">
        <img src="../assets/icons/blackshop.png" alt="" />
      </router-link>
    </div>
    <div
      class="sidebar-button ms-4 my-auto"
      data-bs-toggle="offcanvas"
      data-bs-target="#menuSidebar"
      aria-controls="offcanvasScrolling"
      v-if="screenWidth <= 768"
    >
      <i class="bi bi-list"></i>
    </div>
    <div
      class="offcanvas offcanvas-end menu-sidebar"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabindex="-1"
      id="menuSidebar"
      aria-labelledby="menuSidebarLabel"
      v-if="screenWidth <= 768"
    >
      <div class="offcanvas-header p-0">
        <router-link to="/" class="side-bar-brand mx-auto">
          <img src="../assets/icons/blackshop.png" alt="" />
        </router-link>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <form class="d-flex mb-4" role="search">
          <input
            class="form-control"
            type="search"
            placeholder="البحث عن المنتج"
            aria-label="Search"
          />
        </form>
        <ul class="nav-bar-categories mx-auto my-auto">
          <li class="ms-auto">
            <router-link to="/">الصفحة الرئيسية</router-link>
          </li>
          <li
            class="ms-auto"
            v-for="(category, index) in categoryList"
            :key="index"
          >
            <router-link
              :to="{
                name: 'ProductsPage',
                params: { id: category.name.split(' ').join('-') },
              }"
              @click="productStore.selectedCategory = category"
            >
              {{ category.name }}
            </router-link>
          </li>
          <li class="ms-auto">
            <router-link to="#">اتصل بنا</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { reactive, onMounted, onUnmounted, computed, ref } from "vue";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const categoryList = reactive([]);
const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const removeFromCart = (id) => {
  let index = productStore.cartList.findIndex(
    (item) => item.productInfo._id === id
  );
  productStore.cartList.splice(index, 1);
  // if (productStore.cartList[index].quantity > 1) {
  //   productStore.cartList[index].quantity--;
  // } else if (productStore.cartList[index].quantity == 1) {
  //   productStore.cartList.splice(index, 1);
  // }
};

const productQuantity = (id) => {
  let index = productStore.cartList.findIndex(
    (item) => item.productInfo._id === id
  );
  return productStore.cartList[index].quantity;
};

const decreaseNumb = (id) => {
  let index = productStore.cartList.findIndex(
    (item) => item.productInfo._id === id
  );
  if (productStore.cartList[index].quantity > 1) {
    productStore.cartList[index].quantity--;
  }
};

const increaseNumb = (id) => {
  let index = productStore.cartList.findIndex(
    (item) => item.productInfo._id === id
  );
  productStore.cartList[index].quantity++;
};

const totalPrice = computed(() => {
  let total = 0;
  productStore.cartList.forEach((item) => {
    total += item.productInfo.price;
  });
  return total;
});

onMounted(() => {
  window.addEventListener("resize", handleResize);

  productStore.fetchCategories().then((res) => {
    categoryList.splice(0, categoryList.length, ...res);
  });
});
</script>
<style>
.nav-bar {
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0rem 2.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: transform 0.3s;
}

.nav-bar-categories {
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
}
.nav-bar-categories li {
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
.nav-bar-categories li::after {
  content: "";
  display: block;
  height: 2px;
  width: 0%;
  background-color: #bf8c4e;
  transition: width 0.4s;
}
.nav-bar-categories li:hover::after {
  width: 50%;
}
.nav-bar-categories li a {
  color: #1a1a1a;
  text-decoration: none;
  transition: color 0.3s;
}
.nav-bar-categories li a:hover {
  color: #bf8c4e;
}
.nav-bar-brand {
  display: flex;
  gap: 4px;
  text-decoration: none;
  cursor: pointer;
}
.nav-bar-brand img {
  width: 5rem;
}
.search-button {
  margin-left: 2.5rem;
  margin-block: auto;
  cursor: pointer;
}
.search-button i {
  font-size: 1.25rem;
  font-weight: 600;
}
.cart i {
  font-size: 1.5rem;
}
.cart {
  position: relative;
}
.cart .cart-quantity {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #bf8c4e;
  color: white;
  font-size: 13px;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  min-width: 20px;
}
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
  margin-left: auto;
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
  flex-direction: row-reverse;
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
  justify-content: space-between;
  align-items: end;
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
  flex-direction: row-reverse;
}
.cart-item .product-details-holder .quantity-container .quantity-text {
  color: #888;
  font-weight: 200;
  direction: rtl;
  margin-left: 10px;
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
  flex-direction: row-reverse;
  justify-content: space-between;
}
.cart-footer .cart-line-item .subtotal {
  color: #bf8c4e;
}
.cart-footer .cart-line-item .card-product-pice {
  font-size: 1.5rem;
  font-weight: 700;
}
.cart-footer .add-to-card-button {
  width: 100%;
  padding: 14px 0;
}
.nav-bar .sidebar-button {
  font-size: 2rem;
}
.nav-bar .offcanvas {
  padding: 20px 15px !important;
}
.nav-bar .offcanvas .side-bar-brand {
  width: 6rem;
}
.nav-bar .offcanvas .form-control {
  height: 50px;
  text-align: end;
}

/* Media queries */
@media only screen and (max-width: 768px) {
  .nav-bar {
    padding: 0rem 2rem;
  }
  .nav-bar-brand img {
    width: 4rem;
  }
  .nav-bar-categories {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
