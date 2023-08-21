const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/nuture");

  console.log("Conectado ao MongoDb");
};

main().catch((err) => {
  console.log(err);
});

module.exports = mongoose;
 