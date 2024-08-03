const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];

app.get('/events', (req,res) => {
    console.log("Get All Events");
    res.status(201).send(events);
});

app.post('/events', (req,res) => {
    const event = req.body;
    events.push({event});
    
    axios.post("http://posts-clusterip-srv:4000/events", event).catch(err => console.log("Unable to send request to post service"));
    axios.post("http://comments-srv:4001/events", event).catch(err => console.log("Unable to send request to comment service"));
    axios.post("http://query-srv:4002/events", event).catch(err => console.log("Unable to send request to query service"));
    axios.post("http://moderation-srv:4003/events", event).catch(err => console.log("Unable to send request to moderation service"));

    res.send( { status:'OK' });
});

const port = process.env.PORT||4005;
app.listen(port, () => {
    console.log("Listening on port", port);
});