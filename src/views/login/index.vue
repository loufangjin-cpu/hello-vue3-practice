<template>
  <div @click="goToSkip">login</div>
</template>
<script>
import { defineComponent } from 'vue'
import {useRouter} from "vue-router"
// import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const router = useRouter()
    // const store = useStore()
    // console.log('store', store.state.moduleB)
    const goToSkip = () => {
      router.push(`/home?name=about`)
    }
    return {
      goToSkip
    }
  },
})
</script>
