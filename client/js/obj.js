class Background {
  constructor(count) {
    this._count = count
  }

  _nodes = []

  add(x, w, h, speed, color_idx) {
    this._nodes.push(new Graph({ x, y: -10, w, h, speed, color: stars_colors[color_idx] }))
  }

  draw() {
    if (this._nodes.length < this._count) {
      this.add(random(0, width), random(1, 2), random(1, 2), random(1, 3), random(0, stars_colors.length - 1))
    }

    this._nodes.map((el, idx) => {
      if (el.y > height) {
        this._nodes.splice(idx, 1)
      } else {
        el.draw();
        el.y += el.speed;
      }
    })
  }
}

class Player {
  constructor() { }

  _bullet = []

  score = 0

  username = 'No name'

  _lastFire = Date.now()

  _player = new Graph({
    img: img_starship,
    x: (width / 2) - 50,
    y: height - 110,
    w: 100,
    h: 100
  })

  time = {
    min: 0,
    sec: 0,
    ms: 0
  }

  draw() {
    this._player.image()
  }

  move() {
    if (key.isDown('KeyD') && this._player.x < width - 110) this._player.x += player_speed
    if (key.isDown('KeyA') && this._player.x > 10) this._player.x -= player_speed
    if (key.isDown('KeyW') && this._player.y > 10) this._player.y -= player_speed
    if (key.isDown('KeyS') && this._player.y < height - 110) this._player.y += player_speed
  }

  startFire() {
    if (this._bullet.length !== 0) {
      this._bullet.map((el, idx) => {
        if (el.y < -50) {
          this._bullet.splice(idx, 1)
        } else {
          el.image()
          el.y -= bullet_speed
        }
      })
    }

    if (key.isDown('Space') && Date.now() - this._lastFire > 300) {
      this._bullet.push(new Graph({
        img: img_bullet,
        x: this._player.x,
        y: this._player.y,
        w: 100,
        h: 100
      }))

      this._lastFire = Date.now()
    }
  }

  collision(enemy) {
    enemy.map((_enemy, idx) => {
      this._bullet.map(bullet => {
        if (isCollision(
          { x: bullet.x, y: bullet.y, width: 30, height: 20 },
          { x: _enemy.x, y: _enemy.y, width: _enemy.w, height: _enemy.h - 20 }
        )) {
          enemy.splice(idx, 1);
          this.score += 1
        }

        
      })
      
      if (isCollision(
        { x: this._player.x, y: this._player.y, width: this._player.w, height: this._player.h },
        { x: _enemy.x, y: _enemy.y, width: _enemy.w, height: _enemy.h - 20 }
      )) { 
        setGame(gameOver) 
        createScore(this.username, document.querySelector('.time').innerHTML, this.score)
      }
    })
  }

  timer() {
    this.time.ms++

    if (this.time.ms === 100) {this.time.ms = 0; this.time.sec++;}
    if (this.time.sec === 60) {this.time.sec = 0; this.time.min++;}

    document.querySelector('.time').innerHTML = `${this.time.min < 10 ? '0' + this.time.min : this.time.min}:${this.time.sec < 10 ? '0' + this.time.sec : this.time.sec}`
  }
}

class Enemy {

  constructor(count) {
    this._count = count
  }

  _nodes = []
  _lastCreateEnemy = Date.now()

  add(x, speed) {
    this._nodes.push(new Graph({ x, y: -100, w: 100, h: 100, speed, img: img_enemy }))
  }

  draw() {
    if (this._nodes.length < this._count && Date.now() - this._lastCreateEnemy > 1000) {
      this.add(random(0, width - 50), random(1, 3))
      this._lastCreateEnemy = Date.now()
    }

    this._nodes.map((el, idx) => {
      if (el.y > height) {
        this._nodes.splice(idx, 1)
      } else {
        el.image();
        el.y += el.speed;
      }
    })
  }



}