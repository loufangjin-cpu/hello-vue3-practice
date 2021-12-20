<template>
  <div>about-{{ $t('pageTitle')}}</div>
  <div>
    <button @click="selectLanguage('en')">切换成英文</button>
    <button @click="selectLanguage('zhCN')">切换成中文</button>
    <van-button type="primary">主要按钮</van-button>
    
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
// import _ from 'lodash'

export default defineComponent({
  mounted() {
  },
  data() {
    return {
      currentDate: new Date(2021, 0, 17),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  methods: {
    selectLanguage(lang) {
      localStorage.setItem('language', lang)
      window.location.reload()
    }
  }
})
</script>
