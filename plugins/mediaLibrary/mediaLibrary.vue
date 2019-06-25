<template>
  <v-dialog v-model="ui.open"
            max-width="700"
            persistent="">

    <v-card>
      <div class="spinner"
           v-if="ui.loading">
        <div class="spinner-contents">
          <div class="icon"
               style="text-align:center;">
            <a-icon slot="indicator"
                    type="loading"
                    style="font-size: 36px; color : #E91E63;"
                    spin />
          </div>
          <div class="subheading font-weight-medium"
               style="padding:48px 96px 0; color:#777;"
               v-if="ui.loadingMessage !== ''"
               v-html="ui.loadingMessage">
          </div>
        </div>
      </div>
      <v-card-title>
        <div class="title grey--text text--darken-3">MEDIA LIBRARY</div>
        <v-spacer></v-spacer>
        <div class="grey--text text--darken-1">
          <i>{{selects.length}}/{{items.length}} selected</i>
        </div>
      </v-card-title>
      <v-layout row
                wrap>

        <v-flex xs12
                sm12
                md6
                pa-1
                d-flex>

          <a-select defaultValue="Selected"
                    v-model="ui.selectFilter"
                    style="max-width:100px;">
            <a-select-option key="All">All</a-select-option>
            <a-select-option key="UnSelected">UnSelected</a-select-option>
            <a-select-option key="Selected">Selected</a-select-option>
          </a-select>
          <a-select mode="multiple"
                    v-model="ui.mediaFilter"
                    @change="changeMediaFilter"
                    :disabled="ui.disableFilter"
                    placeholder="Please select">
            <a-select-option key="Pdf">Pdf</a-select-option>
            <a-select-option key="Image">Image</a-select-option>
            <a-select-option key="Video">Video</a-select-option>
          </a-select>

        </v-flex>

        <v-flex xs12
                sm12
                md6
                pa-1>
          <a-input v-model="ui.searchModel">
            <a-icon slot="prefix"
                    type="search" />
          </a-input>

        </v-flex>

      </v-layout>
      <v-divider></v-divider>
      <v-layout class="media--controller"
                @drop.stop="evt => dropMedia(evt)"
                @dragenter="ui.dragOver = true;"
                @dragleave="ui.dragOver = false;"
                @dragend="ui.dragOver = false"
                row
                wrap>
        <!-- <div class="media--drag-guide font-weight-medium title"
             v-if="ui.dragOver"> Drop Files Here to Upload</div> -->
        <v-flex v-for="(item ) in displayItems"
                :key="`image-${item.id}`"
                md4
                sm6
                xs12
                class="media--sector">
          <div class="media--display"
               :selected="isSelected(item)"
               @click="clickMedia(item)">
            <v-icon color="white"
                    size="18"
                    class="media--selected-icon">check</v-icon>
            <template v-if="item.data.type === 'application/pdf'">
              <div class="media--content">
                <!-- TODO PDF VIEWER 생각..? -->
                <!-- <iframe :src="`https://docs.google.com/viewer?url=${item.data.mediaURL}&embedded=true`"
                        frameborder="0"
                        height="100px"
                        width="100%"></iframe> -->
                <div class="media--contents-overlap font-weight-bold pa-2">
                  {{item.data.name}}<br>
                  <small class="date">
                    {{new Date(item.data.createdAt).toLocaleString()}}
                  </small>
                </div>
                <a-icon type="file-pdf"
                        class="pt-5 text-center grey--text text--darken-2 display-3"
                        style="width:100%;"></a-icon>
                <div style="color:#666; font-size:12px;text-align:center"
                     class="font-weight-medium">{{item.data.name}}
                </div>
              </div>
            </template>
            <template v-else-if="item.data.type === 'video/mp4'">
              <div class="media--content"
                   style="background:#000;">
                <div class="media--contents-overlap font-weight-bold pa-2"
                     type="video">
                  {{item.data.name}}<br>
                  <small class="date">
                    {{new Date(item.data.createdAt).toLocaleString()}}
                  </small>
                </div>
                <div style="width:100%; height:calc(100% - 24px)">
                  <video width="100%"
                         height="100%"
                         autobuffer
                         @mouseover="e => e.target.play()"
                         @mouseout="e => e.target.pause()"
                         :src="item.data.mediaURL">
                    <source type="video/mp4"
                            :src="item.data.mediaURL" />
                  </video>
                </div>
                <div style="color:#eee; font-size:12px;text-align:center; width:100%;
                text-overflow:ellipsis; overflow:hidden; white-space:nowrap; line-height:24px;"
                     class="font-weight-bold px-2">{{item.data.name}}</div>
              </div>
            </template>
            <template v-else>
              <v-img class="media--content"
                     :src="item.data.mediaURL"></v-img>
              <div class="media--contents-overlap font-weight-bold pa-2">
                {{item.data.name}}<br>
                <small class="date">
                  {{new Date(item.data.createdAt).toLocaleString()}}
                </small>
              </div>
            </template>
            <div class="media--actions">
              <v-btn dark
                     icon
                     small
                     @click.stop="deleteMedia(item)"
                     flat>
                <v-icon size="18">delete</v-icon>
              </v-btn>
            </div>
          </div>

        </v-flex>
        <v-flex md4
                sm6
                xs12
                class="media--sector">
          <div class="media--adder"
               @click="uploadMedia">
            <v-icon size="36"
                    color="grey">add</v-icon>
          </div>

        </v-flex>

      </v-layout>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat
               @click="onReject"
               color="#777">cancel</v-btn>
        <v-btn flat
               @click="onResolve"
               color="primary">select</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src='./mediaLibrary.ts'>

</script>
<style lang='scss' scoped>
@import './mediaLibrary.scss';
</style>
