const mongoose = require('mongoose');

module.exports = function dbConnect() {
  try {
    mongoose.connect('mongodb+srv://swagattalukdar007:bETH8coJ60tdV2VU@shoepedia.fkbdssy.mongodb.net/?retryWrites=true&w=majority').then(result => console.log("successfully connected to DB"))
  } catch (error) {
    console.log("Connection to DB failed");
  }
}