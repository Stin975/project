const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 60*1000, // 1 minute time widow
    max: 5,
    //message: 'Too man login request. Try again later'
    handler: (req, res, next) => {
        let err = new Error('Too man login request. Try again later');
        err.status = 429;
        return next(err);
    }
})