<template>
  <div class="dashboard-view-container" style="margin-bottom: 300px">
    <h2 class="dashboard-view-header">Create Product</h2>
    <div class="dashboard-view-content">
      <div class="outer-block">
        <div class="outer-block-body">
          <form class="form-group d-flex mb-3">
            <label for="name">Name</label>
            <input
              class="form-control me-2"
              type="text"
              id="name"
              aria-label="name"
              v-model="productName"
            />
          </form>
          <TextEditor @editDesc="addDescription" />
        </div>
      </div>
      <div class="outer-block">
        <div class="outer-block-header">
          <h2>Pricing</h2>
        </div>
        <div class="outer-block-body pricing-block">
          <div class="form-group">
            <label for="price">Price</label>
            <input type="number" id="price" v-model="productPrice" />
          </div>
          <div class="form-group">
            <label for="compare-at-price">Compare at price</label>
            <input
              type="number"
              id="compare-at-price"
              v-model="productComparePrice"
            />
          </div>
        </div>
      </div>
      <div class="outer-block">
        <div class="outer-block-header">
          <h2>Images</h2>
          <button class="btn btn-dark outer-block-action" @click="uploadImage">
            <i class="bi bi-image"></i>
            <span>Upload Images</span>
          </button>
        </div>
        <div class="outer-block-body">
          <div class="product-images">
            <ul v-if="imageList">
              <li v-for="(image, index) in imageList" :key="index">
                <img :src="image.url" alt="" loading="lazy" />
                <div class="image-mouse-over">
                  <i class="bi bi-trash"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="outer-block">
        <div class="outer-block-header">
          <h2>Variantes</h2>
        </div>
        <div class="outer-block-body">
          <div class="variants-container">
            <div class="variants-opions-block">
              <div class="form-group">
                <label for="color">Option</label>
                <input type="Text" value="Color" id="color" readonly />
              </div>
              <div class="form-group">
                <label for="color-value">Value</label>
                <div class="variants-block">
                  <ul class="variants-options" v-if="selectedColors">
                    <li v-for="(color, index) in selectedColors" :key="index">
                      <span>{{ color }}</span>
                      <span class="delete-variant" @click="deleteColor(index)">
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </li>
                  </ul>
                  <textarea
                    id="color-value"
                    v-model="colorValue"
                    @keyup.enter="addColorValue"
                  ></textarea>
                </div>
              </div>
            </div>
            <div
              class="variants-opions-block grid-3"
              v-if="selectedColors.length > 0"
            >
              <div
                class="image-variants"
                v-for="(color, index) in selectedColors"
                :key="index"
              >
                <!-- Button trigger modal -->
                <div
                  class="thumbnail"
                  data-bs-toggle="modal"
                  :data-bs-target="'#selectImage' + index"
                  @click="selectedColor = color"
                >
                  <img
                    :src="thumbnailUrl(color)"
                    :alt="color"
                    loading="lazy"
                    v-if="thumbnailUrl(color)"
                  />
                  <i class="bi bi-camera-fill" v-else></i>
                </div>
                <!-- <imageModal
                  :images="imageList"
                  :color="color"
                  @savingImage="handleSavingImage"
                /> -->
                <!-- Modal Start -->
                <div
                  class="modal fade"
                  :id="'selectImage' + index"
                  tabindex="-1"
                  aria-labelledby="selectImageLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="selectImageLabel">
                          Modal title
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="grid-6">
                          <div
                            class="variant-image"
                            :class="{ selected: index === selectedImageIndex }"
                            v-for="(image, index) in imageList"
                            :key="index"
                            @click="selectedImageIndex = index"
                          >
                            <img :src="image.url" loading="lazy" alt="" />
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                          @click="selectedColor = null"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-dark"
                          @click="saveImage(color)"
                        >
                          Save Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Modal End -->
                <span>{{ color }}</span>
              </div>
            </div>

            <div class="variants-opions-block">
              <div class="form-group">
                <label for="size">Option</label>
                <input type="Text" value="Size" id="color" readonly />
              </div>
              <div class="form-group">
                <label for="size-value">Value</label>
                <div class="variants-block">
                  <ul class="variants-options" v-if="selectedSizes">
                    <li v-for="(size, index) in selectedSizes" :key="index">
                      <span>{{ size }}</span>
                      <span class="delete-variant" @click="deleteSize(index)">
                        <i class="bi bi-x-lg"></i>
                      </span>
                    </li>
                  </ul>
                  <textarea
                    id="size-value"
                    v-model="sizeValue"
                    @keyup.enter="addSizeValue"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="outer-block">
        <div class="outer-block-header">
          <h2>Relative Products</h2>
        </div>
        <div class="outer-block-body">
          <div class="outer-block">
            <div class="outer-block-header">
              <h2>Add Relative Products</h2>
            </div>
            <div class="outer-block-body">
              <form class="d-flex" role="search">
                <input
                  class="form-control px-3 py-2 me-2 mb-3"
                  type="search"
                  placeholder="Search product"
                  aria-label="Search"
                  data-bs-toggle="dropdown"
                />
                <ul class="dropdown-menu">
                  <li
                    class="dropdown-item item"
                    v-for="(product, index) in productList"
                    :key="index"
                    @click="addRelativeProduct(index)"
                  >
                    <div class="item-thumb">
                      <img
                        :src="product.images[0].file"
                        :alt="product.name"
                        loading="lazy"
                      />
                    </div>
                    <span>{{ product.name }}</span>
                  </li>
                </ul>
              </form>
              <ul
                class="selected-relative-products grid-2 p-0"
                v-if="relativeProductList.length > 0"
              >
                <li
                  class="item"
                  v-for="(relProduct, index) in relativeProductList"
                  :key="index"
                >
                  <div class="item-thumb">
                    <img
                      :src="relProduct.images[0].file"
                      :alt="relProduct.name"
                      loading="lazy"
                    />
                  </div>
                  <span>{{ relProduct.name }}</span>
                  <div
                    class="close-button my-auto"
                    @click="removeRelProduct(index)"
                  >
                    <i class="bi bi-x-circle"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="outer-block">
        <div class="outer-block-header">
          <h2>Categories</h2>
        </div>
        <div class="outer-block-body">
          <div class="outer-block">
            <div class="outer-block-header">
              <h2>Add Categories</h2>
            </div>
            <div class="outer-block-body">
              <form class="d-flex" role="search">
                <input
                  class="form-control px-3 py-2 me-2 mb-3"
                  type="search"
                  placeholder="Search category"
                  aria-label="Search"
                  data-bs-toggle="dropdown"
                />
                <ul class="dropdown-menu">
                  <li
                    class="dropdown-item item"
                    v-for="(category, index) in categoryList"
                    :key="index"
                    @click="addCategory(index)"
                  >
                    <div class="item-thumb">
                      <AdvancedImage
                        :cldImg="category.image"
                        :alt="category.name"
                        loading="lazy"
                      />
                    </div>
                    <span>{{ category.name }}</span>
                  </li>
                </ul>
              </form>
              <ul
                class="selected-relative-products grid-2 p-0"
                v-if="selectedCategories.length > 0"
              >
                <li
                  class="item"
                  v-for="(category, index) in selectedCategories"
                  :key="index"
                >
                  <div class="item-thumb">
                    <AdvancedImage
                      :cldImg="category.image"
                      :alt="category.name"
                      loading="lazy"
                    />
                  </div>
                  <span>{{ category.name }}</span>
                  <div
                    class="close-button my-auto"
                    @click="removeCategory(index)"
                  >
                    <i class="bi bi-x-circle"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <button class="btn btn-dark my-auto" @click="saveProduct">
        <i class="bi bi-floppy"></i>
        <span>Save Product</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import TextEditor from "@/components/dashboard/TextEditor.vue";
