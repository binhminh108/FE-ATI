// src/components/ai-tools/SpeakingTool.jsx
import React, { useState, useRef, useEffect } from "react";
import { Mic, Square } from "lucide-react";

function SpeakingTool() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Xin chào! Đây là bài luyện tập Speaking Part 1.\n\nChủ đề hôm nay là **Work & Study**. Tôi sẽ hỏi bạn một vài câu. Hãy nhấn nút mic bên dưới để bắt đầu trả lời.",
    },
    {
      role: "bot",
      content: "Câu hỏi đầu tiên: **What is your job?**",
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleRecording = () => {
    const currentlyRecording = !isRecording;
    setIsRecording(currentlyRecording);

    if (currentlyRecording) {
      console.log("Bắt đầu ghi âm...");
    } else {
      console.log("Dừng ghi âm. Đang xử lý...");

      // ----- Giả lập một quy trình chat -----
      const userMessage = {
        role: "user",
        content:
          "I am a software developer. I've been working in this field for about 3 years and I really enjoy it because I love solving problems.",
      };
      setMessages((prev) => [...prev, userMessage]);

      setTimeout(() => {
        const botResponse = {
          role: "bot",
          content:
            "Great answer! Your fluency is good. Try to use more varied vocabulary, like 'I'm passionate about' instead of 'I really enjoy'.\n\nCâu hỏi tiếp theo: **What are your main responsibilities?**",
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 2000);
      // ----- Kết thúc giả lập -----
    }
  };

  return (
    // === THAY ĐỔI DÒNG NÀY ===
    // Đã xóa class "max-w-4xl mx-auto"
    <div className="flex flex-col h-[75vh] bg-white border border-gray-200 rounded-xl shadow-sm">
      
      {/* 1. KHUNG CHAT LỊCH SỬ */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 2. KHUNG INPUT & MIC (ở dưới cùng) */}
      <div className="p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
        <div className="flex items-center justify-between gap-4">
          
          {/* Thông báo trạng thái (bên trái) */}
          <div className="flex-1 text-sm text-gray-500 px-4">
            {isRecording ? (
              <span className="text-red-500 font-medium">
                Đang ghi âm... (nhấn nút đỏ để dừng)
              </span>
            ) : (
              "Nhấn mic để bắt đầu trả lời..."
            )}
          </div>

          {/* Nút MIC / Nút STOP (bên phải) */}
          <button
            onClick={toggleRecording}
            className={`relative w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${
              isRecording
                ? "bg-red-600" // Màu đỏ khi đang record
                : "bg-blue-600 hover:bg-blue-700" // Màu xanh khi chờ
            }`}
            aria-label={isRecording ? "Dừng ghi âm" : "Bắt đầu ghi âm"}
          >
            {/* VÒNG TRÒN RUNG (hiệu ứng loa) */}
            {isRecording && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            )}

            {/* ICON (nằm đè lên trên) */}
            <span className="relative z-10">
              {isRecording ? (
                <Square size={24} className="fill-white" /> // Icon Stop
              ) : (
                <Mic size={28} /> // Icon Mic
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Component phụ để render Tin nhắn ---
const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-5 py-3 rounded-2xl whitespace-pre-line ${
          isUser
            ? "bg-blue-600 text-white rounded-br-lg"
            : "bg-gray-100 text-gray-800 rounded-bl-lg"
        }`}
        // Dùng `dangerouslySetInnerHTML` để có thể render chữ in đậm (<strong>)
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default SpeakingTool;