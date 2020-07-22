const express = require('express');
const user = require('../models/schems');
const {
    registerValidation,
    loginValidation
} = require('../config/validation');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// create router
const router = express.Router();

router.post('/register', (req, res) => {
    // res.send('register user');

    // validation
    const {
        error, // name must be error
    } = registerValidation(req.body);

    if (error) {
        return res.send(error.details[0].message);
    } else {
        // res.send('ok');
        // check email is already regiser
        user
            .findOne({
                email: req.body.email,
            })
            .then((us) => {
                if (us) {
                    //is user exits
                    res.status(400).send('Email is already register');
                } else {
                    // if user not exits in database
                    const newUser = new user({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    });
                    // chenage simple password to hash
                    bcryptjs.genSalt(10, (err, salt) => {
                        bcryptjs.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;
                            newUser
                                .save()
                                .then((saveuser) => {
                                    res.send({
                                        user: saveuser._id,
                                    });
                                })
                                .catch((err) => {
                                    res.status(400).send(err);
                                });
                        });
                    });
                }
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }
});

router.post('/login', (req, res) => {
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        // check if email is not register
        user
            .findOne({
                email: req.body.email,
            })
            .then((us) => {
                //if email is not register
                if (!us) {
                    return res.status(400).send('Email is not register');
                } else {
                    //if register than match password
                    bcryptjs.compare(req.body.password, us.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            //if password is matched
                            // return res.status(200).send(us);
                            // create toekn for user who logged in

                            const token = jwt.sign({
                                    _id: us._id,
                                },
                                process.env.TOKEN_SECRET
                            );

                            res.header('auth-token', token).send(token);

                        } else {
                            //if no matched password
                            return res.status(400).send('password is not matched');
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
});
module.exports = router;