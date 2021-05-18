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
      router.push(`/home?name=about`)
    }
    return {
      goToSkip
    }
  },
})
</script>
