const model = require('../models/connections');
const rsvpModel = require('../models/rsvp');
const { DateTime } = require("luxon");

exports.index = (req, res, next) => {
    //res.send('send all stories');
    model.find()
        .then(games => res.render('./connections/index', { games }))
        .catch(err => next(err));

};

exports.show = (req, res, next) => {
    // res.send('send story with id ' + req.params.id);
    let id = req.params.id;
    /*if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id ');
        err.status = 400;
        return next(err);
    }*/
    Promise.all([model.findById(id).populate('host', 'firstName lastName'), rsvpModel.count({connection:id, rsvp:"YES"})])
        .then((results) => {
            const [games, rsvps] = results;
            if (games) {
                res.render('./connections/connection', { games, rsvps })
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    /*
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            let err = new Error('Invalid connection id ');
            err.status = 400;
            return next(err);
        }*/

    Promise.all([model.findByIdAndDelete(id, { useFindAndModify: false }), rsvpModel.deleteMany({connection:id})])
        .then(game => {
            if (game) {
                req.flash('success', 'Successfully deleted connection and associated RSVPs')
                res.redirect('/connections/');
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
};

exports.new = (req, res) => {
    res.render('./connections/newConnection')
};

exports.create = (req, res, next) => {
    //res.send('Created a new story')
    let game = req.body;

    let time = game.startTimeM.split(':');
    game.startTime = DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);
    time = game.endTimeM.split(':');
    game.endTime = DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);

    let Game = new model(game);// create a new story document
    Game.host = req.session.user;
    Game.save()// insert the new document
        .then(Game => res.redirect('/connections'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
                req.flash('error', 'Validation Error');
                res.redirect('back');
            }
            next(err);
        });
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id ');
        err.status = 400;
        return next(err);
    }
    */
    model.findById(id)
        .then((games) => {
            if (games) {
                res.render('./connections/edit', { games })
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));

};


exports.update = (req, res, next) => {
    let game = req.body;

    let time = game.startTimeM.split(':');
    game.startTime = DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);
    time = game.endTimeM.split(':');
    game.endTime = DateTime.local(1972, 1, 1, parseInt(time[0]), parseInt(time[1])).toLocaleString(DateTime.TIME_SIMPLE);

    let id = req.params.id;
    /*
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid connection id ');
        err.status = 400;
        return next(err);
    }*/

    model.findByIdAndUpdate(id, game, { useFindAndModify: false, runValidators: true })
        .then((game) => {
            if (game) {
                res.redirect('/connections/' + id);
            } else {
                let err = new Error('Cannot find a connection with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400;
                req.flash('error', 'Validation Error');
                res.redirect('back');
            }
            next(err)
        });
};

exports.editRsvp = (req, res, next) => {

    let id = req.params.id;
    rsvpModel.findOne({ connection: id, user:req.session.user }).then(rsvp => {
        if (rsvp) {
            rsvpModel.findByIdAndUpdate(rsvp._id, { rsvp: req.body.rsvp }, { userFindAndModify: false, runValidators: true })
                .then(rsvp => {
                    req.flash('success', 'Successfully updated RSVP');
                    res.redirect('/users/profile');
                })
                .catch(err => {
                    if (err.name === 'ValidationError') {
                        req.flash('error', 'Validation Error');
                        res.redirect('back');
                    }
                    next(err);
                });
        } else {
            let rsvp = new rsvpModel({
                connection: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
                .then(rsvp => {
                    req.flash('success', 'Successfully created RSVP');
                    res.redirect('/users/profile');
                })
                .catch(err => {
                    req.flash('error', err.message);
                    next(err);
                });
        }
    })

};

exports.deleteRsvp = (req, res, next) =>{
    let id = req.params.id;
    rsvpModel.findOneAndDelete({connection:id,user:req.session.user})
    .then(rsvp=>{
        req.flash('success', 'Successfully deleted RSVP')
        res.redirect('/users/profile')
    })
    .catch(err => {
        req.flash('error', err.message);
        next(err);
    });
}