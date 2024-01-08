
const mongoose = require('mongoose');
const uri = process.env.MONGO_URL

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDb;
// const mongoose=require("mongoose")
// const connectDb=()=>{
//         mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection
//     .once('open', function () {
//       console.log('MongoDB running');
//     })
//     .on('error', function (err) {
//       console.log(err);
//     });

//     }
// module.exports=connectDb