const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phenomenonSchema = new Schema(
  {
    name: String,
    description: String,
    type: { type: String, enum: ["fantasticAnimals", "seaCreatures", "extraterrestrials", "ufos", "ghosts", "weirdStuff", "psychophonies", "paranormal", "signals", "half-human", "religiousApparitions", "naturalPhenomena", "unclassified"] },
    imgPhenomUrls: { type: Array, default: [] },
    reviewsId: [{ type: Schema.Types.ObjectId, ref:'Review' }],
    creatorId: { type: Schema.Types.ObjectId, ref:'User' },
    visitorsId: [{ type: Schema.Types.ObjectId, ref:'User' }],
    location: {type: {type: String,default: 'Point'}, coordinates: [Number]}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

phenomenonSchema.index({location: '2dsphere' });

const Phenomenon = mongoose.model("Phenomenon", phenomenonSchema);

Phenomenon.add = function(name, description, type, lng, lat, creator_id, imgsMain){
  return Phenomenon.create({
    name,
    type,
    location:{
      type: 'Point',
      coordinates:[lng,lat]
    },
    creator_id,
    imgsMain
  })
}

module.exports = Phenomenon;
