import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

interface CreditFactor {
  name: string;
  current: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export default function CreditScoreSimulator() {
  const [currentScore, setCurrentScore] = React.useState(700);
  const [newCard, setNewCard] = React.useState(false);
  const [missedPayment, setMissedPayment] = React.useState(false);
  const [balanceIncrease, setBalanceIncrease] = React.useState(false);
  const [accountClosure, setAccountClosure] = React.useState(false);

  const calculateImpact = () => {
    let impact = 0;
    let factors: CreditFactor[] = [];

    if (newCard) {
      impact -= 5;
      factors.push({
        name: 'New Credit Card',
        current: -5,
        impact: 'negative',
        description: 'New credit applications typically cause a small temporary drop'
      });
    }

    if (missedPayment) {
      impact -= 100;
      factors.push({
        name: 'Missed Payment',
        current: -100,
        impact: 'negative',
        description: 'Late payments have a significant negative impact'
      });
    }

    if (balanceIncrease) {
      impact -= 20;
      factors.push({
        name: 'Higher Credit Utilization',
        current: -20,
        impact: 'negative',
        description: 'Higher balances relative to credit limits lower your score'
      });
    }

    if (accountClosure) {
      impact -= 15;
      factors.push({
        name: 'Account Closure',
        current: -15,
        impact: 'negative',
        description: 'Closing accounts can reduce your average credit age'
      });
    }

    const newScore = Math.max(300, Math.min(850, currentScore + impact));
    
    return {
      newScore,
      impact,
      factors
    };
  };

  const results = calculateImpact();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Credit Score Simulator</h2>
        <p className="text-gray-500 mt-1">See how different actions might affect your credit score</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label className="block mb-6">
              <span className="text-gray-700">Current Credit Score</span>
              <input
                type="range"
                min="300"
                max="850"
                value={currentScore}
                onChange={(e) => setCurrentScore(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>300</span>
                <span>850</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-gray-900">{currentScore}</span>
              </div>
            </label>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={newCard}
                  onChange={(e) => setNewCard(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Apply for a New Credit Card</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={missedPayment}
                  onChange={(e) => setMissedPayment(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Miss a Payment (30+ Days Late)</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={balanceIncrease}
                  onChange={(e) => setBalanceIncrease(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Increase Credit Card Balance</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={accountClosure}
                  onChange={(e) => setAccountClosure(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Close a Credit Card Account</span>
              </label>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This simulator provides estimates based on general credit scoring factors. Actual score changes may vary based on your complete credit profile.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Simulated Impact</h3>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Estimated New Score</p>
                <p className="text-3xl font-bold text-indigo-600">{results.newScore}</p>
              </div>
              <div className={`text-2xl font-bold ${results.impact === 0 ? 'text-gray-500' : results.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {results.impact > 0 ? '+' : ''}{results.impact} pts
              </div>
            </div>

            <div className="space-y-4">
              {results.factors.map((factor, index) => (
                <div key={index} className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{factor.name}</span>
                    <span className={`font-medium ${
                      factor.impact === 'positive' ? 'text-green-600' : 
                      factor.impact === 'negative' ? 'text-red-600' : 
                      'text-gray-500'
                    }`}>
                      {factor.current > 0 ? '+' : ''}{factor.current} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-indigo-800">Credit Score Ranges</h3>
                <div className="mt-2 text-sm text-indigo-700">
                  <ul className="space-y-1">
                    <li>Excellent: 800-850</li>
                    <li>Very Good: 740-799</li>
                    <li>Good: 670-739</li>
                    <li>Fair: 580-669</li>
                    <li>Poor: 300-579</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}