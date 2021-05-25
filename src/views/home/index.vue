<template>
  <div>home ---- {{name}}</div>
</template>
<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import {useRoute} from "vue-router"

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    // console.log('route-params', route.params);
    console.log('route-query', route.query);
    const state = reactive({
      name: computed(() => {
        return store.state.moduleB.name
      })
    })
    return {
      ...toRefs(state)
    }
  },
})
</script>
