import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, MessageCircle, Send, Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface QualificationChatProps {
  customerInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    state?: string;
  };
  orderToken?: string;
  mode?: "popup" | "embedded"; // New prop
  onDismiss?: () => void; // Callback when user dismisses popup
}

export function QualificationChat({ customerInfo, orderToken, mode = "popup", onDismiss }: QualificationChatProps) {
  const [isOpen, setIsOpen] = useState(mode === "embedded");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [hasEngaged, setHasEngaged] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Auto-open popup after 3 seconds (only in popup mode)
  useEffect(() => {
    if (mode === "popup") {
      const timer = setTimeout(() => {
        if (!isOpen && messages.length === 0) {
          handleOpen();
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else if (mode === "embedded") {
      // For embedded mode, send greeting immediately
      if (messages.length === 0) {
        sendInitialGreeting();
      }
    }
  }, [mode]);

  const handleOpen = async () => {
    setIsOpen(true);
    
    // Send initial greeting
    if (messages.length === 0) {
      await sendInitialGreeting();
    }
  };

  const handleClose = () => {
    if (mode === "popup" && onDismiss) {
      onDismiss(); // Notify parent to switch to embedded mode
    } else {
      setIsOpen(false);
    }
  };

  const sendInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/chat/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            message: "START",
            conversationHistory: [],
            customerInfo: customerInfo,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages([{ role: "assistant", content: data.message }]);
        setConversationHistory(data.conversationHistory);
      }
    } catch (error) {
      console.error("Error getting initial greeting:", error);
      setMessages([
        {
          role: "assistant",
          content: "Hey! Before you go, I can quickly check if you qualify for extra savings and benefits. Can I ask you a few quick questions?",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    
    // Mark as engaged for lead tracking
    if (!hasEngaged) {
      setHasEngaged(true);
      await trackLead(userMessage);
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/chat/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory: conversationHistory,
            customerInfo: customerInfo,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        setConversationHistory(data.conversationHistory);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again." },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const trackLead = async (firstMessage: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/leads/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: customerInfo?.name || "Unknown",
            email: customerInfo?.email || "",
            phone: customerInfo?.phone || "",
            orderToken: orderToken || "",
            responses: {
              firstMessage: firstMessage,
              timestamp: new Date().toISOString(),
            },
          }),
        }
      );
    } catch (error) {
      console.error("Error tracking lead:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Popup Mode UI
  if (mode === "popup") {
    return (
      <>
        {/* Chat Button - Fixed Bottom Right */}
        {!isOpen && (
          <button
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-red-600 to-green-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-200 animate-bounce"
            style={{ animationDuration: "2s" }}
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {/* Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 w-full max-w-lg flex flex-col overflow-hidden max-h-[90vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Before You Go...</h3>
                </div>
                <p className="text-sm opacity-90">
                  Quick question - see if you qualify for extra savings & benefits! ✨
                </p>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
                style={{ maxHeight: "400px", minHeight: "250px" }}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-red-600 to-green-600 text-white"
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <p className="text-sm">Typing...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-gray-200">
                <div className="flex gap-2 mb-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="flex-1 text-sm"
                  >
                    Not Right Now
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Chat is powered by AI to help you find savings
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Embedded Mode UI
  return (
    <div className="w-full bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Savings Assistant</h3>
            <p className="text-xs opacity-90">See if you qualify for extra savings!</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="overflow-y-auto p-4 space-y-3 bg-gray-50"
        style={{ maxHeight: "400px", minHeight: "300px" }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-red-600 to-green-600 text-white"
                  : "bg-white text-gray-800 border border-gray-200"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl px-4 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Chat is powered by AI to help you find savings
        </p>
      </div>
    </div>
  );
}