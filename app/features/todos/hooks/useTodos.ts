// useQuery → fetch and cache data.
// useMutation → perform create/update/delete operations.
// useQueryClient → manually update or invalidate cache.
// useAuth() → provides access to the current logged-in user (from your Supabase AuthContext).
// todoService → your API layer that talks directly to Supabase.
// Todo type → defines the structure of a todo item.

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { todoService } from "@/app/features/todos/api/todoService";
import { Todo } from "@/types/todo";

// Used to uniquely identify the todos cache in React Query.

// All your todo-related hooks share this key — ensuring they update the same cache.
export const TODOS_QUERY_KEY = "todos";

export function useTodos() {
  const { user } = useAuth();

  return useQuery({
    queryKey: [TODOS_QUERY_KEY, user?.id],
    queryFn: () => todoService.fetchTodos(user!.id),
    enabled: !!user?.id,
  });
}

//Note: order-problem of the lists
export function useAddTodo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => todoService.addTodo(text, user!.id),
    //On success, updates the cache instantly — no refetch needed.
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY, user?.id], (old) =>
        old ? [newTodo, ...old] : [newTodo]
      );
    },
    onError: (error) => {
      console.error("Failed to add todo:", error);
    },
  });
}

export function useUpdateTodo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) =>
      todoService.updateTodo(id, text, user!.id),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY, user?.id], (old) =>
        old
          ? old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
          : []
      );
    },
    onError: (error) => {
      console.error("Failed to update todo:", error);
    },
  });
}

export function useToggleTodo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      todoService.toggleTodo(id, completed, user!.id),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY, user?.id], (old) =>
        old
          ? old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
          : []
      );
    },
    onError: (error) => {
      console.error("Failed to toggle todo:", error);
    },
  });
}

export function useDeleteTodo() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id, user!.id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>([TODOS_QUERY_KEY, user?.id], (old) =>
        old ? old.filter((todo) => todo.id !== deletedId) : []
      );
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error);
    },
  });
}
