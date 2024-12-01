import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

export const register=TryCatch(async(req,res)=>{
    const {email,name,password}=req.body;

       let user=await User.findOne({email})

       if(user)
        return res.status(400).json({
           message:"User Already exists",
            });

            const hashPassword=await bcrypt.hash(password, 10);

            user = {
                name,
                email,
                password: hashPassword,
            };

            const otp=Math.floor(Math.random()*1000000);

            const activationToken=jwt.sign({
                user,
                otp,
            },process.env.Activation_Secret,{
                expiresIn:"30d",
            });

            const data={
                name,
                otp,
            };

            await sendMail(
                email,
                "Newmern",
                data
            );
            res.status(200).json({
                message:"Otp send to your mail",
                activationToken,
            });
});
    
  export const verifyUser=TryCatch(async (req,res)=>{
    const { otp, activationToken}=req.body

    const verify =jwt.verify(activationToken,process.env.Activation_Secret)

    if(!verify) return res.status(400).json({
        message:"Otp Expired",
    });

    if(verify.otp!==otp) return res.status(400).json({
        message:"Wrong Otp",
    });
    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
    })

    res.json({
        message:"Use Registered",
    });
  });

  export const loginUser=TryCatch(async (req,res)=>{
    const {email, password}=req.body;
    const user=await User.findOne({email});

    if(!user) return res.status(400).json({
        message:"No User with this email",
    });

    const matchPassword=await bcrypt.compare(password, user.password);

    if(!matchPassword) return res.status(400).json({
        message:"Wrong password",
    });

    const token= jwt.sign({_id: user._id}, process.env.jwt_Sec,{
        expiresIn:"30d",
    });

    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user,
    });
});

    export const myProfile=TryCatch(async(req,res)=>{
        const user=await User.findById(req.user._id)
  res.json({ user });    
  });