<template>
  <div class="address-section">
    <div class="sale-badge-container">
      <div class="sale-circle">
        <img src="../../assets/icons/cercleIcon.svg" loading="lazy" alt="" />
      </div>
      <div class="b-icon">
        <img src="../../assets/icons/b2-icon.svg" loading="lazy" alt="" />
      </div>
    </div>
    <div class="section-content">
      <h2 class="section-text">Find out about the sales at your local shop</h2>
      <button>Find Shops Near You</button>
    </div>
  </div>
</template>
<script setup></script>
<style>
.address-section {
  background-color: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  padding: 8rem 2rem;
  position: relative;
}
.address-section::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #1a1a1a;
  transform: rotate(1deg);
}
.sale-badge-container {
  position: relative;
  margin-bottom: auto;
}
.sale-circle img {
  animation: cercle-icon-rotate 8s linear infinite;
}
@keyframes cercle-icon-rotate {
  from {
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  }
  to {
    transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
      rotateY(0deg) rotateZ(360deg) skew(0deg, 0deg);
  }
}
.b-icon img {
  position: absolute;
  top: 0;
}
.section-content {
  max-width: 700px;
  letter-spacing: 1.5px;
}
.section-text {
  color: #fff;
  font-size: 4rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 2rem;
}
.section-content button {
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 18px 32px;
  cursor: pointer;
  transition: background-color 0.5s;
}
.section-content button:hover {
  background-color: #999999;
}

/* Media queries */
@media only screen and (max-width: 992px) {
  .address-section {
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    padding: 6rem 2rem;
  }
  .sale-badge-container {
    width: 120px;
    margin-right: auto;
  }
  .section-text {
    font-size: 2.5rem;
  }
  .section-content button {
    font-size: 14px;
    padding: 14px 28px;
  }
}
@media only screen and (max-width: 768px) {
  .section-text {
    font-size: 2.125rem;
  }
}
@media only screen and (max-width: 480px) {
  .section-text {
    font-size: 1.75rem;
  }
}
</style>
