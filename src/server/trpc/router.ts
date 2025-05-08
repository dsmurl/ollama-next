import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import axios from "axios";
import { MessagesZod } from "@/hooks/useChat";
import z from "zod";
import { ModelTypeZod } from "@/hooks/useModels";

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  chat: t.procedure
    .input(z.object({ messages: MessagesZod, model: ModelTypeZod }))
    .query(async ({ input }) => {
      try {
        // Start timing
        const startTime = performance.now();

        const response = await axios.post("http://localhost:11434/api/chat", {
          model: input.model,
          messages: input.messages,
          stream: false,
        });

        // End timing
        const endTime = performance.now();
        const durationSeconds = ((endTime - startTime) / 1000).toFixed(2);

        return {
          message: response.data.message.content,
          durationSeconds: Number(durationSeconds),
        };
      } catch (error) {
        console.error("Error making REST call:", error);
        return {
          message: "Error making REST call",
          durationSeconds: 0,
        };
      }
    }),
});

export type AppRouter = typeof appRouter;
