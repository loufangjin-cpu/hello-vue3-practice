// 自定义数据结构：WeakMap: { Map: [Set] }
const handle = {
  get(target, key) {
    return Reflect.has(target, key) ? Reflect.get(target, key) : 'no--found'
  },
  set(target, key, value) {
    return Reflect.set(target, key, value)
  }
}
// 基本用法 proxy在目标对象的外层搭建了一层保护壳(拦截)， 外界对目标对象的某些操作，必须通过这层拦截
// get \ set \ has \ deleteProperty
export const proxyjs = (target = {}) => {
  const proxy = new Proxy(target, handle)
  return proxy
}

// 临时保存依赖函数
const effectStack = []
export const effect = (fn) => {
  // 高阶函数，有错误收集，立刻执行触发track依赖收集
  const e = createReactiveEffect(fn)
  e()
  return e
}

const createReactiveEffect = (fn) => {
  const effect = function reactiveEffect() {
    try {
      // 入栈, 放进栈中的是带错误处理的高阶函数，而不是原来的fn
      effectStack.push(effect)
      return fn()
    } finally {
      effectStack.pop()
    }
  }
  return effect
}
