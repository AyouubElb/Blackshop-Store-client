<template>
  <div class="home-container">
    <Hero />
    <CategoryHolder />
    <NewestProducts />
    <AddressSection />
    <Footer />
  </div>
</template>

<script setup>
import { Suspense } from "vue";
import { defineAsyncComponent } from "vue";

const Hero = defineAsyncComponent(() => import("@/components/home/Hero.vue"));
const CategoryHolder = defineAsyncComponent(() =>
  import("@/components/home/CategoryHolder.vue")
);
const NewestProducts = defineAsyncComponent(() =>
  import("@/components/home/NewestProducts.vue")
);
const AddressSection = defineAsyncComponent(() =>
  import("@/components/home/AddressSection.vue")
);
const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));
</script>
<style>
.home-container {
  overflow: hidden;
}
</style>
