require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const path = require('path');
const mongoose = require('mongoose');
const compression = require('compression');
const session = require('express-session')
const router = require("./router");
const bodyParser = require('body-parser');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const url = require('url');
//https://daveceddia.com/deploy-react-express-app-heroku/
const app = express();
app.use(cors());

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/theShore'

// mongoose setup
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

mongoose.connect(dbURL, mongooseOptions, (err) => {
    if (err) {
        throw err;
    }
});

// REDIS
let redisURL = {
    hostname: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
};
let redisPASS = process.env.REDIS_PASSWORD;

// for heroku
const passIndex = 1;
if (process.env.REDISCLOUD_URL) {
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisPASS = redisURL.auth.split(':')[passIndex];
}

const redisClient = redis.createClient({
    host: redisURL.hostname,
    port: redisURL.port,
    password: redisPASS,
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../A-Shore')));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));


app.use(session({
    key: 'sessionid',
    store: new RedisStore({
      client: redisClient,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    secure: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
}));

//Handling pre-flight requests
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  
    if(req.method === 'OPTIONS'){
        res.status(204).send();
    }else{
        next();
    }
  })

// Put all API endpoints under '/api'
router(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
