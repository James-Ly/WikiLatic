const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.new_user = async (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    let result = await user.save();
    res.status(201).json({message: 'Registration successful'})
}

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email, password: req.body.password}, {_id: 1}).exec();
        let token = jwt.sign({user: user._id}, 'secret', {expiresIn: 7200});
        res.status(202).json({
        message: 'Successfuly signed in',
        token: token
    });
    } catch (error) {
        res.status(401).json({
            message: "Invalid credentials"
        })
    }
}