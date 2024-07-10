import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { supabase } from "./supabaseClient";

function App() {
	const [todos, setTodos] = useState(null);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	const addTodo = async title => {
		console.log("USER", user.id);

		if (user) {
			try {
				const { data, error } = await supabase
					.from("todo")
					.insert({ title: title, user_id: user.id }) // Ensure user_id matches your table's user identifier
					.select("*")
					.single();

				console.log("Add", data);

				if (error) {
					console.error("Error inserting data:", error);
				} else {
					getTodo();
				}
			} catch (err) {
				console.error("An unexpected error occurred:", err);
				setError(err.message || "An unexpected error occurred");
			}
		} else {
			const errorMessage = "User is not authenticated";
			setError(errorMessage);
			console.error(error);
		}
	};

	const getTodo = async () => {
		const res = await supabase.from("todo").select("*");
		setTodos(res.data);
		console.log(res);
	};

	useEffect(() => {
		getTodo();
	}, []);

	const completeTodo = async id => {
		if (user) {
			try {
				const { data, error } = await supabase
					.from("todo")
					.update({ complete: true })
					.eq("id", id)
					.select("*")
					.single();

				console.log("Complete Button", data);

				if (error) {
					console.error("Error updating data: ", error);
				} else {
					console.log("Todo item updated successfully:", data);
					getTodo();
				}
			} catch (err) {
				console.error("An unexpected error occurred:", err);
			}
		} else {
			const errorMessage = "User is not authenticated";
			setError(errorMessage);
			console.error(errorMessage);
		}
	};

	const incompleteTodo = async id => {
		if (user) {
			try {
				const { data, error } = await supabase
					.from("todo")
					.update({ complete: false })
					.eq("id", id)
					.select("*")
					.single();

				console.log("Complete Button", data);

				if (error) {
					console.error("Error updating data: ", error);
				} else {
					console.log("Todo item updated successfully:", data);
					getTodo();
				}
			} catch (err) {
				console.error("An unexpected error occurred:", err);
			}
		} else {
			const errorMessage = "User is not authenticated";
			setError(errorMessage);
			console.error(errorMessage);
		}
	};

	const removeTodo = index => {
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
		const { user, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
		if (error) {
			console.error("Error user signing in:", error);
		} else {
			console.log("User signed in successfully", user);
		}

		setUser(user);
	};

	const logout = async () => {
		await supabase.auth.signOut();

		// setUser(null);
		// setTodos(null);
		// setError(null);
	};

	useEffect(() => {
		// Handle authentication state change
		const { data: authListener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				switch (event) {
					case "SIGNED_IN":
						setUser(session.user);
						console.log("SIGNED IN");
						console.log(session.user.id);
						break;
					case "SIGNED_OUT":
						console.log("SIGNED OUT");
						setUser(null);
						setTodos(null);
						setError(null);
						break;
					default:
				}
			}
		);

		// Cleanup listener on component unmount
		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	return (
		<div className='min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden'>
				<h1 className='text-3xl font-bold text-center py-4 bg-gray-200'>
					To-Do List
				</h1>
				<div className='p-4'>
					<TodoForm key={todos} addTodo={addTodo} />
					{Array.isArray(todos) && todos.length > 0 && (
						<div>
							{todos.map(item => (
								<TodoItem
									index={item.id}
									item={item}
									incompleteTodo={incompleteTodo}
									completeTodo={completeTodo}
									removeTodo={removeTodo}
									editTodo={editTodo}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			{user ? (
				<div>
					<h1>Authenticated</h1>

					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<button onClick={login}>Login with Github</button>
			)}
		</div>
	);
}

export default App;
