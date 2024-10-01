import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:3000");

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      // Emit the message to the server
      socket.emit("message", messageInput);
      setMessageInput(""); // Clear input field
    }
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Use the previous state
    });

    // Cleanup function to prevent memory leaks
    return () => {
      socket.off("message");
    };
  }, [messages]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl mb-4">Chat App</h1>
      <div className="w-1/2 bg-white rounded-lg shadow-lg p-4">
        <div className="overflow-y-auto max-h-60">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-blue-400 text-white p-2 rounded-lg my-1"
            >
              {message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            placeholder="Enter your message"
            autoComplete="off"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
