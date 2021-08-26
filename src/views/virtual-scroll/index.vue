<template>
  <div>
    <ul class="height-fixed" ref="scroller">
      <li
        class="height-fixed__scroll-runway"
        :style="`transform: translate(0, ${scrollRunwayEnd}px)`"
      ></li>
      <Item
        class="height-fixed__item"
        v-for="item in visibleData"
        :data="item"
        :index="item.index"
        :key="item.id"
        :style="`transform: translate(0, ${item.scrollY}px)`"
      />
    </ul>
  </div>
</template>

<script>
// https://lkangd.com/post/virtual-infinite-scroll/
import { defineComponent } from 'vue'
import Item from '@/components/Item'
import { fetchData } from './fetchData'
// 固定高度
const FIXED_HEIGHT = 180
// 「缓冲区元素」个数
const BUFFER_SIZE = 3
// 可视元素的个数
let VISIBLE_COUNT = 0
export default defineComponent({
  name: '虚拟滚动',
  components: {
    Item
  },
  data() {
    return {
      listData: [],
      scrollRunwayEnd: 0, // 可滚动高度
      visibleData: [], // 「可视元素」的装载数组
      firstAttachedItem: 0, // 「头挂载元素」
      lastAttachedItem: 0 // 「尾挂载元素」
    }
  },
  mounted() {
    this.listData = fetchData()
    // 数组长度 *  每一个节点固定高度
    this.scrollRunwayEnd = this.listData.length * FIXED_HEIGHT
    VISIBLE_COUNT = Math.ceil(this.$refs.scroller.offsetHeight / FIXED_HEIGHT)
    this.lastAttachedItem = VISIBLE_COUNT + BUFFER_SIZE
    console.log(
      'this.$refs.scroller.offsetHeight',
      this.$refs.scroller.offsetHeight
    )
    this.visibleData = this.listData.slice(
      this.firstAttachedItem,
      this.lastAttachedItem
    )
    this.calItemScrollY(this.listData)
  },
  methods: {
    calItemScrollY(list) {
      let latestIndex = 0
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        item.index = latestIndex + i
        item.scrollY = (i +1) * FIXED_HEIGHT
        Object.freeze(item)
      }
      console.log('list', list)
      return list
    }
  }
})
</script>

<style>
.height-fixed {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.height-fixed__scroll-runway {
  position: absolute;
  width: 1px;
  height: 1px;
  transition: transform 0.2s;
}
</style>
