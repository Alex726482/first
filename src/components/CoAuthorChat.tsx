import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap, Brain, PlusCircle, Trash2, MessageSquare, ChevronRight } from 'lucide-react';
import { ChatMessage, ModelComplexity, StoryDossier } from '../types';

interface CoAuthorChatProps {
  sceneContext: StoryDossier | null;
  onInsertToStory: (text: string) => void;
}

export const CoAuthorChat: React.FC<CoAuthorChatProps> = ({
  sceneContext,
  onInsertToStory,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content:
        "Greetings, Author. I am your Literary Ghostwriter and Worldbuilding Co-Author. As you inspect this scene, I am ready to brainstorm plot paths, forge character dialogue, deepen sensory tension, or draft entire next scenes. Which direction shall we explore first?",
      timestamp: Date.now(),
      modelUsed: 'gemini-3.8-flash',
      complexity: 'general',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [complexity, setComplexity] = useState<ModelComplexity>('general');
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: Date.now(),
      complexity,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    if (!customText) setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history to backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          taskComplexity: complexity,
          sceneContext,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to receive response from co-author.');
      }

      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply,
        timestamp: Date.now(),
        modelUsed: data.modelUsed,
        complexity,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.message || 'Co-author encountered an issue. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content:
          "Desk cleared. What aspect of the world, characters, or next paragraphs would you like to co-write now?",
        timestamp: Date.now(),
        modelUsed: 'gemini-3.8-flash',
        complexity: 'general',
      },
    ]);
  };

  const QUICK_PROMPTS = [
    'Write a tense dialogue between two characters meeting here',
    'Deepen the sensory details of the sounds, climate, and scents',
    'Brainstorm 3 hidden secrets buried beneath this location',
    'Draft the next paragraph focusing on an unexpected noise',
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col h-[650px] backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              Ghostwriter&rsquo;s Co-Author Desk
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-400">
              Interactive multi-turn literary companion grounded in your scene
            </p>
          </div>
        </div>

        {/* Clear Chat Button */}
        <button
          type="button"
          onClick={handleClearHistory}
          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Model Tier Selector (Requirement: Use gemini-4-argon for complex, gemini-3.8-flash for general, gemini-3.1-flash-lite for fast) */}
      <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs flex-wrap gap-2">
        <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
          Task Complexity &amp; Model:
        </span>

        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setComplexity('fast')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              complexity === 'fast'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Fast brainstorming, quick metaphors (gemini-3.1-flash-lite)"
          >
            <Zap className="w-3 h-3" />
            <span>Fast (flash-lite)</span>
          </button>

          <button
            type="button"
            onClick={() => setComplexity('general')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              complexity === 'general'
                ? 'bg-indigo-500 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="General co-writing, dialogue, scene continuation (gemini-3.8-flash)"
          >
            <Sparkles className="w-3 h-3" />
            <span>General (3.8-flash)</span>
          </button>

          <button
            type="button"
            onClick={() => setComplexity('complex')}
            className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              complexity === 'complex'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Complex world lore, intricate prose, deep character motives (gemini-4-argon)"
          >
            <Brain className="w-3 h-3" />
            <span>Complex (4-argon)</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-md ${
                  isUser
                    ? 'bg-amber-600 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950/70 border border-slate-800 text-slate-200 rounded-tl-none font-serif-prose text-[13px]'
                }`}
              >
                {!isUser && msg.modelUsed && (
                  <div className="flex items-center justify-between text-[10px] font-sans font-mono text-slate-500 border-b border-slate-800 pb-1">
                    <span>{msg.modelUsed}</span>
                    <span className="text-[9px] text-slate-600">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                <div className="whitespace-pre-line select-text">{msg.content}</div>

                {/* Co-writer action: Insert directly into manuscript */}
                {!isUser && msg.id !== 'welcome' && (
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-end font-sans">
                    <button
                      type="button"
                      onClick={() => onInsertToStory(msg.content)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>Append to Story</span>
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 text-xs leading-relaxed justify-start">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-indigo-300 shrink-0">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2 text-slate-400">
              <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              <span>Co-author is crafting prose...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl">
            {error}
          </div>
        )}
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="px-3 py-2 bg-slate-950/40 border-t border-slate-800/60 overflow-x-auto flex gap-1.5 scrollbar-none">
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/60 flex items-center gap-1 transition-colors shrink-0"
          >
            <span>{prompt}</span>
            <ChevronRight className="w-2.5 h-2.5 text-slate-500" />
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask co-author to brainstorm, draft next sentences, or write dialogue..."
            rows={2}
            className="flex-1 text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 resize-none"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all ${
              !inputValue.trim() || isLoading
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-md shadow-amber-500/20'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
