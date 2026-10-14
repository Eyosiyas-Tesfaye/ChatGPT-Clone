import React from "react";
import Slidebar from "./components/Sidebar/Sidebar";
import ChatHeader from "./components/chatHeader/chatHeader";
import MessageList from "./components/MessageList/MessageList";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ChatInput from "./components/ChatInput/ChatInput";
function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const messagesEndRef = useRef(null);

  async function fetchConversations() {
    try {
      const { data } = await axios.get(
        "https://chat-gpt-clone-backend-120m.onrender.com/api/chat/conversations",
      );
      console.log(data.data);
      setConversations(data.data);
    } catch (error) {
      console.log(error.message);
    }
  }


 async function handleSubmit(question) {
    if (!question.trim()) {
      return;
    }
    const tempUserMessage = {
      id: Date.now(),
      role: "user",
      content: question,
    };
    setConversations((prev) => [...prev, tempUserMessage]);
    // setIsLoading(true);
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://chat-gpt-clone-backend-120m.onrender.com",
        {
          question: question.trim(),
        },
      );
      setConversations((prev) => [...prev, data?.data?.assistantConversation]);
    } catch (error) {
      console.log(error.message);
    }finally {
      setIsLoading(false);
    }

 }


useEffect(()=>{
  fetchConversations();
}, [])

useEffect(() => {
 messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [conversations, isLoading]);
  return (
    <div className="app">
      <Slidebar />

      <main className="main">
        <ChatHeader isLoading={isLoading} />
        <MessageList
          messagesEndRef={messagesEndRef}
          isLoading={isLoading}
          conversations={conversations}
        />
        <ChatInput handleSubmit={handleSubmit} />
      </main>
    </div>
  );
}

export default App;
