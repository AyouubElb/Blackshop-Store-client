<template>
  <div class="products-section-container">
    <div class="products-header">
      <h2 class="title">{{ productStore.selectedCategory.name }}</h2>
      <div class="products-filters ms-auto">
        <div
          class="dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click="openDropdown = !openDropdown"
        >
          <div class="dropdown-select">
            <i class="bi bi-chevron-down" v-if="!openDropdown"></i>
            <i class="bi bi-chevron-up" v-if="openDropdown"></i>
            {{ selectedItem }}
          </div>
          <h3>Order by</h3>
          <ul class="dropdown-menu">
            <li
              v-for="(item, index) in dropdownList"
              :key="index"
              @click="editFilter(index)"
            >
              <a class="dropdown-item" href="#">
                <span>{{ item }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="products-section-content">
      <ProductsHolder :products="productList" :displayOption="displayOption" />
    </div>
  </div>
  <Footer />
</template>
<script setup>
import { reactive, onMounted, ref, watchEffect } from "vue";
import { Cloudinary } from "@cloudinary/url-gen";
import { useProducStore } from "@/stores/product";
import { defineAsyncComponent } from "vue";

const ProductsHolder = defineAsyncComponent(() =>
  import("@/components/ProductsHolder.vue")
);
const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));

const productStore = useProducStore();

const productList = reactive([]);
const dropdownList = reactive([
  "Proposed",
  "Newest",
  "Price (descending)",
  "Price (ascending)",
]);
const selectedItem = ref("Proposed");
const openDropdown = ref(false);
const displayOption = ref(4);

const editFilter = (index) => {
  let sortBy = null;
  let order = null;
  selectedItem.value = dropdownList[index];
  switch (index) {
    case 0:
      sortBy = "";
      order = "";
      break;
    case 1:
      sortBy = "createdAt";
      order = "desc";
      break;
    case 2:
      sortBy = "price";
      order = "desc";
      break;
    case 3:
      sortBy = "price";
      order = "asc";
      break;
  }
  const filters = {
    categories: productStore.selectedCategory._id,
  };
  productStore.searchProducts(sortBy, order, filters).then((res) => {
    const data = res.map((value) => {
      value.images[0].file = `https://blackshop-store-api.onrender.com/Images/${value.images[0].file}`;
      return value;
    });
    productList.splice(0, productList.length, ...data);
  });
};

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: "dxupeynms",
  },
});

watchEffect(() => {
  let sortBy = "";
  let order = "";
  const filters = {
    categories: productStore.selectedCategory._id,
  };
  productStore.searchProducts(sortBy, order, filters).then((res) => {
    const data = res.map((value) => {
      value.images[0] = cld
        .image(value.images[0].cloudinary_id)
        .format("auto")
        .quality("auto");
      return value;
    });
    productList.splice(0, productList.length, ...data);
  });
});
</script>
<style>
.products-section-container {
  overflow: hidden;
  padding: 5rem 6rem 6rem;
}
.products-header {
  display: flex;
  padding: 1.5rem;
}
.products-header .title {
  font-size: 2rem;
  font-weight: 600;
}
.products-filters {
  display: flex;
  flex-direction: row-reverse;
  gap: 2.5rem;
  margin-top: auto;
}
.products-filters h3 {
  direction: rtl;
  font-size: 20px;
}
.products-filters .dropdown {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  cursor: pointer;
}
.products-filters .dropdown ul.dropdown-menu {
  border-radius: 4px;
}
.products-filters .dropdown .dropdown-menu li .dropdown-item {
  display: flex;
}
.products-filters .dropdown .dropdown-menu li .dropdown-item:hover {
  font-weight: 500;
}
.products-filters .dropdown .dropdown-menu .dropdown-item span {
  margin-left: auto;
  font-size: 14px;
}
.products-filters .dropdown-select {
  display: flex;
  gap: 10px;
}
.products-filters .dropdown-select i {
  font-size: 12px;
  margin-block: auto;
}
.products-filters .dropdown-select i::before {
  font-weight: 600;
}
.products-section-content {
  display: flex;
}
</style>
