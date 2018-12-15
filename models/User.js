const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: {type: String, default: null},
  password: String,
  facebookID: {type: String, default: null},
  googleID: {type: String, default: null},
  photoProfile: {type: String, default: ''},
  status: {type: String, enum: ['Pending Confirmation','Active'], default: 'Pending Confirmation'},
  confirmationCode: {type: String, unique: true},
  role: {type: String, enum: ['Admin', 'User'], default: 'User'},
  favPhenoms: [{ type: Schema.Types.ObjectId, ref:'Phenomenom' }],
  caption:{type: String, default: "Hey there I Want to Believe"},
  description: {type: String, default: "Edit profile to change this"},
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
module.exports = User;

//{type: Schema.Types.ObjectId, ref:'Phenomenon'}
