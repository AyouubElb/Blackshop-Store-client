<template>
  <div class="footer">
    <div class="infinite-loop-banner">
      <div class="infinite-loop-handler">
        <div class="infinite-loop-item" v-for="index in 5" :key="index">
          <div class="infinite-logo">B</div>
          <div class="infinite-point">
            <i class="bi bi-circle-fill"></i>
          </div>
          <div class="infinite-text">BlackShop</div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <div class="overlay-image">
        <div class="overlay"></div>
        <div class="image">
          <img src="../assets/images/footer-image.jpg" loading="lazy" alt="" />
        </div>
      </div>
      <div
        class="footer-text-container"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div class="footer-text-col">
          <div class="footer-text-title">Categories</div>
          <ul class="footer-link-block p-0">
            <li
              class="link"
              v-for="(category, index) in categoryList"
              :key="index"
            >
              <router-link
                :to="{
                  name: 'ProductsPage',
                  params: { id: category.name.split(' ').join('-') },
                }"
                @click="productStore.selectedCategory = category"
              >
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div
          class="footer-text-col"
          v-for="(menu, parentIndex) in menuList"
          :key="parentIndex"
        >
          <div class="footer-text-title">{{ menu.name }}</div>
          <ul class="footer-link-block p-0">
            <li
              class="link"
              v-for="(link, childIndex) in menu.links"
              :key="childIndex"
            >
              <router-link
                :to="{
                  name: 'InfoPage',
                  params: { path: link.slug },
                  query: { id: link._id },
                }"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-text-col">
          <div class="footer-text-title"></div>
          <ul class="footer-link-block p-0">
            <li class="link">
              <img src="../assets/icons/facebook.svg" loading="lazy" alt="" />
            </li>
            <li class="link">
              <img src="../assets/icons/instagram.svg" loading="lazy" alt="" />
            </li>
            <li class="link">
              <img src="../assets/icons/twitterx.svg" loading="lazy" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onBeforeMount } from "vue";
import { useProducStore } from "@/stores/product";
const productStore = useProducStore();

const categoryList = reactive([]);
const menuList = reactive([]);

onBeforeMount(async () => {
  // fetch categories
  const categories = await productStore.fetchCategories();
  categoryList.splice(0, categoryList.length, ...categories);

  // fetch menus
  const menus = await productStore.fetchAllMenus();
  menuList.splice(0, menuList.length, ...menus);
});
</script>
<style>
.infinite-loop-banner {
  background-color: #e4e1de;
  transform: rotate(1deg);
  overflow: hidden;
  padding-block: 8px;
  position: absolute;
  z-index: 2;
  margin-top: -20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.6);
}
.infinite-loop-handler {
  display: flex;
  flex-wrap: nowrap;
  width: 98.89vw;
  animation: infiniteAnimation 20s forwards linear infinite;
}
@keyframes infiniteAnimation {
  to {
    transform: translate(-50%);
  }
}
.infinite-loop-item {
  display: flex;
  gap: 35px;
  margin-right: 35px;
  margin-block: auto;
}
.infinite-logo {
  font-size: 2rem;
  font-weight: 600;
  border: 2px black solid;
  padding: 2px 8px;
}

.infinite-point {
  font-size: 12px;
}

.infinite-text,
.infinite-logo,
.infinite-point {
  margin-block: auto;
}
.infinite-text {
  font-size: 2rem;
  font-weight: 400;
  text-transform: uppercase;
  line-height: 1.2;
  letter-spacing: 2px;
}
.footer-container {
  background-color: #1a1a1a;
  display: flex;
  position: relative;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
}
.footer-container .image {
  max-width: 450px;
  max-height: 91vh;
}
.footer-container .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.footer-text-container {
  padding-left: 4rem;
  grid-column-gap: 70px;
  grid-row-gap: 30px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 0.5fr;
  grid-auto-columns: 1fr;
  justify-content: space-between;
  display: grid;
  margin-block: auto;
  margin-top: 8rem;
}
.footer-text-col {
  margin-bottom: auto;
}
.footer-text-title {
  color: white;
  font-size: 18px;
  margin-bottom: 20px;
}
.footer-link-block {
  display: flex;
  flex-direction: column;
}
.footer-link-block .link {
  cursor: pointer;
  margin-bottom: 8px;
  width: max-content;
}
.footer-link-block .link a {
  color: #888;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1.5px;
  text-decoration: none;
}
.footer-link-block .link a:hover {
  color: #fff;
}
.footer-link-block .link img {
  width: 30px;
}
/* Media queries */
@media only screen and (max-width: 768px) {
  .infinite-text,
  .infinite-logo {
    font-size: 1.5rem;
  }
  .footer-container {
    flex-direction: column;
  }
}
</style>
