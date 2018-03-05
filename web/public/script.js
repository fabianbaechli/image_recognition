const protocol = "ws://"
const backendURL = window.location.host

function analyzeImage() {
  backendPost("/image_data", (response) => {
    console.log(response)

    for(var attributename in myobject){
      console.log(attributename+": "+myobject[attributename]);
    }
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
