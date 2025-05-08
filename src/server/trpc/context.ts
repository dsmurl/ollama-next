import { inferAsyncReturnType } from "@trpc/server";

// Context creation function
export const createContext = () => {
  return {}; // Adjust if you need to include additional context
};

// Infer the context type
export type Context = inferAsyncReturnType<typeof createContext>;
