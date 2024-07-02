import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { supabase } from "./supabaseClient";

function App() {
  const [todos, setTodos] = useState([
    { text: "Learn React", isCompleted: false },
    { text: "Build a to-do app", isCompleted: false },
    { text: "Master React", isCompleted: false },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const incompleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const login = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center py-4 bg-gray-200">
          To-Do List
        </h1>
        <div className="p-4">
          <TodoForm addTodo={addTodo} />
          {todos.map((item, index) => (
            <TodoItem
              key={index}
              index={index}
              item={item}
              incompleteTodo={incompleteTodo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              editTodo={editTodo}
            />
          ))}
        </div>
      </div>
      {/* <button onClick={login}>Login with Github</button> */}
    </div>
  );
}

export default App;
