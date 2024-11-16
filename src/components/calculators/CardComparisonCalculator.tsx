import React from 'react';
import { Plus, Trash2, Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface Card {
  id: string;
  name: string;
  annualFee: string;
  rewardRate: string;
  signupBonus: string;
  introPeriod: string;
  introApr: string;
  regularApr: string;
}

export default function CardComparisonCalculator() {
  const { currency, formatAmount } = useSettings();
  const [monthlySpending, setMonthlySpending] = React.useState('2000');
  const [cards, setCards] = React.useState<Card[]>([
    {
      id: '1',
      name: 'Basic Card',
      annualFee: '0',
      rewardRate: '1.5',
      signupBonus: '200',
      introPeriod: '0',
      introApr: '0',
      regularApr: '19.99'
    },
    {
      id: '2',
      name: 'Premium Card',
      annualFee: '95',
      rewardRate: '2.5',
      signupBonus: '500',
      introPeriod: '12',
      introApr: '0',
      regularApr: '22.99'
    }
  ]);

  const addCard = () => {
    const newId = (Math.max(...cards.map(c => parseInt(c.id))) + 1).toString();
    setCards([...cards, {
      id: newId,
      name: `Card ${newId}`,
      annualFee: '0',
      rewardRate: '1',
      signupBonus: '0',
      introPeriod: '0',
      introApr: '0',
      regularApr: '0'
    }]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const updateCard = (id: string, field: keyof Card, value: string) => {
    setCards(cards.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const calculateComparison = () => {
    const spending = parseFloat(monthlySpending) || 0;
    const yearlySpending = spending * 12;

    return cards.map(card => {
      const annualFee = parseFloat(card.annualFee) || 0;
      const rewardRate = parseFloat(card.rewardRate) || 0;
      const signupBonus = parseFloat(card.signupBonus) || 0;
      const introPeriod = parseInt(card.introPeriod) || 0;
      const introApr = parseFloat(card.introApr) || 0;
      const regularApr = parseFloat(card.regularApr) || 0;
      
      // Calculate rewards
      const yearlyRewards = yearlySpending * (rewardRate / 100);
      
      // Calculate interest costs (assuming 50% of spending becomes revolving debt)
      const revolvingDebt = yearlySpending * 0.5;
      let interestCost = 0;
      
      if (introPeriod > 0) {
        // Calculate intro period interest
        const introMonthlyRate = introApr / 100 / 12;
        const introInterest = revolvingDebt * introMonthlyRate * introPeriod;
        
        // Calculate regular APR interest for remaining months
        const regularMonthlyRate = regularApr / 100 / 12;
        const regularInterest = revolvingDebt * regularMonthlyRate * (12 - introPeriod);
        
        interestCost = introInterest + regularInterest;
      } else {
        // Calculate full year at regular APR
        const regularMonthlyRate = regularApr / 100 / 12;
        interestCost = revolvingDebt * regularMonthlyRate * 12;
      }

      const firstYearValue = yearlyRewards + signupBonus - annualFee - interestCost;
      const ongoingValue = yearlyRewards - annualFee - (revolvingDebt * (regularApr / 100));

      return {
        ...card,
        yearlyRewards: yearlyRewards.toFixed(2),
        interestCost: interestCost.toFixed(2),
        firstYearValue: firstYearValue.toFixed(2),
        ongoingValue: ongoingValue.toFixed(2),
        effectiveRate: ((yearlyRewards / yearlySpending) * 100).toFixed(2)
      };
    });
  };

  const results = calculateComparison();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Credit Card Comparison Calculator</h2>
        <p className="text-gray-500 mt-1">Compare different credit cards based on rewards, fees, and APR</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <label className="block">
            <span className="text-gray-700">Monthly Spending</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">{currency.symbol}</span>
              </div>
              <input
                type="number"
                value={monthlySpending}
                onChange={(e) => setMonthlySpending(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </label>
        </div>

        <div className="space-y-4">
          {cards.map((card, index) => (
            <div key={card.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={card.name}
                  onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                  className="text-lg font-medium text-gray-900 border-0 focus:ring-0 w-full"
                  placeholder="Card Name"
                />
                <button
                  onClick={() => removeCard(card.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="block">
                  <span className="text-gray-700">Annual Fee</span>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">{currency.symbol}</span>
                    </div>
                    <input
                      type="number"
                      value={card.annualFee}
                      onChange={(e) => updateCard(card.id, 'annualFee', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700">Reward Rate</span>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={card.rewardRate}
                      onChange={(e) => updateCard(card.id, 'rewardRate', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Percent className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700">Signup Bonus</span>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">{currency.symbol}</span>
                    </div>
                    <input
                      type="number"
                      value={card.signupBonus}
                      onChange={(e) => updateCard(card.id, 'signupBonus', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700">Intro Period (months)</span>
                  <input
                    type="number"
                    value={card.introPeriod}
                    onChange={(e) => updateCard(card.id, 'introPeriod', e.target.value)}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700">Intro APR</span>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={card.introApr}
                      onChange={(e) => updateCard(card.id, 'introApr', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Percent className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-700">Regular APR</span>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      value={card.regularApr}
                      onChange={(e) => updateCard(card.id, 'regularApr', e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Percent className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </label>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Results</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">First Year Value</p>
                    <p className="text-lg font-bold text-indigo-600">{formatAmount(results[index].firstYearValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ongoing Value</p>
                    <p className="text-lg font-bold text-indigo-600">{formatAmount(results[index].ongoingValue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Yearly Rewards</p>
                    <p className="text-lg font-bold text-green-600">{formatAmount(results[index].yearlyRewards)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Cost</p>
                    <p className="text-lg font-bold text-red-600">{formatAmount(results[index].interestCost)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Effective Rate</p>
                    <p className="text-lg font-bold text-indigo-600">{results[index].effectiveRate}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCard}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </button>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Comparison Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Consider your spending habits when comparing rewards</li>
            <li>• Factor in signup bonuses for first-year value</li>
            <li>• Pay attention to intro APR periods for balance transfers</li>
            <li>• Compare annual fees against potential rewards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}