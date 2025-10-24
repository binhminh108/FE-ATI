// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Listening");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content: `👋 Hi! I'm your IELTS AI Scoring Bot. Upload your ${activeTab} answer or type your questions, and I'll provide detailed feedback with an estimated band score.`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, activeTab]);

  const generateBotResponse = (userInput, skill) => {
    const responses = {
      Listening: {
        feedback:
          "Great listening practice! I can see you've understood the main ideas. Your answer shows good comprehension of specific details.",
        score: "7.0",
        tips: "• Focus on keywords and synonyms\n• Practice note-taking techniques\n• Listen for signal words",
      },
      Reading: {
        feedback:
          "Your reading comprehension is solid. You've identified key information accurately and shown good analytical skills.",
        score: "6.5",
        tips: "• Improve skimming and scanning techniques\n• Practice time management\n• Focus on paraphrasing skills",
      },
      Writing: {
        feedback:
          "Your writing demonstrates good task achievement and coherence. Grammar and vocabulary usage show strong command of English.",
        score: "7.5",
        tips: "• Vary your sentence structures more\n• Use more sophisticated vocabulary\n• Ensure clear paragraph organization",
      },
      Speaking: {
        feedback:
          "Your speaking shows good fluency and pronunciation. Ideas are well-developed with appropriate examples.",
        score: "7.0",
        tips: "• Use more idiomatic expressions\n• Improve intonation patterns\n• Practice complex grammatical structures",
      },
    };

    return responses[skill];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue, activeTab);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: `📊 **${activeTab} Assessment Results**\n\n**Estimated Band Score: ${botResponse.score}**\n\n**Feedback:**\n${botResponse.feedback}\n\n**Improvement Tips:**\n${botResponse.tips}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = {
        id: Date.now(),
        type: "user",
        content: `📎 Uploaded: ${file.name} (${file.type})`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fileMessage]);

      setIsTyping(true);
      setTimeout(() => {
        const botResponse = generateBotResponse("uploaded file", activeTab);
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: `📊 **${activeTab} File Analysis Complete**\n\n**Estimated Band Score: ${botResponse.score}**\n\n**Feedback:**\n${botResponse.feedback}\n\n**Improvement Tips:**\n${botResponse.tips}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const tabMessage = {
      id: Date.now(),
      type: "bot",
      content: `Switched to ${tab} mode. Upload your ${tab} answer or ask me any questions about ${tab} skills!`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, tabMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group relative transition-all duration-300 hover:scale-110"
        >
          <span className="text-2xl">🤖</span>
          <div className="absolute -top-12 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            AI IELTS Scoring Chatbot
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col slide-up border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-lg">IELTS AI Scoring Bot</h3>
                <p className="text-blue-100 text-xs">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {["Listening", "Reading", "Writing", "Speaking"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600 bg-white"
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-200"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.doc,.docx,.pdf,audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors duration-200"
                title="Upload file"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
              <span className="text-xs text-gray-500">
                Upload your {activeTab} answer
              </span>
            </div>

            <div className="flex space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Type your ${activeTab} question or answer...`}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows="2"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
