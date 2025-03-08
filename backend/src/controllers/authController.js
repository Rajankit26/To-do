import User from "../models/user.schema.js"

export const signup = async(req,res) => {
    try {
        
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            throw new Error("All fields are necessary")
        }

        const existingUSer = await User.findOne({email})
        if(existingUSer){
            throw new Error("User already exist")
        }
        const newUser = await User.create({name,email,password});

        const token = newUser.getJWTtoken()
        newUser.password = undefined;

        res.status(200).json({
            success : true,
            message : "Signup successful",
            newUser,
            token
        })
    } catch (error) {
        console.error(`Error : ${error}`)
    }
}

export const login = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new Error("All fields are required")
    }

    const UserExist = await User.findOne({email}).select("+password")

    if(!UserExist){
        throw new Error("User does not exits in our DB or invalid credemtials")
    }

    const isPasswordMatched = await UserExist.comparePassword(password)

    if(!isPasswordMatched){
        throw new Error("Password is incorrect")
    }

    const token = UserExist.getJWTtoken();
    UserExist.password = undefined;
    res.status(200).json({
        success : true,
        message : "Logged in successfull",
        token,
        UserExist
    })
}