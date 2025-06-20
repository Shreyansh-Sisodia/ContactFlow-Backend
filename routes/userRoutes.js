const express=require('express')
const router=express.Router()
const {registerUser, userLogin, currentUser, deleteUser, allUsers, changePassword}=require('../controller/userController')
const validateToken=require('../middleware/validateTokenHandler')

router.post("/api/users/register", registerUser)

router.post("/api/users/login", userLogin)

router.get("/api/users/current", validateToken, currentUser)

router.delete("/api/users/delete/:id", deleteUser)

router.get("/api/users/getAllUsers", allUsers)

router.put("/api/users/change-password",validateToken,changePassword)

module.exports=router