<template>
  <div @click="goToSkip">login</div>
</template>
<script>
import { defineComponent } from 'vue'
import {useRouter} from "vue-router"
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const goToSkip = () => {
      store.commit('moduleB/setNum')
      // router.push(`/home?name=about`)
      const name = 'helloxxxx'
      // params 模式
      // router.push({path: `/home/${name}`})
      // query 模式
      router.push({ path: '/home', query: { name }})
    }
    return {
      goToSkip
    }
  },
})
</script>
