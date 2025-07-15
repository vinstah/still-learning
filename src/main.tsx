import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

// import App from './App';
import AchievementAcademy from './apps/achievements-academy/project/src/App';
// import Algebra from '../../algebra2-chatbot/project/src/App';
// import BaseLearning from '../../base-learning-app/project/src/App';
// import EngineeringForKids from '../../engineering-for-kids/project/src/App';
// import ExamDecoder from '../../exam-decoder/project/src/App';
// import Laino from '../../laino/src/App';
// import LearnFlow from '../../learnflow/src/App';
// // import LearningLense from '../../LearningLens/LearningLens/client/src/App';
// import MathPaper from '../../math-paper-all-questions/project/src/App';
// import NeouroChunks from '../../neuro-chunks/App';
// import NeuroQuest from '../../neuroquest-academy/project/src/App';
// import Pokemon from '../../pokemon/src/App';
// import Pokemon2d from '../../pokemon-2d/project/src/App';
// import Runescape from '../../runescape-style/project/src/App';
// import Trello from '../../trello/project/src/App'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <AchievementAcademy />
      {/* <Algebra /> */}
      {/* <BaseLearning /> */}
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
