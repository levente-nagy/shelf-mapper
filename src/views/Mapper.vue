<style lang="scss">
.mapper-canvas {
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin: auto;
}
.urlField{
  display: none;
}
.vdr
{
  background-color: rgb(139,0,0,0.6) !important;
}
.removeButton,.editButton,.product{
  color:white;
  font-size: 15px;
}
.has-text-centered{
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.floating-button {
  position: fixed;
  top: 25px;
  left: 25px;
  z-index: 1000;
}
.scrollable-container {
  margin: auto;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 80vh;
  width: 100%;
  scrollbar-width: auto;
}
.scrollable-container > * {
  min-width: 130vw;
}
.scrollable-container::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
.scrollable-container::-webkit-scrollbar-thumb {
  background: darkgrey;
  border-radius: 6px;
}
.scrollable-container::-webkit-scrollbar-track {
  background: lightgrey;
}
.finish,.add,.export,.import{
  width: 90px;
  margin: 5px;
}
.fa-plus-square,.fa-check,.fa-upload,.fa-download{
  font-size: 15px;
}
</style>
<template>
  <div class="scrollable-container" @scroll="handleScroll" ref="scrollableDiv">
  <div class="container has-text-centered" >
    <div class="floating-button">
      <router-link to="/result" class="button finish">
      <i class="fa fa-check"></i>&nbsp;Done
      </router-link>
      <br/>
      <input type="file" @change="importSelections" style="display: none;" ref="fileInput" />
      <div class="button import" @click="openFileInput">
        <i class="fas fa-upload"></i>&nbsp;Import
      </div>
      <br/>
      <div class="button export" @click="exportSelections">
        <i class="fas fa-download"></i>&nbsp;Export
      </div>
      <br/>

      <div class="button add" v-on:click="addSelection">
        <i class="far fa-plus-square"></i> &nbsp;Add
      </div>
    </div>
    <div class="level">
      <div class="level-left toolbar">
      </div>
      <div id="mapper-canvas" class="level-right mapper-canvas" v-bind:style="{
        backgroundImage: 'url(' + $root.$data.state.image.url + ')',
        width: $root.$data.state.image.width + 'px',
        height: $root.$data.state.image.height  + 'px'
      }" ref="canvas">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue'
import selection from '@/components/selection.vue'
export default {
  name: 'MapperView',
  beforeRouteLeave (to, from, next) {
    this.$root.$data.state.selections = this.selections
    next()
  },
  data () {
    return {
      selections: [],
      scrollTop: 0,
      scrollLeft: 0,
      isAdding: false
    }
  },
  methods: {
    addSelection () {
      if (this.isAdding) return
      this.isAdding = true
      const Selection = Vue.extend(selection)
      const instance = new Selection({
        propsData: {
          uid: this.selections.length,
          width: 100,
          height: 100,
          x: this.scrollLeft,
          y: this.scrollTop,
          url: '#',
          target: '#'
        }
      })
      const div = document.createElement('div')
      div.id = `selection-mount-target-${this.selections.length}`
      document.getElementById('mapper-canvas').appendChild(div)
      instance.$mount(div)
      this.selections.push(instance)
      instance.$on('remove', () => {
        const uid = instance.uid
        instance.$destroy()
        this.selections.splice(uid, 1)
        document.getElementById('selection-' + uid).remove()
      })
      this.isAdding = false
    },
    handleScroll () {
      this.scrollTop = this.$refs.scrollableDiv.scrollTop
      this.scrollLeft = this.$refs.scrollableDiv.scrollLeft
    },
    exportSelections () {
      const data = this.selections.map(selection => ({
        width: selection.width,
        height: selection.height,
        x: selection.x,
        y: selection.y,
        url: selection.url,
        target: selection.target
      }))
      const json = JSON.stringify(data, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'shelf_coords.json'
      link.click()
      URL.revokeObjectURL(url)
    },
    openFileInput () {
      this.$refs.fileInput.click()
    },
    importSelections (event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          try {
            const importedSelections = JSON.parse(e.target.result)
            importedSelections.forEach(selectionData => this.createSelectionFromData(selectionData))
          } catch (error) {
            alert('Invalid file format')
          }
        }
        reader.readAsText(file)
      }
    },
    createSelectionFromData (data, isImported = true) {
      const Selection = Vue.extend(selection)
      const instance = new Selection({
        propsData: {
          uid: this.selections.length,
          width: data.width,
          height: data.height,
          x: isImported ? data.x : this.scrollLeft,
          y: isImported ? data.y : this.scrollTo,
          url: data.url,
          target: data.target
        }
      })
      const div = document.createElement('div')
      div.id = `selection-mount-target-${this.selections.length}`
      document.getElementById('mapper-canvas').appendChild(div)
      instance.$mount(div)
      this.selections.push(instance)
      instance.$on('remove', () => {
        const uid = instance.uid
        instance.$destroy()
        this.selections.splice(uid, 1)
        document.getElementById('selection-' + uid).remove()
      })
    }
  }
}
</script>