import imageModal from "@/components/dashboard/imageModal.vue";
import toastr from "toastr";
import { ref, reactive, onMounted } from "vue";
import { AdvancedImage } from "@cloudinary/vue";
import { Cloudinary } from "@cloudinary/url-gen";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const productList = reactive([]);
const categoryList = reactive([]);
const imageList = reactive([]);

const fileInput = ref(null);
const selectedColors = reactive([]);
const colorValue = ref(null);
const sizeValue = ref(null);
const selectedImageIndex = ref(null);

const productName = ref(null);
const productDescription = ref(null);
const productPrice = ref(null);
const productComparePrice = ref(null);
const selectedSizes = reactive([]);
const selectedImages = reactive([]);
const selectedCategories = reactive([]);
const relativeProductList = reactive([]);

onMounted(() => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dxupeynms",
    },
  });
  // fetch products
  let sortBy = "";
  let order = "";
  productStore.fetchAllProducts(sortBy, order).then((res) => {
    const data = res.map((value) => {
      value.images[0].file = `https://blackshop-store-api.onrender.com/Images/${value.images[0].file}`;
      return value;
    });
    productList.splice(0, productList.length, ...data);
  });

  // fetch categories
  productStore.fetchCategories().then((res) => {
    const data = res.map((value) => {
      value.image = cld
        .image(value.cloudinary_id)
        .format("auto")
        .quality("auto");
      return value;
    });

    categoryList.splice(0, categoryList.length, ...data);
  });
});

