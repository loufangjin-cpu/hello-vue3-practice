// eslint-disable-next-line no-undef
onconnect = function(e) {
  var port = e.ports[0]
  //onmessage 处理程序处理来自主线程的消息
  port.onmessage = function(e) {
    var workerResult = 'Result: ' + e.data[0] * e.data[1]
    console.log('workerResult', workerResult)
    port.postMessage(workerResult)
  }
}
