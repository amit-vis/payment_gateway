const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports.create = async (req, res)=>{
    try {
        const {name, email,password, cpassword, isTutor} = req.body;
        if(password !== cpassword){
            return res.status(400).json({
                message: "password  does not match with confirm password!",
                success: false
            })
        }
        const passwordRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&*+=]).{6,}$/;
        if(!passwordRegx.test(password)){
            return res.status(401).json({
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long.",
                success: false
            })
        }
        let user = await User.findOne({email: email});
        if(user){
            return res.status(402).json({
                message:"User already exist!",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name : name,
            email: email,
            isTutor: isTutor,
            password: hashPassword
        })
        return res.status(200).json({
            message: "User Registered successfully!",
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in registring the user",
            error: error.message
        })
    }
}

module.exports.signin= async (req, res)=>{
    try {
        const {email, password} = req.body;
        const checkUser = await User.findOne({email: email});
        if(!checkUser || !(await bcrypt.compare(password, checkUser.password))){
            return res.status(400).json({
                message: "kindly check your email or password!!",
                success: false
            })
        }
        return res.status(200).json({
            message: "user register successfully!!",
            token: jwt.sign(checkUser.toJSON(), process.env.secretKEY, {expiresIn:"1h"})
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error in signin the user",
            error: error.message
        })
    }
}