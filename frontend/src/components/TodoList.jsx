import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDescription, setEditableDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fetchTodo, setFetchTodo] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get("http://127.0.0.1:8000/todo/");
      setTodos(response.data);
    }
    fetchTodos();
  }, [fetchTodo]);

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setEditableTitle(todo.title);
    setEditableDescription(todo.description);
    setIsEditing(true);
  };

  const handleAddNewTodo = () => {
    setSelectedTodo(null);
    setEditableTitle("");
    setEditableDescription("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (selectedTodo) {
        await axios.patch(`http://127.0.0.1:8000/todo/${selectedTodo._id}`, {
          title: editableTitle,
          description: editableDescription,
        });
        console.log("Todo updated successfully");
      } else {
        await axios.post("http://127.0.0.1:8000/add", {
          title: editableTitle,
          description: editableDescription,
        });
        console.log("Todo created successfully");
      }
      setFetchTodo((prev) => !prev);
      setSelectedTodo(null);
      setEditableTitle("");
      setEditableDescription("");
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todo/${selectedTodo._id}`);
      setSelectedTodo(null);
      setFetchTodo((prev) => !prev);
      console.log("Todo deleted successfully");
    } catch (error) {
      console.log("Failed to delete todo: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Pagination logic
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container w-full md:w-[95%] mx-auto mt-4 p-2 flex flex-col md:flex-row">
      {/* Left Section - Todo List */}
      {!selectedTodo || window.innerWidth >= 768 ? (
        <div className="listTopSection m-2 p-5 w-full md:w-1/3 rounded-lg shadow-md bg-white">
          <div className="topBar flex justify-between mb-4">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-900 transition"
              onClick={handleAddNewTodo}
            >
              <PlusCircleIcon className="h-6 w-6 text-white" />
              <span className="text-lg font-semibold">TODO</span>
            </button>
            <button type="button" className="bg-white p-2 px-4 rounded-lg">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="listItemsSection overflow-y-auto h-full">
            {currentTodos.map((todo) => (
              <div
                key={todo._id}
                className={`todoItem p-4 mb-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition ${
                  selectedTodo?._id === todo._id ? "bg-gray-200" : "bg-white"
                }`}
                onClick={() => handleTodoClick(todo)}
              >
                <h1 className="text-lg font-bold text-black">
                  {todo.title.length > 40
                    ? `${todo.title.slice(0, 40)}...`
                    : todo.title}
                </h1>
                <div className="textContent flex justify-between items-center">
                  <p className="text-gray-600">
                    {todo.description.length > 80
                      ? `${todo.description.slice(0, 80)}...`
                      : todo.description}
                  </p>
                  <p className="text-sm text-gray-400 whitespace-nowrap">
                    {formatDate(todo.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              Previous
            </button>
            <span className="text-gray-600 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      {/* Right Section - Editor */}
      {selectedTodo || !isEditing ? (
        <div className="editorSection w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md relative">
          {selectedTodo && window.innerWidth < 768 && (
            <button
              className="mb-4 flex items-center text-sm font-semibold text-gray-700"
              onClick={() => setSelectedTodo(null)}
            >
              ← Back
            </button>
          )}

          {selectedTodo && (
            <div className="flex justify-end">
              <button type="button" onClick={handleDeleteTodo}>
                <TrashIcon className="w-5 h-5 text-black-500" />
              </button>
            </div>
          )}

          <input
            type="text"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full text-2xl font-bold mb-4 border-b border-gray-300 focus:outline-none focus:border-black"
          />

          <div className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
            <span className="font-semibold">B</span>
            <span className="italic">I</span>
            <span className="underline">U</span>
            <span>•</span>
            <span className="text-xs">≡ ≣</span>
            <span>Aᵗ</span>
          </div>
          <textarea
            value={editableDescription}
            onChange={(e) => setEditableDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full text-gray-800 p-2 border border-gray-300 rounded-md min-h-[400px] resize-y focus:outline-none focus:border-black"
          />
          {selectedTodo && (
            <p className="text-sm text-gray-500 mt-4">
              Created At: {formatDate(selectedTodo.createdAt)}
            </p>
          )}
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="text-gray-500 md:w-2/3 w-full p-4">
          Click on a todo to view or edit, or click TODO to add a new one.
        </p>
      )}
    </div>
  );
};
