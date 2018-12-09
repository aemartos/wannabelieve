const mongoose = require("mongoose");
const Phenomenon = require("../models/Phenomenon");

mongoose
  .connect(
    "mongodb://localhost/project-02-ironhack",
    {
      useNewUrlParser: true
    }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let phenomena = [
  {
    name: "Frozen methane bubbles",
    description:
      "Found in winter in high northern latitude lakes like Lake Abraham in Alberta, Canada, these gas bubbles are created when dead leaves, grass and animals fall into the water, sink and are eaten by bacteria that excrete methane. The gas is released as bubbles that transform into tens of thousands of icy white disks when they come into contact with frozen water",
    type: "cat1",
    location: {
      type: "Point",
      coordinates: [52.1996362, -116.5086792]
    },
    imgPhenomUrl: "https://i.pinimg.com/originals/08/02/02/0802020181b082b6d7128bc5a67031e5.jpg"
    
  },

  {
    name: "Blood Falls",
    description:
      "The name says it all. Blood Falls, in East Antarctica’s McMurdo Dry Valleys, looks like slowly pouring scarlet-red blood, staining snowy white Taylor Glacier and Lake Bonney below. It’s a surprising – and creepy – sight to behold. The trickling crimson liquid isn’t blood, however. Nor is it water dyed by red algae, as early Antarctica pioneers first speculated. In fact, the brilliant ochre tint comes from an extremely salty sub-glacial lake",
    type: "cat1",
    location: {
      type: "Point",
      coordinates: [77.7166571, 162.2491146]
    },
    imgPhenomUrl:"https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Ftrevornace%2Ffiles%2F2017%2F04%2Fblood-falls-1200x585.jpg"
  
  },

  {
    name: "Hidden Beachs",
    description:
      "Mexico began testing bombs in the uninhabited Marieta Islands in the early 1900s, resulting in a gaping hole in the surface of one of the islands. Over time, tides filled the hole with sand and water, creating a secluded watery Eden where determined beach bums can swim, sunbathe and kayak largely out of sight.",
    type: "cat1",
    location: {
      type: "Point",
      coordinates: [20.7038168, -105.5672228]
    },
    imgPhenomUrl: "http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"
  },

  {
    name: "Pink Lake Hillier",
    description: "",
    type: "cat1",
    location: {
      type: "Point",
      coordinates: [33.8423896, 121.8277925]
    },
    imgPhenomUrl: "http://ichef.bbci.co.uk/wwfeatures/wm/live/1600_900/images/live/p0/42/l6/p042l6q8.jpg"
  }
];


Phenomenon.deleteMany()
  .then(() => {
    return Phenomenon.create(phenomena);
  })
  .then(phenomenaCreated => {
    console.log(
      `${phenomenaCreated.length} phenomena created with the following id:`
    );
    console.log(phenomenaCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
