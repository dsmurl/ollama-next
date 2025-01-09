import React from 'react';
import {Message, useChat} from "@/hooks/useChat";


export const ChatBox: React.FC = () => {
  const [questionInput, setQuestionInput] = React.useState('');
  const {isFetching, messages, chat, clearMessages} = useChat();


  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const currentUserQuestion = questionInput.trim();
    await setQuestionInput('');
    chat({content: currentUserQuestion});
  };

  const handleClearClick = async () => {
    await clearMessages()
  };

  const onTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionInput(event.target.value);
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg min-w-[300px]">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Enter your question"
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          value={questionInput}
          onChange={onTextInput}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-3/5 px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isFetching}
          >
            {isFetching ? (
              <div className="w-full flex justify-center items-center">
                <div className="spinner"/>
              </div>) : (
              'Ask'
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
      {/*{error && <div className="text-center text-red-500">Error: {error.message}</div>}*/}
      <div className="mt-4 space-y-2">
        {messages.map((message: Message, i: number) => (
          <div key={i} className="p-2 bg-gray-100 rounded text-black">
            {`${message.role}: ${message.content}`}
          </div>
        ))}
      </div>
    </div>
  );
};

