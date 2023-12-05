const expresss=require("express")
const noteRoute=expresss.Router();
const {StudentData}=require("../model/studentmodel")
// const jwt=require("jsonwebtoken");
require('dotenv').config()

// noteRoute.get("/",async(req,res)=>{
//     const token=req.headers.authorization.split(" ")[1];
//     const decoded=jwt.verify(token,`${process.env.sercuritykey}`)
//     try {
//         if(decoded){
//             const notes=await StudentData.find({"UserId":decoded.UserId})
//             res.status(200).send(notes)
//         }
//     } catch (error) {
//         res.status(400).send({"mssg":error})
//     }
// })
noteRoute.get("/alldata",async(req,res)=>{
    let device=(req.query.device);
    if(device){
        let data=await StudentData.find({device:device});
        res.status(200).send(data);
    }else{
        let data=await StudentData.find();
        res.status(200).send(data);
    }
})


noteRoute.get("/alldata/:id", async (req, res) => {
    try {
        let ID = req.params.id;
        let data = await StudentData.findOne({ _id: ID }); // Assuming '_id' is the default ObjectId field in MongoDB

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

noteRoute.post("/add", async (req, res) => {
    try {
        var { firstname, lastname, phone_number, DOB, gender, address } = req.body;
        const note = new StudentData({firstname, lastname, phone_number, DOB, gender, address});
        await note.save();
        res.status(200).send({ "mssg": "new data has been added" });
    } catch (error) {
        res.status(400).send({ "mssg": error.message });
    }
});
noteRoute.patch("/update/:id",async(req,res)=>{
    try {
        let ID=req.params.id;
    let payload=req.body;
    const data=await StudentData.findByIdAndUpdate({_id:ID},payload);
    res.status(200).send({"msg":"data has been updated!"})
    } catch (error) {
        console.log(error.message);
        res.send({"mssg":"something went wrong"})
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    try {
        let ID=req.params.id;
    const data=await StudentData.findByIdAndDelete({_id:ID});
    res.status(200).send({"msg":"data has been deleted!"})
    } catch (error) {
        console.log(error.message);
        res.send({"mssg":"something went wrong"})
    }
})

module.exports={noteRoute}