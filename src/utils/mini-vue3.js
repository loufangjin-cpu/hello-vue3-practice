const isObject = (v) => v !== null && typeof v === 'object'
/* 建立响应式数据 */
function reactive(obj) {
  if (!isObject(obj)) return obj
  const observed = new Proxy(obj, {
    get(target, key, receiver) {
      const ret = Reflect.get(target, key, receiver)
      // 跟踪 收集依赖
      track(target, key)
      return reactive(ret)
    },
    set(target, key, val, receiver) {
      const ret = Reflect.set(target, key, val, receiver)
      // 触发更新
      trigger(target, key)
      return ret
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key)
      // 触发更新
      trigger(target, key)
      return ret
    }
  })
  return observed
}
/* 声明响应函数cb */
const effectStack = []
function effect(cb) {
  // 对函数进行高阶封装
  const rxEffect = function() {
    // 1.捕获异常 2.cb出栈入栈 3.执行cb
    try {
      effectStack.push(rxEffect)
      return cb()
    } finally {
      effectStack.pop()
    }
  }
  // 最初要执行一次,进行最初的依赖收集
  rxEffect()
  return rxEffect
}

/* 依赖收集：建立 数据&cb 映射关系 */

const targetMap = new WeakMap()
// target是原对象
function track(target, key) {
  // 存入映射关系
  const effectFn = effectStack[effectStack.length - 1] // 拿出栈顶函数
  if (effectFn) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if (!deps) {
                  // 收集依赖时 通过 key 建立一个 set
                  deps = new Set()
                  depsMap.set(key, deps)
                }
    // 这个 effectFn 可以先理解为更新函数 存放在 dep 里
    deps.add(effectFn)
  }
}

/* 触发更新：根据映射关系，执行cb */
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  console.log('depsMap', depsMap)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach((effect) => effect())
    }
  }
}
