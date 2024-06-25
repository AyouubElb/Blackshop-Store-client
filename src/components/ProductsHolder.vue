<template>
  <div class="products-container product-grid">
    <template v-for="(product, index) in products" :key="index">
      <div class="product-card">
        <!-- <i class="bi bi-chevron-left"></i> -->
        <router-link
          class="product-image"
          :to="{
            name: 'SingleProductPage',
            params: {
              path: product.name.split(' ').join('-'),
            },
            query: { id: product._id },
          }"
        >
          <AdvancedImage
            :cldImg="product.images[0]"
            :alt="product.name"
            loading="lazy"
          />
        </router-link>
        <!-- <i class="bi bi-chevron-right"></i> -->
        <div class="product-card-detail-container">
          <div class="product-price-container">
            <router-link
              class="product-name"
              :to="{
                name: 'SingleProductPage',
                params: {
                  path: product.name.split(' ').join('-'),
                },
                query: { id: product._id },
              }"
              >{{ product.name }}</router-link
            >
            <div class="product-price"><span>€</span>{{ product.price }}</div>
          </div>
          <!-- <div
            class="add-to-cart-icon"
            @click="addToCart(product)"
            data-bs-toggle="offcanvas"
            href="#productCart"
            aria-controls="offcanvasExample"
          >
            <i class="bi bi-cart2"></i>
            <i class="bi bi-plus"></i>
          </div> -->
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { AdvancedImage } from "@cloudinary/vue";
import { useProducStore } from "@/stores/product";
const productStore = useProducStore();
defineProps(["products", "displayOption"]);

const addToCart = (product) => {
  let index = productStore.cartList.findIndex(
    (item) => item.productInfo._id === product._id
  );
  if (index !== -1) {
    console.log("index", index);
    productStore.cartList[index].quantity++;
  } else {
    productStore.cartList.push({ productInfo: product, quantity: 1 });
  }
};
</script>

<style>
.product-grid {
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-rows: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-columns: 1fr;
  display: grid;
}
.products-container {
  padding: 5px 40px;
}
.product-card {
  position: relative;
}
/* .product-card i {
  position: absolute;
  top: 40%;
  font-size: 1.5rem;
}
.product-card .bi-chevron-right {
  right: 0;
} */
.product-image {
  cursor: pointer;
}
.product-image img {
  width: 100%;
  border-radius: 4px;
  max-height: 410px;
}
.product-card-detail-container {
  display: flex;
  padding: 10px 18px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  z-index: 4;
  margin-top: -8px;
  position: relative;
}
.product-card-detail-container .product-name {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  cursor: pointer;
  margin-bottom: 5px;
}
.product-card-detail-container .product-name:hover {
  color: #313131;
}
.product-card-detail-container .product-price {
  color: #888;
  font-size: 18px;
}

.product-card-detail-container .product-price span {
  font-size: 1rem;
}
.product-card-detail-container .add-to-cart-icon {
  display: flex;
  color: #1a1a1a;
  font-size: 18px;
  margin-left: auto;
  cursor: pointer;
}
.product-card-detail-container .add-to-cart-icon .bi-plus {
  position: absolute;
  right: 9px;
  top: 8px;
  font-size: 14px;
}
.product-card-detail-container .add-to-cart-icon:hover {
  color: #bf8c4e;
}
.product-card-detail-container .add-to-cart-icon .bi::before {
  font-weight: 700 !important;
}

/* Media queries */
@media only screen and (max-width: 992px) {
  /* .products-container {
    padding: 0;
  } */
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media only screen and (max-width: 768px) {
  .products-container {
    padding: 0;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
@media screen and (max-device-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
}
</style>
