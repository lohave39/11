const mongoose = require('mongoose');

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDB Connected"))
    }

module.exports = dbConnect