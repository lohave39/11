const jwt =require("jsonwebtoken");


const verifyToken=(req,res,next)=>{
    const token =req.headers.authorization;
    // console.log(token)
    
    const authToken=token.split(" ")[1];
    // console.log(authToken)
    if(!token) return res.status(401).send({message: "please provide token"});
    try {
        const verified=jwt.verify(authToken,process.env.Scret_Key);
        console.log(verified)
        req.user=verified;
        next()
        
    } catch (error) {
        console.log(error)
       return  res.status(403).send({message:"Invalid Token"})
        
    }
};
module.exports=verifyToken;