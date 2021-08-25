let btn = document.getElementById('btn')
let wk1 = document.getElementById('wk1')
let wk2 = document.getElementById('wk2')


btn.onclick = function () {
  console.log('计算开始')
  sumNum()
  document.body.append(document.createElement('p'))
  console.log('完成end')
}
wk1.onclick = function () {
  console.log('计算开始')
  work()
  document.body.append(document.createElement('p'))
  console.log('完成end')
}
wk2.onclick = function () {
  console.log('计算开始')
  work2()
  document.body.append(document.createElement('p'))
  console.log('完成end')
}


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

function work() {
  let w = new Worker('work.js')
  w.postMessage('start');
  w.onmessage = function (event) {
    console.log('Received message ' + event.data);
    w.terminate()
  }
}

function work2() {
  let data = `console.log('worker2加载')
                self.addEventListener('message', function (e) {
                    if (e.data === 'start') {
                        console.log('worker2开始工作')
                        sumNum()
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
                }`
  let blob = new Blob([data])
  let url = window.URL.createObjectURL(blob)
  let w = new Worker(url)
  w.postMessage('start');
  w.onmessage = function (event) {
    console.log('Received message ' + event.data);
    w.terminate()
  }
}
