const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phenomenonSchema = new Schema(
  {
    name: String,
    description: String,
    type: { type: String, enum: ["cat1", "cat2"] },
    location: { type: { type: String }, coordinates: [Number] },
    imgPhenomUrls: { type: Array, default: [] },
    reviews: { type: Array, default: [] },
    creatorId: { type: Object, default: {} },
    visitorsId: { type: Array, default: [] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

phenomenonSchema.index({ location: "2dsphere" });

const Phenomenon = mongoose.model("Phenomenon", phenomenonSchema);

// Phenomenon.add = function(name, description, type, lat, lng, creator_id, imgsMain){
//   return Phenomenon.create({
//     name, type,
//     location:{
//       type:"Point",
//       coordinates:[lat,lng]
//     }
//   })
// }

module.exports = Phenomenon;
