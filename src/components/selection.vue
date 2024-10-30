<style lang="scss">
  .removeButton {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .editButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
<template>
    <VueDragResize  :id="'selection-' + uid"
                    :parentLimitation="true"
                    v-bind:isActive="true"
                    :w="100"
                    :h="100"
                    :minw="20"
                    :minh="20"
                    :x="this.scrollLeft"
                    :y="this.scrollTop"
                    v-on:resizing="resize"
                    v-on:dragging="resize"
                    style="background-color:rgba(255,255,255,0.8);">
        <div class="removeButton" @click="remove">
          <i class="fa fa-trash"></i>
        </div>
        <div class="editButton" @click="edit">
          <i class="fa fa-edit"></i>
        </div>
          <div class="product">
          <span>
            {{ this.target }}
          </span>
        </div>
    </VueDragResize>
</template>
<script>
import VueDragResize from 'vue-drag-resize'
export default {
  data () {
    return {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      url: '#',
      target: '#'
    }
  },
  props: {
    uid: Number,
    scrollTop: {
      type: Number,
      default: 0
    },
    scrollLeft: {
      type: Number,
      default: 0
    }
  },
  methods: {
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.y = newRect.top
      this.x = newRect.left
    },
    remove () {
      if (confirm('Are you sure?') === true) {
        this.$emit('remove')
      }
    },
    edit () {
      var url = prompt('Image path: ', this.url)
      var target = prompt('Product code: ', this.target)
      if (url != null) {
        this.url = url
      }
      if (target != null) {
        this.target = target
      }
    }
  },
  components: {
    VueDragResize
  }
}
</script>
