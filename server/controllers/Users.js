const axios = require('axios').default;

const models = require('../models');

const { Users } = models;

const getAllUsers = (req, res) => Users.UserModel.getAllUsers((err, docs) => {
  if (err || !docs) {
      console.log(err)
    return res.status(404).json({ error: 'No users Found' });
  }

  return res.json({data: docs});
});


const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (request, response) => {
  // ?
  const req = request;
  const res = response;

  // casting our roles
  const username = `${req.body.username}`;
  const code = `${req.body.code}`;

  if (!username || !code) {
    return res.status(400).json({ error: 'User name and Login Code are required' });
  }

  return Users.UserModel.checkLogin(username, code, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or code' });
    }
    console.log('logged in')
    // B storing data
    req.session.account = Users.UserModel.toAPI(account);

    return res.json(account);
  });
};

//https://www.programiz.com/javascript/examples/generate-random-strings
const generateString = (length) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}


const signup = (request, response) => {
    // ?
    const req = request;
    const res = response;
  
    // casting for security
    req.body.username = `${req.body.username}`;
    req.body.lat = `${req.body.lat}`;
    req.body.lng = `${req.body.lng}`;
  
    // validate
    if (!req.body.username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    //username and code
    let data = {
        username: req.body.username,
        loginCode: generateString(6)
    }
    //if coords
    if (req.body.lat != 'undefined' && req.body.lng != 'undefined') {
        let coords = {
          lat: req.body.lat,
          lng: req.body.lng
        };
        //post em
        axios({
          method: 'post',
          url: `${req.protocol}://${req.get('host')}/api/addLocation`,
          data: JSON.stringify(coords)
        })
        .then((result) => {
          //toast em
            data.locId = result.data.location._id;
            return addUser(data, req, res);
        }).catch((err) => {
          //whoops
            console.log(err.message);
        })
    } else {
      //add no loc
      return addUser(data, req, res);
    }
    
};

const addUser  = (data, req, res) => {
  const newAccount = new Users.UserModel(data);

  newAccount.save()
  .then(() => {
    req.session.account = Users.UserModel.toAPI(newAccount);
    return res.json(newAccount);
  })
  .catch((err) => {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is taken' });
    }
    return res.status(400).json({ error: 'An error occured' });
  });
}



module.exports = {
  login,
  logout,
  signup,
  getAllUsers
};
