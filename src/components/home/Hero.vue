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
    <div class="hero-image">
      <div class="hero-image-decor"></div>
      <img
        src="../../assets/images/hero-image.jpg"
        alt="hero image"
        loading="lazy"
      />
    </div>
  </div>
</template>
<script setup></script>
<style>
.hero-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  margin-bottom: 5rem;
}
.hero-text-container {
  margin-left: 5rem;
  width: 650px;
  z-index: none; /* Initially set to none */
  animation: changeZIndex 1s forwards 1s; /* Apply animation to change z-index after 1 second */
}
@keyframes changeZIndex {
  0% {
    z-index: none;
  }
  100% {
    z-index: 100;
  }
}
.hero-text {
  font-size: 90px;
  font-weight: 700;
  line-height: 1;
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
  bottom: -70px;
  left: -70px;
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
@media screen and (max-device-width: 992px) {
  .hero-image img {
    width: 400px;
    object-position: 85% 50%;
    animation: changetabletWidth 1s;
  }

  @keyframes changetabletWidth {
    from {
      width: 992px;
    }
    to {
      width: 400px;
    }
  }
}
@media screen and (max-device-width: 768px) {
  .hero-container {
    height: 50vh;
    align-items: end;
  }
  .hero-text-container {
    width: 80%;
    margin-left: 2rem;
  }
  .hero-text {
    font-size: 73px;
  }
  .hero-image img {
    display: none;
  }
  .hero-image-decor {
    display: none;
  }
}
@media screen and (max-device-width: 480px) {
  .hero-container {
    height: 47vh;
  }
  .hero-text {
    font-size: 45px;
  }
}
</style>
