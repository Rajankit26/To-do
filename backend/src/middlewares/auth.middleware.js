import User from "../models/user.schema.js"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
export const verifyToken = async(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json(
                {
                    success : false,
                    message : 'Unauthorised : No token provided'
                }
            )
        }
            const decoded = JWT.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select("-password");
            next()
       
    } catch (error) {
        return res.status(401).json(
            {
                success : false,
                message : "Invalid" 
            }
        )
    }
}