const background = new Background(bg_count)
const player = new Player()
const enemy = new Enemy(enemy_count)

const input = document.querySelector('.score')
const gameOver = () => {
  clearAll()
  fillAll('black')

  background.draw()

  document.querySelector('.gameover_score').innerHTML = player.score
  document.querySelector('.gameover').style.display = 'flex'

  document.querySelector('.gameover_button').addEventListener('click', function() {
    player.score = 0

    player._player.x = (width / 2) - 50
    player._player.y = height - 110

    enemy._nodes = []
    player._bullet = []

    player.time.min = 0
    player.time.sec = 0
    player.time.ms = 0

    document.querySelector('.gameover').style.display = 'none'

    setGame(game)
  })
}

const game = () => {
  clearAll()
  fillAll('black')

  background.draw()
  
  player.timer()
  player.startFire()
  player.draw()
  player.move()
  player.collision(enemy._nodes)
  
  enemy.draw()


  input.innerHTML = player.score
}

const auth = () => {
  clearAll()
  fillAll('black')

  background.draw()
}

document.querySelector('.login_button').addEventListener('click', function() {
  const input = document.querySelector('.login_input')

  if (input.value.length === 0) return

  document.querySelector('.username').innerHTML = player.username = input.value

  document.querySelector('.login').style.display = 'none'

  setGame(game)
})

startGame(auth)