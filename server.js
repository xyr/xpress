var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise

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

//app.post('/messages', (req, res) => {
//  var message = new Message(req.body)
//
//  message.save()
//  .then(() => {
//    console.log('saved')
//    return Message.findOne({message: 'badword'})
//  })
//  .then( censored => {
//    if(censored) {
//        console.log('censored word found', censored)
//        return Message.deleteMany({_id: censored.id})
//      }
//      io.emit('message', req.body)
//      res.sendStatus(200)
//  }).catch((err) => {
//    res.sendStatus(500)
//    console.error(err)
//  })
//})

app.post('/messages', async (req, res) => {
  var message = new Message(req.body)

  var savedMessage = await message.save()

  console.log('saved')

  var censored = await Message.findOne({message: 'badword'})

  if (censored)
    await Message.deleteMany({_id: censored.id})
  else
    io.emit('message', req.body)

  res.sendStatus(200)
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


