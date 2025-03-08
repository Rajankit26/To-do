import mongoose from "mongoose"
import AuthRoles from "../utils/authRoles.js"

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

export default mongoose.model("User",userSchema);