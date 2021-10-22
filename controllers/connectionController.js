const model = require('../models/connections');


exports.index = (req, res)=>{
    //res.send('send all stories');
    let connections = model.find();
    res.render('./connections/index', {connections});
};

exports.show = (req, res, next)=>{
    // res.send('send story with id ' + req.params.id);
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
     res.render('./connections/connection', {connection});
    } else {
     let err = new Error('Cannot find story with id ' + id);
     err.status = '404';
     next(err);
    }
 };

 exports.delete = (req, res, next)=>{
    let id = req.params.id;
    
    if( model.deleteById(id)) {
     res.redirect('/connections');
     }  else {
         let err = new Error('Cannot find story with id ' + id);
         err.status = '404';
         next(err);
 }
 };

 exports.new = (req, res)=>{
    res.render('./connections/newConnection')
};

exports.create = (req, res)=>{
    //res.send('Created a new story')
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
    console.log(req.body);
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    
    let connections = model.findById(id);
    if(connections){
        res.render('./connections/edit', {connections});
       } else {
        let err = new Error('Cannot find story with id ' + id);
    err.status = '404';
    next(err);
       }
       
};


exports.update = (req, res, next)=>{
    let connection = req.body;
    console.log(req.body);
    let id = req.params.id;
   if( model.updateById(id, connection)) {
       res.redirect('/connections/'+id);
   }  else {
    let err = new Error('Cannot find story with id ' + id);
    err.status = '404';
    next(err);
   }
};