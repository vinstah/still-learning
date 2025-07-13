import React, { useState } from 'react';
import { Star, ArrowRight, RotateCcw } from 'lucide-react';

// Import activity components
import MaterialsActivity from './activities/MaterialsActivity';
import BalanceActivity from './activities/BalanceActivity';
import ForcesActivity from './activities/ForcesActivity';
import SpeedActivity from './activities/SpeedActivity';
import EnergyActivity from './activities/EnergyActivity';
import ForcesReactionsActivity from './activities/ForcesReactionsActivity';

const EngineeringForKids = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);

  const stories = [
    {
      title: "The Three Little Pigs and Strong Houses",
      concept: "Strength of Materials",
      story: "Once upon a time, three little pigs wanted to build the strongest house ever! They need to choose the best materials. Can you help them?",
      character: "🐷",
      activity: "materials",
      lesson: "Different materials have different strengths - just like how a big tree is stronger than a small stick!"
    },
    {
      title: "The Wobbly Bridge Adventure",
      concept: "Statics & Balance",
      story: "Princess Emma needs to cross a wobbly bridge to reach the castle! The bridge needs to be balanced so it doesn't tip over.",
      character: "👸",
      activity: "balance",
      lesson: "When things are balanced, they don't fall over - like when you balance on a seesaw!"
    },
    {
      title: "The Heavy Treasure Chest",
      concept: "Forces & Mechanics",
      story: "Captain Jack found a heavy treasure chest! He needs the right tools to lift it up. Which tools will help him?",
      character: "🏴‍☠️",
      activity: "forces",
      lesson: "Some tools make it easier to lift heavy things - like how a wheelbarrow helps carry lots of toys!"
    },
    {
      title: "Buzzy Bee's Race Against the Rain",
      concept: "Speed & Acceleration",
      story: "Oh no! Buzzy the Bee sees dark clouds coming! She needs to get home before it rains. Help her choose the right speed to make it home in time!",
      character: "🐝",
      activity: "speed",
      lesson: "Speed is how fast something moves - like how you can walk slow or run fast to get somewhere quicker!"
    },
    {
      title: "Bunny's Carrot Hunt Adventure",
      concept: "Energy & Momentum",
      story: "Benny the Bunny found a treasure map leading to the biggest carrots ever! The map shows 3 different paths. Help Benny choose the path that gives him enough energy to reach the carrots!",
      character: "🐰",
      activity: "energy",
      lesson: "Energy helps us move and do work - like how you need energy from food to run and play!"
    },
    {
      title: "Ant vs. Rolling Grape",
      concept: "Forces & Reactions",
      story: "Oh no! A grape is rolling down the hill and heading straight for the ant colony! Little Andy the ant needs to stop it before it destroys their home. What should Andy use to create the strongest force to stop the grape?",
      character: "🐜",
      activity: "forces-reactions",
      lesson: "When objects are moving, they have momentum. To stop them, we need to apply an equal and opposite force - this is Newton's Third Law of Motion!"
    }
  ];

  const renderActivity = () => {
    const story = stories[currentStory];
    const handleComplete = () => {
      setCompletedActivities(prev => new Set([...prev, currentStory]));
      setShowCelebration(true);
    };

    const activityProps = {
      onComplete: handleComplete,
      lesson: story.lesson
    };

    switch (story.activity) {
      case 'materials':
        return <MaterialsActivity {...activityProps} />;
      case 'balance':
        return <BalanceActivity {...activityProps} />;
      case 'forces':
        return <ForcesActivity {...activityProps} />;
      case 'speed':
        return <SpeedActivity {...activityProps} />;
      case 'energy':
        return <EnergyActivity {...activityProps} />;
      case 'forces-reactions':
        return <ForcesReactionsActivity {...activityProps} />;
      default:
        return null;
    }
  };

  const handleCelebrationContinue = () => {
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Little Engineers 🔧</h1>
          <p className="text-lg text-gray-600">Learn engineering through magical stories!</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {stories[currentStory].title}
            </h2>
            <div className="flex gap-2">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    completedActivities.has(index) ? 'bg-green-500' : 
                    index === currentStory ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{stories[currentStory].character}</div>
                <div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {stories[currentStory].story}
                  </p>
                  <div className="mt-2 text-sm text-blue-600 font-medium">
                    Learning: {stories[currentStory].concept}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            {renderActivity()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStory(Math.max(0, currentStory - 1))}
              disabled={currentStory === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              <RotateCcw size={16} />
              Previous
            </button>
            <button
              onClick={() => setCurrentStory(Math.min(stories.length - 1, currentStory + 1))}
              disabled={currentStory === stories.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {showCelebration && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl border-2 border-green-300 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Fantastic Work!</h3>
            <p className="text-gray-700 mb-4">You're becoming a great little engineer!</p>
            <div className="mb-4 flex justify-center gap-2">
              <Star className="text-yellow-500 fill-current" />
              <Star className="text-yellow-500 fill-current" />
              <Star className="text-yellow-500 fill-current" />
            </div>
            <button
              onClick={handleCelebrationContinue}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
            >
              Awesome! Let's Keep Learning! 🚀
            </button>
          </div>
        )}

        <div className="text-center mt-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold mb-2">Progress</h3>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completedActivities.size}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{stories.length - completedActivities.size}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
            {completedActivities.size === stories.length && (
              <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-bold text-yellow-700">Master Engineer!</div>
                <div className="text-sm text-yellow-600">You've completed all the challenges!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringForKids;