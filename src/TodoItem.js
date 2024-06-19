import React from "react";

export default function TodoItem({ item, index, completeTodo, removeTodo }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-2">
      <span
        className={`flex-1 ${
          item.isCompleted ? "line-through text-green-500" : ""
        }`}
      >
        {item.text}
      </span>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mr-2 rounded"
          onClick={() => completeTodo(index)}
        >
          Complete
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={() => removeTodo(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
