const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require("crypto");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res) => {
    res.status(201).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req,res) => {
    const {content} = req.body;
    const id = randomBytes(4).toString('hex');
    const postId = req.params.id;
    
    const comments = commentsByPostId[postId] || [];
    comments.push({id,content,status:'pending'});

    commentsByPostId[postId] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "CommentCreated",
        data: {
            status: 'pending',
            id,
            content,
            postId
        }
    });

    res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', async (req,res) => {

    if(req.body.type==='CommentModerated'){
        await axios.post('http://localhost:4005/events',{
            type: 'CommentUpdated',
            data: req.body.data
        });
    }

    res.status(201).send();
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening to port", port);    
});