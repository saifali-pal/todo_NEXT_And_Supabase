import { atom } from 'jotai';

// Client-side state atoms
export const selectedTodoIdAtom = atom<string | null>(null);
export const todoFiltersAtom = atom<'all' | 'completed' | 'incomplete'>('all');
export const isAddingTodoAtom = atom<boolean>(false);
export const todoSearchAtom = atom<string>('');

// UI state atoms
export const sidebarOpenAtom = atom<boolean>(false);
export const todoModalOpenAtom = atom<boolean>(false);