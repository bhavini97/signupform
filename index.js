const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller/signup');
const {syncDB} = require('./models/centralized');

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/form.html')
})
app.post('/user/signup',controller.addUser);

syncDB().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err=>{
    console.error('error while starting server',err);
});
