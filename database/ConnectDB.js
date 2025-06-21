const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://nikhil:nikhil123@scriptguru.wvxesfd.mongodb.net/?retryWrites=true&w=majority&appName=Scriptguru"
  );
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
