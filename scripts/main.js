const start_game_sign = document.getElementById('start-sign')
const red = document.getElementById('red')
const blue = document.getElementById('blue')
const yellow = document.getElementById('yellow')
const green = document.getElementById('green')
const FINAL_LEVEL = 5

start_game_sign.addEventListener('click', startGame)

class Juego {
  constructor() {
    this.initialize()
    this.generateSequence()
    this.nextLevel()
    console.log(this.secuencia)
  }
  initialize() {
    this.toggleStartSign()
    this.checkColor = this.checkColor.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.addListener = this.addListener.bind(this)
    this.initialize = this.initialize.bind(this)
    this.level = 1
    this.colores = {
      red: red,
      blue,
      yellow,
      green
    }
  }
  toggleStartSign() {
    if (start_game_sign.classList.contains('is-active')) {
      start_game_sign.classList.remove('is-active')
    } else {
      start_game_sign.classList.add('is-active')
    }
  }
  generateSequence() {
    this.secuencia = new Array(FINAL_LEVEL).fill(0).map( n => Math.floor(Math.random() * 4))
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
  changeColorToNumber(color) {
    switch (color) {
      case 'red':
        return 0
      case 'blue':
        return 1
      case 'yellow':
        return 2
      case 'green':
        return 3
    }
  }

  nextLevel() {
    this.lightSequence()
    this.sublevel = 0

  }
 
  lightSequence() {
    console.log(this.secuencia)
    for (let i = 0; i < this.level; i++) {
      const color = this.changeNumberToColor(this.secuencia[i])
      setTimeout(() => this.lightColor(color), 1000 * i ) 
    }
    setTimeout(this.addListener, this.level * 800 ) 

  }
  lightColor (color) {
    this.colores[color].classList.add('light')
    setTimeout(() => this.removeColor(color), 400 )
  }
  removeColor(color) {
    this.colores[color].classList.remove('light')
  }

  addListener() {
    console.log('addListener engaged')
    this.colores.red.addEventListener('click', this.checkColor)
    this.colores.blue.addEventListener('click', this.checkColor)
    this.colores.yellow.addEventListener('click', this.checkColor)
    this.colores.green.addEventListener('click', this.checkColor)
  }
  removeListener() {
    console.log('removeListener engaged')
    this.colores.red.removeEventListener('click', this.checkColor)
    this.colores.blue.removeEventListener('click', this.checkColor)
    this.colores.yellow.removeEventListener('click', this.checkColor)
    this.colores.green.removeEventListener('click', this.checkColor)
  }
  checkColor(ev) {
    // debugger
    console.log('btnPressed')
    const color_name = ev.target.dataset.color
    this.lightColor(color_name)
    const color_number = this.changeColorToNumber(color_name)
    console.log(color_number)
    if (this.secuencia[this.sublevel] === color_number) {
      this.sublevel++
      if (this.sublevel === this.level){
        this.level++
        this.removeListener()
        if (this.level === FINAL_LEVEL + 1) {
          this.gameWon()
        } else {
        setTimeout(this.nextLevel, 1300) 
        }
      }
    } else {
      this.gameLost()
      this.removeListener()

    }
  }
  gameWon() {
    swal({
      title: '¡Felicidades!',
      text: 'Ganaste el juego',
      icon: 'success',
      button: '¡I love this!'

    }).then(this.initialize)
  } 
  gameLost() {
    swal({
      title: 'Rayos...',
      text: 'Perdiste el juego. :c',
      icon: 'error',
      button: 'Intentar de nuevo'

    }).then(this.initialize)
  } 
}


function startGame() {
  window.juego = new Juego()
}
