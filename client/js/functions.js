const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isCollision(rect1 = {}, rect2 = {}) {
  return rect1.x < rect2.x + rect2.width && 
    rect1.x + rect1.width > rect2.x && 
    rect1.y < rect2.y + rect2.height && 
    rect1.y + rect1.height > rect2.y
}

async function createScore(name, time, score) {
  return await fetch('http://localhost:3000/api/score/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    body: JSON.stringify({name, time, score})
  })
}

async function getScore() {
  return await fetch('http://localhost:3000/api/score')
    .then(res => res.json())
}