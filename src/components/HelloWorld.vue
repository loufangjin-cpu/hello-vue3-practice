<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg-icon icon-class="qq"></svg-icon>Home
    <svg-icon icon-class="smile"></svg-icon>Home
    <!-- 原始用法 -->
    <svg >
    <use xlink:href="#icon-wx" />
  </svg>
  </div>
</template>
<script>
import SvgIcon from '@/components/SvgIcon.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    SvgIcon
  },
  mounted() {
    console.log('VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
