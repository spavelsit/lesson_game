const background = new Background(bg_count)
const player = new Player()
const enemy = new Enemy(enemy_count)

const input = player.writeScore()

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

    document.querySelector('.gameover').style.display = 'none'

    setGame(game)
  })
}

const game = () => {
  clearAll()
  fillAll('black')

  background.draw()
  
  player.startFire()
  player.draw()
  player.move()
  player.collision(enemy._nodes)
  
  enemy.draw()


  input.innerHTML = player.score
}

startGame(game)