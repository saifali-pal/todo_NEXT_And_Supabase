"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/lib/validation";
import { useUpdateTodo } from "@/app/features/todos/hooks/useTodos";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todo";
import { useRouter } from "next/navigation";

interface Props {
  todo: Todo;
}
interface FormData {
  text: string;
}

export default function EditTodoForm({ todo }: Props) {
  const updateTodoMutation = useUpdateTodo();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(todoSchema),
    defaultValues: { text: todo.text },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateTodoMutation.mutateAsync({ id: todo.id, text: data.text });
      router.push("/");
    } catch (error) {
      // Error is already handled in the mutation
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input {...register("text")} disabled={updateTodoMutation.isPending} />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      {updateTodoMutation.error && (
        <p className="text-red-500 text-sm">
          Failed to update task. Please try again.
        </p>
      )}
      <Button
        type="submit"
        className="mt-2 w-full"
        disabled={updateTodoMutation.isPending}
      >
        {updateTodoMutation.isPending ? "Updating..." : "Update Task"}
      </Button>
    </form>
  );
}
