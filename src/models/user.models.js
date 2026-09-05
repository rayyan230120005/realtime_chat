import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { type } from "os";

const userSchema = new Schema(
    {
        username:
        {
           type:String,
           required:[true,"Username is required"],
           unique:true,
           lowercase:true,
           trim:true,
           index:true,
        },
        email:
        {
           type:String,
           required:[true,"Email is required"],
           unique:true,
           lower:true,
           trim:true,
           index:true
        },
        fullName:
        {
           type:String,
           trim:true,
           default:"",
        },
        avatar:
        {
            type: String,
            default: "https://api.dicebear.com/7.x/avataaars/svg?seed=chatUser",
        },
        password:
        {
            type:String,
            required:[true,"Password is required"]
        },
        isEmailVerified:
        {
            type:Boolean,
            default:false,
        },
        refreshToken:
        {
            type:String,
        },
        forgotPasswordToken:
        {
            type:String,
        },
        forgotPasswordExpiry:
        {
            type:Date,
        },
        emailVerificationToken:
        {
            type:String,
        },
        emailVerificationExpiry:
        {
            type:Date,
        },
    },
    {
        timestamps:true,
    }
);

userSchema.pre("save",async function(next)
{
    if(!this.isModified(this.password)) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password)
};

userSchema.methods.generateAccessToken = function()
{
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret",
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
        }
    );
};

userSchema.methods.generateRefreshToken = function()
{
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET || "default_refresh_token_secret",
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY || "10d",
        }
    );
};

userSchema.methods.generateTemporaryToken = function()
{
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");

    const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes


    return {unHashedToken,hashedToken,tokenExpiry};
}

export const User = mongoose.model("User",userSchema);