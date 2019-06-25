<template>
  <div v-if='use'
       class="loader">

    <div class="group">
      <div style="width:100%; text-align:center;">
        <a-icon type="loading"
                style="font-size:32px; color:#E91E63;"></a-icon>
      </div>
      <div class="py-3 sub-heading font-weight-medium"
           style="max-width:500px;">{{message}}</div>
    </div>
  </div>
</template>

<script src="./spinnerSimple.ts"/>


<style scoped lang="scss">
.loader {
  min-width: 1328px;
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
</style>
