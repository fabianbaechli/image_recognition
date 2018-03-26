const backendURL = window.location.host

const protocol = "ws://"
const ws = new WebSocket(protocol + backendURL + "/websocket", 'echo-protocol');

ws.onopen = () => {
  console.log("ws open")

  ws.onmessage = (event) => {
    data = JSON.parse(event.data);

    console.log('Data: ' + data)
  }
}

function analyzeImage() {
  // server unaviable, overwrite if not
  document.getElementById("placeholder_state").innerHTML = '<div class="card-panel grey lighten-3">Server Unaviable!</div>'
  document.getElementById("placeholder_img").innerHTML = ''

  backendGet("http://raspi.local:8080/current_probabilities", (response) => {
    console.log('stringifed: ' + JSON.stringify(response))

    var data = response.current_probabilities

    var html = '<div class="row">'
    for(var i = 0; i < data.length; i++) {
      var score, desc
      score = Math.round(data[i].score * 100)
      desc = data[i].description

      html += '<div class="col s3 m2 l2">'
      html += desc
      html += '</div>'

      html += '<div class="col s8 m9 l9"> <div class="progress">'
      html += '<div class="determinate" style="width: ' + score + '%">'
      html += '</div> </div> </div>'

      html += '<div class="col s1 m1 l1">'
      html += score + '%'
      html += '</div>'
    }
    html += '</div>'

    if(data.length > 0){
      // connection state
      document.getElementById("placeholder_state").innerHTML = '<div class="card-panel green lighten-3">Connected.</div>'

      // probability list
      document.getElementById("placeholder_probabilities").innerHTML = html

      // image
      document.getElementById("placeholder_img").innerHTML = '<img src="http://' + backendURL + '/current_image" class="responsive-img">'
    }

  })
}

function startRecognition(){

  backendPost("/start_interval", {}, (response) => {
    console.log('started interval! ' + response)

    document.getElementById("start").style.display = 'none';
    document.getElementById("stop").style.display = 'inline';

    Materialize.toast("Started Recognition. New results will be loaded every five seconds.", 4000);
  })

}

function stopRecognition(){

  backendPost("/stop_interval", {}, (response) => {
    console.log(response)

    document.getElementById("stop").style.display = 'none';
    document.getElementById("start").style.display = 'inline';

    Materialize.toast("Stopped Recognition.", 4000);
  })
}

function backendGet(route, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", route, true)
  xhr.addEventListener("load", () => {
    callback(JSON.parse(xhr.responseText, xhr))
  })
  xhr.send()
}

function backendPost(route, payload, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open("POST", route, true)
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.addEventListener("load", () => {
    callback(JSON.parse(xhr.responseText, xhr))
  })
  xhr.send(JSON.stringify(payload))
}
