"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase, Database } from "@/lib/supabase";
import { Todo } from "@/types/todo";

type TodoRow = Database["public"]["Tables"]["todos"]["Row"];
type TodoInsert = Database["public"]["Tables"]["todos"]["Insert"];
type TodoUpdate = Database["public"]["Tables"]["todos"]["Update"];

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  addTodo: (text: string) => Promise<void>;
  updateTodo: (id: string, text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchTodos();
    } else {
      setTodos([]);
      setLoading(false);
    }
  }, [user]);

  // 📦 Fetch Todos
  const fetchTodos = async () => {
    if (!user?.id) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching todos:", error);
    else setTodos(data || []);

    setLoading(false);
  };

  // ➕ Add Todo
  const addTodo = async (text: string) => {
    if (!user?.id) return;

    const newTodo: TodoInsert = {
      text,
      completed: false,
      user_id: user.id,
    };

    // ✅ insert expects an array
    const { data, error } = await supabase
      .from("todos")
      .insert([newTodo])
      .select()
      .single();

    if (error) console.log("Error adding todo:", error);
    else if (data) setTodos((prev) => [data, ...prev]);
  };

  // ✏️ Update Todo
  const updateTodo = async (id: string, text: string) => {
    if (!user?.id) return;

    const updates: TodoUpdate = {
      text,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error("Error updating todo:", error);
    else
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  // 🗑️ Delete Todo
  const deleteTodo = async (id: string) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error("Error deleting todo:", error);
    else setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Toggle Todo
  const toggleTodo = async (id: string) => {
    if (!user?.id) return;

    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updates: TodoUpdate = {
      completed: !todo.completed,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("todos")
      .update(updates) // ✅ FIXED: previously commented out
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) console.error("Error toggling todo:", error);
    else
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
  };

  const value = {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};
