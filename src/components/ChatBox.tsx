import React from "react";
import { Message, useChat } from "@/hooks/useChat";
import { formatMessageContent } from "@/utils/message-utils";

export const ChatBox: React.FC = () => {
  const [questionInput, setQuestionInput] = React.useState("");
  const { isFetching, messages, chat, clearMessages } = useChat();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUserQuestion = questionInput.trim();
    await setQuestionInput("");
    chat({ content: currentUserQuestion });
  };

  const handleClearClick = async () => {
    await clearMessages();
  };

  const onTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(event.target.value);
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isFetching]);

  return (
    <div className="flex flex-col p-4 bg-white shadow-md rounded-lg min-w-[300px]">
      {/* Input Form - Always Visible */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-1 mt-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your question"
            className="w-full p-2 border border-gray-300 rounded text-black"
            value={questionInput}
            onChange={onTextInput}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-3/5 px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isFetching}
          >
            {isFetching ? (
              <div className="w-full flex justify-center items-center">
                <div className="spinner" />
              </div>
            ) : (
              "Ask"
            )}
          </button>
          <button
            type="button"
            className="w-2/5 px-4 py-2 mb-4 bg-pink-200 text-black rounded hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={handleClearClick}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Scrollable Messages Container */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-300px)] border-t pt-2">
        {messages.map((message: Message, i: number) => (
          <div key={i} className="p-2 bg-gray-100 rounded text-black">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold uppercase">{message.role}</span>
              {message.durationSeconds ? (
                <span className="font-normal text-xs text-gray-500">
                  {message.durationSeconds}s
                </span>
              ) : null}
            </div>
            <div>{formatMessageContent(message.content)}</div>
            {i === messages.length - 1 ? <div ref={messagesEndRef} /> : null}
          </div>
        ))}

        {/* Loading Spinner */}
        {isFetching ? (
          <div className="p-2 bg-gray-100 rounded text-black">
            <div className="flex justify-center w-full mt-2">
              <div className="spinner !border-t-blue-500" />
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
