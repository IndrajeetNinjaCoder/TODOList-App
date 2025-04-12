import express from "express";
import {test, addTodo, getAll, getById, deleteTodo, updateTodo} from "../controllers/todo.js"

const router = express.Router();


router.get("/", test);
router.post("/add", addTodo);
router.get("/todo/", getAll);
router.get("/todo/:id", getById);
router.delete("/todo/:id", deleteTodo);
router.patch("/todo/:id", updateTodo);

export default router;
