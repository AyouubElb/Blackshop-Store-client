<template>
  <div class="shipping-section-container">
    <div class="shipping-section-header">
      <div class="background-image-holder">
        <img src="../assets/images/shipping-image.webp" loading="lazy" alt="" />
      </div>
      <h1 class="header-title" v-if="pageInfo">{{ pageInfo.name }}</h1>
    </div>
    <div class="policy-content-holder" v-if="pageInfo">
      <div class="policy-content-paragraph" v-html="pageInfo.description"></div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Footer from "../components/Footer.vue";
import { reactive, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const pageInfo = ref();

onBeforeMount(() => {
  const route = useRoute();
  const pageId = route.query.id;
  productStore.fetchPageById(pageId).then((res) => {
    pageInfo.value = res;
    console.log("pageDesc", pageInfo.value.description);
  });
});
</script>
<style>
.shipping-section-container {
  background-color: #fff;
  overflow: hidden;
}
.shipping-section-header {
  position: relative;
}
.background-image-holder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shipping-section-header .header-title {
  position: absolute;
  z-index: 2;
  bottom: 15%;
  right: 5%;
  color: #fff;
  font-size: 4rem;
  line-height: 1.2;
  z-index: 2;
}
.policy-content-holder {
  display: flex;
  justify-content: end;
  max-width: 1000px;
  margin-inline: auto;
  padding: 5em 2em;
}
.policy-content-paragraph {
  direction: rtl;
}
.policy-content-paragraph .title {
  font-size: 36px;
  font-weight: 400;
  line-height: 1.2;
  margin-block: 20px;
}
.policy-content-paragraph .text {
  letter-spacing: 0.7px;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 1.4;
}
</style>
