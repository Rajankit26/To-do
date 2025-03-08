import mongoose from "mongoose"
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import AuthRoles from "../utils/authRoles.js"


dotenv.config();

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            maxLength : [50,"Name should be less than 50 chars"],
            required : [true,"Name is required"]
        },
        email : {
            type :  String,
            required :[true,"Email is required"],
            unique : true
        },
        password : {
            type : String,
            minLength :[6,"Password should be minimum of 6 chars"],
            maxLength : [12,"Password should be maximum of 12 chars"],
            required :[true,"Password is required"],
            select : false
        },
        role :{
            type : String,
            enum : Object.values(AuthRoles),
            default : AuthRoles.USER
        }
    },
    {
        timestamps : true
    }
)

// Encrypt the password before saving into DB : PRE-HOOKS

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password,11)
    next();
})

userSchema.methods = {
    getJWTtoken : function(){
       return JWT.sign({_id : this._id,role :this.role},process.env.JWT_SECRET,{
        expiresIn : "7d"
       })
    },

    comparePassword : function(enteredPassword){
        return bcrypt.compare(enteredPassword,this.password);
    }
}
export default mongoose.model("User",userSchema);