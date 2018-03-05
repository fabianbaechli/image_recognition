const base64     = require('base64-img')
const bodyParser = require('body-parser')
const express    = require('express')
const app        = express()

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// TODO: set path
const imagePath          = undefined
let currentProbabilities = undefined
let requestPackage       = {
  requests: [{image: {content:""},
    features: [{type: "LABEL_DETECTION", maxResults: 5}]
  }]
}

const parseImage = path => {
  return base64.base64Sync(path)
}

setInterval(() => {
  requestPackage.requests[0].image.content = parseImage(imagePath)
}, 1000)

app.get("/current_image", (req, res) => {
  res.sendFile(imagePath)
})

app.get("/current_probabilities", (req, res) => {
  if (currentProbabilities) {
    res.send({success: true, current_probabilities: currentProbabilities})
  } else {
    res.send({success: false, current_probabilities: undefined})
  }
})

app.listen(8080, () => {
  console.log("server is listening on port 8008")
})
