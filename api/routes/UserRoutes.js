var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require('../db/mongoose');

var UserController = require('../controllers/UserController')

router.use(function (req, res, next) { next(); });

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), UserController.getList)
    .post(passport.authenticate('bearer', { session: false }), UserController.getList)

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }), UserController.getById)
    .put(passport.authenticate('bearer', { session: false }), UserController.update)
    .delete(passport.authenticate('bearer', { session: false }), UserController.delete)

router.get('/info', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope
        });
    }
);

module.exports = router;