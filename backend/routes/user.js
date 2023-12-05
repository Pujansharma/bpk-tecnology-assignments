const express=require("express");
const userRouter=express.Router();
const {usermodel}=require("../model/usermodel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

// pass

//register-----------------------
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try{
        const user=await usermodel.find({email})
        if(user.length>=1){
            // alert("user is allready register please log in!")
            res.status(200).send({"msg":"user is allready register please log in!"})
        }else{
            bcrypt.hash(password, 5, async (err, hash) => {
            const {name,email,gender,password,age,city,is_married}=req.body
                const user=new usermodel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"Registration has been done!"})
            });
        }
       
        
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await usermodel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password, (err, result) => {
                if(result){
                    res.status(200).send({"msg":"Login successfull!","token":jwt.sign({"userID":user._id},"masai")})
                } else {
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})






module.exports={userRouter}

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
// is_married ==> boolean