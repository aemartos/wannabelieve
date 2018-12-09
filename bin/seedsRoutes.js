const mongoose = require('mongoose');
const Route = require('../models/Route');

mongoose.connect("mongodb://localhost/project-02-ironhack", {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});


let routes = [
  {
    routetitle: 'UFO sightings',
    description: 'If you have never seen a UFO and want too... then watch seven sunsets in a row and I promise you will see something that cannot be explained away.',
    creator: creatorId,
    phenomsId: []
  }
];

Route.collection.drop();

Route.create(routes)
  .then(routes => {console.log(`Created routes!`)})
  .then(() => {mongoose.disconnect()});
