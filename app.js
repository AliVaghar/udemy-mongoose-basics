const assert = require("assert");
const mongoose = require("mongoose");

// Connet to DB (will be created if not already existed)
mongoose.connect("mongodb://localhost:27017/fruitsDB");

// We have to define a Schema (we can embed a few constraints on the schema - see mongoose schema data validation)
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required!"],
  },
  price: {
    type: Number,
    min: 0,
  },
});

// Define collection and assign schema - mongo will use lower case when create it.
const Fruit = mongoose.model("Fruites", fruitSchema);

const insert_db = false;

if (insert_db) {
  const fruit = new Fruit({
    name: "PineApple",
    price: 100,
  });

  // Insert one (InsertMany is completely different)
  fruit.save();
}

const read_db = true;

if (read_db) {
  // this means find() will be run. If error occurs, will be passed. If not, fruits will contain the content
  Fruit.find(function (err, fruits) {
    if (err) {
      console.log(err);
    } else {
      mongoose.connection.close();
      // output
      console.log(fruits);
      // printing only fruit names
      fruits.forEach(function (f) {
        console.log(f.name);
      });
    }
  });
}
