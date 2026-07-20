import React, { useState, useRef, useEffect } from 'react';
import { streamOpenRouterChat } from '../../services/openrouter';
import { Send, RotateCcw, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const ChatbotApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: `Hi! I'm Joshua's AI assistant. Ask me anything about Joshua's Data Engineering work, AI projects, or social links!`,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    // Add initial placeholder bot message
    setMessages((prev) => [...prev, { id: botMsgId, sender: 'bot', text: '' }]);

    try {
      let accumulatedText = '';
      for await (const chunk of streamOpenRouterChat(updatedHistory)) {
        accumulatedText += chunk;
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId ? { ...msg, text: '[Error]: Failed to stream response.' } : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: `Chat reset. Ask me anything!`,
      },
    ]);
  };

  // Renders text with clickable URLs automatically
  const renderMessageContent = (text: string, isUser: boolean) => {
    if (!text) return isTyping && !isUser ? '...' : '';

    // Regex to match URLs (http://, https://, or www.)
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith('www.') ? `https://${part}` : part;
        // Clean trailing punctuation like period or comma attached to URL
        const cleanHref = href.replace(/[.,;)]+$/, '');
        const cleanPart = part.replace(/[.,;)]+$/, '');
        const trailingPunct = part.slice(cleanPart.length);

        return (
          <React.Fragment key={index}>
            <a
              href={cleanHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline font-semibold transition break-all ${
                isUser ? 'text-[#11111b] hover:text-white' : 'text-[#89b4fa] hover:text-[#cba6f7]'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {cleanPart}
            </a>
            {trailingPunct}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  return (
    <div className="h-full flex flex-col justify-between text-[#cdd6f4] select-none w-full overflow-hidden bg-transparent">
      {/* Edge-to-Edge Sub-Header Bar */}
      <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-[#cba6f7]" />
          <span className="text-xs font-semibold text-white">AI Assistant</span>
        </div>
        <button
          onClick={handleClearChat}
          className="text-[#a6adc8] hover:text-white transition cursor-pointer p-1 rounded-lg hover:bg-white/10"
          title="Reset Chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Conversation Flow */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-sans">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#cba6f7] text-[#11111b] font-medium rounded-br-none'
                  : 'bg-white/5 border border-white/10 text-[#cdd6f4] rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap select-text">
                {renderMessageContent(msg.text, msg.sender === 'user')}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-1.5 text-xs text-[#a6adc8] px-1 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cba6f7] animate-pulse" />
            <span className="text-[11px]">AI is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Edge-to-Edge Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="px-4 py-3 bg-white/[0.03] border-t border-white/10 flex items-center space-x-2 shrink-0"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask AI anything..."
          className="flex-1 bg-transparent px-2 py-1 text-xs focus:outline-none placeholder-[#a6adc8]/60 text-white"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className={`p-2 rounded-xl transition cursor-pointer ${
            inputVal.trim() && !isTyping ? 'bg-[#cba6f7] text-[#11111b] hover:bg-[#b4befe]' : 'text-[#585b70]'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
