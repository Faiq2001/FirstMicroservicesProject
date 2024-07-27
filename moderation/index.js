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

app.post('/events', async (req,res) => {
    const event = req.body;
    if(event.type==='CommentCreated'){
        const result = check(event.data.content);
        console.log(result, event.data.content);
        if(result)  event.data.status = 'Rejected';
        else    event.data.status = 'Approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: event.data,
        });
    }
    return res.status(201).send();
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on port', port);
});