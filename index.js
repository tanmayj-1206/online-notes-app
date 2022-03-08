const express = require('express')
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const db = require('./config/mongoose');
const passportLocal = require('./config/passport-local-strategy');
const passport = require('passport');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(require('express-session')({
  name: 'notes', 
  secret: 'keyboard cat', 
  resave: true, 
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  } ,
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb://localhost:27017/notes-app-development',
      autoRemove: 'disabled'
    }
  )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



app.use('/', require('./routes/index'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})