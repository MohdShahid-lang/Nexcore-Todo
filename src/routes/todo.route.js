import {createTodo, DeleteTodo, getAllTodo, getTodoId, getTodosByUser, updateTodoDetail, updateTodoStatus } from "../controllers/todo.controller.js";
import { Router } from "express"

const router = Router();

router.post("/create", createTodo);

router.get("/", getAllTodo);
router.get("/:user", getTodosByUser);

router.patch("/update-details/:todoId", updateTodoDetail);

router.patch("/update-status/:todoId", updateTodoStatus);

router.delete("/delete/:todoId", DeleteTodo);

export default router;