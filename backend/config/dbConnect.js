const mongoose = require('mongoose');

module.exports = function dbConnect() {
  try {
    mongoose.connect('mongodb://127.0.0.1:27017/shoepedia').then(result => console.log("successfully connected to DB"))
  } catch (error) {
    console.log("Connection to DB failed");
  }
}