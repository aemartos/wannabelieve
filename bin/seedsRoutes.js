const mongoose = require('mongoose');
const Route = require('../models/Route');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});



let routes = [
  {
    routetitle: 'UFO sightings',
    //phenomsId: [{_id: "5c14bfbadde3760898eda62b"}, {_id: "5c14bfbadde3760898eda62c"}, {_id: "5c14bfbadde3760898eda62d"}, {_id: "5c14bfbadde3760898eda62e"}, {_id: "5c14bfbadde3760898eda62f"}, {_id: "5c14bfbadde3760898eda630"}],
    description: 'If you have never seen a UFO and want too... then watch seven sunsets in a row and I promise you will see something that cannot be explained away.'
  },
  {
    routetitle: "Unicorn's path",
    // phenomsId: [{_id: "5c14bfbadde3760898eda62b"}, {_id: "5c14bfbadde3760898eda62e"}, {_id: "5c14bfbadde3760898eda630"}],
    description: 'Al ataquerl apetecan ese que llega quietooor fistro no puedor por la gloria de mi madre de la pradera a wan.'
  },
  {
    routetitle: 'Natural way',
    //phenomsId: [{_id: "5c14bfbadde3760898eda62c"}, {_id: "5c14bfbadde3760898eda62d"}, {_id: "5c14bfbadde3760898eda62f"}, {_id: "5c14bfbadde3760898eda630"}],
    description: 'Lorem fistrum pupita me cago en tus muelas qué dise usteer a gramenawer llevame al sircoo está la cosa muy malar al ataquerl a peich.'
  },
  {
    routetitle: 'Flipping in colors',
    //phenomsId: [{_id: "5c14bfbadde3760898eda62d"}, {_id: "5c14bfbadde3760898eda62e"}, {_id: "5c14bfbadde3760898eda62f"}, {_id: "5c14bfbadde3760898eda630"}],
    description: 'Qué dise usteer me cago en tus muelas ese pedazo de por la gloria de mi madre va usté muy cargadoo. '
  },
  {
    routetitle: 'Mysterious route',
    //phenomsId: [{_id: "5c14bfbadde3760898eda62e"}, {_id: "5c14bfbadde3760898eda62f"}, {_id: "5c14bfbadde3760898eda630"}],
    description: 'A wan ese pedazo de me cago en tus muelas ese hombree a peich no puedor.'
  }
];

Route.collection.drop();

Route.create(routes)
  .then(routes => {console.log(`Created routes!`)})
  .then(() => {mongoose.disconnect()});
