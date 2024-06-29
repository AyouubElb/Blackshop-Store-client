<template>
  <Navbar v-if="showNavbar()" />
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <div class="loading">Loading ...</div>
    </template>
  </Suspense>
</template>
<script setup>
import { Suspense } from "vue";

import Navbar from "@/components/Navbar.vue";
import Spinner from "@/components/Spinner.vue";
import { useRoute } from "vue-router";

const showNavbar = () => {
  const route = useRoute();
  const hideNavbarPaths = ["admin/dashboard"];
  return !hideNavbarPaths.some((path) => route.path.includes(path));
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font: inherit;
}

img,
svg {
  display: block;
  max-width: 100%;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none !important;
}

body {
  /* font-family: "Rubik", sans-serif !important; */
  font-family: "Archivo", "Rubik", sans-serif !important;
  color: #1a1a1a !important;
  background-color: #e1dedb !important;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.grid4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.grid2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
