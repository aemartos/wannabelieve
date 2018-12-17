const mongoose = require("mongoose");
const Phenomenon = require("../models/Phenomenon");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});

//lng, lat
let phenomena = [
  {
    name: "Frozen methane bubbles",
    description: "Found in winter in high northern latitude lakes like Lake Abraham in Alberta, Canada, these gas bubbles are created when dead leaves, grass and animals fall into the water, sink and are eaten by bacteria that excrete methane. The gas is released as bubbles that transform into tens of thousands of icy white disks when they come into contact with frozen water",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-116.4447316, 52.2236092]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://i.pinimg.com/originals/08/02/02/0802020181b082b6d7128bc5a67031e5.jpg"]
  },
  {
    name: "Blood Falls",
    description: "The name says it all. Blood Falls, in East Antarctica’s McMurdo Dry Valleys, looks like slowly pouring scarlet-red blood, staining snowy white Taylor Glacier and Lake Bonney below. It’s a surprising – and creepy – sight to behold. The trickling crimson liquid isn’t blood, however. Nor is it water dyed by red algae, as early Antarctica pioneers first speculated. In fact, the brilliant ochre tint comes from an extremely salty sub-glacial lake",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [162.2491575, -77.7166662]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls:["https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Ftrevornace%2Ffiles%2F2017%2F04%2Fblood-falls-1200x585.jpg"]
  },
  {
    name: "Hidden Beachs",
    description: "Mexico began testing bombs in the uninhabited Marieta Islands in the early 1900s, resulting in a gaping hole in the surface of one of the islands. Over time, tides filled the hole with sand and water, creating a secluded watery Eden where determined beach bums can swim, sunbathe and kayak largely out of sight.",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-105.569769, 20.699692]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"]
  },
  {
    name: "Pink Lake Hillier",
    description: "No description",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [123.1852682, -34.0949983]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"]
  },
  {
    name: "Furious anicornia",
    description: "One of the creators of this app, be careful be careful not to piss her off... www.anaestrada.es",
    type: "fantasticAnimals",
    location: {
      type: "Point",
      coordinates: [-3.7265464, 40.4523082]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://pbs.twimg.com/profile_images/879273650192609281/KIuRFg6B_400x400.jpg"]
  },
  {
    name: '"Cowboy" Jose',
    description: 'Night falls and José rides on "Casimiro", his metal horse. Surrounded by lights, he makes his way with music as a guide. A lone cowboy who roams the streets of downtown Madrid with one goal: to get a smile from anyone who crosses paths with him.',
    type: "halfHuman",
    location: {
      type: "Point",
      coordinates: [-3.7055272, 40.416527]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068795/joseCowboy.png"]
  },
  {
    name: "Cairo alien construction",
    description: "Desert of Cairo, in Egypt, in which you can see buildings that are also considered to be the product of extraterrestrials. The construction that can be seen is certainly curious, but it is also very close to other more conventional constructions and even near a road, which also destroys the alien origin.",
    type: "extraterrestrials",
    location: {
      type: "Point",
      coordinates: [31.7196536, 30.0207008]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545067787/CairoAlienConstruction.png"]
  },
  {
    name: "Pyramid of Antarctica",
    description: "Another enigmatic construction of this type is found in Antarctica, where you can see some geographical features that look like pyramidal constructions built by an ancient civilization, although it is more likely that they are simply a whim of nature.",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-81.9639787, -79.9773191]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068069/PyramidAntarctica.png"]
  },
  {
    name: "Satanic pentagram in Asia (Lisakovsk Pentagram)",
    description: "Inverted pentagram, the popular satanic symbol used in witchcraft. The symbol consists of a circle of more than 360 meters in diameter and is found in the steppes of central Asia, on the south bank of the Tobol River. The disappointment for fans of mystery will come to know that this symbol has been used in antiquity by many cultures and non-satanic religious groups, and what is seen is according to archaeologists, the outline of a park made in the form of a star.",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [62.1833549, 52.4797941]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068354/LisakovskPentagram.png"]
  },
  {
    name: "Hexagon (Harold E Holt Communications Station VLF towers)",
    description: "No description",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [114.1566755, -21.815346]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068509/Hexagon.png"]
  },
  {
    name: "Alien triangle sign (crop signs)",
    description: "No description",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8535996, 37.6284057]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545069646/AlienTriangleSign.png"]
  },
  {
    name: "Nevada Circle",
    description: "A crop circle showing a perfect round sphere with a six point star inside.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8701787, 37.4027942]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545069999/NevadaCircle.png"]
  },
  {
    name: "Nevada Target",
    description: "",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8528342, 37.5641652]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070137/NevadaTarget.png"]
  },
  {
    name: "Geoglifo of Hill Unita",
    description: "The denominated Giant of Tarapacá or Geoglifo of Hill Unita, is a great figure drawn in the flank northwest of the Unita hill, to 15 km of the town of Huara, territory comprised in the desert of Atacama.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [-69.6340762, -19.9487334]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070305/GiganteTarapaca.png"]
  },
  {
    name: "Folkestone White Horse",
    description: "White horse hill figure, carved into Cheriton Hill, Folkestone, Kent, South East England. It overlooks the English terminal of the Channel Tunnel and was completed in June 2003.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [1.1393707, 51.101225]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070436/FolkestoneWhiteHorse.png"]
  },
  {
    name: "Geoglifo of Tiliviche",
    description: "A panel of camelids drawn by the ancient indigenous ranchers.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-69.9681224, -19.5489396]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070614/GeoglifoTiliviche.jpg"]
  },
  {
    name: "Position mark without UFO in Antarctica",
    description: "Russian researcher Valentin Degterev, from Nizhni Taguil, Russia, says he saw a huge unidentified object half buried in the snow of Antarctica, using Google Earth. Degterev discovered the mysterious object in 2012, but believes it crashed about 250 million years ago. After his discovery, Degterev decided to publish the images on Russian social networks, becoming in a short time a whole new viral phenomenon.",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [-30.1107492, -80.5664016]
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070818/ufoMark.png"]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  },
  {
    name: "",
    description: "",
    type: "",
    location: {
      type: "Point",
      coordinates: []
    },
    creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: [""]
  }
];

// creator: {
//   _id: '5c17d333e29a2fdbba269dd1',
//   username: 'wannabelieve',
//   email: 'wannabelieve@iwtb.com'
// }

Phenomenon.collection.drop();

Phenomenon.create(phenomena)
  .then(phenoms => {console.log(`Created phenomena!`)})
  .then(() => {mongoose.disconnect()});
