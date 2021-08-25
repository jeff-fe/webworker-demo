console.log('worker加载')
self.addEventListener('message', function (e) {
  if (e.data === 'start') {
    console.log('worker开始工作')
    sumNum()
    // worker 内部创建worker只有Firefox支持
    // work2()
  }
}, false)

function sumNum() {
  console.time()
  let v = 999999999
  for (let i = 0; i <= v; i++) {
    if (i > v - 1) {
      self.postMessage('stop-' + v)
    }
  }
  console.timeEnd()
}

function work2() {
  let w = new Worker('../1/myworker.js')
}
