<template>
  <div>about-{{ $t('pageTitle')}}</div>
  <div>
    <button @click="selectLanguage('en')">切换成英文</button>
    <button @click="selectLanguage('zhCN')">切换成中文</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
// import _ from 'lodash'

export default defineComponent({
  mounted() {
  },
  methods: {
    selectLanguage(lang) {
      localStorage.setItem('language', lang)
      window.location.reload()
    }
  }
})
</script>
