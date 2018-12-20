var express = require('express');
var app = express();
const port = 8080

app.listen(port, () => {
    console.log("Listening on port "+port);
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req,res) => {
    res.render('index');
})