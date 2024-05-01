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
import Hero from "@/components/home/Hero.vue";
import CategoryHolder from "@/components/home/CategoryHolder.vue";
import NewestProducts from "@/components/home/NewestProducts.vue";
import AddressSection from "@/components/home/AddressSection.vue";
import Footer from "@/components/Footer.vue";
</script>
<style>
.home-container {
  overflow: hidden;
}
</style>
