<template>
  <div v-if="ui.open">
    <div class="ml-dialog">
      <div class="ml-dialog-content">
        <div class="spinner" v-if="ui.loading">
          <div class="spinner-contents">
            <div class="icon" style="text-align:center;">
              loading...
            </div>
            <div
              class="subheading font-weight-medium"
              style="padding:48px 96px 0; color:#777;"
              v-if="ui.loadingMessage !== ''"
              v-html="ui.loadingMessage"
            ></div>
          </div>
        </div>

        <div class="ml-command-line">
          <div class="ml-button-group">
            <div class="ml-button-group-label">Selection Filter</div>
            <div class="ml-button-group-contents">
              <div
                class="ml-button-command"
                @click="ui.selectFilter = 'All'"
                :selected="ui.selectFilter === 'All'"
              >
                ALL
              </div>
              <div
                class="ml-button-command"
                @click="ui.selectFilter = 'UnSelected'"
                :selected="ui.selectFilter === 'UnSelected'"
              >
                UnSelected
              </div>
              <div
                class="ml-button-command"
                @click="ui.selectFilter = 'Selected'"
                :selected="ui.selectFilter === 'Selected'"
              >
                Selected
              </div>
            </div>
          </div>
          <div
            class="ml-button-group"
            @change="changeMediaFilter"
            :disabled="ui.disableFilter"
          >
            <div class="ml-button-group-label">Extension Filter</div>
            <div class="ml-button-group-contents">
              <div
                class="ml-button-command"
                @click="ui.mediaFilter = ['Pdf', 'Image', 'Video']"
                :selected="ui.mediaFilter.length === 3"
              >
                All
              </div>
              <div
                class="ml-button-command"
                @click="ui.mediaFilter = ['Pdf']"
                :selected="
                  ui.mediaFilter.length !== 3 && ui.mediaFilter[0] === 'Pdf'
                "
              >
                Pdf
              </div>
              <div
                class="ml-button-command"
                @click="ui.mediaFilter = ['Image']"
                :selected="ui.mediaFilter[0] === 'Image'"
              >
                Image
              </div>
              <div
                class="ml-button-command"
                @click="ui.mediaFilter = ['Video']"
                :selected="ui.mediaFilter[0] === 'Video'"
              >
                Video
              </div>
            </div>
          </div>
          <div class="ml-button-group">
            <div class="ml-button-group-label">Selection Filter</div>
            <div class="ml-button-group-contents">
              <div class="ml-button-command" @click="uploadMedia">
                Upload
              </div>
              <div class="ml-button-command" @click="onResolve">
                Confirm
              </div>
              <div class="ml-button-command" @click="onReject">
                Cancel
              </div>
            </div>
          </div>
          <div class="ml-input-command">
            <div>search</div>
            <input type="text" v-model="ui.searchModel" />
          </div>
          <div>
            <div class="grey--text text--darken-1">
              <i>{{ selects.length }}/{{ items.length }} selected</i>
            </div>
          </div>
        </div>

        <div class="ml-media-container">
          <div
            v-for="item in displayItems"
            :key="`image-${item.id}`"
            :selected="isSelected(item)"
            @click="clickMedia(item)"
            class="ml-media-item"
          >
            <div
              class="ml-image"
              :style="{ backgroundImage: `url(${item.data.mediaURL})` }"
            ></div>
            <div class="ml-media-item-descriptor">
              <div class="ml-image-name">
                {{ item.data.name }} asdf asdf asdf asdf asdfa fsda fasdf
              </div>
              <div class="ml-image-date">
                {{ new Date(item.data.createdAt).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./mediaLibrary.ts"></script>
<style lang="scss" scoped>
@import './mediaLibrary.scss';
</style>
