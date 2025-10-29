"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema } from "@/lib/validation";
import { useTodos } from "@/context/TodoContext";
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
  const { updateTodo } = useTodos();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(todoSchema),
    defaultValues: { text: todo.text },
  });

  const onSubmit = (data: FormData) => {
    updateTodo(todo.id, data.text);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Input {...register("text")} />
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
      <Button type="submit" className="mt-2 w-full">
        Update Task
      </Button>
    </form>
  );
}
