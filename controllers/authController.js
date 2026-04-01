const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

exports.register=async (req,res) => {
    try {
        console.log(req.body);
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if (name.trim().length < 3) {
            return res.status(400).json({
                message: "Name too short"
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                message: "Password too short"
            });
        }
        const existingUser=await User.findOne({email});        
        if(existingUser){
            return res.status(400).json({
                message:"This email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
            const user=await User.create({
                name,
                email,
                password:hashedPassword,
                role
            })
            res.status(201).json({
                message:"User registered successfully",
                user
            });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Registration failed",
            error:error.message
        })
    }
}


exports.login=async (req,res) => {
    try {
        console.log(req.body);
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Email and passwords are required"
            })
        }
        const registeredUser=await User.findOne({email});
        console.log("User:",registeredUser);
        if(!registeredUser){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const checkPassword=await bcrypt.compare(password,registeredUser.password);
        console.log(checkPassword);
        if(!checkPassword){
            return res.status(400).json({
                message:"Incorrect Password"
            })
        }
        // create token
        const token=jwt.sign({
            id:registeredUser._id,
            role:registeredUser.role
        },"secretKey",{expiresIn:"1d"});

        res.status(200).json({
            success:true,
            message:"Login successfull",
            token,
            registeredUser:{
                id: registeredUser._id,
                email: registeredUser.email,
                role: registeredUser.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
}

exports.authorizeRole= (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' }); // Forbidden
    }
    next();
  };
};
