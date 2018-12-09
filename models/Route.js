const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  routetitle: String,
  description: String,
  creator: {type: Schema.Types.ObjectId, ref:'User'},
  phenomsId: {type: Array, default: []}
}, {timestamps: true}
);

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
