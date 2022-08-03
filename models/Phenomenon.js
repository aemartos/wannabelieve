import mongoose from "mongoose";
const Schema = mongoose.Schema;

const phenomenonSchema = new Schema(
  {
    name: String,
    description: String,
    type: { type: String, enum: ["fantasticAnimals", "seaCreatures", "extraterrestrials", "ufos", "ghosts", "weirdStuff", "psychophonies", "paranormal", "signals", "halfHuman", "religiousApparitions", "naturalPhenomena", "abandonedPlaces", "unclassified"] },
    imgPhenomUrls: { type: Array, default: [] },
    reviewsId: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    visitorsId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    whoseFavId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    routesImIn: [{ type: Schema.Types.ObjectId, ref: 'Route' }],
    location: { type: { type: String, default: 'Point' }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

phenomenonSchema.index({ location: '2dsphere' });

const Phenomenon = mongoose.model("Phenomenon", phenomenonSchema);


export default Phenomenon;
