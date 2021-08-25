self.addEventListener('message', function (e) {
  console.log('worker工作')
  loadImageAsync('../img.jpeg').then(res => {
    // ImageBitmap 表示一个位图图像，可以绘制到 canvas 上，同时不会有较大的延迟。
    // https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap
    self.createImageBitmap(res).then(ibm => {
      let canvas = new OffscreenCanvas(600, 500)
      let ctx = canvas.getContext('2d')
      for (let i = 0; i < 20000; i++) {
        ctx.drawImage(ibm, 0, 0, 400, 300)
      }
      //https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas/transferToImageBitmap
      const imageBitmap = canvas.transferToImageBitmap()
      self.postMessage({
        imageBitmap: imageBitmap
      })
    })
  })
}, true)

function loadImageAsync(imageUrl) {
  return new Promise(resolve => {
    fetch(imageUrl).then(response => {
      resolve(response.blob());
    })
  })
}
