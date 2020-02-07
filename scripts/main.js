const start_game = document.getElementById('start-sign')
const red = document.getElementById('red')
const blue = document.getElementById('blue')
const yellow = document.getElementById('yellow')
const green = document.getElementById('green')

start_game.addEventListener('click', startGame)

class Juego {
  constructor() {
    this.initialize()
    this.generateSequence()
    this.nextLevel()
  }
  initialize() {
    start_game.classList.add('is-active')
    this.level = 7
    this.colores = {
      red: red,
      blue,
      yellow,
      green
    }
  }
  generateSequence() {
    this.secuencia = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4))
  }
  changeNumberToColor(number) {
    switch (number) {
      case 0:
        return 'red'
      case 1:
        return 'blue'
      case 2:
        return 'yellow'
      case 3:
        return 'green'
    }
  }
  nextLevel() {
    this.lightSequence()
  }
  lightSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.changeNumberToColor(this.secuencia[i])
      setTimeout(() => this.lightColor(color), 1000 * i ) 
    }
  }
  lightColor (color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.removeColor(color), 500 )
  }
  removeColor(color) {
    this.colores[color].classList.remove('light')
  }
}


function startGame() {
  window.juego = new Juego()
}
