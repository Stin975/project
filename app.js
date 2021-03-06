// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoutes = require('./routes/mainRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const mogoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/userRoutes');
const flash = require('connect-flash');


//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine','ejs');

//connecting to database
mogoose.connect('mongodb://localhost:27017/project', 
{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

app.use(
    session({
        secret: "this is a secret10",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/project'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.firstName = req.session.firstName;
    res.locals.lastName = req.session.lastName;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));


//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/connections', connectionRoutes);
app.use('/users', userRoutes);
app.use('/', mainRoutes);



app.use((req, res, next)=>{
    let err = new Error('The sever cannot locate ' + req.url);
    err.status = '404';
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = '500';
        err.message = ("Internal server error")
    }

    res.status(err.status);
    res.render('error', {error: err});
});

//start the server
