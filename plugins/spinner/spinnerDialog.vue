<template>
  <div class="loader"
       v-if="use">
    <div class="window">
      <div class="group">
        <div style="text-align:center;">
          <a-icon type="loading"
                  style="font-size:48px; color:#E91E63"></a-icon>
        </div>
        <div class="separator"></div>
        <div class="text bold"
             v-html="message"></div>
      </div>
    </div>
  </div>
</template>

<script src="./spinnerDialog.ts"/>

<style scoped lang="scss">
.loader {
  min-width: 1328px;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.76);
  position: fixed;
  z-index: 1000000;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  color: #444;
  .window {
    border-radius: 8px;
    width: 480px;
    height: 320px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .group {
      .separator {
        padding-top: 48px;
      }
      .text {
        font-size: 16px;
        margin-top: 8px;
        color: #777;
        &.bold {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
