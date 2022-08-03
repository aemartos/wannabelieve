import mongoose from "mongoose";
import Route from '../models/Route.js';

// mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
//   .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
//   .catch(err => {console.error("Error connecting to mongo", err)});



let routes = [
  {
    routetitle: 'UFO sightings',
    //phenomenoId: ["5c1824cc658c9d1016ba9d2e", "5c1824cc658c9d1016ba9d2c", "5c1824cc658c9d1016ba9d2f", "5c1824cc658c9d1016ba9d30"],
    description: 'If you have never seen a UFO and want too... then watch seven sunsets in a row and I promise you will see something that cannot be explained away.',
    //creatorId: "5c17d333e29a2fdbba269dd1"
  },
  {
    routetitle: "Unicorn's path",
    //phenomenoId: ["5c1824cc658c9d1016ba9d2e", "5c1824cc658c9d1016ba9d2a", "5c1824cc658c9d1016ba9d30"],
    description: 'Al ataquerl apetecan ese que llega quietooor fistro no puedor por la gloria de mi madre de la pradera a wan.',
    //creatorId: "5c17d333e29a2fdbba269dd1"
  },
  {
    routetitle: 'Natural way',
    //phenomenoId: ["5c1824cc658c9d1016ba9d2a", "5c1824cc658c9d1016ba9d30"],
    description: 'Lorem fistrum pupita me cago en tus muelas qué dise usteer a gramenawer llevame al sircoo está la cosa muy malar al ataquerl a peich.',
    //creatorId: "5c17d333e29a2fdbba269dd1"
  },
  {
    routetitle: 'Flipping in colors',
    //phenomenoId: ["5c1824cc658c9d1016ba9d2e", "5c1824cc658c9d1016ba9d2a", "5c1824cc658c9d1016ba9d2f"],
    description: 'Qué dise usteer me cago en tus muelas ese pedazo de por la gloria de mi madre va usté muy cargadoo.',
    //creatorId: "5c17d333e29a2fdbba269dd1"
  },
  {
    routetitle: 'Mysterious route',
    //phenomenoId: ["5c1824cc658c9d1016ba9d2e", "5c1824cc658c9d1016ba9d2a", "5c1824cc658c9d1016ba9d2c", "5c1824cc658c9d1016ba9d2f", "5c1824cc658c9d1016ba9d30"],
    description: 'A wan ese pedazo de me cago en tus muelas ese hombree a peich no puedor.',
    //creatorId: "5c17d333e29a2fdbba269dd1"
  }
];

Route.collection.drop();

const createRoutes = (idUser, phenoms) => {
  const routesModified = routes.map(e => ({ ...e, creatorId: idUser, phenomenoId: phenoms.sort(() => .5 - Math.random()).slice(0, 5) }));
  return Route.create(routesModified)
    .then(routes => {
      console.log(`Created routes!`);
      return routes;
    })
}

export default createRoutes;
