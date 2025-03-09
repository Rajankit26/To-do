import { Router } from "express";
import { createTodo, getAllTodo, getTodoById, updateTodo,deleteTodo} from "../controllers/todo.controller.js"
import {verifyToken} from "../middlewares/auth.middleware.js"
const router = Router();

router.post('/',verifyToken,createTodo)
router.get('/',verifyToken,getAllTodo)
router.get('/:id',verifyToken,getTodoById)
router.put('/:id',verifyToken,updateTodo)
router.delete('/:id',verifyToken,deleteTodo)

export default router;