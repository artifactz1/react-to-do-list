import React, { useState } from "react";

export default function TodoItem({
	item,
	index,
	incompleteTodo,
	completeTodo,
	removeTodo,
	editTodo,
}) {
	const [isEdit, setEdit] = useState(false);
	const [newText, setnewText] = useState(item.title);

	const handleEdit = () => {
		setEdit(true);
	};

	const handleSave = () => {
		editTodo(index, newText);
		setEdit(false);
	};

	return (
		<div className='flex items-center justify-between border-b border-gray-300 py-2'>
			<span
				className={`flex-1 ${
					item.isCompleted ? "line-through text-green-500" : "text-yellow-500"
				}`}>
				{isEdit ? (
					<input
						type='text'
						value={newText}
						onChange={e => setnewText(e.target.value)}
					/>
				) : (
					<span
						className={`flex-1 ${
							item.isCompleted
								? "line-through text-green-500"
								: "text-yellow-500"
						}`}>
						{item.title}
					</span>
				)}
			</span>
			<div>
				{/* Complete */}
				{!item.isCompleted && (
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded'
						onClick={() => completeTodo(index)}>
						Complete
					</button>
				)}

				{/* Undo / Incomplete */}
				{item.isCompleted && (
					<button
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mr-2 rounded'
						onClick={() => incompleteTodo(index)}>
						Undo
					</button>
				)}

				{/* Remove */}
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
					onClick={() => removeTodo(index)}>
					Remove
				</button>

				{/* Edit Button*/}
				{isEdit ? (
					<button
						className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded'
						onClick={() => handleSave(newText)}>
						Save
					</button>
				) : (
					<button
						className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded'
						onClick={() => handleEdit()}>
						Edit
					</button>
				)}
			</div>
		</div>
	);
}
