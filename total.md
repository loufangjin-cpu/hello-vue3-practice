### 1、使用svg-sprite-loader引入svg-icon
### 2、配置环境变量 --mode dev ...
### 3、权限控制：
  （1）路由权限控制
  // 源码链接1: http://likeyo.net/2020/12/24/Vue3%E5%93%8D%E5%BA%94%E5%BC%8F%E5%8E%9F%E7%90%86%E4%B9%8BReactive/#3-Vue3-%E5%93%8D%E5%BA%94%E5%BC%8F-API
  // 源码链接2: https://vue3js.cn/start/

  实现vue3 mini版： https://segmentfault.com/a/1190000023465134 
  对比vue2 ： https://segmentfault.com/a/1190000022696134?utm_source=sf-similar-article

## #######################
- 1、多页应用配置
- 2、如何启动多页面中的某一个页面
- 3、mock数据
  - 利用webpack dev server的特性进行请求的mock
- 4、多语言
  - 原理：https://segmentfault.com/a/1190000008752459
  - 使用了vue的混入功能，在对应的生命周期钩子里面注入
  `
  beforeCreate() {
   <!-- 挂载this.$i18n = xxx -->
  }
  computed:{
     $t () {
       <!--
       key: 对应的key
       locale: 语言配置
       messages: 语言包
        -->
       return (key: string, ...args: any): string => {
          return this.$i18n._t(key, locale, messages, this, ...args)
        }
     }
  }
  destroyed () {
    <!-- this.$i18n = null 进行销毁 -->
  }
  `