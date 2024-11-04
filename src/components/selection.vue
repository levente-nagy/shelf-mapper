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
                    :w="width"
                    :h="height"
                    :minw="20"
                    :minh="20"
                    :x="x"
                    :y="y"
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
  props: {
    uid: Number,
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: '#'
    },
    target: {
      type: String,
      default: '#'
    },
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
      if (confirm('Are you sure you want to delete this area?') === true) {
        this.$emit('remove')
      }
    },
    edit () {
      var url = prompt('Zoom image path: ', this.url)
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
