const games = require('../models/connections')

//check if user is a guest
exports.isGuest = (req, res, next)=> {
    if(!req.session.user){
        return next();
    } else {
         req.flash('error', 'You are logged in already');
         return res.redirect('/users/profile');
     }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    } else {
         req.flash('error', 'You need to login in first');
         return res.redirect('/users/login');
     }
};

//check if user is author
exports.isAuthor = (req, res, next)=>{
    let id  = req.params.id
    games.findById(id)
    .then(games=>{
        if(games.host == req.session.user){
            return next();
        }else {
            let err = new Error('Unauthorized to access the resource')
            err.status = 401;
            return next(err);
        }
    })
    .catch(err=>next(err));
    
};
exports.isNotAuthor = (req, res, next)=>{
    let id  = req.params.id
    games.findById(id)
    .then(games=>{
        if(games.host != req.session.user){
            return next();
        }else {
            let err = new Error('Unauthorized to access the resource')
            err.status = 401;
            return next(err);
        }
    })
    .catch(err=>next(err));
    
};