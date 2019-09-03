<template>
  <div class="alert-dialog"
       v-if="use">
    <div class="window">
      <div class="group">
        <div class="title">{{option.title}}</div>
        <div class="message"
             v-html="option.message"></div>
        <div class="under-line"></div>
        <div class="button-group">
          <div class="button positive"
               v-if="!lodash.isEmpty(option.positive)"
               @click="onResolve()">{{option.positive}}</div>
          <div class="button negative"
               v-if="!lodash.isEmpty(option.negative)"
               @click="onReject()">{{option.negative}}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- .alert-dialog(v-if='use')
    .window
      .group
        .title {{option.title}}
        .message(v-html="option.message")
        .button-group
          .button.positive(v-if="!lodash.isEmpty(option.positive)" @click="onResolve()") {{option.positive}}
          .button.negative(v-if="!lodash.isEmpty(option.negative) :style="{background: option.color}" @click="onReject()") {{option.negative}} -->
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
    border-radius: 4px;
    width: 420px;
    background: #fff;
    .group {
      text-align: left;
      color: #333;
      .title {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        font-weight: 500;
        font-size: 20px;
        padding: 20px 24px;
        height: 58px;
        line-height: 52px;
        overflow: hidden;
        text-overflow: ellipsis;
        background: #dddd;
        color: #333;
      }
      .message {
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
        border-top: 1px solid #ddd;
        display: flex;
        margin-top: 32px;
        padding: 4px 12px;
        flex-direction: row-reverse;
        .button {
          height: 36px;
          line-height: 36px;
          border-radius: 4px;
          margin: 4px;
          text-align: center;
          min-width: 100px;
          padding: 0 24px;
          font-size: 16px;
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          &.positive {
            color: #42a5f5;
            &:hover {
              color: #1e88e5;
              background: #e1f5fe;
            }
          }
          &.negative {
            color: #999;
            &:hover {
              background: #eee;
              color: #777;
            }
          }
        }
      }
    }
  }
}
</style>
