"use client";
import { useTodos } from "@/context/TodoContext";
import TodoCard from "./TodoCard";

export default function TodoList() {
  const { todos } = useTodos();

  if (!todos.length)
    return <p className="text-center text-gray-500 mt-4">No tasks yet.</p>;

  return (
    <div className="flex flex-col gap-3 mt-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
