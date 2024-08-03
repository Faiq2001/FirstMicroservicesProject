const express =  require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if(type==="PostCreated"){
        console.log("Inside Post Creation event handler", posts);
        posts[data.id] = {
            id: data.id,
            title:data.title,
            comments: []
        };
        console.log(posts);
    }
    else if(type==="CommentCreated"){
        console.log("Inside Comment Creation event handler")
        if(posts[data.postId])  posts[data.postId].comments.push({id:data.id,content:data.content,status:'pending'});
        else    console.log(`Post with Id ${data.postId} not found`);
    }
    else if(type==="CommentUpdated"){
        console.log("Inside Comment Updation event handler")
        const comments = posts[data.postId].comments;
        comments.map(comment => {
            if(comment.id===data.id){
                comment.content = data.content;
                comment.status = data.status;
            }
        });
    }
}

app.get('/posts', (req,res) => {
    res.status(201).send(posts);
});

app.post('/events', (req,res) => {
    console.log("Post Creating Requested", req.body);
    handleEvent(req.body.type,req.body.data);
    res.status(201).send(posts);
});

const port = process.env.PORT||4002;
app.listen(port, () => {
    console.log('Listening on Port', port);
    axios.get('http://event-bus-srv:4005/events')
        .then(response => {
            const events = response.data;
            events.forEach(event => {
                // console.log(event);
                handleEvent(event.event.type, event.event.data)
            })
        })
        .catch (error => {
            console.log("Error in fetching events", error.message);
    });
});