import {initTRPC} from '@trpc/server';
import {Context} from './context';
import axios from 'axios';
import {MessagesZod} from "@/hooks/useChat";
import z from 'zod';


const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  chat: t.procedure
    .input(z.object({messages: MessagesZod}))
    .query(async ({input}) => {
      try {
        const response = await axios.post('http://localhost:11434/api/chat', {
          model: 'llama3.2',
          messages: input.messages,
          stream: false
        });

        return {message: response.data.message.content};
      } catch (error) {
        console.error('Error making REST call:', error);
        return {message: "Error making REST call"};
      }
    })
});

export type AppRouter = typeof appRouter;