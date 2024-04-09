<template>
  <div class="hero-container">
    <div class="hero-text-container">
      <h1 class="hero-text">
        <span> GET</span>
        <span>YOURSELF</span>
        <div class="white">
          <span>INTO THE</span>
          <span>RIGHT GEAR</span>
        </div>
      </h1>
    </div>
    <div class="hero-image-decor"></div>
    <div class="hero-image">
      <img src="../../assets/images/hero-image.jpg" alt="hero image" />
    </div>
  </div>
</template>
<script setup></script>
<style>
.hero-container {
  position: relative;
  display: flex;
  height: 100vh;
  margin-bottom: 5rem;
}
.hero-text-container {
  position: absolute;
  top: 25%;
  left: 10%;
  width: 650px;
}
.hero-text {
  font-size: 90px;
  font-weight: 700;
  line-height: 1;
  /* position: absolute;
  z-index: 5; */
}
.hero-text span {
  display: inline-block;

  transform-style: preserve-3d;
  /* transform-origin: 0 100%; */
  animation: rotateText 2s;
}

@keyframes rotateText {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
.hero-text .white {
  color: white;
}
.hero-image-decor {
  width: 140px;
  height: 140px;
  backdrop-filter: blur(10px);
  background-color: rgba(191, 140, 78, 0.4);
  border-radius: 4px;
  position: absolute;
  top: auto;
  bottom: -90px;
  left: auto;
  right: 38%;
  z-index: 100;
  animation: decorTransition 1.5s;
}
@keyframes decorTransition {
  0% {
    right: 100%;
  }
  100% {
    right: 38%;
  }
}
.hero-image {
  /* margin-left: auto; */
  position: absolute;
  right: 0;
}
.hero-image img {
  width: 600px;
  transform: translate3d(0%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
    rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  height: 100vh;
  object-fit: cover;
  object-position: 100% 50%;
  animation: changeWidth 1s;
}

@keyframes changeWidth {
  from {
    width: 1400px;
  }
  to {
    width: 600px;
  }
}
</style>
