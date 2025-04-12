import express from "express";
import Todo from "../models/Todo.js";

export const app = express();

export const test = (req, res) => {
  res.send("Server started successfully");
};

export const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({ title, description });
    await todo.save();
    return res.status(201).json({ data: todo });
  } catch (error) {
    console.error("Error in addTodo:", error);
    return res.status(500).json({ msg: "Failed to create todo", error });
  }
};

export const getAll = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error in getAll:", error);
    return res.status(500).json({ msg: "Failed to fetch todos", error });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error in getById:", error);
    return res.status(500).json({ msg: "Failed to fetch todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo does not exist" });
    }
    await Todo.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Todo deleted successfully", id });
  } catch (error) {
    console.error("Error in deleteTodo:", error);
    return res.status(500).json({ msg: "Failed to delete todo", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    return res
      .status(200)
      .json({ msg: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error("Error in updateTodo:", error);
    return res.status(500).json({ msg: "Failed to update todo", error });
  }
};
