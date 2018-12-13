const mongoose = require("mongoose");
const Review = require("../models/Review");

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.join(__dirname, '../.private.env')});

mongoose.connect(process.env.DBURL, {useNewUrlParser: true})
  .then(x => {console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => {console.error("Error connecting to mongo", err)});


let reviews = [
  {
    title: "Great Experience",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu erat quis ligula tristique rutrum eu ac quam. Duis cursus augue justo, eu pharetra lectus laoreet ac. Donec ut blandit urna. Mauris hendrerit varius diam, nec posuere purus accumsan et. Nunc rutrum venenatis arcu ut malesuada. Morbi at nunc sed risus ultrices fermentum. Suspendisse ut orci placerat augue suscipit finibus ut vel turpis. Nam dictum nibh sed sodales tempor. Proin ac iaculis lacus, non convallis quam. Fusce sagittis sit amet erat ut congue.",
  },
  {
    title: "Wow Experience",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu erat quis ligula tristique rutrum eu ac quam. Duis cursus augue justo, eu pharetra lectus laoreet ac. Donec ut blandit urna. Mauris hendrerit varius diam, nec posuere purus accumsan et. Nunc rutrum venenatis arcu ut malesuada. Morbi at nunc sed risus ultrices fermentum. Suspendisse ut orci placerat augue suscipit finibus ut vel turpis. Nam dictum nibh sed sodales tempor. Proin ac iaculis lacus, non convallis quam. Fusce sagittis sit amet erat ut congue.",
  },
  {
    title: "Magnificent Experience",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu erat quis ligula tristique rutrum eu ac quam. Duis cursus augue justo, eu pharetra lectus laoreet ac. Donec ut blandit urna. Mauris hendrerit varius diam, nec posuere purus accumsan et. Nunc rutrum venenatis arcu ut malesuada. Morbi at nunc sed risus ultrices fermentum. Suspendisse ut orci placerat augue suscipit finibus ut vel turpis. Nam dictum nibh sed sodales tempor. Proin ac iaculis lacus, non convallis quam. Fusce sagittis sit amet erat ut congue.",
  }
];

Review.deleteMany()
  .then(() => {
    return Review.create(reviews);
  })
  .then(reviewsCreated => {
    console.log(
      `${reviewsCreated.length} reviews created with the following id:`
    );
    console.log(reviewsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
