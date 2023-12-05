const mongoose=require("mongoose");

const modelschema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age:Number,
    city:String,
    is_married:Boolean
})
const usermodel=mongoose.model("facebookdata",modelschema);
module.exports={usermodel}
// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
// is_married ==> boolean