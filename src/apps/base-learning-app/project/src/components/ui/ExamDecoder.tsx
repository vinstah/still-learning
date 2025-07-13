import React, { useState } from 'react';
import { Target, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { decodeExamQuestion } from '../../utils/examDecoder';
import { ExamQuestion } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function ExamDecoder() {
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('physics');
  const [decodedQuestion, setDecodedQuestion] = useState<ExamQuestion | null>(null);

  const handleDecode = () => {
    if (!questionText.trim()) return;
    
    const decoded = decodeExamQuestion(questionText, subject);
    setDecodedQuestion(decoded);
  };

  const sampleQuestions = [
    {
      subject: 'physics',
      text: 'Calculate the force required to accelerate a 5kg mass at 2m/s². Explain your working and include appropriate units.'
    },
    {
      subject: 'mathematics',
      text: 'Differentiate the function f(x) = 3x² + 2x - 1 and explain the meaning of your result.'
    },
    {
      subject: 'engineering',
      text: 'Analyze the stress distribution in a steel beam under a 1000N load. Discuss the factors affecting beam deflection.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Exam Question Decoder
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Struggling to understand what exam questions are really asking? 
          Paste any question below and we'll break it down step-by-step to help you decode 
          the requirements and structure your perfect answer.
        </p>
      </div>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Enter Your Exam Question
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="physics">Physics</option>
              <option value="mathematics">Mathematics</option>
              <option value="engineering">Engineering</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question Text
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Paste your exam question here..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={handleDecode}
              disabled={!questionText.trim()}
            >
              <Target className="h-4 w-4 mr-2" />
              Decode Question
            </Button>
            
            <div className="text-sm text-gray-500">
              Or try a sample question:
            </div>
          </div>

          {/* Sample Questions */}
          <div className="grid gap-3">
            {sampleQuestions.map((sample, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuestionText(sample.text);
                  setSubject(sample.subject);
                }}
                className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="info" size="sm">
                    {sample.subject}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {sample.text}
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Decoded Results */}
      {decodedQuestion && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                Question Analysis
              </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Original Question:</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border">
                  {decodedQuestion.question}
                </p>
              </div>

              {decodedQuestion.keyWords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Key Command Words:</h3>
                  <div className="flex flex-wrap gap-2">
                    {decodedQuestion.keyWords.map((word, index) => (
                      <Badge key={index} variant="warning">
                        {word}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    These words tell you exactly what you need to do in your answer.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Answer Structure
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  {decodedQuestion.answerStructure}
                </p>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    💡 Follow this structure to ensure you address all parts of the question.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Common Mistakes
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {decodedQuestion.commonMistakes.map((mistake, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Step-by-Step Decoding Process
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {decodedQuestion.decodingSteps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {decodedQuestion.expectedFormulas.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  Expected Formulas & Concepts
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {decodedQuestion.expectedFormulas.map((formula, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                      <code className="text-blue-800 font-mono">{formula}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}