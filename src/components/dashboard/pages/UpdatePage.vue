<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Create a page</h2>
    <div class="dashboard-view-content category-page-content d-flex">
      <div class="outer-block">
        <div class="outer-block-body">
          <div class="outer-block">
            <div class="outer-block-header">
              <h2>Page content</h2>
            </div>
            <div class="outer-block-body">
              <form class="form-group d-flex mb-3">
                <label for="name">Name</label>
                <input
                  class="form-control me-2"
                  type="text"
                  id="slug"
                  aria-label="name"
                  v-model="pageName"
                />
              </form>
              <form class="form-group d-flex mb-3">
                <label for="slug">Slug</label>
                <div class="slug-holder">
                  <span>https://blackshoop.com/pages/</span>
                  <input
                    class="form-control me-2"
                    type="text"
                    id="name"
                    aria-label="name"
                    v-model="pageSlug"
                  />
                </div>
              </form>
              <TextEditor @editDesc="addDescription" :pageDesc="pageDesc" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <button class="btn btn-dark my-auto" @click="updatePage">
        <i class="bi bi-floppy"></i>
        <span>Update Page</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import TextEditor from "@/components/dashboard/TextEditor.vue";
import { ref, reactive, onMounted } from "vue";
import { useProducStore } from "@/stores/product";
import { useRouter } from "vue-router";

const productStore = useProducStore();
const pageId = ref(null);
const pageName = ref(null);
const pageSlug = ref(null);
const pageDesc = ref(null);

onMounted(() => {
  const router = useRouter();
  pageId.value = router.currentRoute.value.params.id;
  productStore.fetchPageById(pageId.value).then((res) => {
    console.log("page", res);
    pageName.value = res.name;
    pageSlug.value = res.slug;
    pageDesc.value = res.description;
  });
});

const addDescription = (description) => {
  pageDesc.value = description;
};

const updatePage = () => {
  const pageData = {};
  pageData.name = pageName.value;
  pageData.slug = pageSlug.value;
  pageData.description = pageDesc.value;

  productStore.updatePage(pageId.value, pageData).then((res) => {
    pageName.value = res.name;
    pageSlug.value = res.slug;
    pageDesc.value = res.description;
  });
};
</script>
<style>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-group input {
  height: 45px;
  background-color: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
}
.outer-block-body .slug-holder {
  align-items: center;
  display: flex;
  gap: 8px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 10px;
  height: 50px;
}
</style>
