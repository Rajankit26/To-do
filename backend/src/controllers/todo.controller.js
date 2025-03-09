import Todo from "../models/todo.schema.js"


export const createTodo = async(req, res) =>{
    try {
        const {title, description} = req.body;

        if(!title || !description){
           return res.status(400).json({
            success : false,
            message : "All fields are required"
           })
        }

        const toDo = await Todo.create({title,description,user_id : req.user._id});
            res.status(201).json({
            success : true,
            message : "To-do created successfully",
            todo: toDo
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : "To-do creation failed",
            error : error.message
        })
    }
}

export const getAllTodo = async(req, res) =>{
    try {
        const allToDo = await Todo.find({ user_id : req.user._id}); //returns an array
        if(allToDo.length === 0){
            return res.status(404).json({
                success : false,
                message : "No todos found"
            }) 
        }

        res.status(200).json({
            success : true,
            message : "All todo fetched",
            todos : allToDo
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}

export const getTodoById = async(req, res) =>{
    try {
        const { id } = req.params;
        const toDoById = await Todo.findOne({_id : id,user_id : req.user._id});

        if(!toDoById){
            return res.status(400).json({
                success : false,
                message : "No toDo exist for this user"
            })
        }

        res.status(200).json({
            success : true,
            message : "Todo fetched for the user",
            todo : toDoById
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}

export const updateTodo = async(req, res) =>{
    try {
        const {title,description} = req.body;
        const { id } = req.params;
        if(!title && !description){
        return res.status(400).json({
            success : false,
            message : "At least one field is required to update todo"
        })
    }

    const updatedToDo = await Todo.findOneAndUpdate(
        {_id : id ,user_id :req.user._id},
        {title,description},
        {new : true, runValidators: true}
    );

    if (!updatedToDo) {
        return res.status(404).json({
            success: false,
            message: "To-do not found or not updated",
        });
    }
    res.status(200).json({
        success : true,
        message : "To-do updated successfully",
        todo : updatedToDo
    })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}
export const deleteTodo = async(req, res) =>{
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findOneAndDelete({_id : id, user_id :req.user._id});
        if(!deletedTodo){
            return res.status(404).json({
                success : false,
                message : "To-do not found or already deleted"
            })
        }

        res.status(200).json({
            success : true,
            message : "To-do deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Something went wrong",
            error : error.message
        })
    }
}