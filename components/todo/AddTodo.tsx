"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/lib/validation";
import { useTodos } from "@/context/TodoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormData {
  text: string;
}

export default function AddTodoForm() {
  const { addTodo } = useTodos();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(todoSchema) });

  const onSubmit = (data: FormData) => {
    addTodo(data.text);
    reset();
    router.push("/"); // Go back to home
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input placeholder="Enter your task" {...register("text")} />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      <Button type="submit" className="mt-2 w-full">
        Add Task
      </Button>
    </form>
  );
}
