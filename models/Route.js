const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  routetitle: String,
  description: String,
  creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  phenomenoId: [{type: Schema.Types.ObjectId, ref:'Phenomenon'}],
  reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
}, {timestamps: true}
);

const Route = mongoose.model('Route', routeSchema);

Route.add = function(routetitle, creatorId){
  return Route.create({
    routetitle,
    creatorId
  });
};

module.exports = Route;
