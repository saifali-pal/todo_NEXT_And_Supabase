"use client";
import { useParams, useRouter } from "next/navigation";
import EditTodoForm from "@/components/todo/EditTodoForm";
import { useTodos } from "@/context/TodoContext";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { todos } = useTodos();
  const todo = todos.find((t) => t.id == id);

  console.log(todo);

  return (
    <ProtectedRoute>
      {!todo ? (
        <p className="text-center mt-10">Task not found.</p>
      ) : (
        <Card className="w-full max-w-md p-4">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Task</h1>
            <EditTodoForm todo={todo} />
          </CardContent>
        </Card>
      )}
    </ProtectedRoute>
  );
}
