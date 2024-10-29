<style lang="scss">
.image-preview {
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  min-width: 300px;
  min-height: 300px;
  margin-bottom: 25px;
  margin-top: 25px;
}

.image-remove {
  margin-left: 10px;
}

.image-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #eff0eb;
  padding: 10px;
}
</style>
<template>
  <div class="container has-text-centered">
    <div class="image-file-selector file has-name is-centered">
      <label class="file-label">
        <input v-on:change="uploadImage" class="file-input" type="file" name="resume">
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label">
            Choose file
          </span>
        </span>
        <span class="file-name">
          {{ file.name }}
        </span>
      </label>
      <span class="image-remove button" v-show="image" v-on:click="reloadPage">
        <i class="fa fa-trash"></i>
      </span>
    </div>
    <div class="image-preview" v-bind:style="{ backgroundImage: 'url(' + imageUrl + ')' }">
      <div v-show="overlay" class="image-overlay">
        <i class="fa fa-image"></i>
        {{ overlay }}
      </div>
    </div>

    <div v-show="invalidFile" style="color:red;">
      Not a valid file type. Please uplaod an image.
    </div>
    <div v-show="image">
      <span v-on:click="addPath" class="button">
        Add path
      </span>
      <router-link to="/mapper" class="button">
        Go to Mapper
      </router-link>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      invalidFile: false,
      imageUrl: '',
      shelfUrl: '#',
      file: {
        name: 'No file selected'
      },
      image: null
    }
  },
  name: 'ImageView',
  beforeRouteLeave (to, from, next) {
    if (this.image) {
      this.$root.$data.state.image.url = this.imageUrl
      this.$root.$data.state.image.width = this.image.width / 3
      this.$root.$data.state.image.height = this.image.height / 3
    }
    next()
  },
  methods: {
    uploadImage (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }

      const file = files[0]

      if (!file) {
        return
      }
      if (!/\.(jpe?g|png)$/i.test(file.name)) {
        this.invalidFile = true
        return
      }

      this.invalidFile = false

      this.createImage(file)
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this

      reader.onload = (e) => {
        var img = new Image()

        img.src = reader.result

        img.onload = function () {
          vm.image = img
        }

        vm.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
      this.file = file
    },
    removeImage: function (e) {
      this.image = this.$root.$data.state.defaultImage
      this.imageUrl = ''
      this.file = { name: 'No file selected' }
    },
    addPath () {
      var shelfUrl = prompt('Shelf image path: ', this.shelfUrl)
      if (shelfUrl != null) {
        this.shelfUrl = shelfUrl
      }
      Vue.prototype.$shelfUrl = shelfUrl
    },
    reloadPage () {
      location.reload()
    }
  },
  computed: {
    overlay: function () {
      if (this.image) {
        return this.image.width + ' x ' + this.image.height
      }

      return ' '
    }
  }
}
</script>
