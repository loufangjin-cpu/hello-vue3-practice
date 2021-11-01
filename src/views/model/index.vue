<template>
  <div>
    <input type="text" v-model="parent">
    <div>parent: {{parent}}</div>
    <div>自定义model</div>
    <div>{{name}}</div>
    <Model v-model="name" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Model from './Model.vue'
export default defineComponent({
  components: {
    Model
  },
  data () {
    return { 
      name: '初始值',
      parent: 'parent'
    }
  }
})
</script>