const uploadImage = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.name = "images";
  input.onchange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    imageList.push({ imageInfo: file, url: imageUrl });
  };
  input.click();
};

const addColorValue = () => {
  if (colorValue.value) {
    selectedColors.push(colorValue.value);
    colorValue.value = null;
  }
};

const addSizeValue = () => {
  if (sizeValue.value) {
    selectedSizes.push(sizeValue.value);
    sizeValue.value = null;
  }
};

const saveImage = (color) => {
  if (imageList[selectedImageIndex.value]) {
    imageList[selectedImageIndex.value].color = color;
  } else {
    console.error("Error: imageList[selectedImageIndex] is undefined");
  }
};

const thumbnailUrl = (color) => {
  const image = imageList.find((value) => value.color === color);
  if (image) return image.url;
  return null;
};

const deleteColor = (index) => {
  selectedColors.splice(index, 1);
};
const deleteSize = (index) => {
  selectedSizes.splice(index, 1);
};

const addRelativeProduct = (index) => {
  const product = productList[index];
  if (!relativeProductList.includes(product)) {
    relativeProductList.push(product);
  }
};

const removeRelProduct = (index) => {
  relativeProductList.splice(index, 1);
};

const addCategory = (index) => {
  const category = categoryList[index];
  if (!selectedCategories.includes(category)) {
    selectedCategories.push(category);
  }
};

const removeCategory = (index) => {
  selectedCategories.splice(index, 1);
};

const addDescription = (description) => {
  productDescription.value = description;
};

const saveProduct = () => {
  const images = imageList.map((elem) => elem.imageInfo);
  const colors = imageList.map((elem) => elem.color);
  const categories = selectedCategories.map((elem) => elem._id);
  const relativeProducts = relativeProductList.map((elem) => elem._id);

  const formData = new FormData();
  formData.append("name", productName.value);
  formData.append("description", productDescription.value);
  formData.append("price", productPrice.value);
  formData.append("comparePrice", productComparePrice.value);
  formData.append("sizes", selectedSizes);
  formData.append("colors", colors);
  formData.append("categories", categories);
  formData.append("relativeProducts", relativeProducts);
  images.forEach((image) => {
    formData.append("images", image);
  });

  productStore.createProduct(formData).then(() => {
    toastr.success("Product is created successFully", "New Product", {
      positionClass: "toast-top-right",
    });
  });
};
</script>
<style>
.pricing-block {
  display: flex;
  gap: 1rem;
}
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
.outer-block-action {
  display: flex;
  gap: 10px;
  margin-left: auto;
  padding: 8px 20px;
}
.product-images ul {
  grid-gap: 10px;
  align-items: stretch;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: stretch;
}
.product-images ul li {
  position: relative;
}
.product-images ul li:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
.image-mouse-over {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: none;
}
.image-mouse-over:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.image-mouse-over li {
  background-color: #fcfcfc;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
}
.variants-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e3e8ef;
  border-radius: 12px;
  padding: 20px;
}
.variants-opions-block {
  display: flex;
  gap: 1rem;
  background-color: #fcfcfc;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 20px;
}
.variants-block {
  display: flex;
  width: 100%;
  min-height: 50px;
  background-color: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  padding: 8px 16px;
}
.variants-options {
  align-items: center;
  color: #121926;
  display: flex;
  gap: 8px;
  padding: 0 !important;
}
.variants-options li {
  background-color: #fceef5;
  border: 1px solid #eda6c9;
  border-radius: 4px;
  padding: 4px 10px;
}
.variants-block textarea {
  border: none;
}

.variants-options li .delete-variant {
  color: #697586;
  font-size: 14px;
  cursor: pointer;
  margin-left: 5px;
}
.variants-opions-block .image-variants {
  display: flex;
  gap: 1rem;
  background-color: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 8px;
  padding: 8px;
}
.variants-opions-block .image-variants .thumbnail {
  cursor: pointer;
}
.variants-opions-block .image-variants .thumbnail i {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  border: 1px solid #e3e8ef;
  padding: 0.5rem 1rem;
  font-size: 1.75rem;
  border-radius: 4px;
}
.variants-opions-block .image-variants .thumbnail img {
  width: 70px;
  height: 70px;
  border-radius: 4px;
}
.variants-opions-block .image-variants span {
  margin-block: auto;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
.outer-block-body .item .item-thumb {
  width: 40px;
  height: 40px;
}
.outer-block-body .dropdown-item span {
  margin-block: auto;
}
.outer-block-body .close-button {
  margin-left: auto;
}
.outer-block-body .close-button i {
  color: #697586;
  font-size: 1.5rem;
  cursor: pointer;
}
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
