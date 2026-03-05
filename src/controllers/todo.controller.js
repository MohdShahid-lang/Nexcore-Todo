
// 1.create
// 2.update name
// 3.status
// 4.get all Todo 
// 5.get one todo 
// 6.Delete

import { todoModel } from "../models/todo.model.js"
import { User } from "../models/user.model.js";

export const createTodo = async (req, res) => {
   try {
      const { title, description } = req.body;
      const user = req.user;

      console.log("user", req.user)

      if (!title) {
         return res.status(400).json({ messege: "Titel is required" });

      }

      const todo = await todoModel.create({
         title,
         description,
         author: user.id,
      });

      await User.findByIdAndUpdate(user.id, {
         $push: { todos: todo._id }
      })


      return res.status(201).json({
         messege: "Todo created successfully",
         todo,
      });

   } catch (error) {
      console.log(error)
      return res.status(500).json({ messege: "Internal server error" })
   }
}

// get all todo
export const getAllTodo = async (req, res) => {
   try {
      const user = req.user;

      const Todos = await todoModel.find({ author: user.id });
      return res.json({ message: "Todos fetch successfully", Todos });

   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" })
   }
}

// Get todo Id
export const getTodoId = async (req, res) => {
   try {
      const { user } = req.params;

      const TodoById = await todoModel.findById(user);
      return res.json({ message: "Todos fetch successfully", TodoById })

   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Internal server error" })
   }

}


// Update Todo by ID
export const updateTodoDetail = async (req, res) => {
   try {
      const { title, description } = req.body;
      const { todoId } = req.params;

      const updatedTodo = await todoModel.findByIdAndUpdate(todoId, {
         title,
         description,
      }, { new: true });

      return res
         .status(200)
         .json({ messege: "Todo details updated successfully", updatedTodo });

   } catch (error) {
      console.log(error)
      return res.status(500).json({ messege: "Internal server Error" });

   }
};

// update Todo status
export const updateTodoStatus = async (req, res) => {
   try {
      const { status } = req.body;
      const { todoId } = req.params;

      const updatedTodo = await todoModel.findByIdAndUpdate(todoId, {
         status,
      }, { new: true },);

      return res
         .status(200)
         .json({ messege: "Todo status updated successfully", updatedTodo });

   } catch (error) {
      console.log(error)
      return res.status(500).json({ messege: "Internal server Error" });

   }
};

// delete Todo by Id
export const DeleteTodo = async (req, res) => {
   try {
      const { TodoId } = req.params;


      console.log(TodoId);


      await todoModel.findByIdAndDelete(TodoId);

      return res.status(200).json({ messege: "Todo Deleted successfully", });

   } catch (error) {
      return res.status(500).json({ messege: "Internal server Error" });

   }

}




export const getTodosByUser = async (req, res) => {
   try {
      const { user } = req.params;

      const allTodos = await User.findById(user).populate("todos");

      return res.status(200).json({
         message: "All todos fetched successfully",
         allTodos
      })
   } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" })
   }
}