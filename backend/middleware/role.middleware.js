const User = require("../models/User");



const isAdmin=async(req,res,next)=>{
    const userEmail=req.user;
//   console.log("55555555555555",userEmail)
    // const user=await User.findOne(email);
    //  console.log("====================",user.role)
    if(userEmail.role=='admin'){
        return next()
    }
    return res.status(403).send({message:"Access Denied Admin Only"})

};

const isManager = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    if (user.role === "admin" || user.role === "manager") {
      return next();
    }
    return res.status(403).send({ message: "Access Denied: Admin and Manager Only" });
  };
  const isUser = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    if (["admin", "manager", "user"].includes(user.role)) {
      return next();
    }
    return res.status(403).send({ message: "Access Denied: User Only" });
}


module.exports={isAdmin,isManager,isUser};