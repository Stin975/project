//check if user is author
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
exports.validateId = (req, res, next)=>{
    let id  = req.params.id
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
    
};

exports.validateRsvp = [body('rsvp').isIn(['YES','NO','MAYBE'])];

exports.validateSignUp = [
    body('firstName', 'First name can not be empty').notEmpty().trim().escape(),
    body('lastName', 'Last name can not be empty').notEmpty().trim().escape(),
    body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be aleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})
];

exports.validateLogin = [body('email', 'Email must be valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be aleast 8 characters and at most 64 characters').isLength({min: 8, max: 64})];

exports.validateStory = [
    body('title', 'Title can not be empty').notEmpty().trim().escape(),
    body('content', 'Content can not be empty and has to be more than 10 characters').trim().escape().isLength({min: 10}),
    body('topic', 'Topic can not be empty').notEmpty().trim().escape(),
    body('date', 'Date can not be empty').notEmpty().trim().escape(),
    body('startTimeM', 'Start Time can not be empty').notEmpty().trim().escape(),
    body('endTimeM', 'End Time can not be empty').notEmpty().trim().escape(),
    body('image', 'Image URL can not be empty').notEmpty().trim().escape()

];

exports.validateResults = (req, res, next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}