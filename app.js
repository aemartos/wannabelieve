const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
dotenv.config({
  path: path.join(__dirname, '.private.env')
});
dotenv.config({
  path: path.join(__dirname, '.public.env')
});

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const app = express();



// Middleware Setup
app.enable("trust proxy");
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  outputStyle: 'extended',
  sourceMap: false
}));
//outputStyle: 'compressed' --> compress style
//debug: true --> to show errors
//indentedSyntax: true --> to read .sass files


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


hbs.registerHelper('ifUndefined', (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

hbs.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
      new RegExp(' value=\"' + selected + '\"'),
      '$& selected="selected"');
});


// default value for title local
app.locals.title = 'wannabelieve';


// Enable authentication using session + passport
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}))
app.use(flash());
require('./passport')(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  let messages = [...req.flash('error'), ...req.flash('info')];
  //console.log(messages);
  res.locals.messages = messages;
  next();
});

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/userProfile');
app.use('/', userRoutes);

const phenomRoutes = require('./routes/phenomena');
app.use('/', phenomRoutes);

const mapRoutes = require('./routes/mapRoutes');
app.use('/map', mapRoutes);

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const routesRoutes = require('./routes/routesRoutes');
app.use('/routes', routesRoutes);

module.exports = app;
