const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* Check whether the comment contains orange -> true if orange is present */
const check = (str) => {
    const regex = /\borange\b/i;
    return regex.test(str);  
}

const handleEvent = async(event) => {
    console.log(event.type);
    if(event.type==='CommentCreated'){
        console.log(event.data.status);
        if(event.data.status==='pending'){
            console.log(event);
            const result = check(event.data.content);
            if(result)  event.data.status = 'Rejected';
            else    event.data.status = 'Approved';

            await axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: event.data,
            });
        }
    }
}

app.post('/events', async (req,res) => {
    const event = req.body;
    handleEvent(event);
    return res.status(201).send();
});

const port = process.env.PORT;
app.listen(port, async () => {
    console.log('Listening on port', port);
    axios.get('http://localhost:4005/events')
        .then(response => {
            const events = response.data;
            events.forEach(event => {
                handleEvent(event.event);
            })
        }).catch(err => {
            console.log(`Error in fetching events ${err.message}`);
    });
});