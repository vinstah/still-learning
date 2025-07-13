import React, { createContext, useContext, useState } from 'react';
import { Topic, Problem } from '../types';
import { topics as initialTopics } from '../data/topics';
import { problems as initialProblems } from '../data/problems';

interface ContentContextType {
  topics: Topic[];
  problems: Problem[];
  addTopic: (topic: Topic) => void;
  addProblem: (problem: Problem) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [problems, setProblems] = useState<Problem[]>(initialProblems);

  const addTopic = (topic: Topic) => {
    setTopics(prev => [...prev, topic]);
    
    // Save to localStorage
    try {
      const updatedTopics = [...topics, topic];
      localStorage.setItem('customTopics', JSON.stringify(updatedTopics.filter(t => !initialTopics.find(it => it.id === t.id))));
    } catch (error) {
      console.error('Error saving custom topics:', error);
    }
  };

  const addProblem = (problem: Problem) => {
    setProblems(prev => [...prev, problem]);
    
    // Save to localStorage
    try {
      const updatedProblems = [...problems, problem];
      localStorage.setItem('customProblems', JSON.stringify(updatedProblems.filter(p => !initialProblems.find(ip => ip.id === p.id))));
    } catch (error) {
      console.error('Error saving custom problems:', error);
    }
  };

  // Load custom content on mount
  React.useEffect(() => {
    try {
      const customTopics = localStorage.getItem('customTopics');
      const customProblems = localStorage.getItem('customProblems');
      
      if (customTopics) {
        const parsed = JSON.parse(customTopics);
        setTopics(prev => [...prev, ...parsed]);
      }
      
      if (customProblems) {
        const parsed = JSON.parse(customProblems);
        setProblems(prev => [...prev, ...parsed]);
      }
    } catch (error) {
      console.error('Error loading custom content:', error);
    }
  }, []);

  return (
    <ContentContext.Provider value={{ topics, problems, addTopic, addProblem }}>
      {children}
    </ContentContext.Provider>
  );
};