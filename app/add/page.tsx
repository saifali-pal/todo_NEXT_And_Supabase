"use client";

import AddTodoForm from "@/components/todo/AddTodo";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AddPage() {
  return (
    <ProtectedRoute>
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Add a New Task
          </h1>
          <AddTodoForm />
        </CardContent>
      </Card>
    </ProtectedRoute>
  );
}
