import React from 'react';
import {trpc} from "@/utils/trpc";
import z from 'zod';
import {getConfig} from "@/config";


export const MessageZod = z.object({
  role: z.string(),
  content: z.string()
})

export const MessagesZod = z.array
(MessageZod);

export type Message = z.infer<typeof MessageZod>;

export const useChat = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const {model} = getConfig();

  const pushMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  }

  const {isFetching, refetch} = trpc.chat.useQuery(
    {messages: messages.slice(-8)},
    {
      enabled: false,
      onSuccess: (data: { message: string }) => {
        const responseMessage = data.message || '';
        if (responseMessage) {
          pushMessage({role: model, content: responseMessage});
        }
      }
    }
  );

  const chat = async ({content}: { content: string }) => {
    await pushMessage({role: 'user', content: content});
    refetch();
  }


  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  }

  const clearMessages = () => {
    setMessages([]);
  }

  return {
    chat,
    messages,
    addMessage,
    clearMessages,
    isFetching,
  }
}