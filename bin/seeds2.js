const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '.private.env')});

const mongoose =  require('mongoose');

const User = require('../models/User');
const Route = require('../models/Route');

const bcrypt = require("bcryptjs");


mongoose.connect('mongodb://localhost/project-02-ironhack', {useNewUrlParser: true})
  .then(() => console.log(`Connected to project-02-ironhack`));


let users = [
  {
    username: 'alice',
    email: 'alice@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  },
  {
    username: 'bob',
    email: 'bob@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  },
  {
    username: 'rebeca',
    email: 'rebeca@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  },
  {
    username: 'eduardo',
    email: 'eduardo@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  },
  {
    username: 'teresa',
    email: 'teresa@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  },
  {
    username: 'ana',
    email: 'ana@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    facebookID: null,
    googleID: null
  }
]

User.collection.drop();
//Route.collection.drop();

User.create(users)
  .then(boss => {console.log(`Created users!`)})
  .then(() => {mongoose.disconnect()});
