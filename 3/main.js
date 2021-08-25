window.onload = function () {
  //增加dom
  let btn = document.getElementById('btn')
  let block = document.getElementById('block')
  btn.onclick = function () {
    block.appendChild(document.createElement('p'))
  }

  // 绘制
  let draw = document.getElementById('draw')
  draw.onclick = function () {
    let img = new Image();
    img.src = "../img.jpeg"
    img.onload = function () {
      console.time()
      let canvas = document.getElementById("myCanvas")
      let ctx = canvas.getContext('2d')
      canvas.width = 600;
      canvas.height = 500;
      for (let i = 0; i < 20000; i++) {
        ctx.drawImage(img, 0, 0, 400, 300)
      }
      console.timeEnd()
    }
  }

  // worker
  let wk = document.getElementById('wk')
  wk.onclick = function () {
    let drawWorker = new Worker('./worker.js')
    drawWorker.postMessage({type: 'draw'})

    drawWorker.onmessage = function (e) {
      console.time()
      let canvas = document.getElementById("myCanvas")
      let ctx = canvas.getContext('2d')
      canvas.width = 600;
      canvas.height = 500;
      ctx.drawImage(e.data.imageBitmap, 0, 0)
      console.timeEnd()
    }
  }
}
