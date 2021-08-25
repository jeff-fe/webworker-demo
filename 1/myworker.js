// mywoker 子线程

console.log('myworker加载了')
importScripts('./utils.js')

function emitToMain() {
  setTimeout(() => {
    let cT = currentTime()
    self.postMessage({type: 'worker', msg: '我是myworker', time: cT})
  }, 2000)
}

self.onmessage = function (e) {
  console.log(e.data)
  if (e.data && e.data.type === 'main') {
    emitToMain()
  }
}
