const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
/* const exercisesRouter = require('./routes/auth.routes') */    //exercise.routes


app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))


app.use('/api/users',require('./routes/auth.routes'))
/* app.use('/exercise',exercisesRouter) */

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,

    })
    app.listen(PORT, () => console.log(`app has on port ${PORT}...`))
  } catch (e) {
    console.log('server error', e.message)
    process.exit(1)
  }
}
start()
