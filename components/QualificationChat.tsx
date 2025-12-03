import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X, MessageCircle, Send, Loader2, ExternalLink } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestedAnswers?: string[]; // Add suggested button answers
  recommendations?: Array<{
    category: string;
    title: string;
    url: string;
  }>;
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
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [showInitialButtons, setShowInitialButtons] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasLoadedHistory = useRef(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      // Scroll only within the chat container, not the entire page
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
      // For embedded mode, load history first, then send greeting if needed
      if (messages.length === 0 && !hasLoadedHistory.current) {
        loadConversationHistory();
      }
    }
  }, [mode]);

  // Load conversation history when component mounts
  const loadConversationHistory = async () => {
    if (!customerInfo?.email || hasLoadedHistory.current) return;
    
    hasLoadedHistory.current = true;
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/leads/get-conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: customerInfo.email,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.conversationHistory && data.conversationHistory.length > 0) {
        // RETURNING USER - Resume from where they left off
        setConversationHistory(data.conversationHistory);
        setLeadId(data.leadId);
        setHasEngaged(true);
        setIsReturningUser(true);
        
        // Show welcome back message with YES/Not Right Now buttons
        const welcomeBackMessage: Message = {
          role: "assistant",
          content: `Welcome back, ${customerInfo.name || "there"}! If you want to find other savings, or have any questions, I'm here to help!`,
          suggestedAnswers: ["Yes", "Not right now"]
        };
        
        setMessages([welcomeBackMessage]);
        setShowInitialButtons(true);
      } else {
        // FIRST TIME USER - Show initial greeting with YES button
        setIsReturningUser(false);
        const greetingMessage: Message = {
          role: "assistant",
          content: `Hey, ${customerInfo.name || "there"}! Before you go, I can quickly check if you qualify for extra savings and benefits. Can I ask you a few quick questions?`,
          suggestedAnswers: ["Yes", "Not right now"]
        };
        
        setMessages([greetingMessage]);
        setShowInitialButtons(true);
      }
    } catch (error) {
      console.error("❌ Error loading conversation history:", error);
      
      // Show default greeting on error
      const greetingMessage: Message = {
        role: "assistant",
        content: `Hey, ${customerInfo.name || "there"}! Before you go, I can quickly check if you qualify for extra savings and benefits. Can I ask you a few quick questions?`,
        suggestedAnswers: ["Yes", "Not right now"]
      };
      
      setMessages([greetingMessage]);
      setShowInitialButtons(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0 && !hasLoadedHistory.current) {
      loadConversationHistory();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onDismiss) onDismiss();
  };

  // Extract suggested answers from AI message (e.g., [Yes | No])
  const extractSuggestedAnswers = (content: string): string[] | undefined => {
    const match = content.match(/\[(.*?)\]/);
    if (match) {
      return match[1].split("|").map((s) => s.trim());
    }
    return undefined;
  };

  // Create or update lead
  const createOrUpdateLead = async () => {
    if (!customerInfo?.email || leadId) return; // Skip if already created
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/leads/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            name: customerInfo.name,
            email: customerInfo.email,
            phone: customerInfo.phone,
            orderToken,
            responses: {},
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setLeadId(data.leadId);
        console.log("✅ Lead created:", data.leadId);
      }
    } catch (error) {
      console.error("❌ Error creating lead:", error);
    }
  };

  // Update conversation in backend LIVE
  const updateConversationLive = async (userMsg: string, aiMsg: string, history: any[]) => {
    if (!customerInfo?.email) return;
    
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/leads/update-conversation`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: customerInfo.email,
            userMessage: userMsg,
            aiMessage: aiMsg,
            conversationHistory: history,
          }),
        }
      );
      
      console.log("✅ Conversation updated LIVE in backend");
    } catch (error) {
      console.error("❌ Error updating conversation:", error);
    }
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    // Create or update lead on first engagement
    if (!hasEngaged) {
      setHasEngaged(true);
      await createOrUpdateLead();
    }

    // Hide initial buttons after first response
    if (showInitialButtons) {
      setShowInitialButtons(false);
    }

    // Add user message
    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build conversation history for backend
      const newHistory = [
        ...conversationHistory,
        { role: "user", content: textToSend },
      ];

      // Call ChatGPT endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/chat/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            message: textToSend,
            conversationHistory,
            customerInfo,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        const aiMessage = data.message;
        const suggestedAnswers = extractSuggestedAnswers(aiMessage);
        const recommendations = data.recommendations || [];

        const assistantMessage: Message = {
          role: "assistant",
          content: aiMessage,
          suggestedAnswers,
          recommendations,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setConversationHistory(data.conversationHistory);

        // Update conversation LIVE in backend
        await updateConversationLive(textToSend, aiMessage, data.conversationHistory);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error: any) {
      console.error("❌ Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle SMS link sending
  const sendSMSLink = async (category: string, url: string) => {
    if (!customerInfo?.phone) {
      alert("No phone number available to send SMS");
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-cf244566/send-recommendation-sms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            phone: customerInfo.phone,
            category,
            url,
            customerName: customerInfo.name,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(`✅ Link sent to ${customerInfo.phone}!`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("❌ Error sending SMS:", error);
      alert("Failed to send SMS. Please try again.");
    }
  };

  if (mode === "popup" && !isOpen) {
    return (
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div
      className={
        mode === "popup"
          ? "fixed bottom-24 right-6 w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-gray-200"
          : "w-full h-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border-2 border-gray-200"
      }
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-green-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Before You Go...</h3>
            <p className="text-xs opacity-90">
              Quick question - see if you qualify for extra savings & benefits! ✨
            </p>
          </div>
        </div>
        {mode === "popup" && (
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-red-600 to-green-600 text-white"
                    : "bg-white shadow-sm border border-gray-200"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>

            {/* Suggested Answer Buttons */}
            {msg.role === "assistant" && msg.suggestedAnswers && (
              <div className="flex flex-wrap gap-2 mt-2 ml-2">
                {msg.suggestedAnswers.map((answer, i) => (
                  <Button
                    key={i}
                    onClick={() => sendMessage(answer)}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-2 hover:bg-gradient-to-r hover:from-red-600 hover:to-green-600 hover:text-white hover:border-transparent"
                    disabled={isLoading}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
            )}

            {/* Service Recommendations */}
            {msg.role === "assistant" && msg.recommendations && msg.recommendations.length > 0 && (
              <div className="mt-3 ml-2 space-y-2">
                {msg.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-red-50 to-green-50 border-2 border-green-600 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{rec.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{rec.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => window.open(rec.url, "_blank")}
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                        {customerInfo?.phone && (
                          <Button
                            onClick={() => sendSMSLink(rec.category, rec.url)}
                            size="sm"
                            variant="outline"
                          >
                            📱 Text Me
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm border border-gray-200 rounded-2xl px-4 py-2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Initial YES / Not Right Now Buttons (only shown initially) */}
      {showInitialButtons && (
        <div className="p-4 bg-white border-t border-gray-200 flex flex-col gap-2">
          <Button
            onClick={() => sendMessage("Yes")}
            className="w-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg"
            disabled={isLoading}
          >
            ✨ Yes
          </Button>
          <Button
            onClick={() => sendMessage("Not right now")}
            variant="outline"
            className="w-full border-2 py-3"
            disabled={isLoading}
          >
            Not Right Now
          </Button>
        </div>
      )}

      {/* Input Area (hidden when initial buttons are showing) */}
      {!showInitialButtons && (
        <div className="p-4 bg-white border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="If you have any questions, you can ask me..."
              className="flex-1 rounded-full border-2 px-4"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 w-12 h-12 flex-shrink-0"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-center text-gray-500 mt-2">
            Chat is powered by AI to help you find savings
          </p>
        </div>
      )}
    </div>
  );
}
