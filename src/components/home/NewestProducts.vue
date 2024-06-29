<template>
  <div class="newest-product-container">
    <div class="title-holder">
      <div class="left-alighted-text">
        <h1>Newest</h1>
      </div>
      <div class="right-alighted-text ms-auto">
        <h1>Products</h1>
      </div>
    </div>
    <div class="view-all-link ms-auto">
      <div class="text">View All</div>
      <div class="arrow-icon">
        <i class="bi bi-arrow-right-short"></i>
      </div>
    </div>
    <ProductsHolder :products="NewestProducts" />
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from "vue";
import { useProducStore } from "@/stores/product";
import { Cloudinary } from "@cloudinary/url-gen";
import { defineAsyncComponent } from "vue";

const ProductsHolder = defineAsyncComponent(() =>
  import("@/components/ProductsHolder.vue")
);

const productStore = useProducStore();
const NewestProducts = reactive([]);
const productList = reactive([]);

onBeforeMount(async () => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxupeynms",
    },
  });

  const res = await productStore.fetchAllProducts("createdAt", "desc", 4);
  const data = res.map((value) => {
    value.images[0] = cld
      .image(value.images[0].cloudinary_id)
      .format("auto")
      .quality("auto");

    return value;
  });
  NewestProducts.splice(0, NewestProducts.length, ...data);
  console.log("NewestProducts", NewestProducts);
});
</script>
<style>
.newest-product-container {
  display: flex;
  flex-direction: column;
  padding: 50px 60px;
  margin-bottom: 4.5rem;
}
.title-holder h1 {
  font-size: 100px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
}
.title-holder {
  display: flex;
  flex-direction: column;
  width: 82%;
  margin-inline: auto;
}
.left-alighted-text {
  /* animation: scroll-text-left linear;
  animation-timeline: view(); */
}

@keyframes scroll-text-left {
  from {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
  to {
    transform: translate3d(20%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.right-alighted-text {
  color: #fff;

  /* animation: scroll-text-right linear;
  animation-timeline: view(); */
  margin-top: -8px;
}
@keyframes scroll-text-right {
  from {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
  to {
    transform: translate3d(-15%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.view-all-link {
  display: flex;
  cursor: pointer;
  margin-right: 2rem;
}
.view-all-link .text {
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin: auto 0;
}
.view-all-link:hover {
  color: #bf8c4e;
}
.view-all-link .arrow-icon {
  transform: rotate(-45deg);
  font-size: 2rem;
  color: #bf8c4e;
}

/* Media queries */
@media only screen and (max-width: 992px) {
  .newest-product-container {
    padding: 50px 24px;
  }
}
@media only screen and (max-width: 768px) {
  .title-holder h1 {
    font-size: 50px;
  }
  .view-all-link {
    margin-left: 0;
  }
  .view-all-link .text {
    font-size: 1rem;
  }
}
</style>
