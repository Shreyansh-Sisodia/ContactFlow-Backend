const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Register a user
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

//validation
    if (!userName || !email || !password) {
        throw new Error("All fields are mandatory");
    }

//Check if user already exists
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
        throw new Error("User already registered!");
    }

//Hash password
    const hashedPassword = await bcrypt.hash(password, 10); //10 means salt rounds which means higher the sal rounds number, securer is the pwd

//Create user
    const newUser = await userModel.create({
        userName,
        email,
        password: hashedPassword
    });

    if (newUser) {
        res.status(201).json({ id: newUser._id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data not available");
    }
});




const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await userModel.findOne({ email });

    if (!userAvailable) {
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    const isPasswordMatch = await bcrypt.compare(password, userAvailable.password);

    if (!isPasswordMatch) {
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    const accessToken = jwt.sign(
        {userInfo:{
            userName: userAvailable.userName,
            email: userAvailable.email,
            id: userAvailable._id

        }},
        process.env.SECRET_KEY,
        { expiresIn: "10m" }
    );

    res.status(200).json({ accessToken });
});




const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


const deleteUser=asyncHandler(async(req,res) => {
    const user=await userModel.findByIdAndDelete(req.params.id)
    if(!user) {
        throw new Error("User does not exist")
    }
    res.status(200).json("User successfully deleted")
})



const allUsers=asyncHandler(async(req,res) => {
    const user=await userModel.find({},"userName email")
    res.status(200).json(user)
})


const changePassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
    if (!oldPassword || !newPassword){
        res.status(400)
        throw new Error("Both old and new passwords are required")
    }

    const user=await userModel.findById(req.user.id)
    if (!user){
        res.status(400)
        throw new Error("User not found")
    }

    const verifyOldPassword=await bcrypt.compare(oldPassword,user.password)
    if (!verifyOldPassword){
        res.status(400)
        throw new Error("Old password is incorrect")
    }

    const new_pwd=await bcrypt.hash(newPassword,10)
    user.password=new_pwd
    user.save()
    res.status(200).json("Password changed successfully")
})

module.exports = { registerUser, userLogin, currentUser, deleteUser, allUsers, changePassword};