<template>
  <div v-if="use" class="loader">
    <div class="group">
      <div style="width:100%; text-align:center;">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div
        style="max-width:500px; text-align:center;
        font-weight:bold; padding:24px 18px 0; color : #555;"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script src="./spinnerSimple.ts" />

<style scoped lang="scss">
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f6f6f6;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  .group {
    .text {
      font-size: 14px;
      margin-top: 14px;
      color: #777;
    }
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  border: 3px solid #aaa;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #aaa transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
