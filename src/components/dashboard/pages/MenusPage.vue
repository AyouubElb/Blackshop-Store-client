<template>
  <div class="dashboard-view-container">
    <h2 class="dashboard-view-header">Menus</h2>
    <div class="dashboard-view-content category-page-content d-flex">
      <div class="outer-block main-bar">
        <div class="outer-block-body flex-block">
          <div
            class="outer-block block-bg-color"
            v-for="(menu, parentIndex) in menuList"
            :key="parentIndex"
          >
            <div class="outer-block-header border-bottom">
              <h2>{{ menu.name }}</h2>
            </div>
            <div class="outer-block-body border-bottom">
              <div class="outer-block">
                <div class="outer-block-body">
                  <ul class="block-content p-0">
                    <li
                      v-for="(link, childIndex) in menu.links"
                      :key="childIndex"
                    >
                      <i class="bi bi-link-45deg"></i>
                      <span class="mx-2">{{ link.name }}</span>
                      <div
                        class="action-button"
                        @click="removeLink(menu._id, parentIndex, childIndex)"
                      >
                        <i class="bi bi-trash"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="outer-block-footer">
              <form class="d-flex" role="search">
                <input
                  class="form-control px-3 py-2 me-2"
                  type="search"
                  placeholder="link name"
                  aria-label="Search"
                  data-bs-toggle="dropdown"
                  :value="selectedLinkName(parentIndex)"
                  @input="selectedLink[parentIndex].name = $event.target.value"
                />
                <ul class="dropdown-menu">
                  <li
                    class="dropdown-item item"
                    v-for="(link, childIndex) in linkList"
                    :key="childIndex"
                    @click="selectLink(parentIndex, link)"
                  >
                    <span>{{ link.name }}</span>
                  </li>
                </ul>
              </form>
              <button
                class="btn btn-dark my-auto"
                @click="addLink(parentIndex)"
              >
                <span>Add link </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useProducStore } from "@/stores/product";
const productStore = useProducStore();

const menuList = reactive([]);
const linkList = reactive([]);
const selectedLink = reactive([{ name: "" }]);

const selectLink = (index, link) => {
  selectedLink[index] = link;
};

const selectedLinkName = (index) => {
  return selectedLink[index] ? selectedLink[index].name : "";
};

onMounted(() => {
  productStore.fetchAllMenus().then((res) => {
    menuList.splice(0, menuList.length, ...res);
  });

  productStore.fetchAllPages().then((res) => {
    linkList.splice(0, menuList.length, ...res);
  });
});

const addLink = (index) => {
  const id = menuList[index]._id;
  const menu = menuList[index];
  menu.links.push(selectedLink[index]._id);
  productStore.updateMenu(id, menu).then((res) => {
    menuList[index] = res;
  });
  selectedLink[index] = {};
};

const removeLink = (id, parentIndex, childIndex) => {
  menuList[parentIndex].links.splice(childIndex, 1);
  productStore.updateMenu(id, menuList[parentIndex]);
};
</script>
<style>
.block-bg-color {
  background-color: #e5e5e5;
}
.border-bottom {
  border-bottom: 2px solid #fcfcfc !important;
}
.flex-block {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.outer-block-footer button {
  transition: background-color 0.5s, color 0.5s;
}
.outer-block-footer button:hover {
  background-color: transparent;
  color: #1a1a1a;
}
.form-group input {
  height: 45px;
  background-color: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
}
.outer-block-body .dropdown-menu {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px #1219261a, 0 2px 4px -2px #1219261a;
  margin-top: 6px;
  padding: 10px;
}
.outer-block-body .item {
  display: flex;
  gap: 10px;
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 6px;
  cursor: pointer;
}
.outer-block-body .dropdown-item span {
  margin-block: auto;
}
.outer-block-body .block-content li {
  display: flex;
}
.outer-block-body .block-content .action-button {
  cursor: pointer;
  margin-left: auto;
}
</style>
