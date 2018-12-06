const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  rutetitle: String,
  description: String,
  creatorId: Object,
  phenomsId: {type: Array, default: []}
}, {timestamps: true}
);

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
