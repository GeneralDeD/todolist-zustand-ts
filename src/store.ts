import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export type todoType = {
  id: string;
  title: string;
  completed: boolean;
};

type useTodosType = {
  error: boolean | null;
  loading: boolean;
  todo: todoType | null;
  todos: todoType[];
  addTodo(title: todoType["title"]): void;
  editTodoId(todo: useTodosType["todo"]): void;
  editTodo(id: todoType["id"], title: todoType["title"]): void;
  deleteTodo(id: todoType["id"]): void;
  setStatus(id: todoType["id"]): void;
  fetchTodos(): void;
};

export const useTodos = create<useTodosType>()(
  devtools(
    persist(
      (set, get) => ({
        error: null,
        loading: false,
        todo: null,
        todos: [
          { id: nanoid(), title: "Learn JS", completed: true },
          { id: nanoid(), title: "Learn React", completed: false },
        ],
        // addTodo: (title) =>
        //   set((state) => {
        //     const newTodo = { id: nanoid(), title, completed: false };

        //     return { todos: [...state.todos, newTodo] };
        //   }),
        addTodo: (title) => {
          const newTodo = { id: nanoid(), title, completed: false };

          set({ todos: [...get().todos, newTodo] });
        },
        editTodoId: (todo) => {
          set({ todo });
        },
        editTodo: (id, title) => {
          set({
            todos: get().todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
            todo: null,
          });
        },
        deleteTodo: (id) => {
          set({
            todos: get().todos.filter((todo) => todo.id !== id),
          });
        },
        setStatus: (id) => {
          set({
            todos: get().todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
          });
        },
        fetchTodos: async () => {
          set({ loading: true });

          try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

            if (!res.ok) throw new Error("Failde to fetch!");

            set({ todos: await res.json(), error: null });
          } catch (error) {
            set({ error: true });
          } finally {
            set({ loading: false });
          }
        },
      }),
      { name: "todos" }
    ),
    { name: "todos" }
  )
);

type useFilterType = {
  filter: string;
  setFilter(value: string): void;
};

export const useFilter = create<useFilterType>()(
  devtools(
    persist(
      (set) => ({
        filter: "all",
        setFilter: (value) => set({ filter: value }),
      }),
      { name: "filter" }
    ),
    { name: "filter" }
  )
);
