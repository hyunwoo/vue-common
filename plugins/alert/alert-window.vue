<template lang="pug">
  .alert-dialog(v-if='use')
    .window
      .group
        .title {{option.title}}
        .message(v-html="option.message")
        .button-group
          .flex-empty
          .button.negative(v-if="!$_.isEmpty(option.negative)" @click="onReject()") {{option.negative}}
          .button.positive(v-if="!$_.isEmpty(option.positive)" @click="onResolve()") {{option.positive}}
</template>

<script src='./alert-window.ts'/>

<style scoped lang="scss">
.alert-dialog {
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  z-index: 10000;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  .window {
    border-radius: 8px;
    width: 420px;
    background: #fff;
    .group {
      text-align: left;
      color: #333;
      .title {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        padding: 0 24px;
        height: 52px;
        line-height: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        background: #00b0ff;
        color: #fff;
      }
      .message {
        font-weight: 500;
        color: #555;
        padding: 0 24px;
        font-size: 16px;
        margin-top: 22px;
        overflow: auto;
        max-height: calc(100vh - 300px);
        .tag-field {
          font-size: 10px !important;
        }
      }
      .button-group {
        display: flex;
        margin-top: 32px;
        padding: 4px 12px;
        .button {
          height: 36px;
          line-height: 36px;
          background: #eee;
          border-radius: 18px;
          margin: 8px;
          text-align: center;
          min-width: 100px;
          padding: 0 24px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          &.positive {
            background: #00b0ff;
            &:hover {
              background: #1e88e5;
            }
          }
          &.negative {
            background: #aaa;
            &:hover {
              background: #999;
            }
          }
        }
      }
    }
  }
}
</style>
