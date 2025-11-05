"use client";
import { useParams } from "next/navigation";
import EditTodoForm from "@/components/todo/EditTodoForm";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useTodos } from "@/app/features/todos/hooks/useTodos";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const { data: todos, isLoading, error } = useTodos();

  const todo = todos?.find((t) => String(t.id) === String(id));
  console.log(todos);

  if (isLoading) {
    return (
      <ProtectedRoute>
        <p className="text-center mt-10">Loading...</p>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <p className="text-center mt-10 text-red-500">Error loading task.</p>
      </ProtectedRoute>
    );
  }

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



