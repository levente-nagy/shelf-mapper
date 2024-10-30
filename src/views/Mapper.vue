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
.finish,.add{
  width: 50px;
  margin: 5px;
}
</style>
<template>
  <div class="scrollable-container" @scroll="handleScroll" ref="scrollableDiv">
  <div class="container has-text-centered" >
    <div class="floating-button">
      <router-link to="/result" class="button finish">
      <i class="fa fa-check">
      </i>
      </router-link>
      <br/>
      <div class="button add" v-on:click="addSelection">
        <i class="far fa-2x fa-plus-square"></i>
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
      scrollLeft: 0
    }
  },
  methods: {
    addSelection: function () {
      var Selection = Vue.extend(selection)
      var instance = new Selection({
        propsData: {
          uid: this.selections.length,
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft
        }
      })
      var div = document.createElement('div')
      div.id = 'selection-mount-target'
      document.getElementById('mapper-canvas').appendChild(div)
      instance.$mount('#selection-mount-target')
      this.selections.push(instance)
      instance.$on('remove', () => {
        const uid = instance.uid
        instance.$destroy()
        this.selections.splice(uid, 1)
        document.getElementById('selection-' + uid).remove()
      })
    },
    handleScroll () {
      this.scrollTop = this.$refs.scrollableDiv.scrollTop
      this.scrollLeft = this.$refs.scrollableDiv.scrollLeft
    }
  }
}
</script>
