const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req,res) => {
    res.status(201).send(posts);
});

const handleEvent = (type, data) => {
    if(type==="PostCreated"){
        posts[data.id] = {
            id: data.id,
            title:data.title,
            comments: []
        };
    }
    else if(type==="CommentCreated"){
        if(posts[data.postId])  posts[data.postId].comments.push({id:data.id,content:data.content,status:'pending'});
        else    console.log(`Post with Id ${data.postId} not found`);
    }
    else if(type==="CommentUpdated"){

        const comments = posts[data.postId].comments;
        comments.map(comment => {
            if(comment.id===data.id){
                comment.content = data.content;
                comment.status = data.status;
            }
        });

    }
}

app.post('/events', (req,res) => {
    handleEvent(req.body.type,req.body.data);
    res.status(201).send(posts);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on Port', port);
});