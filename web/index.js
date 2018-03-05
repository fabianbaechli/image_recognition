const base64     = require('base64-img')
const bodyParser = require('body-parser')
const express    = require('express')
const app        = express()

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// TODO: set path
const imagePath = undefined
let base64Image = undefined

const parseImage = path => {
  return base64.base64Sync(path)
}

setInterval(() => {
  base64Image = parseImage(imagePath)
}, 1000)

app.listen(8080, () => {
  console.log("server is listening on port 8008")
})
