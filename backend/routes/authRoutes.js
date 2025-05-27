const { Register, Login } = require("../controller.js/authController");
const { isAdmin, isUser, isManager } = require("../middleware/role.middleware");
const verifyToken = require("../middleware/verifyToken");

const router=require("express").Router();

router.post("/register",Register);
router.post("/login",Login);

router.get("/admin-dashboard", verifyToken, isAdmin, (req, res) => {
    res.status(200).send({ message: "Welcome to the Admin Dashboard" });
  });
  
  router.get("/manager-dashboard", verifyToken, isManager, (req, res) => {
    res.status(200).send({ message: "Welcome to the Manager Dashboard" });
  });
  
  router.get("/user-dashboard", verifyToken, isUser, (req, res) => {
    res.status(200).send({ message: "Welcome to the User Dashboard" });
  });
  

module.exports = router;