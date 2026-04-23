const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://alishashakir2004_db_user:lo4w6b5VOsD4n7fS@ac-ogfrp8q-shard-00-00.zyvatsy.mongodb.net:27017,ac-ogfrp8q-shard-00-01.zyvatsy.mongodb.net:27017,ac-ogfrp8q-shard-00-02.zyvatsy.mongodb.net:27017/?ssl=true&replicaSet=atlas-34puvd-shard-0&authSource=admin&appName=Cluster0");
    console.log(" DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;