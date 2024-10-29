<style lang="scss">
#result-code {
  display:none;
}
.results-bttn{
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
}
.instructions-text{
  text-align: center;
  margin-top: 1%;
  margin-bottom: 1%;
}

</style>
<template>
  <div class="container">
    <div id="result-code">
      <div id="projectsvg">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :viewBox="'0 0 ' + state.image.width + ' ' + state.image.height" preserveAspectRatio="xMinYMin meet" id="shelf_svg">
        <image :width="state.image.width" :height="state.image.height" :href="this.$shelfUrl"></image>
            <filter id="imagePattern" x="0%" y="0%" width="100%" height="100%">
              <feImage href="//surveyfiles.dynata.com/emea/custom/tools/shelf/check.png"/>
            </filter>
            <a :href="selection.url" data-fancybox=""  v-for="selection in state.selections" :key="selection.url">
              <rect data-buy-state="false" style="fill-opacity:0" :x="selection.x" :y="selection.y" :width="selection.width" :height="selection.height" :target="selection.target"/>
            </a>
        </svg>
      </div>
    </div>
    <codemirror :value="code" :options="cmOptions"></codemirror>
  </div>
</template>
<script>
import beautify from 'js-beautify'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ambiance.css'
export default {
  name: 'ResultView',
  data () {
    return {
      instructions: false,
      state: this.$root.$data.state,
      multiply: this.$root.$data.state.image.width <= 6000 ? 3 : 4,
      code: '',
      shelfurl: '',
      cmOptions: {
        tabSize: 4,
        mode: 'text/html',
        theme: 'ambiance',
        lineNumbers: true,
        lineWrapping: true,
        line: true
      }
    }
  },
  mounted () {
    const rawCode = document.getElementById('result-code').innerHTML
    this.code = beautify.html(rawCode, {
      indent_size: 0
    }).replace(/></g, '>\n<')
  },
  components: {
    codemirror
  }
}
</script>
