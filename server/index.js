const express = require('express');
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
    // settings
    hostname: 'redis-10084.c232.us-east-1-2.ec2.cloud.redislabs.com',
    port: '10084',
};

let redisPASS = 'tZuCwc3EyeEiDO3GUV6YDuvvDBzVhMqL';

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
    secret: 'Are You Shore About This',
    resave: true,
    secure: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
}));

// Put all API endpoints under '/api'
router(app);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
