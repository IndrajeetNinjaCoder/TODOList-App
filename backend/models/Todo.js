import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;