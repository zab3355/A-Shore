const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  // setting up if no users
  Account.AccountModel.getUsers(null, (err, docs) => {
    // if no current users
    if (docs.length === 0) {
      Account.AccountModel.generateHash('password', (salt, hash) => {
        const defaultUser = {
          username: 'abcd',
          salt,
          password: hash,
          firstName: 'John',
          lastName: 'Smith',
          email: '1@1.com',
        };
        const newAccount = new Account.AccountModel(defaultUser);
        newAccount.save();
      });
    }
  });

  res.render('login', { csrfToken: req.csrfToken(), title: 'Contract Solutions' });
};


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
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    // B storing data
    req.session.account = Account.AccountModel.toAPI(account);

    return res.json({ redirect: '/app', pageToLoad: 'profile' });
  });
};

const changePassword = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const oldpass = `${req.body.oldpass}`;
  const newpass1 = `${req.body.newpass1}`;
  const newpass2 = `${req.body.newpass2}`;

  if (!username || !oldpass || !newpass1 || !newpass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (newpass1 !== newpass2) {
    return res.status(400).json({ error: 'New Passwords Do Not Match' });
  }

  return Account.AccountModel.authenticate(username, oldpass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }
    return Account.AccountModel.generateHash(newpass1, (salt, hash) => {
      const query = { _id: account._id };
      const updatedAccount = {
        $set: {
          salt,
          password: hash,
        },
      };
      const options = { upsert: false };
      return Account.AccountModel.updateOne(query, updatedAccount, options).then((result) => {
        if (!result.ok) {
          return res.status(400).json({ error: `Could Not Update User ${account.username}` });
        }

        req.session.account = Account.AccountModel.toAPI(account);

        return res.json({ redirect: '/app', pageToLoad: 'profile' });
      });
    });
  });
};

const signup = (request, response) => {
    // ?
    const req = request;
    const res = response;
  
    // casting for security
    req.body.username = `${req.body.username}`;
    req.body.pass = `${req.body.pass}`;
    req.body.pass2 = `${req.body.pass2}`;
  
    // validate
    if (!req.body.username || !req.body.pass || !req.body.pass2) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    if (req.body.pass !== req.body.pass2) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
  
    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
      const accountData = {
        username: req.body.username,
        salt,
        password: hash,
      };
  
      const newAccount = new Account.AccountModel(accountData);
  
      const savePromise = newAccount.save();
  
      savePromise.then(() => {
        req.session.account = Account.AccountModel.toAPI(newAccount);
        return res.json({ redirect: '/maker' });
      });
  
      savePromise.catch((err) => {
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Username is taken' });
        }
        return res.status(400).json({ error: 'An error occured' });
      });
    });
  };

const getToken = (request, response) => {
  const req = request;
  const res = response;
  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };
  res.json(csrfJSON);
};

module.exports = {
  loginPage,
  login,
  logout,
  getToken,
  changePassword,
  signup
};
