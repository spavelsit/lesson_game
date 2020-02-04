const
  router = require('express').Router(),
  controller = require('../controllers/score')

//localhost:3000/api/score method GET
router.get('/', controller.get_score)

//localhost:3000/api/score/create method POST
router.post('/create', controller.create_score)

module.exports = router