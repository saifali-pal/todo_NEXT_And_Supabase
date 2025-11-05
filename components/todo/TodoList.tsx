"use client";
import { useTodos } from "@/app/features/todos/hooks/useTodos";
import { useAtom } from "jotai";
import { todoFiltersAtom, todoSearchAtom } from "@/types/atoms";
import TodoCard from "./TodoCard";
import { useMemo } from "react";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();
  const [filter] = useAtom(todoFiltersAtom);
  const [search] = useAtom(todoSearchAtom);

  const filteredTodos = useMemo(() => {
    if (!todos) return [];

    let filtered = todos;

    // Apply search filter
    if (search) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply completion filter
    switch (filter) {
      case "completed":
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case "incomplete":
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      default:
        break;
    }

    return filtered;
  }, [todos, filter, search]);

  if (isLoading) {
    return <p className="text-center text-gray-500 mt-4">Loading tasks...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4">Error loading tasks.</p>
    );
  }

  if (!filteredTodos.length) {
    return <p className="text-center text-gray-500 mt-4">No tasks found.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {filteredTodos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
