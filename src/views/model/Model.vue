<template>
  <div>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    自定义model组件
    <div @click="$emit('update:modelValue', 'hello')">点击事件触发v-model</div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // 在vue3 中model这了不在生效了， 直接update:modelValue 进行合并写入
  // model: {
  //   prop: 'checked', //对应props text
  //   event: 'modelValue'
  // },
  props: {
    modelValue: {
      type: String
    },
  },
  data () {
    return {

    }
  },
  methods: {
  }
})
</script>
