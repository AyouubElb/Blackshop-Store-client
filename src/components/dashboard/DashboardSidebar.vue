<template>
  <nav class="dashboard-sidebar">
    <ul class="menu">
      <li class="store-front">
        <span>Blackshop</span>
      </li>
      <li class="products-submenu-container">
        <span>
          <img
            src="../../assets/icons/product-svgrepo-com.svg"
            loading="lazy"
            alt=""
          />
          Orders
        </span>
        <ul class="sub-menu">
          <li>
            <router-link
              :to="{
                name: 'AllOrdersTable',
              }"
              >All orders
            </router-link>
          </li>
        </ul>
      </li>
      <li class="products-submenu-container">
        <span>
          <img src="../../assets/icons/sales.svg" loading="lazy" alt="" />
          Products
        </span>
        <ul class="sub-menu">
          <li>
            <router-link
              :to="{
                name: 'AllProductsTable',
              }"
              >All products
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                name: 'CreateProductPage',
              }"
              >New product
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                name: 'AllCategoriesTable',
              }"
              >Categories
            </router-link>
          </li>
        </ul>
      </li>
      <li class="products-submenu-container">
        <span>
          <i class="bi bi-shop"></i>
          Store
        </span>
        <ul class="sub-menu">
          <li>
            <router-link
              :to="{
                name: 'MenusPage',
              }"
              >Menus
            </router-link>
          </li>
          <li>
            <router-link
              :to="{
                name: 'AllPagesTable',
              }"
              >Pages
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script setup></script>
<style>
.dashboard-sidebar {
  background-color: #1a1a1a;
  min-width: 240px;
  max-width: 240px;
  height: 100vh;
  position: fixed;
  z-index: 10;
}
.dashboard-sidebar ul {
  margin: 0;
  padding: 0;
}
.dashboard-sidebar ul li {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  cursor: pointer;
  padding: 12px 18px;
}
.dashboard-sidebar ul li:hover {
  background-color: #333333;
}
.dashboard-sidebar ul li span {
  display: flex;
  gap: 14px;
  color: white;
}
.dashboard-sidebar .store-front {
  font-size: 18px !important;
  box-shadow: inset 0 -1px #6b7689;
  padding: 16px 18px !important;
}

.dashboard-sidebar .store-front:hover {
  background-color: #1a1a1a !important;
}

.dashboard-sidebar ul li img {
  width: 24px;
}
.dashboard-sidebar ul li i {
  font-size: 20px;
  color: #9aa4b2;
}

.dashboard-sidebar ul {
  /* background-color: #333333; */
}

.dashboard-sidebar .sub-menu {
  /* display: none; */
}

.dashboard-sidebar .sub-menu li {
  padding: 5px 39px;
}
.dashboard-sidebar .sub-menu li a {
  color: #9aa4b2;
  text-decoration: none;
}
.dashboard-sidebar .sub-menu li a:hover {
  color: white;
}
</style>
