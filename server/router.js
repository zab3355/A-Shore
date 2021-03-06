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
    app.get('/api/getMessage',controllers.Messages.getMessage);
    app.get('/api/populate', controllers.Messages.populateMessages);
    app.post('/api/addComment', controllers.Messages.addComment);
    app.post('/api/addViewer', controllers.Messages.addViewedBy);
    app.post('/api/addLikeToComment', controllers.Messages.addLikeToComment);
    app.post('/api/addMessage', controllers.Messages.addMessage);
    app.get('/api/addTitles', controllers.Messages.addTitles);

    app.get('/api/populateLocations',controllers.Location.populateLocations);
    app.get('/api/getLocations', controllers.Location.getAllLocations);
    app.get('/api/getLocation', controllers.Location.getLocation);
    app.post('/api/addLocation', controllers.Location.addLocation);

    //POST Requests
    app.post('/api/login',  controllers.Users.login);
    //app.post('/changePassword', mid.requiresSecure, mid.requiresLogout, controllers.Account.changePassword);
    app.post('/api/signup',  controllers.Users.signup);
    app.post('/api/addRelativeLocationUser',  controllers.Users.addRelativeLocationUser);
    app.get('/api/getUsers',controllers.Users.getAllUsers);
    app.post('/api/updateUsername', controllers.Users.changeUsername)


        // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname+'../../dist/A-Shore/index.html'));
    });


}
module.exports = router;
