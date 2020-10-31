var express = require('express')
var bodyParser = require('body-parser')
var app = express()

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
  res.sendStatus(200)
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

var server = app.listen(port, () => {
  console.log('server is listening on port', server.address().port)
})


