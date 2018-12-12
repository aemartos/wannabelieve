const mongoose = require("mongoose");
const Phenomenon = require("../models/Phenomenon");

mongoose.connect("mongodb://localhost/project-02-ironhack", {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});


let phenomena = [
  {
    name: "Frozen methane bubbles",
    description:
      "Found in winter in high northern latitude lakes like Lake Abraham in Alberta, Canada, these gas bubbles are created when dead leaves, grass and animals fall into the water, sink and are eaten by bacteria that excrete methane. The gas is released as bubbles that transform into tens of thousands of icy white disks when they come into contact with frozen water",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [52.2236233, -116.4359982]
    },
    imgPhenomUrls: ["https://i.pinimg.com/originals/08/02/02/0802020181b082b6d7128bc5a67031e5.jpg"]
  },
  {
    name: "Blood Falls",
    description:
      "The name says it all. Blood Falls, in East Antarctica’s McMurdo Dry Valleys, looks like slowly pouring scarlet-red blood, staining snowy white Taylor Glacier and Lake Bonney below. It’s a surprising – and creepy – sight to behold. The trickling crimson liquid isn’t blood, however. Nor is it water dyed by red algae, as early Antarctica pioneers first speculated. In fact, the brilliant ochre tint comes from an extremely salty sub-glacial lake",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-77.7166621, 162.2578908]
    },
    imgPhenomUrls:["https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Ftrevornace%2Ffiles%2F2017%2F04%2Fblood-falls-1200x585.jpg"]
  },
  {
    name: "Hidden Beachs",
    description:
      "Mexico began testing bombs in the uninhabited Marieta Islands in the early 1900s, resulting in a gaping hole in the surface of one of the islands. Over time, tides filled the hole with sand and water, creating a secluded watery Eden where determined beach bums can swim, sunbathe and kayak largely out of sight.",
    type: "weirdStuff",
    location: {
      type: "Point",
      coordinates: [20.7039553, -105.5690147]
    },
    imgPhenomUrls: ["http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"]
  },
  {
    name: "Pink Lake Hillier",
    description: "",
    type: "seaCreatures",
    location: {
      type: "Point",
      coordinates: [-33.8411118, 121.807766]
    },
    imgPhenomUrls: ["http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"]
  },
  {
    name: "UPM01 phenomeno",
    description: "Lorem fistrum se calle ustée te voy a borrar el cerito condemor. Va usté muy cargadoo al ataquerl ese que llega al ataquerl caballo blanco caballo negroorl condemor jarl papaar papaar ese pedazo de.",
    type: "fantasticAnimals",
    location: {
      type: "Point",
      coordinates: [40.4523082, -3.7265464]
    },
    imgPhenomUrls: ["https://cdn.petcarerx.com/LPPE/images/articlethumbs/Cat-Scratch-Fever-Small.jpg"]
  },
  {
    name: "UPM02 phenomeno",
    description: "Lorem fistrum se calle ustée te voy a borrar el cerito condemor. Va usté muy cargadoo al ataquerl ese que llega al ataquerl caballo blanco caballo negroorl condemor jarl papaar papaar ese pedazo de.",
    type: "ghosts",
    location: {
      type: "Point",
      coordinates: [40.4509571, -3.7321667]
    },
    imgPhenomUrls: ["https://thenypost.files.wordpress.com/2018/05/180516-woman-mauled-by-angry-wiener-dogs-feature.jpg?quality=90&strip=all&w=618&h=410&crop=1"]
  }
];



Phenomenon.collection.drop();

Phenomenon.create(phenomena)
  .then(phenoms => {console.log(`Created phenomena!`)})
  .then(() => {mongoose.disconnect()});
