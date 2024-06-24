<template>
  <div class="info-section-container">
    <div class="info-section-header d-flex flex-column">
      <div class="header-title d-flex">
        <h1 class="mx-auto">SUPPORT HUB</h1>
      </div>
      <!-- <div class="select-info-dropdown">
        <div class="dropdown">
          <label for="">اختر الفئة</label>
          <div
            class="dropdown-button dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </div>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div> -->
    </div>
    <div class="info-section-content d-flex gap-4">
      <div class="info-content-sider d-flex flex-column" v-if="pageInfo">
        <div
          class="sider-item py-4 px-2"
          :class="{ 'active-sider-item': pageInfo._id === page._id }"
          v-for="(page, index) in pageList"
          :key="index"
          @click="editPage(index)"
        >
          <h2 class="sider-title d-flex justify-content-center">
            {{ page.name }}
          </h2>
        </div>
      </div>
      <div class="info-content-desc" v-if="pageInfo">
        <div class="info-desc" v-html="pageInfo.description"></div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProducStore } from "@/stores/product";
import { defineAsyncComponent } from "vue";

const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));

const productStore = useProducStore();

const pageList = reactive([]);
const pageInfo = ref();

onMounted(() => {
  const route = useRoute();
  const pageId = route.query.id;
  productStore.fetchPageById(pageId).then((res) => {
    pageInfo.value = res;
  });
  productStore.fetchAllPages().then((res) => {
    pageList.splice(0, pageList.length, ...res);
  });
});

const editPage = (index) => {
  pageInfo.value = pageList[index];
};
</script>
<style>
.info-section-container {
  background-color: #fff;
  margin-top: 80px;
}
.info-section-header .header-title {
  padding-block: 5rem;
}
.info-section-header .select-info-dropdown {
  background-color: rgb(245, 245, 245);
  padding: 2.275rem 4rem 1.3rem;
}
.info-section-header .select-info-dropdow .dropdown-button {
  border: 0.1rem solid rgb(187, 188, 188);
}
.info-section-content {
  margin: 0 6rem 6rem;
  padding: 0 2.5rem;
}
.info-section-content .info-content-sider {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0.2rem 1.3rem 0px;
}
.info-section-content .info-content-sider .sider-item {
  min-width: 240px;
  border-bottom: 0.1rem solid rgb(235, 235, 235);
  cursor: pointer;
}
.info-section-content .info-content-sider .active-sider-item {
  background-color: #1a1a1a;
  color: #fff;
}
.info-section-content .info-content-sider .active-sider-item .sider-title {
  font-weight: bold;
}
.info-section-content .info-content-sider .sider-title {
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
  font-weight: normal;
}
.info-section-content .info-content-desc {
  padding: 3rem 4rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0.2rem 1.3rem 0px;
  max-height: 117vh;
  height: fit-content;
  overflow: auto;
  font-family: roboto !important;
}
</style>
