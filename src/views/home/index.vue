<template>
  <div>home ---- {{name}}</div>
</template>
<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
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
