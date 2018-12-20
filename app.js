var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost:27107/NodeBlog");

const port = 8080

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var postSchema = new mongoose.Schema({body: String});
var Post = mongoose.model('Post', postSchema);

app.get("/", (req,res) => {
    Post.find({}, (err, posts) => {
        res.render('index', {posts:posts});
    });
});

app.post('/addpost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then(result => {
        res.redirect('/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.listen(port, () => {
    console.log("Listening on port "+port);
})
