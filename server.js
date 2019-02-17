/**
 * This is the server app script that is run on the server.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const PORT = process.env.PORT || 5000
const FPS = 60

// Dependencies.
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const socketIO = require('socket.io')

const Game = require('./lib/Game')

// Initialization.
const app = express()
const server = http.Server(app)
const io = socketIO(server)
const game = new Game()

app.set('port', PORT)
app.set('view engine', 'html')

app.use(morgan('dev'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))
app.use('/public', express.static(path.join(__dirname, 'public')))

// Routing
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/video', (request, response) => {
  response.sendFile(path.join(__dirname, 'video.html'))
})

io.on('connection', socket => {
  socket.on('new-player', (data, callback) => {
    game.addNewPlayer(socket, data.name)
    callback(100, 100)
  })

  socket.on('player-action', data => {
    game.updatePlayerOnInput(socket.id, data)
  })

  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
  })
})

setInterval(() => {
  game.update()
  game.sendState()
}, 1000 / FPS)

// Starts the server.
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`STARTING SERVER ON PORT ${PORT}`)
})
