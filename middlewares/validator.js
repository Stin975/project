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