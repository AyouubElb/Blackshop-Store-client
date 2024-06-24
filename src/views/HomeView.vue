<template>
  <div class="home-container">
    <Suspense>
      <!-- Async component: Hero -->
      <template #default>
        <Hero />
      </template>
      <template #fallback>
        <div>Loading Hero...</div>
      </template>
    </Suspense>

    <Suspense>
      <!-- Async component: CategoryHolder -->
      <template #default>
        <CategoryHolder />
      </template>
      <template #fallback>
        <div>Loading CategoryHolder...</div>
      </template>
    </Suspense>

    <Suspense>
      <!-- Async component: NewestProducts -->
      <template #default>
        <NewestProducts />
      </template>
      <template #fallback>
        <div>Loading NewestProducts...</div>
      </template>
    </Suspense>

    <Suspense>
      <!-- Async component: AddressSection -->
      <template #default>
        <AddressSection />
      </template>
      <template #fallback>
        <div>Loading AddressSection...</div>
      </template>
    </Suspense>

    <Suspense>
      <!-- Async component: Footer -->
      <template #default>
        <Footer />
      </template>
      <template #fallback>
        <div>Loading Footer...</div>
      </template>
    </Suspense>
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
