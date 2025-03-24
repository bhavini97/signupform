const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controller/signupLogin');
const {syncDB} = require('./models/centralized');

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/form.html')
})
app.post('/user/signup',controller.addUser);

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html');
})

app.post('/user/login',controller.loginUser);

syncDB().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err=>{
    console.error('error while starting server',err);
});
