<template>
  <div class="item-box" ref="item">
    <div>{{index}} - {{data.name}}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
})
</script>

<style >
  .item-box {
    border: 1px solid red;
    height: 180px;
  }
</style>