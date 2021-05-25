<template>
  <div>about</div>
</template>
<script>
import { defineComponent } from 'vue'
import {proxyjs, effect} from '@/utils/proxy'
//基本用法
const proxy = proxyjs()
proxy.a= 'aa'
proxy.name = 'aaa'
console.log('proxy', proxy.a)
console.log('proxy-name', proxy.name)
const aaa = effect(() => {
  // p1.innerHTML = obj.name;
  // p2.innerHTML = obj.n.a;
})

console.log('aaa', aaa)
export default defineComponent({
  setup() {
  },
})
</script>
