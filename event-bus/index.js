const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req,res) => {
    const event = req.body;

    console.log(event);
    
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);

    res.send( { status:'OK' });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Listening on port", port);
});