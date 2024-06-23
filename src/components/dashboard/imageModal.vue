<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="selectImageLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="selectImageLabel">Modal title</h1>
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
              v-for="(image, index) in images"
              :key="index"
              @click="selectImage(index)"
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
            @click="closeModal"
          >
            Close
          </button>
          <button type="button" class="btn btn-dark" @click="saveImage">
            Save Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, toRefs, onMounted } from "vue";
const props = defineProps({
  props: {
    images: Array,
    color: String,
    modalId: String,
  },
});
const { images, color } = toRefs(props);
const emit = defineEmits(["savingImage"]);

const selectedImageIndex = ref(null);

const selectImage = (index) => {
  if (selectedImageIndex.value !== index) {
    selectedImageIndex.value = index;
  }
};

const saveImage = () => {
  emit("savingImage", selectedImageIndex.value, color);
};

const closeModal = () => {
  selectedImageIndex.value = null;
};

onMounted(() => {
  // Load Bootstrap JavaScript file after the component is mounted
  const script = document.createElement("script");
  script.src = "path/to/bootstrap.min.js";
  document.body.appendChild(script);
});
</script>
<style>
.modal-body .grid-6 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.selected {
  border: 2px solid #00ff40;
}
</style>
