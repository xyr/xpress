var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://user:user@cluster0.0aowe.mongodb.net/nodejs-test?retryWrites=true&w=majority'

var Message = mongoose.model('Message', {
  name: String,
  message: String
})

var messages = [
  {name: 'Mika', message: 'Hi'},
  {name: 'Niko', message: 'Hello'}
]

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body)

  message.save((err) => {
    if (err)
      sendStatus(500)

    io.emit('message', req.body)
    res.sendStatus(200)
  })
})

io.on('connection', (socket) => {
  console.log('user connected')
})

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  console.log('mongo db connection', err)
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

var server = http.listen(port, () => {
  console.log('server is listening on port', server.address().port)
})


