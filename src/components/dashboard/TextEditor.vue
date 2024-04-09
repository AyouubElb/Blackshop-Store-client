<template>
  <div class="text-editor-container">
    <div class="control-section">
      <div class="sample-container">
        <div class="default-section">
          <ejs-richtexteditor
            height="300px"
            id="default"
            ref="rteInstance"
            v-model="description"
            @change="editDesc"
          ></ejs-richtexteditor>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar,
  Link,
  Image,
  HtmlEditor,
} from "@syncfusion/ej2-vue-richtexteditor";
import { provide, ref, watchEffect } from "vue";

const rteInstance = ref(null);
const description = ref("");

const props = defineProps({
  pageDesc: String,
});

watchEffect(() => {
  description.value = props.pageDesc;
});

const richtexteditor = [Toolbar, Link, Image, HtmlEditor];
provide("richtexteditor", richtexteditor);

const emit = defineEmits(["editDesc"]);
const editDesc = () => {
  emit("editDesc", description.value);
};
</script>
<style>
.text-editor-container {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}
/**************************/
</style>
