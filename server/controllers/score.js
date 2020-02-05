const Score = require('../models/Score')

module.exports.get_score = async function(req, res) {
  try {
    const scores = await Score.find().limit(9).sort({score: -1})
    res.status(200).json({
      status: true,
      scores
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err
    })
  }
}

module.exports.create_score = async function(req, res) {
  try {
    await new Score({
      name: req.body.name,
      score: req.body.score,
      time: req.body.time
    }).save()

    res.status(201).json({
      status: true,
      message: 'Score added'
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err
    })
  }
}