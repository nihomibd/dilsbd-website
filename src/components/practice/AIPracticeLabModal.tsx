import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Volume2, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  ChevronDown, 
  ChevronUp,
  Flame,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AISpeakingScenario, AIMessage } from '../../types';

interface AIPracticeLabModalProps {
  scenario: AISpeakingScenario;
  onClose: () => void;
  onXpEarned?: (newXp: number) => void;
}

export const AIPracticeLabModal: React.FC<AIPracticeLabModalProps> = ({
  scenario,
  onClose,
  onXpEarned
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      japanese: scenario.initialPrompt.japanese,
      romaji: scenario.initialPrompt.romaji,
      bangla: scenario.initialPrompt.bangla,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exchangeCount, setExchangeCount] = useState<number>(0);
  const [hasAwardedXp, setHasAwardedXp] = useState<boolean>(false);
  const [showXpBanner, setShowXpBanner] = useState<boolean>(false);
  const [isCompletedView, setIsCompletedView] = useState<boolean>(false);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Audio Pronunciation via Web Speech Synthesis (ja-JP)
  const handlePlayAudio = (phrase?: string) => {
    if (!phrase) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initialize Web Speech Recognition
  const handleToggleVoiceInput = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('আপনার ব্রাউজার সরাসরি মাইক্রোফোন ট্রান্সক্রিপশন সমর্থন করে না। অনুগ্রহ করে টেক্সট টাইপ করুন।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Send message to server-side AI endpoint
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      japanese: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const newExchangeCount = exchangeCount + 1;
    setExchangeCount(newExchangeCount);

    try {
      const res = await fetch('/api/ai/practice-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: scenario.id,
          userMessage: messageContent,
          conversationHistory: messages.slice(-4).map(m => ({ sender: m.sender, japanese: m.japanese })),
          exchangeCount: newExchangeCount
        })
      });

      const json = await res.json();

      if (json.success && json.data) {
        const aiMsg: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          japanese: json.data.japanese,
          romaji: json.data.romaji,
          bangla: json.data.bangla,
          feedback: json.data.feedback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, aiMsg]);
        setExpandedFeedbackId(aiMsg.id);

        // Auto play response
        handlePlayAudio(json.data.japanese);

        // XP Award check
        if (json.data.earnedXp && !hasAwardedXp) {
          setHasAwardedXp(true);
          setShowXpBanner(true);
          if (onXpEarned) onXpEarned(json.data.totalXp);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      }
    } catch {
      // Fallback response if network fails
      const fallbackMsg: AIMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        japanese: 'はい、よく分かりました！ありがとうございます。',
        romaji: 'Hai, yoku wakarimashita! Arigatou gozaimasu.',
        bangla: 'হ্যাঁ, আমি পরিষ্কারভাবে বুঝেছি! ধন্যবাদ।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-white shadow-2xl relative overflow-hidden flex flex-col h-[90vh] max-h-[750px]"
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 bg-slate-900 rounded-xl border border-slate-800 shrink-0">
              {scenario.characterAvatar}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">
                  {scenario.roleJapanese}
                </h4>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {scenario.difficulty}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono block">
                {scenario.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {exchangeCount >= 2 && (
              <button
                onClick={() => setIsCompletedView(true)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Award className="w-3.5 h-3.5" />
                <span>সমাপ্তি রিপোর্ট (Finish)</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Milestone Celebration Banner */}
        {showXpBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-b border-emerald-600/40 p-2.5 px-4 flex items-center justify-between text-xs shrink-0"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-emerald-300">
                ৩+ কথোপকথন সম্পন্ন! +১৫ XP অর্জিত হয়েছে 🏆
              </span>
            </div>
            <button 
              onClick={() => setShowXpBanner(false)}
              className="text-slate-400 hover:text-white text-[11px] underline cursor-pointer"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        {isCompletedView ? (
          <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-6 overflow-y-auto">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-4xl shadow-xl">
              🏆
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block">
                PRACTICE SESSION SUMMARY 🇯🇵
              </span>
              <h3 className="text-2xl font-black text-white">
                অভিনন্দন! স্পিকিং সেশন সফলভাবে সম্পন্ন হয়েছে
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {scenario.roleJapanese} এর সাথে বাস্তব পরিবেশে জাপানি কথোপকথন সাফল্যের সাথে সম্পন্ন করলেন।
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-md bg-slate-950 border border-slate-800 rounded-2xl p-4 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">মোট বার্তা</span>
                <span className="text-base sm:text-lg font-black text-white font-mono">{exchangeCount} Turns</span>
              </div>
              <div className="border-x border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block">অর্জিত রিওয়ার্ড</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">+15 XP</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">বোধগম্যতা</span>
                <span className="text-base sm:text-lg font-black text-amber-400 font-mono">100%</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md pt-2">
              <button
                onClick={() => {
                  setMessages([{
                    id: 'init-1',
                    sender: 'ai',
                    japanese: scenario.initialPrompt.japanese,
                    romaji: scenario.initialPrompt.romaji,
                    bangla: scenario.initialPrompt.bangla,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                  setExchangeCount(0);
                  setIsCompletedView(false);
                }}
                className="w-full sm:flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                আবার প্র্যাকটিস করুন
              </button>
              <button
                onClick={onClose}
                className="w-full sm:flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                অন্যান্য দৃশ্য দেখুন (Exit)
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Message Thread Viewport */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} space-y-1.5`}
              >
                <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[78%]">
                  {isAi && (
                    <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xs shrink-0">
                      {scenario.characterAvatar}
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-4 shadow-md ${
                      isAi
                        ? 'bg-slate-950 border border-slate-800 text-white rounded-bl-xs'
                        : 'bg-red-600 text-white rounded-br-xs'
                    }`}
                  >
                    {/* Japanese text */}
                    <div className="text-base sm:text-lg font-bold font-serif leading-snug">
                      {msg.japanese}
                    </div>

                    {/* Romaji Pronunciation */}
                    {msg.romaji && (
                      <div className="text-xs font-mono text-amber-300 font-semibold mt-1">
                        {msg.romaji}
                      </div>
                    )}

                    {/* Bangla Translation */}
                    {msg.bangla && (
                      <div className="text-xs text-slate-300 mt-1 border-t border-slate-800/80 pt-1 font-medium">
                        {msg.bangla}
                      </div>
                    )}

                    {/* Audio Playback Button on AI bubble */}
                    {isAi && (
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => handlePlayAudio(msg.japanese)}
                          className="inline-flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 transition-colors font-mono cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>উচ্চারণ শুনুন 🔊</span>
                        </button>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Real-time Coach's Feedback Box */}
                {isAi && msg.feedback && (
                  <div className="ml-9 max-w-[85%] sm:max-w-[78%] w-full">
                    <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3 text-xs space-y-1.5">
                      <div 
                        onClick={() => setExpandedFeedbackId(expandedFeedbackId === msg.id ? null : msg.id)}
                        className="flex items-center justify-between cursor-pointer font-bold text-amber-400 font-mono text-[11px]"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>টিচারের মতামত (Sensei Feedback)</span>
                        </span>
                        {expandedFeedbackId === msg.id ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </div>

                      {expandedFeedbackId === msg.id && (
                        <div className="pt-1 space-y-1 text-slate-300 text-[11px] leading-relaxed">
                          {msg.feedback.suggestion && (
                            <p><strong className="text-white">পরামর্শ:</strong> {msg.feedback.suggestion}</p>
                          )}
                          {msg.feedback.naturalAlternative && (
                            <p><strong className="text-emerald-400">প্রাকৃতিক বিকল্প:</strong> {msg.feedback.naturalAlternative}</p>
                          )}
                          {msg.feedback.culturalTipBangla && (
                            <p className="text-amber-200/90 pt-0.5 border-t border-slate-800">
                              💡 <strong>কালচারাল টিপ:</strong> {msg.feedback.culturalTipBangla}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2 ml-9">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-500" />
              <span className="font-mono">{scenario.roleJapanese} উত্তর প্রস্তুত করছেন...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Recommended Phrases Helper Chips */}
        <div className="p-2 sm:px-4 bg-slate-950 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-slate-500 font-mono uppercase">পরামর্শ:</span>
          {scenario.recommendedPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(phrase.japanese)}
              className="text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-300 hover:text-white px-3 py-1 rounded-xl transition-all cursor-pointer font-serif"
            >
              {phrase.japanese}
            </button>
          ))}
        </div>

        {/* Voice and Text Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2 shrink-0">
          
          {/* Microphone Voice Input */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 ${
              isRecording
                ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title={isRecording ? 'রেকর্ডিং বন্ধ করুন' : 'মাইক্রোফোনে জাপানি বলুন'}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={isRecording ? 'শুনছি... কথা বলুন (Listening in Japanese)...' : 'জাপানি লিখুন বা মাইকে বলুন (e.g. はい、お願いします)'}
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-red-500 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />

          {/* Send Button */}
          <button
            type="button"
            disabled={!inputText.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-3 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-md cursor-pointer shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>

        </div>
      </>
    )}

      </motion.div>
    </div>
  );
};

export default AIPracticeLabModal;
