//about how react query interacts with supabase
//responsible for talking with backend, not  managing UI or state
//This file is the bridge between your React frontend and Supabase backend.

import { supabase, Database } from "@/lib/supabase";
import { Todo } from "@/types/todo";

type TodoInsert = Database["public"]["Tables"]["todos"]["Insert"];
type TodoUpdate = Database["public"]["Tables"]["todos"]["Update"];

export const todoService = {
  // Get all todos for the currently logged-in user.
  async fetchTodos(userId: string): Promise<Todo[]> {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }

    return data || [];
  },

  // Add a new todo
  async addTodo(text: string, userId: string): Promise<Todo> {
    const newTodo: TodoInsert = {
      text,
      completed: false,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert([newTodo])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to add todo: ${error.message}`);
    }

    return data;
  },

  // Update todo text
  async updateTodo(id: string, text: string, userId: string): Promise<Todo> {
    const updates: TodoUpdate = {
      text,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update todo: ${error.message}`);
    }

    return data;
  },

  // Toggle todo completion
  async toggleTodo(
    id: string,
    completed: boolean,
    userId: string
  ): Promise<Todo> {
    const updates: TodoUpdate = {
      completed,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("todos")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to toggle todo: ${error.message}`);
    }

    return data;
  },

  // Delete a todo
  async deleteTodo(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      throw new Error(`Failed to delete todo: ${error.message}`);
    }
  },
};
