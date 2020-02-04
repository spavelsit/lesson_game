const 
  express = require('express'),
  body_parser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  morgan = require('morgan')

const score_router = require('./routes/score')

const app = express()

mongoose.connect('mongodb://dev:123456@109.173.118.150/dev', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err))

app.use(morgan('dev'))
app.use(body_parser.urlencoded({extended: true}))
app.use(body_parser.json())
app.use(cors())

//localhost:3000/api/score
app.use('/api/score', score_router)

app.listen(3000, () => console.log('Server has been started on port 3000'))