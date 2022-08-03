import dotenv from 'dotenv';

import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from "bcryptjs";

import createPhenomena from './seedsPhenomena.js';
import createRoutes from './seedsRoutes.js';

dotenv.config();

mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
  .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`) })
  .catch(err => { console.error("Error connecting to mongo", err) });


let users = [
  {
    username: 'alice',
    email: 'alice@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'bob',
    email: 'bob@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'rebeca',
    email: 'rebeca@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'eduardo',
    email: 'eduardo@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'teresa',
    email: 'teresa@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'ana',
    email: 'ana@hotmail.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  },
  {
    username: 'wannabelieve',
    email: 'wannabelieve@iwtb.com',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10))
  }
];

User.collection.drop();


User.create(users)
  .then(users => {
    console.log(`Created users!`);
    users.map(e => {
      if (e.username === "wannabelieve") {
        createPhenomena(e._id)
          .then((phenoms) => {
            const phenomsIds = phenoms.map(e => e._id.toString());
            return createRoutes(e._id, phenomsIds)
              .then((routes) => {
                mongoose.disconnect();
                return routes;
              })
          })
      }
      return e;
    });
  }).catch((e) => {
    console.log(e, "Error, can't create seeds");
  });
