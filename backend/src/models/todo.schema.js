import mongoose from "mongoose"

const TodoSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            maxLength : [50,"Title should be less than 50 character"],
            required : [true, "Title is required"]
        },
        description : {
            type : String,
            maxlength : [120,"Description should be less than 120 characters"],
            required : [true,"Description is required"]
        },
        status : {
            type : Boolean,
            default : false,
            enum : [true,false]
        },
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    },
    {
        timestamps : true
    }
)

export default mongoose.model("Todo", TodoSchema)