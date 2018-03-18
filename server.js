const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'karen',
    password : '',
    database : 'smart-brain'
  }
});

/*
db.select('*').from('users').then(data =>{
	console.log(data);
});
*/

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res)=> { res.send(database.users) })

//FOR SIGNING IN USERS
app.post('/signin', (req, res) =>{signin.handleSignin(req,res,db,bcrypt)});




//FOR REGISTERING USERS
app.post('/register', (req,res) =>{register.handleRegister(req,res,db,bcrypt)});




//FOR PROFILE ID'S
app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req,res,db)});



//FOR IMAGE RANKING
app.put('/image', (req,res) =>{image.handleImage(req,res,db)});

app.post('/imageurl', (req,res) =>{image.handleApiCall(req,res)});

app.listen(process.env.PORT || 3000, () =>{
	console.log(`app is running on port ${process.env.PORT}`);
})

