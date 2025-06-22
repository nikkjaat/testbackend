const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to Database successfully");
  const fetched_data = mongoose.connection.db.collection("food_items");
  fetched_data.find({}).toArray((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

module.exports = connectDB;
