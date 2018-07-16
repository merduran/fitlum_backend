const usersController = require('../controllers').users;
const authenticationController = require('../controllers').authentication;
const passport = require('passport');
const passportService = require('../service/passport');
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false });
module.exports = (app) => {

	app.get('/api', (req, res) => {
		res.status(200).send({
			message: 'Welcome'
		});
	});
	app.post('/api/sign_in', requireSignIn, authenticationController.signIn);
	app.get('/api/get_users', usersController.listAllUsers);
	app.post('/api/sign_up', authenticationController.signUp);
}