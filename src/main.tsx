import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

import App from './App';
import AchievementAcademy from './apps/achievements-academy/project/src/App';
import Algebra from './apps/algebra2-chatbot/project/src/App';
import BaseLearning from './apps/base-learning-app/project/src/App';
import EngineeringForKids from './apps/engineering-for-kids/project/src/App';
import ExamDecoder from './apps/exam-decoder/project/src/App';
import Laino from './apps/laino/src/App';
import LearnFlow from './apps/learnflow/src/App';
// import LearningLense from './apps/LearningLens/LearningLens/client/src/App';
import MathPaper from './apps/math-paper-all-questions/project/src/App';
import NeouroChunks from './apps/neuro-chunks/App';
import NeuroQuest from './apps/neuroquest-academy/project/src/App';
import Pokemon from './apps/pokemon/src/App';
import Pokemon2d from './apps/pokemon-2d/project/src/App';
import Runescape from './apps/runescape-style/project/src/App';
import Trello from './apps/trello/project/src/App'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <AchievementAcademy /> */}
      {/* <Algebra /> */}
      <BaseLearning />
      {/* <EngineeringForKids /> */}
      {/* <ExamDecoder /> */}
      {/* <Laino /> */}
      {/* <LearnFlow /> */}
      {/* <LearningLense /> */}
      {/* <MathPaper /> */}
      {/* <NeouroChunks /> */}
      {/* <NeuroQuest /> */}
      {/* <Pokemon2d /> */}
      {/* <Runescape /> */}
      {/* <Trello /> */}
    </BrowserRouter>
  </StrictMode>
);
