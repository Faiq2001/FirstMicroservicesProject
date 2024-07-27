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
    res.status(201).send(posts);
});

app.post('/posts', async (req,res) => {

    const { title } = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };

    await axios.post("http://localhost:4005/events", {
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

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on Port',port);
    axios.get('http://localhost:4005/events')
    .then(response => {
        const events = response.data;
        events.forEach(event=>{
            /*handleEvents here*/
        });
    }).catch (error => {
        console.log("Unable to get events", error);
    });
});