import { defineStore } from "pinia";
import axios from "axios";

export const useProducStore = defineStore("ProductStore", {
  state: () => {
    return {
      API_URL: "https://blackshop-store-api.onrender.com/api",
      catgories: [],
      selectedCategory: {},
      cartList: [],
    };
  },
  getters: {},
  actions: {
    async fetchAllProducts(sortBy, order) {
      try {
        const res = await axios.get(
          `${this.API_URL}/products?sortBy=${sortBy}&order=${order}`
        );
        return res.data.products;
      } catch (error) {
        console.log(error);
      }
    },
    async searchProducts(filters) {
      try {
        const res = await axios.post(
          `${this.API_URL}/products/search-products`,
          { filters: filters }
        );
        return res.data.products;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchProductById(id) {
      try {
        const res = await axios.get(`${this.API_URL}/products/${id}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createProduct(product) {
      try {
        const res = await axios.post(
          `${this.API_URL}/products/create`,
          product
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id) {
      try {
        const res = await axios.delete(`${this.API_URL}/products/delete/${id}`);
        console.log("response", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategories() {
      try {
        const res = await axios.get(`${this.API_URL}/categories`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCategoryById(id) {
      try {
        const res = await axios.get(`${this.API_URL}/categories/${id}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createCategory(category) {
      try {
        const res = await axios.post(
          `${this.API_URL}/categories/create`,
          category
        );
        console.log("Test Category", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCategory(id, category) {
      try {
        const res = await axios.patch(
          `${this.API_URL}/categories/update/${id}`,
          category
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCategory(id) {
      try {
        const res = await axios.delete(
          `${this.API_URL}/categories/delete/${id}`
        );
        console.log("response", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllPages() {
      try {
        const res = await axios.get(`${this.API_URL}/pages`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPageById(id) {
      try {
        const res = await axios.get(`${this.API_URL}/pages/${id}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createPage(page) {
      try {
        const res = await axios.post(`${this.API_URL}/pages/create`, page);
        console.log("Test page", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePage(id, page) {
      try {
        const res = await axios.patch(
          `${this.API_URL}/pages/update/${id}`,
          page
        );
        console.log("upated page: ", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePage(id) {
      try {
        const res = await axios.delete(`${this.API_URL}/pages/delete/${id}`);
        console.log("response", res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllMenus() {
      try {
        const res = await axios.get(`${this.API_URL}/menus`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateMenu(id, menu) {
      try {
        const res = await axios.patch(
          `${this.API_URL}/menus/update/${id}`,
          menu
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async newOrder(orderInfo) {
      try {
        const res = await axios.post(
          `${this.API_URL}/orders/create`,
          orderInfo
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchAllOrders() {
      try {
        const res = await axios.get(`${this.API_URL}/orders`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchOrderById(id) {
      try {
        const res = await axios.get(`${this.API_URL}/orders/${id}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
