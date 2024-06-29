<template>
  <div class="category-container">
    <router-link
      to="/products"
      class="category-card"
      v-for="(category, index) in categoryList"
      :key="index"
      @click="categoryClicked(category)"
    >
      <div class="category-image-container">
        <div class="category-overlay"></div>
        <AdvancedImage :cldImg="category.image" loading="lazy" />
      </div>
      <div class="text-holder">
        <div class="category-name">
          <h2 class="category-text">
            {{ category.name }}
          </h2>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useProducStore } from "@/stores/product";
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";

const productStore = useProducStore();

const categoryList = reactive([]);

onBeforeMount(async () => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxupeynms",
    },
  });
  const res = await productStore.fetchCategories();
  const data = res.map((value) => {
    value.image = cld.image(value.cloudinary_id).format("auto").quality("auto");
    return value;
  });

  categoryList.splice(0, categoryList.length, ...data);
  console.log("categoryList", categoryList);
});

const categoryClicked = (category) => {
  productStore.selectedCategory = category;
  console.log("category", category);
};
</script>
<style>
.category-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 120px 24px;
}
.category-card {
  cursor: pointer;
  border-radius: 4px;
}
.category-card:nth-child(n) {
  animation: scroll-fst-last linear;
  animation-timeline: scroll();
}
.category-card:nth-child(1) {
  /* transform: translate3d(0px, -4%, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); */
  /* animation: scroll-fst-last linear;
  animation-timeline: scroll(); */
}
.category-card:nth-child(2) {
  /* transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); */
  /* animation: scroll-middle linear;
  animation-timeline: scroll(); */
}
@keyframes scroll-middle {
  to {
    transform: translate3d(0px, 2%, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.category-card:nth-child(3) {
  /* transform: translate3d(0px, -4%, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); */
  /* animation: scroll-fst-last linear;
  animation-timeline: scroll(); */
}

@keyframes scroll-fst-last {
  to {
    transform: translate3d(0px, 4%, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
}
.category-overlay {
  z-index: 2;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  border-radius: 4px;
}
.category-overlay:hover {
  background-color: transparent;
}
.category-image-container {
  position: relative;
}
.category-image-container img {
  height: 700px;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 4px;
}
.text-holder {
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
.category-name {
  z-index: 4;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  position: absolute;
  top: auto;
  bottom: 50%;
  right: auto;
  left: 10%;
  transform: rotate(90deg);
}
.category-name .category-text {
  font-optical-sizing: auto;
  width: 20px;
  height: 160px;
  font-size: 4rem;
  color: #fff;
  white-space: nowrap;
  margin-top: 0;
  margin-bottom: 0;
}

/* Media queries */
@media only screen and (max-width: 768px) {
  .category-container {
    flex-direction: column;
    padding: 50px 24px;
  }
  .category-image-container img {
    height: 150px;
  }
  .category-name {
    transform: none;
    bottom: 10%;
    left: 5%;
  }
  .category-name .category-text {
    font-size: 2.5rem;
    height: auto;
  }
}
</style>
