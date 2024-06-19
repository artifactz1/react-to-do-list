import React, { useState } from "react";

export default function ToDoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if value isn't empty
    if (!value) return;

    // Adds the value to addTodo
    addTodo(value);

    // Sets value to empty after
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-gray-300 py-1 px-2 mr-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
}
