<template>
  <div class="home-container">
    <Hero />
    <CategoryHolder />
    <BestSeller />
    <AddressSection />
    <Footer />
  </div>
</template>
<script setup>
import Hero from "@/components/home/Hero.vue";
import CategoryHolder from "@/components/home/CategoryHolder.vue";
import BestSeller from "@/components/home/BestSeller.vue";
import AddressSection from "@/components/home/AddressSection.vue";
import Footer from "@/components/Footer.vue";
</script>
<style>
.home-container {
  overflow: hidden;
}
</style>
