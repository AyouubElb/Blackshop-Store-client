<template>
  <div class="dashboard-container">
    <DashboardSidebar />
    <router-view />
  </div>
</template>
<script setup>
import { defineAsyncComponent } from "vue";

const DashboardSidebar = defineAsyncComponent(() =>
  import("@/components/dashboard/DashboardSidebar.vue")
);
</script>
<style>
.dashboard-container {
  display: flex;
  height: 100%;
  overflow-y: auto;
}
.dashboard-view-container {
  width: 100%;
  margin-left: 240px;
  padding: 1.5rem;
}
.dashboard-view-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
}
.outer-block {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 5px 20px #0000000d;
  /* padding: 1.5rem; */
}
.outer-block-header {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px;
}
.outer-block-header h2 {
  font-size: 1rem;
  font-weight: 600;
  margin-block: auto;
}
.outer-block-body {
  padding: 20px;
}
.outer-block-footer {
  display: flex;
  border-top: 1px solid #e5e5e5;
  padding: 20px;
}
.page-footer {
  display: flex;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0 -5px 20px #0000000d;
  margin-top: 0;
  padding: 15px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.page-footer .btn {
  display: flex;
  gap: 10px;
  font-weight: 500;
  margin-left: auto;
  padding: 8px 20px;
}
.page-footer .btn:hover {
  background-color: #fff;
  color: #212529;
}
.page-footer .btn .bi::before {
  font-weight: bold !important;
}
</style>
