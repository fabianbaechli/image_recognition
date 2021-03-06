const base64         = require('base64-img')
const fs             = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const bodyParser     = require('body-parser')
const express        = require('express')
const app            = express()
const ws             = require('express-ws')(app)
const nonce          = require('nonce')

const imageRecognitionUrl =
  "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB5WVcfCzsxhCRfh34jTiubDyEOnP5pXYc"
const imagePath           = "/home/pi/git/image_recognition/scripts/image.jpg"
//const imagePath           = "/Users/yvokeller/Desktop/img.png"

let ws_connections = []
let interval              = undefined
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

const requestGoogleApi = (callback) => {
  var xhr = new XMLHttpRequest()
  xhr.open("POST", imageRecognitionUrl, true)
  xhr.setRequestHeader("Content-type", "application/json")

  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      callback(JSON.parse(xhr.responseText).responses[0].labelAnnotations)
    }
  }
  xhr.send(JSON.stringify(imageRecognitionReq))
}

app.ws('/websocket', (ws, res) => {
  let wsId = nonce()
  ws_connections.push({websocket: ws, id: nonce})

  ws.on('close', () => {
    // filters out the disconnected socket
    ws_connections = ws_connections.filter(connection => {
      connection.id != wsId
    })
  })
})

app.get("/current_image", (req, res) => {
  res.sendFile(imagePath)
})

app.post('/start_interval', (req, res) => {
  if (interval === undefined) {
    analyze()
    }, 5000)
    res.send({ok: true})
  } else {
    res.send({ok: false, error_message: "interval already running"})
  }
})

function analyze(){
  imageRecognitionReq.requests[0].image.content = parseImage(imagePath)

  requestGoogleApi((response) => {
    currentProbabilities = response
    ws_connections.forEach(connection => {
      connection.websocket.send(JSON.stringify({
        success: true,
        current_probabilities: currentProbabilities
      }))
    })
    console.log(currentProbabilities)
  })
}

app.post('/stop_interval', (req, res) => {
  clearInterval(interval)
  interval = undefined
  res.send({ok: true})
})

app.listen(8080, () => {
  console.log("server is listening on port 8008")
})
