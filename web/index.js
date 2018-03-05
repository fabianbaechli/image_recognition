const express = require('express')
const app     = express()

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(8080, () => {
  console.log("server is listening on port 8008")
})
