const base64         = require('base64-img')
const fs             = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const bodyParser     = require('body-parser')
const express        = require('express')
const app            = express()

const imageRecognitionUrl = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB5WVcfCzsxhCRfh34jTiubDyEOnP5pXYc"
const imagePath           = "/home/pi/git/image_recognition/scripts/image.jpg"
let currentProbabilities  = undefined
let imageRecognitionReq   =
{
  requests: [{image: {content:""},
    features: [{type: "LABEL_DETECTION", maxResults: 5}]
  }]
}

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

const parseImage = path => {
  let imageFile = fs.readFileSync(path)
  return new Buffer(imageFile).toString('base64')
}

const requestGoogleApi = () => {
  var xhr = new XMLHttpRequest()
  xhr.open("POST", imageRecognitionUrl, true)
  xhr.setRequestHeader("Content-type", "application/json")

  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      return console.log(JSON.parse(xhr.responseText).responses[0].labelAnnotations)
    }
  }
  xhr.send(JSON.stringify(imageRecognitionReq))
}

setInterval(() => {
  imageRecognitionReq.requests[0].image.content = parseImage(imagePath)
  currentProbabilities = requestGoogleApi()
}, 5000)

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
