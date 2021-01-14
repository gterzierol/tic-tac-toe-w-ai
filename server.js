const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('this is the test of server working check')
})
app.post('/gameLogger', (req, res)=> {
    const move = req.body;
    console.log(move)
    res.status(200).send(move)
})

app.listen(port,()=>{
    console.log(`server working on port: ${port}!`)
})