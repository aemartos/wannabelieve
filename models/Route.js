const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  routetitle: String,
  description:  {type: String, default: 'There is no description yet'},
  creatorId: {type: Schema.Types.ObjectId, ref:'User'},
  phenomenoId: [{type: Schema.Types.ObjectId, ref:'Phenomenon'}],
  reviewsId: [{type: Schema.Types.ObjectId, ref:'Review'}],
  whoseFavId: [{type: Schema.Types.ObjectId, ref:'User'}],
}, {timestamps: true}
);

const Route = mongoose.model('Route', routeSchema);

Route.add = function(routetitle, creatorId){
  return Route.create({
    routetitle,
    description,
    creatorId
  });
};

module.exports = Route;
