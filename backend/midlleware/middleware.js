const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token,"masai")
        if(decoded){
            req.body.UserId=decoded.UserId
            next();
        }else{
            res.status(400).send({"mssg":"please login first"})
        }
    }else{
        res.status(400).send({"mssg":"please login first"})
    }
}
module.exports={auth}