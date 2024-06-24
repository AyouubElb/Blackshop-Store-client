<template>
  <nav class="nav-bar">
    <div class="nav-bar-brand">
      <router-link to="/">
        <img
          src="../assets/icons/blackshop.png"
          alt="blackshop Icon"
          loading="lazy"
        />
      </router-link>
    </div>
    <ul class="nav-bar-categories mx-auto my-auto" v-if="screenWidth > 768">
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
    </ul>
    <CartSidebar />
    <div
      class="sidebar-button ms-4 my-auto"
      data-bs-toggle="offcanvas"
      data-bs-target="#menuSidebar"
      aria-controls="offcanvasScrolling"
      v-if="screenWidth <= 768"
    >
      <i class="bi bi-list"></i>
    </div>
    <div class="search-button my-auto me-4">
      <i class="bi bi-search"></i>
    </div>
    <div
      class="cart my-auto"
      data-bs-toggle="offcanvas"
      href="#productCart"
      role="button"
      aria-controls="offcanvasExample"
    >
      <i class="bi bi-cart2"></i>
      <div class="cart-quantity">{{ cartQuantity }}</div>
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
          <img src="../assets/icons/blackshop.png" loading="lazy" alt="" />
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
            placeholder="Search for product"
            aria-label="Search"
          />
        </form>
        <ul class="nav-bar-categories mx-auto my-auto">
          <li class="ms-auto">
            <router-link to="/">Home</router-link>
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
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import {
  reactive,
  onMounted,
  onBeforeMount,
  onUnmounted,
  computed,
  ref,
} from "vue";
import { useProducStore } from "@/stores/product";
import { defineAsyncComponent } from "vue";

const CartSidebar = defineAsyncComponent(() =>
  import("@/components/CartSidebar.vue")
);

const productStore = useProducStore();
const categoryList = reactive([]);
const screenWidth = ref(window.innerWidth);

const cartQuantity = computed(() => {
  let quantiy = 0;
  productStore.cartList.forEach((item) => {
    quantiy += item.quantity;
  });
  return quantiy;
});

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

onBeforeMount(() => {
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
  .search-button {
    margin-left: auto;
  }
}
</style>
