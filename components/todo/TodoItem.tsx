"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/lib/validation";
import { useTodos } from "@/context/TodoContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
  text: string;
}

export default function TodoItem({
  id,
  text,
  completed,
}: {
  id: string;
  text: string;
  completed: boolean;
}) {
  const { deleteTodo, toggleTodo, updateTodo } = useTodos();

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(todoSchema),
    defaultValues: { text },
  });

  const onSubmit = (data: FormData) => {
    updateTodo(id, data.text);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-2 border rounded-lg shadow-sm bg-white">
      <div className="flex items-center gap-2 w-full">
        <Checkbox checked={completed} onCheckedChange={() => toggleTodo(id)} />
        {isEditing ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full"
          >
            <div className="flex gap-2">
              <Input {...register("text")} className="w-full" />
              <Button size="sm" type="submit">
                Save
              </Button>
            </div>
            {errors.text && (
              <p className="text-red-500 text-sm">{errors.text.message}</p>
            )}
          </form>
        ) : (
          <span
            className={`flex-1 ${
              completed ? "line-through text-gray-400" : ""
            }`}
          >
            {text}
          </span>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
