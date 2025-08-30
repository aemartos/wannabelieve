import path from "path";
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import hbs from 'hbs';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import passport from './passport/index.js';
import * as sass from 'sass';
import fs from 'fs';

import session from "express-session";
import MongoStore from 'connect-mongo';
import flash from "connect-flash";

import debug from 'debug';

// Routes imports
import index from './routes/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userProfile.js';
import phenomRoutes from './routes/phenomena.js';
import mapRoutes from './routes/mapRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import routesRoutes from './routes/routesRoutes.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

// debug(`wannabelieve: ${path.basename(__filename).split('.')[0]}`);

// MongoDB connection - non-blocking
const connectDB = async () => {
  try {
    const x = await mongoose.connect(process.env.DBURL || 'mongodb://localhost:27017/wannabelieve');
    console.log(`✅ Connected to Mongo! Database name: "${x.connections[0].name}"`);
  } catch (err) {
    console.error('❌ Error connecting to mongo:', err.message);
    console.log('💡 Make sure MongoDB is running or set DBURL environment variable');
    console.log('🚀 Server will continue running but database features will not work');
  }
};

// Connect to database in background
connectDB();


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

// SASS compilation middleware (development only)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    if (req.path.endsWith('.css')) {
      const sassPath = req.path.replace('.css', '.sass');
      const fullSassPath = path.join(__dirname, 'public', sassPath);
      const fullCssPath = path.join(__dirname, 'public', req.path);
      
      try {
        if (fs.existsSync(fullSassPath)) {
          const result = sass.compile(fullSassPath, {
            style: 'expanded',
            loadPaths: [path.join(__dirname, 'public', 'stylesheets', 'sass')]
          });
          
          // Ensure CSS directory exists
          const cssDir = path.dirname(fullCssPath);
          if (!fs.existsSync(cssDir)) {
            fs.mkdirSync(cssDir, { recursive: true });
          }
          
          fs.writeFileSync(fullCssPath, result.css);
        }
      } catch (error) {
        console.error('SASS compilation error:', error);
      }
    }
    next();
  });
}


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

hbs.registerHelper('select', function (selected, options) {
  return options.fn(this).replace(
    new RegExp(' value=\"' + selected + '\"'),
    '$& selected="selected"');
});


// default value for title local
app.locals.title = 'wannabelieve';


// Enable authentication using session + passport
app.use(session({
  secret: process.env.SECRET || 'fallback-secret-key',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DBURL || 'mongodb://localhost:27017/wannabelieve',
    ttl: 24 * 60 * 60 // 1 day
  })
}))
app.use(flash());
passport(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  let messages = [...req.flash('error'), ...req.flash('info')];
  //console.log(messages);
  res.locals.messages = messages;
  next();
});

app.use('/', index);
app.use('/auth', authRoutes);
app.use('/', userRoutes);
app.use('/', phenomRoutes);
app.use('/map', mapRoutes);
app.use('/api', apiRoutes);
app.use('/routes', routesRoutes);

export default app;
