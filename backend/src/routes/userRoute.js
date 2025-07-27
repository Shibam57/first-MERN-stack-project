const express=require('express')
const { registerUser, loginUser, logoutUser } = require('../controllers/userController')
const upload = require('../middlewares/multerMiddleware')
const verifyJWT = require('../middlewares/authMiddleware');

const router=express.Router()

router.post("/register",upload.fields([{
    name: "avatar",
}]), registerUser)

router.post("/login", loginUser)
router.post("/logout",verifyJWT, logoutUser)

module.exports=router