const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts ={};

app.get('/posts', (req,res) => {
    res.status(201).send(`Here are all the posts: ${posts}`);
});

app.post('/posts', async (req,res) => {

    const { title } = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };

    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id, title
        }
    });
    res.status(201).send(posts[id]);
});

app.post('/events', (req,res) => {
    console.log("Recieved Event", req.body.type);
    res.status(201).send();
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Listening on Port',port);
    axios.get('http://event-bus-srv:4005/events')
    .then(response => {
        const events = response.data;
        events.forEach(event=>{
            /*handleEvents here*/
        });
    }).catch (error => {
        console.log(`Error in fetching events ${error}`);
    });
});