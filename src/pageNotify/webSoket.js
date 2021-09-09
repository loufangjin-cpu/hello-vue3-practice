// websocket服务器端搭建
var WebSocket = require('ws')
var wss = new WebSocket.Server({ port: 8082 })

let clients = {}
let clientName = 0
wss.on('connection', (client) => {
  console.log('server: 服务端链接已开启.')
  client.name = ++clientName
  clients[client.name] = client
  client.on('message', (msg) => {
    console.log('客户端传来：' + msg)
    broadcast(client, msg.toString())
  })
  client.on('error', (e) => {
    console.log('client error' + e)
    client.end()
  })
  client.on('close', () => {
    delete clients[client.name]
    console.log(client.name + ' 下线了')
  })
})

function broadcast(client, msg) {
  for (var key in clients) {
    clients[key].send(client.name + ' 说：' + msg)
  }
}

// server.listen(9527, 'localhost')
