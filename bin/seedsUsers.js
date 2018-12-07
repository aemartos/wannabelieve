const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '.private.env')});


const mongoose = require('mongoose');
const User = require('../models/User');


mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});


let users = [
  {
    username: 'alice',
    email: 'alice@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  },
  {
    username: 'bob',
    email: 'bob@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  },
  {
    username: 'rebeca',
    email: 'rebeca@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  },
  {
    username: 'eduardo',
    email: 'eduardo@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  },
  {
    username: 'teresa',
    email: 'teresa@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  },
  {
    username: 'ana',
    email: 'ana@hotmail.com',
    password:  bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
  }
];

User.collection.drop();

User.create(users)
  .then(users => {console.log(`Created users!`)})
  .then(() => {mongoose.disconnect()});
