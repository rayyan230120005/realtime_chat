import jwt from "jsonwebtoken";
import {ApiError) from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-Handler.js";
import { User} from "../models/user.models.js";

// Middleware to verify JWT tokens from authorization or header or cookies 
export const verrifyJWT = asyncHandler(async(req,res,next) =>
{
      const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");

      if(!token)
      {
        throw new ApiError(
            401,
            "Unauthorized request : No token provided"
        )
      }

      try 
      {
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET || "default_access_token_secret")
        
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificaionToken -emailVerificationExpiry -forgotPasswordToken -forgotPasswordExpiry"
        );

        if(!user)
        {
            throw new ApiError(
                404,
                "User with the given acces token doesn't exist"
            )
        }
        req.user = user;
        next();
      } 
      catch (error) 
      {
         throw new ApiError(
            401,
            error?.message || "Invalid or access token expired"
         )
      }
});
