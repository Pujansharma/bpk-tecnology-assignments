const mongoose=require("mongoose");


const modelschema=mongoose.Schema({
    firstname:String,
    lastname:String,
    phone_number:Number,
    DOB:String,
    gender:String,
    address:String
})

const StudentData=mongoose.model("userdata",modelschema);
module.exports={StudentData}

