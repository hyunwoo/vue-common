<template>
  <v-dialog persistent="" width="200" v-model="use">
    <div
      class="elevation-0"
      style="background:#fff; border-radius: 4px; padding: 18px;"
    >
      <div style="text-align:center;">
        <a-icon type="loading" style="font-size:24px; color:#E91E63"></a-icon>
      </div>
      <div
        style="overflow:hidden;
        word-break:break-all;
        padding-top: 14px;
        text-align:center;
        font-size: 12px;
        white-space:nowrap;
        text-overflow:ellipsis;"
      >
        {{ message }}
      </div>
    </div>
  </v-dialog>
</template>

<script src="./spinnerSmallDialog.ts" />

<style scoped lang="scss">
.loader {
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
