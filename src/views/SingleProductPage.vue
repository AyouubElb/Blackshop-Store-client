<template>
  <div class="product-container" v-if="productInfo">
    <div class="product-section-container">
      <div
        class="product-detail-container"
        data-aos="fade-up"
        data-aos-duration="750"
      >
        <div class="category-text">Hoodies -</div>
        <div class="product-name-text">{{ productInfo.name }}</div>
        <h4 class="product-price-text">MAD {{ productInfo.price }}</h4>
        <div class="option">
          <label class="category-text-gold">اللون المختار</label>
          <div class="option-item">
            <div
              class="option-color-img"
              :class="{ 'active-img': activeIndex === index }"
              v-for="(image, index) in productInfo.images"
              :key="index"
              @click="selectColor(index)"
            >
              <img :src="image.file" :alt="image.color" />
            </div>
          </div>
        </div>
        <div class="option">
          <label class="category-text-gold">المقاسات</label>
          <div class="option-item">
            <div v-for="(size, index) in productInfo.sizes" :key="index">
              <button
                :class="{ active: activeSize == size }"
                @click="activeSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>
        </div>
        <div class="checkout-form">
          <div class="checkout-group mb-3">
            <h2 class="checkout-heading">معلومات الزبون</h2>
            <input
              type="email"
              class="form-control"
              placeholder="رقم الهاتف (سنتصل بك لتأكيد الطلب)"
              v-model="clientInfo.phone"
            />
            <input
              type="email"
              class="form-control"
              placeholder="اسم كامل"
              v-model="clientInfo.fullname"
            />
            <input
              type="email"
              class="form-control"
              placeholder="العنوان"
              v-model="clientInfo.address"
            />
            <input
              type="email"
              class="form-control"
              placeholder="المدينة"
              v-model="clientInfo.city"
            />
            <input
              type="email"
              class="form-control"
              placeholder="اترك لنا تعليق أو استفسار"
              v-model="clientInfo.review"
            />
          </div>
        </div>
        <div class="quantity-add-btn-container">
          <button class="add-to-cart-btn" @click="orderProduct">
            <!-- <i class="bi bi-cart2"></i> -->
            <span>إشتري الآن </span>
          </button>
          <div class="option">
            <label class="category-text-gold">كمية</label>
            <div class="quantity-input">
              <input type="number" v-model="productQuantity" min="1" />
            </div>
          </div>
        </div>
      </div>
      <div class="product-hero" data-aos="fade-up" data-aos-duration="500">
        <img :src="mainImage" :alt="productInfo.name" />
      </div>
    </div>
    <div
      class="description-section-container"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h4>معلومات المنتج</h4>
      <div class="desc-review-content">
        <p v-html="productInfo.description"></p>
      </div>
    </div>
    <div class="divider"></div>
    <!-- <div class="reviews-section-container">
      <div class="reviews-header">
        <h4 class="title">Reviews</h4>
        <h4 class="reviews-counter">
          4.8
          <i class="bi bi-star-fill"></i>
        </h4>
        <div class="slider-btn" @click="leftSlide">
          <i class="bi bi-chevron-left"></i>
        </div>
        <div class="slider-btn" @click="rightSlide">
          <i class="bi bi-chevron-right"></i>
        </div>
      </div>
      <div class="reviews-slider">
        <div class="slider">
          <div
            class="review-card"
            v-for="(review, index) in reviews"
            :key="index"
            ref="cardSlider"
          >
            <div class="review-card-content">
              <div class="review-card-header">
                <div class="name">{{ review.name }}</div>
                <div class="score">
                  {{ review.score }}<i class="bi bi-star-fill"></i>
                </div>
              </div>
              <div class="desc-review-content">
                <p>{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="related-Prod-section-container">
      <h4>المنتجات المشابهة</h4>
      <ProductsHolder
        :products="productInfo.relativeProducts"
        data-aos="fade-up"
        data-aos-duration="1000"
      />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Footer from "@/components/Footer.vue";
import ProductsHolder from "@/components/ProductsHolder.vue";
import checkoutModal from "@/components/checkoutModal.vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const router = useRouter();

const mainImage = ref();
const activeIndex = ref(0);
const productInfo = ref();
const activeSize = ref(null);
const productQuantity = ref(1);

const clientInfo = reactive({
  fullname: "",
  phone: "",
  city: "",
  address: "",
  review: "",
});

// const rules = reactive({
//   fullname: { required },
//   phone: { required },
//   city: { required },
//   address: { required },
//   review: { required },
// });

// const v$ = useVuelidate(rules, clientInfo);

const orderProduct = () => {
  // v$.$validate();
  // if (!v$.$error) {
  //   alert("form submitted successfully !");
  // } else {
  //   alert("form validation failed !");
  // }

  const orderData = {};

  for (let key in clientInfo) {
    orderData[key] = clientInfo[key];
  }

  orderData.product = productInfo.value._id;

  const color = productInfo.value.images[activeIndex.value].color;
  orderData.color = color;

  orderData.size = activeSize.value;

  orderData.quantity = productQuantity.value;

  productStore.newOrder(orderData).then((res) => {
    console.log("order info", res);
    // Redirect to checkout page
    const queryParam = { id: res._id };
    router.push({ name: "checkoutPage", query: queryParam });
  });
};

onMounted(() => {
  const route = useRoute();
  const productId = route.query.id;

  productStore.fetchProductById(productId).then((res) => {
    productInfo.value = res;

    productInfo.value.images = newImageUrl(productInfo.value.images);
    mainImage.value = productInfo.value.images[0].file;

    const sizes = productInfo.value.sizes[0];
    productInfo.value.sizes = sizes.split(",");

    productInfo.value.relativeProducts.forEach((product) => {
      product.images = newImageUrl(product.images);
    });
  });

  const newImageUrl = (images) => {
    const newImages = images.map((image) => {
      image.file = `http://localhost:8000/Images/${image.file}`;
      return image;
    });
    return newImages;
  };
});

const selectColor = (index) => {
  activeIndex.value = index;
  mainImage.value = productInfo.value.images[index].file;
};

/********************************************** */
const cardSlider = ref(null);
const currentTranslateX = ref(0);

const leftSlideStyle = ref({
  animation: "slideLeft 0.5s forwards linear",
});

const leftSlide = () => {
  currentTranslateX.value -= 500;

  cardSlider.value.forEach((card) => {
    card.style.setProperty("animation", "none");
    card.style.setProperty(
      "--translate-x-value",
      `${currentTranslateX.value}px`
    );
    card.style.setProperty("animation", leftSlideStyle.value.animation);
  });
};

const rightSlideStyle = ref({
  animation: "slideRight 0.5s forwards linear",
});

const rightSlide = () => {
  currentTranslateX.value += 500;

  cardSlider.value.forEach((card) => {
    card.style.setProperty("animation", "none");
    card.style.setProperty(
      "--translate-x-value",
      `${currentTranslateX.value}px`
    );
    card.style.setProperty("animation", rightSlideStyle.value.animation);
  });
};
</script>
<style>
.product-container {
  background-color: #fff;
  overflow: hidden;
}
.product-section-container {
  display: grid;
  grid-column-gap: 80px;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 6rem 3.5rem 0;
}
.product-detail-container {
  grid-column: 1 / span 3;
  display: flex;
  flex-direction: column;
  text-align: end;
}
.product-hero {
  grid-column: 4 / span 3;
}
.product-detail-container .category-text {
  color: #bf8c4e;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.product-detail-container .product-name-text {
  font-size: 1.25rem;
  font-weight: 500;
}
.product-detail-container .product-price-text {
  font-family: "Rubik", sans-serif;
  color: #bf8c4e;
  font-size: 26px;
  font-weight: 300;
  line-height: 1.2;
  margin: 4px 0px 20px;
}
.product-detail-container .option {
  margin-bottom: 1.5rem;
  margin-left: auto;
}
.option .category-text-gold {
  font-family: "Rubik", sans-serif;
  color: #bf8c4e;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
}
.checkout-group {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  column-gap: 1rem;
}
.checkout-group .checkout-heading {
  font-size: 15px;
  font-weight: 500;
  width: 100%;
}
.checkout-group .form-control {
  font-size: 14px;
  height: 45px;
  text-align: end;
  width: calc(50% - 0.5rem);
  margin: 0 0 15px;
}
.checkout-group .form-control:last-of-type {
  width: 100%;
}
.option .option-item {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}
.option .option-item .option-color-img img {
  width: 73px;
  height: 70px;
  border-radius: 4px;
  cursor: pointer;
}
.option .option-item .active-img {
  border: #bf8c4e solid 2px;
  border-radius: 4px;
}
.option .option-item button {
  background-color: #e6e6e6;
  color: #666;
  border: 1px #e6e6e6 solid;
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 1rem;
  cursor: pointer;
}
.option .option-item .active {
  background-color: #bf8c4e;
  color: #fff;
}
.quantity-input {
  margin-top: 5px;
}
.quantity-input input {
  width: 120px;
  height: 45px;
  background-color: #ececec;
  border-style: none;
  border-radius: 4px;
  padding: 14px 18px;
  font-size: 16px;
}
.quantity-add-btn-container {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.add-to-cart-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
  width: -webkit-fill-available;
  height: fit-content;
  font-family: "Rubik", sans-serif;
  color: #fff;
  background-color: #1a1a1a;
  border: none;
  border-radius: 4px;
  padding: 10px 32px;
  font-weight: 500;
  text-transform: uppercase;
  margin-block: auto;
  transition: background-color 0.5s;
}
.add-to-cart-btn:hover {
  background-color: #bf8c4e;
}
.add-to-cart-btn i {
  font-size: 22px;
}
.add-to-cart-btn span {
  margin-top: auto;
  margin-bottom: auto;
}
.description-section-container {
  font-family: "Rubik", sans-serif;
  text-align: end;
  padding: 4rem 3.5rem;
}
.product-container h4 {
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  margin: 10px 0 2.5rem;
}
.desc-review-content p {
  color: #888;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1.4;
  width: 90%;
}
.divider {
  width: 100%;
  height: 2px;
  background-color: #ececec;
}
.related-Prod-section-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 7.1rem 5rem;
  background-color: #e3e0dd;
}
.reviews-section-container {
  padding: 6rem 3.5rem;
}
.reviews-header {
  display: flex;
}
.reviews-counter {
  display: flex;
  margin-inline: auto !important;
}
.bi-star-fill {
  color: #ff9404;
  font-size: 1rem;
  margin: auto 0;
  margin-left: 6px;
}
.slider-btn {
  background-color: #ececec;
  border-radius: 4px;
  color: #888;
  display: flex;
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.slider-btn:last-child {
  margin-left: 12px;
}
.slider-btn i {
  margin: auto;
}
.bi::before {
  font-weight: bold !important;
}
.reviews-slider {
  /* overflow: hidden;
  max-width: 100%; */
}
.slider {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
}
@keyframes slideLeft {
  to {
    transform: translateX(var(--translate-x-value));
  }
}

@keyframes slideRight {
  to {
    transform: translateX(var(--translate-x-value));
  }
}
.review-card {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.review-card-content {
  width: 430px;
}
.review-card-header {
  display: flex;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.7px;
  margin-bottom: 10px;
  line-height: 1.4;
}
.review-card-header .score {
  margin-left: auto;
}
</style>
