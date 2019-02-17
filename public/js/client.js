/* global io, Game */
/**
 * Client side script that initializes the game.
 *
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const socket = io()

const canvas = document.getElementById('canvas')

const game = new Game(socket, canvas)

document.getElementById('start').addEventListener('click', () => {
  game.init()
})
