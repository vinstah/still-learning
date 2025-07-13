import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles, Plus, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onGenerateContent?: (type: 'topic' | 'problem', content: any) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onGenerateContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your AI math tutor. I can help you with math problems, explain concepts, or generate new topics and practice questions. What would you like to work on?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();

    // Check for content generation requests
    if (lowerMessage.includes('generate') || lowerMessage.includes('create') || lowerMessage.includes('new')) {
      if (lowerMessage.includes('topic') || lowerMessage.includes('subject')) {
        const newTopic = generateNewTopic();
        onGenerateContent?.('topic', newTopic);
        return `I've generated a new topic for you: "${newTopic.title}". It covers ${newTopic.description.toLowerCase()}. You can find it in your topics list!`;
      }
      
      if (lowerMessage.includes('problem') || lowerMessage.includes('question') || lowerMessage.includes('practice')) {
        const newProblem = generateNewProblem();
        onGenerateContent?.('problem', newProblem);
        return `I've created a new practice problem for you! It's about ${newProblem.topicId.replace('-', ' ')}. Check your practice section to try it out.`;
      }
    }

    // Math help responses
    if (lowerMessage.includes('quadratic') || lowerMessage.includes('x²')) {
      return "For quadratic equations, remember the key forms:\n\n• Standard form: ax² + bx + c = 0\n• Quadratic formula: x = (-b ± √(b² - 4ac))/(2a)\n• Factoring: Look for two numbers that multiply to 'ac' and add to 'b'\n\nWould you like me to walk through a specific example?";
    }

    if (lowerMessage.includes('linear') || lowerMessage.includes('slope')) {
      return "Linear equations are all about straight lines! Key concepts:\n\n• Slope-intercept form: y = mx + b\n• Slope formula: m = (y₂ - y₁)/(x₂ - x₁)\n• Point-slope form: y - y₁ = m(x - x₁)\n\nThe slope 'm' tells you how steep the line is, and 'b' is where it crosses the y-axis. Need help with a specific problem?";
    }

    if (lowerMessage.includes('factor') || lowerMessage.includes('polynomial')) {
      return "Factoring can be tricky! Here's my step-by-step approach:\n\n1. Look for a Greatest Common Factor (GCF) first\n2. Check if it's a special pattern (difference of squares, perfect square trinomial)\n3. For trinomials, use the AC method or trial and error\n4. Always check your answer by expanding\n\nWhat type of expression are you trying to factor?";
    }

    if (lowerMessage.includes('logarithm') || lowerMessage.includes('log')) {
      return "Logarithms are the inverse of exponentials! Key properties:\n\n• log_b(xy) = log_b(x) + log_b(y)\n• log_b(x/y) = log_b(x) - log_b(y)\n• log_b(x^n) = n·log_b(x)\n• If log_b(x) = y, then b^y = x\n\nThink of logs as asking: 'What power do I raise the base to get this number?' Need help with a specific log problem?";
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('confused')) {
      return "I'm here to help! Here's what I can do:\n\n📚 Explain math concepts step-by-step\n🧮 Help solve specific problems\n✨ Generate new topics and practice questions\n💡 Provide hints and study tips\n\nJust tell me what you're working on or what you'd like to learn about!";
    }

    // Default responses
    const responses = [
      "That's a great question! Can you provide more details about the specific problem you're working on?",
      "I'd love to help you with that! Could you share the equation or concept you're struggling with?",
      "Math can be challenging, but we'll work through it together. What specific area would you like to focus on?",
      "Let me help you break that down. Can you tell me more about what you're trying to solve?",
      "I'm here to make math easier for you! What would you like to explore next?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateNewTopic = () => {
    const topics = [
      {
        id: `systems-equations-${Date.now()}`,
        title: 'Systems of Equations',
        description: 'Learn to solve multiple equations with multiple variables using substitution, elimination, and graphing methods',
        icon: 'function-square',
        difficulty: 'intermediate' as const,
        color: '#6366F1'
      },
      {
        id: `matrices-${Date.now()}`,
        title: 'Matrices and Determinants',
        description: 'Explore matrix operations, determinants, and their applications in solving systems',
        icon: 'bar-chart',
        difficulty: 'advanced' as const,
        color: '#8B5CF6'
      },
      {
        id: `sequences-series-${Date.now()}`,
        title: 'Sequences and Series',
        description: 'Master arithmetic and geometric sequences, series, and their real-world applications',
        icon: 'trending-up',
        difficulty: 'intermediate' as const,
        color: '#06B6D4'
      },
      {
        id: `conic-sections-${Date.now()}`,
        title: 'Conic Sections',
        description: 'Study circles, ellipses, parabolas, and hyperbolas and their equations',
        icon: 'wave-sine',
        difficulty: 'advanced' as const,
        color: '#10B981'
      }
    ];

    return topics[Math.floor(Math.random() * topics.length)];
  };

  const generateNewProblem = () => {
    const problems = [
      {
        id: `problem-${Date.now()}`,
        topicId: 'linear-equations',
        question: 'Solve for x: 3x - 7 = 2x + 5',
        correctAnswer: 'x = 12',
        explanation: 'Subtract 2x from both sides, then add 7 to both sides to isolate x.',
        hints: ['Move all x terms to one side', 'Move all constants to the other side'],
        steps: ['3x - 7 = 2x + 5', '3x - 2x = 5 + 7', 'x = 12']
      },
      {
        id: `problem-${Date.now()}`,
        topicId: 'quadratic-functions',
        question: 'Find the vertex of the parabola: y = 2x² - 8x + 3',
        correctAnswer: '(2, -5)',
        explanation: 'Use the vertex formula x = -b/(2a) to find the x-coordinate, then substitute to find y.',
        hints: ['The vertex formula is x = -b/(2a)', 'Substitute the x-value back into the equation'],
        steps: ['x = -(-8)/(2·2) = 8/4 = 2', 'y = 2(2)² - 8(2) + 3 = 8 - 16 + 3 = -5', 'Vertex: (2, -5)']
      },
      {
        id: `problem-${Date.now()}`,
        topicId: 'exponential-functions',
        question: 'Solve for x: 3^(x+1) = 27',
        correctAnswer: 'x = 2',
        explanation: 'Express 27 as a power of 3, then solve the equation.',
        hints: ['Convert 27 to a power of 3', '27 = 3³'],
        steps: ['3^(x+1) = 27', '3^(x+1) = 3³', 'x + 1 = 3', 'x = 2']
      }
    ];

    return problems[Math.floor(Math.random() * problems.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I'm sorry, I encountered an error. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Generate a new topic", icon: Plus },
    { text: "Create practice problems", icon: BookOpen },
    { text: "Help with quadratics", icon: Sparkles },
    { text: "Explain factoring", icon: Sparkles }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">AI Math Tutor</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(action.text)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors flex items-center space-x-1"
                  >
                    <action.icon className="w-3 h-3" />
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about math..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;