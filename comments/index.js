const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require("crypto");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res) => {
    res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req,res) => {
    const {content} = req.body;
    const id = randomBytes(4).toString('hex');

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id,content});

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(commentsByPostId[req.params.id]);
});

const port = process.env.PORT;
app.listen(port, (req,res) => {
    console.log("Listening to port", port);    
});