var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
  {name: 'Mika', message: 'Hi'},
  {name: 'Niko', message: 'Hello'}
]

app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  messages.push(req.body)
  io.emit('message', req.body)
  res.sendStatus(200)
})

io.on('connection', (socket) => {
  console.log('user connected')
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

var server = http.listen(port, () => {
  console.log('server is listening on port', server.address().port)
})


