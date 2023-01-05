const express = require('express')
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')   // you need this for layouts
const ExpressError = require('./utils/expressError') // the class thing
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')


const phones = require('./router/phones')
const reviews = require('./router/reviews')
const users = require('./router/users')


mongoose.set('strictQuery', true); // this is not important it is required to hide a warning will delete later

mongoose.connect('mongodb://localhost:27017/myCrud');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('Database connected');
});


const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // needed to join paths

app.use(express.urlencoded({ extended: true })) // needed to parse req.body
app.use(methodOverride('_method')) // needed for edit/delete form
app.use(express.static(path.join(__dirname, 'public'))) // WE NEED THIS SO WE CAN USE OUR OWN JS/CSS VERY IMPORTANT

const sessionConfig = {
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})




app.use('/', users)

app.use('/phones', phones)

app.use('/phones/:id/reviews', reviews)




app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/user/:userId/')

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})


app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong'
    res.status(statusCode).render('error', { err })
})




app.listen(3000, () => {
    console.log('Listening on 3000');
})