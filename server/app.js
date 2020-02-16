const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const shibes = require('./routers/shibes')
const cats = require('./routers/cats')
const birds = require('./routers/birds')
const animals = require('./routers/animals')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public/dist'))

app.use(shibes)
app.use(birds)
app.use(cats)
app.use(animals)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/../index.html`))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
