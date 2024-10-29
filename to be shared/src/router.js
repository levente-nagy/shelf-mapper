import Vue from 'vue'
import Router from 'vue-router'
import Image from './views/Image.vue'
import Mapper from './views/Mapper.vue'
import Result from './views/Result.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/image',
      name: 'Image',
      label: 'Upload',
      icon: 'dice-one',
      alias: '/',
      component: Image
    },
    {
      path: '/mapper',
      name: 'Mapper',
      label: 'Mapper',
      icon: 'dice-two',
      component: Mapper
    },
    {
      path: '/result',
      name: 'Result',
      label: 'Result',
      icon: 'file-download',
      component: Result
    }
  ]
})
