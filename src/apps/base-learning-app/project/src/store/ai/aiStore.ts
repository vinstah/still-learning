import { create } from 'zustand';
import { AIConversation, AIMessage, Board, Card } from '../types';

interface AIState {
  conversations: AIConversation[];
  activeConversation: AIConversation | null;
  isLoading: boolean;
  generateBoard: (prompt: string) => Promise<Board>;
  generateCard: (prompt: string, boardContext: string) => Promise<Card>;
  askQuestion: (question: string, context: string) => Promise<string>;
  explainConcept: (concept: string, level: string) => Promise<string>;
  createQuiz: (topic: string, difficulty: string) => Promise<any>;
}

export const useAIStore = create<AIState>((set, get) => ({
  conversations: [],
  activeConversation: null,
  isLoading: false,
  
  generateBoard: async (prompt: string) => {
    set({ isLoading: true });
    
    // Mock AI response - in production, this would call your AI API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockBoard: Board = {
      id: Date.now().toString(),
      title: 'AI Generated: Physics Forces',
      description: 'Comprehensive study of forces in physics',
      subject: 'Physics',
      level: 'high-school',
      columns: [
        { id: 'to-learn', title: 'To Learn', cards: [], color: 'bg-red-100' },
        { id: 'learning', title: 'Learning', cards: [], color: 'bg-yellow-100' },
        { id: 'reviewed', title: 'Reviewed', cards: [], color: 'bg-green-100' },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'ai-teacher',
      sharedWith: [],
    };
    
    set({ isLoading: false });
    return mockBoard;
  },
  
  generateCard: async (prompt: string, boardContext: string) => {
    set({ isLoading: true });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockCard: Card = {
      id: Date.now().toString(),
      title: 'Newton\'s First Law',
      content: `# Newton's First Law of Motion

**An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an unbalanced force.**

## 🧠 Memory Aid
Think of it like this: Everything is "lazy" - objects don't want to change what they're doing!

## 🔍 Real-World Examples
- A book on a table stays there until you pick it up
- A hockey puck slides across ice until friction stops it
- You lurch forward when a car brakes suddenly

## 📝 Key Points
- This is also called the **Law of Inertia**
- Inertia = resistance to change in motion
- More massive objects have more inertia`,
      type: 'concept',
      tags: ['physics', 'forces', 'newton', 'inertia'],
      difficulty: 'medium',
      versions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set({ isLoading: false });
    return mockCard;
  },
  
  askQuestion: async (question: string, context: string) => {
    set({ isLoading: true });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockResponse = `Great question! Let me break this down for you step by step. 

First, let's identify what we know and what we're trying to find. This is a classic physics problem that involves understanding the relationship between force, mass, and acceleration.

Here's how to approach it:
1. List the given information
2. Identify the unknown
3. Choose the right equation
4. Solve step by step
5. Check if your answer makes sense

Would you like me to walk through a specific example?`;
    
    set({ isLoading: false });
    return mockResponse;
  },
  
  explainConcept: async (concept: string, level: string) => {
    set({ isLoading: true });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockExplanation = `Let me explain ${concept} in a way that's easy to understand and remember!

## 🎯 The Big Picture
Think of this concept like...

## 🧠 Memory Technique
Here's a simple way to remember this:

## 📊 Step-by-Step Breakdown
1. First, understand...
2. Then, consider...
3. Finally, apply...

## 💡 Common Mistakes to Avoid
- Don't confuse this with...
- Remember that...

## 🔄 Practice Tip
Try relating this to something you already know well!`;
    
    set({ isLoading: false });
    return mockExplanation;
  },
  
  createQuiz: async (topic: string, difficulty: string) => {
    set({ isLoading: true });
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockQuiz = {
      id: Date.now().toString(),
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is Newton\'s First Law also known as?',
          options: ['Law of Inertia', 'Law of Acceleration', 'Law of Action-Reaction', 'Law of Gravity'],
          correctAnswer: 'Law of Inertia',
          explanation: 'Newton\'s First Law is also called the Law of Inertia because it describes how objects resist changes in motion.',
          points: 1,
        },
        {
          id: '2',
          type: 'written',
          question: 'Explain why passengers lurch forward when a car brakes suddenly.',
          correctAnswer: 'Due to inertia - the passengers\' bodies want to continue moving forward at the same speed as the car was traveling.',
          explanation: 'This demonstrates Newton\'s First Law - objects in motion tend to stay in motion unless acted upon by an external force.',
          points: 2,
        },
      ],
      totalScore: 3,
      attempts: [],
    };
    
    set({ isLoading: false });
    return mockQuiz;
  },
}));