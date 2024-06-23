<template>
  <div class="shipping-section-container">
    <div class="shipping-section-header">
      <div class="background-image-holder">
        <img src="../assets/images/shipping-image.webp" alt="" loading="lazy" />
      </div>
      <h1 class="header-title">الشحن والتسليم</h1>
    </div>
    <div class="policy-content-holder">
      <div class="policy-content-paragraph">
        <p class="text">
          بعد تأكيد عملية الشراء، نقوم بشحن وإرسال المنتج عبر الطريقة التي قمتم
          بإختيارها، إما عبر مسؤول الشحن الخاص بنا أو عبر خدمة أمانة إكسبريس.
        </p>
      </div>
      <div class="policy-content-paragraph">
        <h3 class="title">طرق الشحن:</h3>
        <p class="text">
          أمانة إكسبريس: خدمة تضمن لكم تسليم الإرساليات إلى العنوان المطلوب في
          مدة تتراوح بين 3 أيام و 7 أيام نحوالإتجاهات الرئيسية.
        </p>
        <p class="text">
          مسؤول الشحن: متجرنا يتعاقد مع مجموعة من مسؤولي الشحن بمجموعة من المدن
          يقومون بإيصال المنتجات في مدة تتراوح بين يوم و3 أيام
        </p>
      </div>
      <div class="policy-content-paragraph">
        <h3 class="title">سياسة الاستبدال والاسترجاع:</h3>
        <ul>
          <li class="text">
            - الإستبدال والإسترجاع حق مضمون كل عملائنا وهو يشمل جميع المنتجات
            التي نعرضها على متجرنا.
          </li>
          <li class="text">
            - جميع المنتجات المعروضة على متجرنا قابلة لسياسة الإستبدال والإسترجع
            وفق الشروط والأحكام المنصوص عليها في هذه الصحفة.
          </li>
          <li class="text">
            - يمكن الإرجاع أو الإستبدال إذا كان المنتج بنفس حالته الأصلية عند
            الشراء ومغلفا بالغلاف الأصلي.
          </li>
          <li class="text">
            - الاسترجاع خلال ثلاثة (3) أيام والاستبدال خلال سبعة (7) أيام من
            تاريخ الشراء.
          </li>
          <li class="text">
            - يرجى التواصل معنا عبر صفحة اتصل بنا أو عبر أرقامنا الهاتفية من أجل
            طلب الإسترجاع أو الإستبدال.
          </li>
          <li class="text">
            - يرجى تصوير المنتج وإرساله مع تحديد المدينة والعنوان ورقم الطلب
            ليتم إستبداله بمنتج اخر في حالة كان المنتج فاسدا أو به عيب معين، أو
            لا يستغل وفق المتفق عليه.
          </li>
          <li class="text">
            - يتم إسترجاع المبلغ للعميل كاملا في حالة كان المنتج الذي توصل به
            مختلف تماما مع وصف المنتج في صفحة المنتج بموقعنا.
          </li>
          <li class="text">
            - لسنا مسؤولين عن أي توقعات لإستعمال المنتجات من طرف العميل لم
            نذكرها بصفحة المنتج بموقعنا.
          </li>
          <li class="text">
            - تخصم 30 بالمائة أو قيمة لا تقل عن 25 درهما إذا كان العميل لا يريد
            المنتج وليس به عيب ولا أي مشكل يذكر.
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Footer from "../components/Footer.vue";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();

const pageInfo = ref();

onMounted(() => {
  const route = useRoute();
  const pageId = route.query.id;
  productStore.fetchPageById(pageId).then((res) => {
    pageInfo.value = res;
  });
});
</script>
<style>
.shipping-section-container {
  background-color: #fff;
  overflow: hidden;
}
.shipping-section-header {
  position: relative;
}
.background-image-holder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.shipping-section-header .header-title {
  position: absolute;
  z-index: 2;
  bottom: 15%;
  right: 5%;
  color: #fff;
  font-size: 4rem;
  line-height: 1.2;
  z-index: 2;
}
.policy-content-holder {
  display: flex;
  flex-direction: column;
  justify-content: end;
  max-width: 1000px;
  margin-inline: auto;
  padding: 5em 2em;
}
.policy-content-paragraph {
  direction: rtl;
}
.policy-content-paragraph .title {
  font-size: 36px;
  font-weight: 400;
  line-height: 1.2;
  margin-block: 20px;
}
.policy-content-paragraph .text {
  letter-spacing: 0.7px;
  margin-bottom: 10px;
  line-height: 1.4;
}
</style>
