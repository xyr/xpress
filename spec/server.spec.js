var request = require('request')

var my_url = "https://howdymika.herokuapp.com"
//var my_url = "http://localhost:3000"
var my_messages_url = my_url + "/messages"

describe('calc', () => {
  it('should multiply 2 and 2', () => {
    expect(2*2).toBe(4)
  })
})

describe('get messages', () => {
  it('should return 200 ok', (done) => {
    request.get(my_messages_url, (err, res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  })
  it('should return a list thats not empty', (done) => {
    request.get(my_messages_url, (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0)
      done()
    })
  })
})

describe('get messages from user', () => {
  it('should return 200 ok', (done) => {
    request.get(my_messages_url + '/Mika', (err, res) => {
      expect(res.statusCode).toEqual(200)
      done()
    })
  })
//  it('name should be Mika', (done) => {
//    request.get(my_messages_url + '/Mika', (err, res) => {
//      expect(JSON.parse(res.body)[0].name).toEqual("Mika")
//      done()
//    })
//  })
})



