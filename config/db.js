

const mongoose=require("mongoose");
require('dotenv').config()
let url=process.env.url

const connection=mongoose.connect(url)

module.exports={connection};