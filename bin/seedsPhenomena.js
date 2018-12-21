const mongoose = require("mongoose");
const Phenomenon = require("../models/Phenomenon");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

// mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
//   .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
//   .catch(err => {console.error("Error connecting to mongo", err)});

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
    //creatorId: "5c17d333e29a2fdbba269dd1",
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
    //creatorId: "5c17d333e29a2fdbba269dd1",
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
    //creatorId: "5c17d333e29a2fdbba269dd1",
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
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"]
  },
  {
    name: "Furious anicornia",
    description: "One of the creators of this app, be careful not to piss her off... www.anaestrada.es",
    type: "fantasticAnimals",
    location: {
      type: "Point",
      coordinates: [-3.7265464, 40.4523082]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
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
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068795/phenomena-pictures/joseCowboy.png"]
  },
  {
    name: "Cairo alien construction",
    description: "Desert of Cairo, in Egypt, in which you can see buildings that are also considered to be the product of extraterrestrials. The construction that can be seen is certainly curious, but it is also very close to other more conventional constructions and even near a road, which also destroys the alien origin.",
    type: "extraterrestrials",
    location: {
      type: "Point",
      coordinates: [31.7196536, 30.0207008]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545067787/phenomena-pictures/CairoAlienConstruction.png"]
  },
  {
    name: "Pyramid of Antarctica",
    description: "Another enigmatic construction of this type is found in Antarctica, where you can see some geographical features that look like pyramidal constructions built by an ancient civilization, although it is more likely that they are simply a whim of nature.",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-81.9639787, -79.9773191]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068069/phenomena-pictures/PyramidAntarctica.png"]
  },
  {
    name: "Satanic pentagram in Asia (Lisakovsk Pentagram)",
    description: "Inverted pentagram, the popular satanic symbol used in witchcraft. The symbol consists of a circle of more than 360 meters in diameter and is found in the steppes of central Asia, on the south bank of the Tobol River. The disappointment for fans of mystery will come to know that this symbol has been used in antiquity by many cultures and non-satanic religious groups, and what is seen is according to archaeologists, the outline of a park made in the form of a star.",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [62.1833549, 52.4797941]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068354/phenomena-pictures/LisakovskPentagram.png"]
  },
  {
    name: "Hexagon (Harold E Holt Communications Station VLF towers)",
    description: "No description",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [114.1566755, -21.815346]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545068509/phenomena-pictures/Hexagon.png"]
  },
  {
    name: "Alien triangle sign (crop signs)",
    description: "No description",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8535996, 37.6284057]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545069646/phenomena-pictures/AlienTriangleSign.png"]
  },
  {
    name: "Nevada Circle",
    description: "A crop circle showing a perfect round sphere with a six point star inside.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8701787, 37.4027942]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545069999/phenomena-pictures/NevadaCircle.png"]
  },
  {
    name: "Nevada Target",
    description: "",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-116.8528342, 37.5641652]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070137/phenomena-pictures/NevadaTarget.png"]
  },
  {
    name: "Geoglifo of Hill Unita",
    description: "The denominated Giant of Tarapacá or Geoglifo of Hill Unita, is a great figure drawn in the flank northwest of the Unita hill, to 15 km of the town of Huara, territory comprised in the desert of Atacama.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [-69.6340762, -19.9487334]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070305/phenomena-pictures/GiganteTarapaca.png"]
  },
  {
    name: "Folkestone White Horse",
    description: "White horse hill figure, carved into Cheriton Hill, Folkestone, Kent, South East England. It overlooks the English terminal of the Channel Tunnel and was completed in June 2003.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [1.1393707, 51.101225]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070436/phenomena-pictures/FolkestoneWhiteHorse.png"]
  },
  {
    name: "Geoglifo of Tiliviche",
    description: "A panel of camelids drawn by the ancient indigenous ranchers.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-69.9681224, -19.5489396]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070614/phenomena-pictures/GeoglifoTiliviche.jpg"]
  },
  {
    name: "Position mark without UFO in Antarctica",
    description: "Russian researcher Valentin Degterev, from Nizhni Taguil, Russia, says he saw a huge unidentified object half buried in the snow of Antarctica, using Google Earth. Degterev discovered the mysterious object in 2012, but believes it crashed about 250 million years ago. After his discovery, Degterev decided to publish the images on Russian social networks, becoming in a short time a whole new viral phenomenon.",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [-30.1107492, -80.5664016]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545070818/phenomena-pictures/ufoMark.png"]
  },
  {
    name: "Kraken",
    description: "The Kraken appears in the Antarctic Ocean. The images of the supposed sea monster were published on YouTube on April 29, 2016.",
    type: "seaCreatures",
    location: {
      type: "Point",
      coordinates: [-60.958801, -63.0489288]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545079365/phenomena-pictures/kraken.png"]
  },
  {
    name: "Saiyajin spaceship",
    description: "Leftover spaceship in the snowy mountains.",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [99.7181613, -66.6032979]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545079535/phenomena-pictures/SaiyajinSpaceship.png"]
  },
  {
    name: "Millennium Falcon UFO in Area 51",
    description: 'The "UFO specialist" Scott Waring says is a building that has risen to hide an alien ship. To see the supposed mystery, you must use the "time travel" tool of Google Maps that allows you to see the area in past years through the different images that have been taken to create the maps.',
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [-116.0103273, 36.9290293]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545079678/phenomena-pictures/MillenniumFalconUFO.png"]
  },
  {
    name: "UFO sighting",
    description: "STRANGE UFO Sitting Above Amazon Rainforest",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [-64.6094487, -10.2672547]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545080075/phenomena-pictures/strangeUfo.png"]
  },
  {
    name: "Is this an OVNI?",
    description: "OVNI city sighting",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [100.5843624, 6.0477867]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545080270/phenomena-pictures/ufoSighting.png"]
  },
  {
    name: "OVNI sighting",
    description: "Is this an OVNI? It seems to be in a backyard in the middle of nowhere...",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [21.2998613, 45.7034537]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545081793/phenomena-pictures/ufoBackyard.png", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545081787/phenomena-pictures/ufoBackyard_3D.png"]
  },
  {
    name: "OVNI with shadow",
    description: "No description",
    type: "ufos",
    location: {
      type: "Point",
      coordinates: [-116.4725983, 37.3057244]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545081935/phenomena-pictures/shadowOVNI.png"]
  },
  {
    name: "Big triangle sign",
    description: 'This is the Google Maps description: "Luke Air Force Base Auxillary No. 4"',
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-112.6358287, 33.7450844]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082117/phenomena-pictures/bigTriangle.png"]
  },
  {
    name: "Big spiral signal",
    description: 'Eine Insel für die Zeit. The earth sign at Munich Airport is an earth sculpture by the painter Wilhelm Holderied and the sculptor Karl Schlamminger. The artwork is also called an island for the time. According to Holderied, it should be a symbol for the time sequences determined by the "primordial force of the earth".',
    type: "signals",
    location: {
      type: "Point",
      coordinates: [11.7306413, 48.3536035]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082321/phenomena-pictures/timeIsland.png"]
  },
  {
    name: "The Lion Point",
    description: "ZSL Whipsnade Zoo has finished restoration work on the Whipsnade White Lion, a famous chalk image that has overlooked the Dunstable Downs in Bedfordshire since 1933.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-0.5556809, 51.8484132]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082434/phenomena-pictures/lionPoint.png"]
  },
  {
    name: "Is it a map?",
    description: "Strange map marks somewhere in Asia.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [93.3884928, 40.4572688]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082675/phenomena-pictures/strangeMarks.png"]
  },
  {
    name: "Plane graveyard",
    description: 'The United States manufactured about 294,000 aircraft for WWII, and once peace was assured the military found itself with a huge surplus of aircraft. Within a year of the end of the war, about 34,000 airplanes had been moved to 30 sales-storage depots, or "aircraft boneyards".',
    type: "weirdStuff",
    location: {
      type: "Point",
      coordinates: [-110.8321706, 32.154355]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082902/phenomena-pictures/planeGraveyard01.png", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082902/phenomena-pictures/planeGraveyard02.png", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545082901/phenomena-pictures/planeGraveyard03.png"]
  },
  {
    name: "Desert Breath",
    description: "Located in the Egyptian desert near Hurghada on the Red Sea coast, is a double-spiral work of land art. It was created by the D.A.ST. Arteam, a group made up of three Greek artists.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [33.6316469, 27.3802495]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545083036/phenomena-pictures/desertBreath.jpg"]
  },
  {
    name: "Swastika-Shaped Building Complex",
    description: "Naval Amphibious Base Coronado, California, USA. That's all said.",
    type: "weirdStuff",
    location: {
      type: "Point",
      coordinates: [-117.1578331, 32.6767003]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545083260/phenomena-pictures/navalBase.png"]
  },
  {
    name: "Buffalo Herd",
    description: "Kigosi Game Reserve, Tanzania.",
    type: "fantasticAnimals",
    location: {
      type: "Point",
      coordinates: [31.3961856, -4.2892671]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545083437/phenomena-pictures/buffaloHerd.png"]
  },
  {
    name: "Shipwrecked SS Ayrfield with Trees",
    description: "102-Year-Old Abandoned Ship in Homebush Bay, Sydney, Australia. The beautiful spectacle, also referred to as The Floating Forest, adds a bit of life to the area, which happens to be a sort of ship graveyard.",
    type: "abandonedPlaces",
    location: {
      type: "Point",
      coordinates: [151.0804758, -33.8363363]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545084201/phenomena-pictures/ship01.jpg", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545084202/phenomena-pictures/ship02.png"]
  },
  {
    name: "The Badlands Guardian",
    description: "The nature of this curiosity is that, seen from the air, this rock formation looks like a human head wearing a hat in the style of the natives. Walsh, Alberta, Canada.",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-110.1179596, 50.0102157]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545084449/phenomena-pictures/badlandsGuardian.png"]
  },
  {
    name: "Jesus love you",
    description: "Never forget.",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [-115.9925688, 43.6449735]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545084594/phenomena-pictures/jesusLovesYou.png"]
  },
  {
    name: "Oil Fields",
    description: "Río Negro, Argentina.",
    type: "signals",
    location: {
      type: "Point",
      coordinates: [-68.1903273, -37.6545474]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545084827/phenomena-pictures/rioNegro.png"]
  },
  {
    name: "Sanatorio de la Marina",
    description: "Built in the mandate of Generalissimo Franco, at the beginning of the 40s to eradicate the disease of tuberculosis, but medical advances and new medicines changed the way to attack this disease leaving aside that mass of brick and concrete, which until then located in full mountain range of Madrid, allowed to breathe pure air away from pollution.",
    type: "abandonedPlaces",
    location: {
      type: "Point",
      coordinates: [-4.0834973, 40.7123606]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085130/phenomena-pictures/sanatorioMarina_01.jpg", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085130/phenomena-pictures/sanatorioMarina_02.jpg", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085130/phenomena-pictures/sanatorioMarina_03.jpg", "https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085131/phenomena-pictures/sanatorioMarina_04.png"]
  },
  {
    name: "A Most Phallic Buliding",
    description: "Christian Science Society of Dixon. ?????",
    type: "weirdStuff",
    location: {
      type: "Point",
      coordinates: [-89.4859745, 41.8418626]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085814/phenomena-pictures/phallicBuilding.png"]
  },
  {
    name: "Uluru",
    description: "Also known as Ayers Rock, is a large sandstone rock formation in the southern part of the Northern Territory in central Australia. It lies 335 km (208 mi) south west of the nearest large town, Alice Springs, 450 km (280 mi) by road.",
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [131.0292422, -25.3456324]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545085955/phenomena-pictures/uluru.png"]
  },
  {
    name: "Barringer Meteor Crater",
    description: 'Is a meteorite impact crater approximately 37 miles (60 km) east of Flagstaff and 18 miles (29 km) west of Winslow in the northern Arizona desert of the United States. Because the United States Board on Geographic Names commonly recognizes names of natural features derived from the nearest post office, the feature acquired the name of "Meteor Crater" from the nearby post office named Meteor.',
    type: "naturalPhenomena",
    location: {
      type: "Point",
      coordinates: [-111.0245767, 35.0271894]
    },
    //creatorId: "5c17d333e29a2fdbba269dd1",
    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545086077/phenomena-pictures/MeteorCrater.png"]
  },
  {
    name:"Our Lady of Lourdes" ,
    description: "In 1858 Saint Bernadette Soubirous was a 14-year-old shepherd girl who lived near the town of Lourdes in France. Bernadette Soubirous was out gathering firewood in the countryside. She reported a vision of a miraculous Lady who identified Herself as the Immaculate Conception in subsequent visions. In the third vision she was asked to return again and she had 18 visions overall. According to Saint Bernadette, the Lady held a string of Rosary beads and led Saint Bernadette to the discovery of a buried spring, also requesting that the local priests build a chapel at the site of the visions and lead holy processions there. Eventually, a number of chapels and churches were built at Lourdes as the Sanctuary of Our Lady of Lourdes—which is now a major Catholic pilgrimage site.",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [-0.0583093,43.0975484]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414309/phenomena-pictures/VirgendeLourdes.jpg"]
  },

{
    name:"Our Lady of Fátima" ,
    description: "The visions of the Virgin Mary appearing to three shepherd children at Cova da Iria, in Fátima, Portugal, in 1917 were declared worthy of belief by the Catholic Church in 1930. Seven popes — Pius XII, John XXIII, Paul VI, John Paul I, John Paul II, Benedict XVI and Francis — have supported the Fátima messages as supernatural. John Paul II credited Our Lady of Fátima with saving his life after he was shot in Rome on the Feast Day of Our Lady of Fátima in May 1981. He donated the bullet that wounded him on that day to the Sanctuary of Our Lady of Fátima.[51] Pope Paul VI sent a Golden Rose to the shrine in 1964,[52] and Benedict XVI, on May 13, 2010, prayed in the Chapel of the Apparitions at the shrine and gave a second Golden Rose to Our Lady of Fátima. Before a gathering of more than 500,000 pilgrims, he spoke of the Fátima prophecy about the triumph of the Immaculate Heart of Mary.",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [-8.6753458,39.6312638] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414425/phenomena-pictures/Pastorcitos.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414427/phenomena-pictures/Santuario-de-Fatima.jpg"]
  },
{
    name:"Our Lady of the Pillar" ,
    description: "Our Lady of the Pillar (Spanish: Nuestra Señora del Pilar) is the name given to the Blessed Virgin Mary associated with the claim of Marian apparition to Apostle James the Greater as he was praying by the banks of the Ebro at Caesaraugusta (Zaragoza), Hispania, in AD 40. The celebrated wooden image is enshrined at the Basilica of Our Lady of the Pillar in Saragossa (Zaragoza).",
    type: "religiousApparitions",
    location: {
      type: "Point",
      coordinates: [-0.9100895,41.6410247] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414515/phenomena-pictures/3a8c84371809bfbffe8c68bcc8b3bc64.jpg"]
  },
{
    name:"Old Town of Belchite" ,
    description: "Between August 24 and September 7, 1937, loyalist Spanish Republican and rebel General Franco's forces in the Spanish Civil War fought the Battle of Belchite in and around the town. After 1939 a new village of Belchite was built adjacent to the ruins of the old, which remain a ghost town as a memorial to the war. The remains of the old village have been used as filming locations in films including Terry Gilliam/'s 1988 film The Adventures of Baron Munchausen and Guillermo del Toro's Pan's Labyrinth. The ruins of the town were also used in the opening scene of the 1983 ITV documentary The Spanish Civil War",
    type: "abandonedPlaces",
    location: {
      type: "Point",
      coordinates: [-0.7495305,41.3012809]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414573/phenomena-pictures/foto158316.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414574/phenomena-pictures/42003_g.jpg"]
  },
{
    name:"The Tuberculosis Sanctuary of Agramonte" ,
    description: "close to the town of Tarazona is this building that was also full of suffering and pain, because there the tuberculosis patients came. Since the 70s, the building has been totally abandoned. Inside you can still see remains of the beds where the patients rested. There are people who say they have heard door noises open and close, cries for help and have even observed ghostly presences. What is certain is that the passage of time has made this sanctuary a magnet for vandalism.",
    type: "abandonedPlaces",
    location: {
      type: "Point",
      coordinates: [-1.8236667,41.8191173]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414649/phenomena-pictures/images.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414646/phenomena-pictures/Sanatorio_de_Agramonte22.jpg"]
  },
{
    name:"Laspaules Witches" ,
    description: "In the middle of the mountain and through an easy access road, the park offers information panels and scenes of what happened there. At the end of the 14th century, about 30 women were executed there accused of witchcraft. With imagination and reinforced by historical data, geological formations reminiscent of the concentration point of the covens can be observed",
    type: "halfHuman",
    location: {
      type: "Point",
      coordinates: [0.6174402,42.4501152] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414706/phenomena-pictures/laspaules-800x600.jpg"]
  },
{
    name:"Hotel Corona - room 510" ,
    description: "In 1979, a fire in this hotel claimed the lives of 78 people. Since then, many testimonies assure that the building feels a sense of suffocation. Many are the witnesses who claim to listen to footsteps and races in the corridors, even to feel pushed by someone fleeing the fire. But in particular, room 510 is the most mysterious of all. Guests who stayed there and many curious of the paranormal indicate that there the lights are turned on and off at night, that someone calls the phone but when picking up nobody answers, knocks on the door. There are even those who say that a mysterious orange light sneaks under the door, as if there was fire in the corridor. A stay only suitable for the bravest.",
    type: "paranormal",
    location: {
      type: "Point",
      coordinates: [-0.8866025,41.6513774]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414757/phenomena-pictures/bemow.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414760/phenomena-pictures/_corona_09f7986d.jpg"]
  },
{
    name:"The elf of Zaragoza" ,
    description: "In the Zaragoza of 1934 things happened that escaped the understanding. In a building located on the street of Gascon de Gotor in the capital of Aragon several witnesses said that voices could be heard coming from a gas stove. The police authorities and bricklayers inspected the house and the voices persisted. According to the press of the time they even got to establish conversations with the voice, an issue that became a media phenomenon. In the face of possible public disorder, the servant of the home was blamed. Years later the building was demolished and on the site the current goblin building was built.",
    type: "psychophonies",
    location: {
      type: "Point",
      coordinates: [-0.8872041,41.6399292] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414824/phenomena-pictures/10995663_926514004037892_7426957481919788308_n.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414827/phenomena-pictures/19709494442_1218f9006e_b.jpg"]
  },
{
    name:"Aunt Casca" ,
    description: "The covens that the witches of the Moncayo celebrated in the castle of the Lord of Trasmoz are just the beginning. Bécquer, ambassador of the legend in this land, picked up in one of his narrations the story of 'La Tía Casca'. It tells how one day walking on one of the roads that lead to Trasmoz, a pastor warned him that he will not continue on that path as Aunt Casca, who died after being thrown down a ravine years ago, wandered in search of new souls. Apparently, the character existed and was overthrown in 1850 for attributing bad witchcraft to him.",
    type: "ghosts",
    location: {
      type: "Point",
      coordinates: [-1.7257682,41.8265584] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545414907/phenomena-pictures/images_1.jpg"]
  },
{
    name:"Otxate Tower" ,
    description: "In the heart of Treviño County a long time ago the roads were lost in Ochate. Walking on foot through the countryside, you come to an abandoned village in which the many claim to have experienced different paranormal phenomena. The tower of San Miguel is the little that remains in this population in which history was spawned by epidemics, disappearances and unexplained deaths. After its abandonment, it has been the subject of numerous psychophonies and stories worthy of a horror movie.",
    type: "psychophonies",
    location: {
      type: "Point",
      coordinates: [-2.6608863,42.7492683] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415049/phenomena-pictures/ochate.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415050/phenomena-pictures/otxate.jpg"]
  },
{
    name:"Belmez faces" ,
    description: "In the home of the deceased María Gómez Cámara in Bélmez de la Moraleda (Jaen) is what for many is the most enchanted place in Spain. For others it is a great fraud, but still nobody has found the key to the different faces that have been reflected in the floors and walls of the house on Calle Real No. 5 that has been studied by scientists and parapsychologists from around the world. Whether they are mysterious reflections of people who no longer exist or teleplasties, the story of Bélmez's faces is really unsettling. For decades, including periods in which it was sealed and locked, faces did not stop appearing again and again.",
    type: "paranormal",
    location: {
      type: "Point",
      coordinates: [-3.3836948,37.7233763]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415150/phenomena-pictures/lapava-kfLH-U203722513250TcB-490x490_Diario_Sur.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415152/phenomena-pictures/nin%CC%83os.jpg"]
  },
{
    name:"Cardona Hostel - room 712" ,
    description: "It is strange that people do not want to stay in room 712 of the Parador de Cardona, an old castle that functions as a hotel. Perhaps it is because the apparitions have been constant in this room of which the spirits of ancient inhabitants of a fort that serves as a jail and torture center in the Middle Ages are said to wander. Unless someone specifically asks to stay in this mysterious room, hotel managers never offer it.",
    type: "ghosts",
    location: {
      type: "Point",
      coordinates: [1.6834613,41.914318]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415218/phenomena-pictures/hqdefault.jpg"]
  },
{
    name:"The Hospital of Tórax de Terrassa" ,
    description: "An old hospital in the Barcelona town of Terrassa that served to receive patients with respiratory diseases between 1952 and 1997 counts not only with apparitions and unexplained phenomena but with devastating data. And it is that the press of the time already spoke of one of the hospitals with higher index of suicides of all the country, with patients who underwent an incurable psychosis that made them throw itself to the emptiness from the last plant.",
    type: "unclassified",
    location: {
      type: "Point",
      coordinates: [2.0058764,41.5936546] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415261/phenomena-pictures/maxresdefault.jpg"]
  },
{
    name:"Mount of Souls in Soria" ,
    description: "Gustavo Adolfo Bécquer gave us one of the best legends of ghosts and apparitions that went from mouth to mouth to the most precious literature of the nineteenth century. The one of the mount of the Souls is a history of templarios and spirits that are allowed to see each night of deceased and that surround of mystery and blood the deaths of the young Alonso and Beatriz. Bécquer's narrative makes us imagine that place surrounded by fog and fleeting lights. Of course it really exists, and I'm convinced that many would not even go in painting alone to this place to please anyone. And less on the nights of the dead ...",
    type: "ghosts",
    location: {
      type: "Point",
      coordinates: [-2.4484945,41.7499575]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415319/phenomena-pictures/claustro_soria_san_juan_de_duero.jpg","https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415322/phenomena-pictures/noche-de-las-animas-17web.jpg"]
  },
{
    name:"Reina Sofia Museum ghosts" ,
    description: "Before the museum, the Reina Sofía served as the General Hospital. Many people perished in their dependencies and, those who did not have loved ones who claimed the bodies, were buried under the subsoil. Few places in the capital of Spain have collected so many comments from witnesses that they have been frightened by the passage of the ghostly figures of three nuns, who later learned their bones lay under the main entrance of the current museum. One of its ghosts has a name, Ataulfo, which has left its mark on countless occasions, including séances that, according to its participants, attracted the attention of numerous spirits that are said to roam the galleries of the Reina Sofía.",
    type: "ghosts",
    location: {
      type: "Point",
      coordinates: [-3.6962326,40.4085188]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415396/phenomena-pictures/Museo_Reina_Sofia-Ministerio_de_Cultura-Madrid-Grandes_Historias_157495601_17065452_1706x960.jpg"]
  },
{
    name:"Busot Water Preventory" ,
    description: "They say that what was a luxurious spa hotel was lost by its owner in the 30s playing poker. It thus became a building for tuberculosis that became crowded during the civil war. It has been abandoned for decades, being a magnet for friends of the inexplicable. Because there are people who say they have seen strange things or heard voices. It was discovered much later the presence of underground tunnels that were used in the war. And there have also been occurrences of those who put the hair on end.",
    type: "psychophonies",
    location: {
      type: "Point",
      coordinates: [-0.36992,38.5064833] 
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415450/phenomena-pictures/Preventorio_busot_lateral.jpg"]
  },
{
    name:"The Black Lagoon of Urbión" ,
    description: "Antonio Machado, in The land of Alvargonzález speaks of the Black Lagoon, located in the Sierra de los Picos de Urbion. Legend has it that there is no bottom, and that from it arise caves and underground currents that will hit the distant sea. Machado recounted the murder of a father by his two sons, who tied his feet to his feet after giving him stabs and axes in order to obtain a blood-stained inheritance. In the end, after being executed an innocent and losing everything they had won, the children end up perishing in its waters. Still laments are heard in the Black Lagoon of that Soria legendarily terrifying.",
    type: "psychophonies",
    location: {
      type: "Point",
      coordinates: [-2.8492676,41.9988024]
    },

    imgPhenomUrls: ["https://res.cloudinary.com/ironhackproject2018/image/upload/v1545415491/phenomena-pictures/laguna_negra.jpg"]
  }
];

// creator: {
//   _id: '5c17d333e29a2fdbba269dd1',
//   username: 'wannabelieve',
//   email: 'wannabelieve@iwtb.com'
// }

Phenomenon.collection.drop();

const createPhenomena = (idUser) => {
  const phenom = phenomena.map(e => ({...e, creatorId: idUser}));
  return Phenomenon.create(phenom)
    .then(phenoms => {
      console.log(`Created phenomena!`);
      return phenoms;
    });
}


module.exports = createPhenomena;
