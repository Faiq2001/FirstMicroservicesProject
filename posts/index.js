const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts ={};

app.get('/posts', (req,res) => {
    res.status(201).send(posts);
});

app.post('/posts', (req,res) => {

    const { title } = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };

    res.status(201).send(posts[id]);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on Port',port);
});