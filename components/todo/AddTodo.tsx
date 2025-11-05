"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/lib/validation";
import { useAddTodo } from "@/app/features/todos/hooks/useTodos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FormData {
  text: string;
}

export default function AddTodoForm() {
  const addTodoMutation = useAddTodo();
  const router = useRouter();

 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(todoSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      await addTodoMutation.mutateAsync(data.text);
      reset();
      router.push("/");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input
        placeholder="Enter your task"
        {...register("text")}
        disabled={addTodoMutation.isPending}
      />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      {addTodoMutation.error && (
        <p className="text-red-500 text-sm">
          Failed to add task. Please try again.
        </p>
      )}
      <Button
        type="submit"
        className="mt-2 w-full"
        disabled={addTodoMutation.isPending}
      >
        {addTodoMutation.isPending ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
