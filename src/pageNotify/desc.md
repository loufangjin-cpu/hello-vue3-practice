// 页面之间通信 https://blog.csdn.net/sisterAn/article/details/115997936
// 据我所知，A、B 页面通信方式有：
// url 传参 a.html 、b.html 通过hashchange监听事件
// postmessage: window.opener.postMessage 和 window.open， 监听message
// localStorage: addEventListener('storage') 监听缓存
// WebSocket:
    客户端建立到服务端webSoket连接：new WebSocket('ws://localhost:8082')
    服务端搭建websocket服务器端搭建\收集客户端消息， 进行广播， new WebSocket.Server({ port: 8082 })
// socket.io
// SharedWorker: https://github.com/mdn/simple-shared-worker ????
// Service Worker:
