const express = require('express')
const router = express.Router();
const homeController = require('../controller/home_controller');
const passport = require('passport');
const notesController = require('../controller/notes_controller');
const profileController = require('../controller/profile_controller');

router.get('/', homeController.home);
router.post('/sign-up', homeController.signUp);
router.get('/verify-account/:token', homeController.confirmVerification);
router.post('/forgot-password', homeController.forgotPassword);
router.get('/reset-password/:token', homeController.resetPasswordView);

router.post('/change-password', homeController.resetPassword);

router.post('/login', homeController.login );
router.get('/notes', passport.checkAuthentication, homeController.loadNotes);

router.get('/logout', homeController.logout);

router.post('/create-note', passport.checkAuthentication, notesController.createNote);
router.get('/show-notes', passport.checkAuthentication, notesController.showNotes);
router.post('/update-note', passport.checkAuthentication, notesController.updateNotes);
router.post('/get-note', passport.checkAuthentication, notesController.getNote);
router.get('/delete-note/:id', passport.checkAuthentication, notesController.deleteNote);
router.get('/profile', passport.checkAuthentication, profileController.getProfilePage);

router.post('/update-username', passport.checkAuthentication, profileController.updateUsername);
router.post('/update-password', passport.checkAuthentication, profileController.updatePassword);
router.post('/update-email', passport.checkAuthentication, profileController.updateEmail);
router.get('/verify-email/:token', profileController.verifyEmail);


module.exports = router;