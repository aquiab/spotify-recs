const express = require("express")
const path = require('path')
const app = express()
const cors = require("cors")
const logger = require("morgan")
const artistsRouter = require("./routes/artists")
const publicPath = path.join(__dirname, '..', 'build')
const port = process.env.PORT || 3001


app.use(logger('dev'))
app.use(cors())
app.use(express.json()) // maybe useless
app.use(express.urlencoded({ extended: true })) // maybe useless
app.use(express.static(publicPath))
app.use("/artists", artistsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(port, function() {
  console.log("Runnning on " + port)
})

module.exports = app