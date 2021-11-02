<template>
  <div ref="curRef">
    {{msg}}
    {{msg1}}
  </div>
  <button @click="handleClick">点击添加列表</button>
  <button @click="handleClick1">点击添加列表2</button>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      name: '初始值',
      parent: 'parent',
      list: [1, 3],
      msg: '初始值',
      msg1: '初始值1',
    }
  },
  methods: {
    // https://www.cnblogs.com/wangjiachen666/p/11610289.html
    handleClick() {
      // ! nextTick 异步渲染、 等待DOM渲染完成之后再回调
      // data改变之后， DOM不会立即渲染，多次data的修改进行一个整合，只会渲染一次
      // ! 数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick。下面的console会优先执行
      let childNodes = this.$refs.curRef
      // nextTick 下次DOM更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM
      this.$nextTick(() => {
        // 内部的 this.msg 其实又开启了下一个任务
        this.msg = '修改之后的第二个值'
        console.log('childNodes11111', childNodes.innerHTML) // 输出初始值
      })
      //! 此改变响应数据
      this.msg = '修改之后的值'
      // 此时
      console.log('childNodes', childNodes.innerHTML)
    },
    handleClick1() {
            // ! 此改变响应数据
      this.msg1 = '修改之后的值'
      // nextTick 异步渲染、 等待DOM渲染完成之后再回调
      // data改变之后， DOM不会立即渲染，多次data的修改进行一个整合，只会渲染一次
       let childNodes = this.$refs.curRef
      // nextTick是一个一步任务
        this.$nextTick(() => {
          this.msg1 = '修改之后的第二个值'
          console.log('childNodes11111', childNodes.innerHTML) //  输出修改之后的值
        })
      console.log('childNodes', childNodes.innerHTML)
    }
  }
})
</script>
