'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getQuizBySlug, QUIZZES } from '@/lib/data/quizzes';

export default function QuizPage() {
  const params = useParams();
  const slug = params.slug as string;
  const quiz = getQuizBySlug(slug);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white text-gray-900 font-serif">
        <Header />
        <div className="max-w-3xl mx-auto p-8 text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Quiz Not Found</h1>
          <p className="text-gray-600 mb-6">This quiz doesn&apos;t exist or has been deprecated by a more efficient quiz.</p>
          <Link href="/" className="inline-block bg-green-800 text-white px-6 py-3 font-sans font-bold hover:bg-green-900 transition">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAnswer = (resultKey: string, answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setTimeout(() => {
      const newAnswers = [...answers, resultKey];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion + 1 >= quiz.questions.length) {
        setShowResult(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 400);
  };

  const getResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
    const topKey = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    return topKey ? quiz.results[topKey] : null;
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const otherQuizzes = QUIZZES.filter(q => q.slug !== slug);
  const progress = showResult ? 100 : ((currentQuestion) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Quiz Header */}
        <div className="mb-8">
          <span className="bg-green-800 text-white px-3 py-1 text-xs font-sans font-bold uppercase tracking-wide">Quiz</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mt-4">{quiz.title}</h1>
          <p className="mt-3 text-lg text-gray-600 font-sans">{quiz.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1 mb-8">
          <div
            className="bg-green-800 h-1 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {!showResult ? (
          /* Question Card */
          <div className="border-2 border-black p-6 sm:p-8">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
            <h2 className="text-xl sm:text-2xl font-black leading-snug mb-6">
              {quiz.questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {quiz.questions[currentQuestion].answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(answer.result, i)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 border-2 font-sans text-sm sm:text-base transition-all ${
                    selectedAnswer === i
                      ? 'border-green-800 bg-green-50 font-bold'
                      : selectedAnswer !== null
                        ? 'border-gray-200 opacity-50 cursor-not-allowed'
                        : 'border-gray-200 hover:border-black hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <span className="font-bold font-mono text-green-800 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="border-2 border-black">
            <div className="bg-black text-white p-6 sm:p-8">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Your Result</p>
              <h2 className="text-2xl sm:text-3xl font-black leading-snug">{getResult()?.title}</h2>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-base sm:text-lg font-sans text-gray-800 leading-relaxed">
                {getResult()?.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={restart}
                  className="bg-green-800 text-white px-6 py-3 font-sans font-bold text-sm hover:bg-green-900 transition"
                >
                  Retake Quiz
                </button>
                <Link
                  href="/"
                  className="border-2 border-black px-6 py-3 font-sans font-bold text-sm hover:bg-gray-50 transition text-center"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Quizzes */}
        {otherQuizzes.length > 0 && (
          <div className="mt-12 pt-8 border-t-2 border-black">
            <h3 className="text-xl font-black mb-4">More Quizzes</h3>
            <div className="space-y-4">
              {otherQuizzes.map(q => (
                <Link
                  key={q.id}
                  href={`/quiz/${q.slug}`}
                  onClick={restart}
                  className="block border border-gray-200 p-4 hover:border-black transition group"
                >
                  <span className="text-green-800 text-[10px] font-sans font-bold uppercase tracking-[0.15em]">Quiz</span>
                  <h4 className="text-lg font-bold leading-snug mt-1 group-hover:underline">{q.title}</h4>
                  <p className="text-sm text-gray-600 font-sans mt-1">{q.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
