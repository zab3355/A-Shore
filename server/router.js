const path = require('path');

const controllers = require('./controllers');
const mid = require('./middleware');
// const upload = require('./middleware/upload');

const router = (app) => {
    //GET Requests
    // app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    // app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.get('/api/passwords', controllers.Test.getPasswords);
    app.get('/api/getMessages',controllers.Messages.getAllMessages);
    app.get('/api/populate', controllers.Messages.populateMessages);

    app.get('/api/populateLocations',controllers.Location.populateLocations);
    app.get('/api/getLocations', controllers.Location.getAllLocations);
    app.post('/api/addLocation', controllers.Location.addLocation);

    //POST Requests
    app.post('/api/login',  controllers.Users.login);
    //app.post('/changePassword', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);
    app.post('/api/signup',  controllers.Users.signup);
    app.get('/api/getUsers',controllers.Users.getAllUsers);


        // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'../../dist/A-Shore/index.html'));
    });


}
module.exports = router;
