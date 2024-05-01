<template>
  <div
    class="checkout-form d-flex flex-column justify-content-center align-items-center"
  >
    <h1>Client Info</h1>
    <div class="checkout-group p-3">
      <div class="form-group d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="Phone number (we will call you to confirm the order)"
          v-model="clientInfo.phone"
        />
        <i class="bi bi-asterisk my-auto"></i>
      </div>
      <div class="form-group d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="Full name"
          v-model="clientInfo.fullname"
        />
        <i class="bi bi-asterisk my-auto"></i>
      </div>
      <div class="form-group d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="Address"
          v-model="clientInfo.address"
        />
        <i class="bi bi-asterisk may-auto"></i>
      </div>
      <div class="form-group d-flex gap-2">
        <input
          type="text"
          class="form-control"
          placeholder="City"
          v-model="clientInfo.city"
        />
        <i class="bi bi-asterisk my-auto"></i>
      </div>
      <textarea
        class="form-control"
        placeholder="Leave a comment or question here"
        style="height: 100px; width: 100%"
        v-model="clientInfo.message"
      ></textarea>
      <button class="confirm-btn ms-auto" @click="confirmOrder">Confirm</button>
    </div>
  </div>
</template>
<script setup>
import toastr from "toastr";
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducStore } from "@/stores/product";

const productStore = useProducStore();
const router = useRouter();
const clientInfo = reactive({
  phone: "",
  fullname: "",
  address: "",
  city: "",
  message: "",
});

const confirmOrder = () => {
  // if (
  //   !clientInfo.phone ||
  //   !clientInfo.fullname ||
  //   !clientInfo.address ||
  //   !clientInfo.city
  // ) {
  //   toastr.error(
  //     "Please complete all required fields before proceeding.",
  //     "Attention",
  //     {
  //       positionClass: "toast-top-right",
  //     }
  //   );
  //   return;
  // }

  const orderData = {};

  for (let key in clientInfo) {
    orderData[key] = clientInfo[key];
  }

  // remove productImage field
  const productList = productStore.cartList.map((item) => {
    const { name, price, image, ...rest } = item;
    return { ...rest };
  });
  console.log("productList", productList);
  orderData.productList = productList;

  //total price
  let total = 0;
  productStore.cartList.forEach((item) => {
    total += item.price * item.quantity;
  });

  orderData.total = total;

  console.log("total", orderData.total);

  productStore
    .newOrder(orderData)
    .then((res) => {
      toastr.success("Order is added successFully", "New Order", {
        positionClass: "toast-top-right",
      });
      productStore.cartList = [];
      // Redirect to checkout page
      const queryParam = { id: res._id };
      router.push({ name: "checkoutPage", query: queryParam });
    })
    .catch((error) => {
      console.log(error);
      toastr.error(error, "Server Error!", {
        positionClass: "toast-bottom-left",
      });
    });
};
</script>
<style>
.checkout-form {
  height: 100vh;
}
.checkout-form h1 {
  margin-bottom: 2rem !important;
}
.checkout-group {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background-color: #fafafa;
  border-radius: 3px;
  width: max(800px, 65%);
}
.checkout-group .checkout-heading {
  width: 100%;
}
.checkout-group .form-group {
  font-size: 14px;
  height: 45px;
  width: calc(50% - 1rem);
}
.checkout-group i {
  color: #ff0000;
  font-size: 11px;
}
.checkout-group .confirm-btn {
  color: #fff;
  background-color: #1a1a1a;
  border: none;
  border-radius: 4px;
  padding: 8px 20px;
  font-weight: 500;
}
</style>
