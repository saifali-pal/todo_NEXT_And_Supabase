"use client";
import { useTodos } from "@/context/TodoContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  const { deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : ""
          } break-words whitespace-normal overflow-hidden`}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex gap-2">
        <Link href={`/edit/${todo.id}`}>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </Link>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
