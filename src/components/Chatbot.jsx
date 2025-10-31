// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip } from "lucide-react"; // Giữ lại icons cần thiết

// --- Component phụ cho Tin nhắn ---
// (Giữ nguyên component ChatMessage của bạn)
const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  const renderContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white rounded-br-lg"
            : "bg-gray-100 text-gray-800 rounded-bl-lg"
        }`}
      >
        <div
          className="text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: renderContent(content) }}
        ></div>
      </div>
    </div>
  );
};
// --- Hết Component phụ ---

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  // Xóa activeTab vì thiết kế mới không có
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

  // Cập nhật tin nhắn chào mừng
  useEffect(() => {
    if (isOpen && messages.length ===0) {
      setMessages([
        {
          id: 1,
          type: "bot",
          content: `Hi! I can understand many languages. How can I help you?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  // --- Logic xử lý tin nhắn (giữ nguyên) ---
  const generateBotResponse = (userInput) => {
    // Giả lập phản hồi đơn giản vì không còn tab
    return {
      feedback:
        "This is a simulated response. Your input was received and is being processed.",
      score: "N/A",
      tips: "• Ask me about IELTS topics.\n• Upload an essay for review.\n• Practice speaking prompts.",
    };
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

    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: `📊 **AI Feedback**\n\n${botResponse.feedback}\n\n**Tips:**\n${botResponse.tips}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileMessage = {
        id: Date.now(),
        type: "user",
        content: `📎 Uploaded: ${file.name}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fileMessage]);
      event.target.value = null; // Reset input

      setIsTyping(true);
      setTimeout(() => {
        const botResponse = generateBotResponse("uploaded file");
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: `📊 **File Analysis Complete**\n\n**Estimated Band Score: 7.0**\n\n**Feedback:**\nYour file has been processed. ${botResponse.feedback}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 3000);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* === THAY ĐỔI: NÚT CHAT THU GỌN === */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-950 hover:bg-blue-800 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group relative transition-all duration-300 hover:scale-110 btn-hover"
          aria-label="Mở AI Chatbot"
        >
          {/* Đây là logo AI từ ảnh của bạn.
            *** QUAN TRỌNG: Bạn cần thay thế 'logo-ai.png' bằng đường dẫn đến ảnh của bạn ***
            Ví dụ: "/images/aichat-icon.png" (nếu bạn đặt nó trong public/images)
          */}
          <img src="/images/icon_chatbot.png" alt="AI Bot" className="w-15 h-15" /> 
        </button>
      )}

      {/* === THAY ĐỔI: KHUNG CHAT MỞ RỘNG (Thiết kế lại hoàn toàn) === */}
      {isOpen && (
        <div 
          className="w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col slide-up border border-gray-200"
          style={{
            // Màu nền gradient xanh navy đậm từ ảnh
            background: 'linear-gradient(135deg, #1e40af 0%, #172554 100%)' 
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center text-white px-5 py-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              {/* *** QUAN TRỌNG: Bạn cần thay thế 'lexibot-logo.png' bằng logo của bạn ***
                (Giống như trong ảnh, logo PrepIELTS / LexiBot) 
              */}
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                 <img src="/images/icon_chatbot.png" alt="LexiBot" className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Discuss with LexiPrep</h3>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white hover:bg-white/20 rounded-full p-2"
              aria-label="Đóng chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Khung Lịch sử Chat */}
          {/* Nền trắng với padding trên cùng để tạo không gian trống */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white pt-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.type}
                content={message.content}
              />
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-lg">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Khung Input (Thiết kế lại) */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            {/* Dòng "Powered by" */}
            <div className="text-center text-xs text-gray-400 mb-2">
              Powered by <span className="font-semibold text-gray-500">LexiBot</span> — AI may occasionally make mistakes.
            </div>
            
            {/* Thanh nhập liệu */}
            <div className="relative flex items-center">
              {/* Nút đính kèm file */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.doc,.docx,.pdf,audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-blue-600 p-2 rounded-full absolute left-2 top-1/2 -translate-y-1/2"
                title="Upload file"
              >
                <Paperclip size={20} />
              </button>

              {/* Text input */}
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                rows="1"
                style={{ overflowY: "hidden" }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
              
              {/* Nút gửi */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white w-9 h-9 rounded-full flex items-center justify-center ml-1"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}