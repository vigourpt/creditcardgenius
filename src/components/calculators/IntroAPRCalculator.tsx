import React from 'react';
import { Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function IntroAPRCalculator() {
  const { currency, formatAmount } = useSettings();
  const [balance, setBalance] = React.useState('5000');
  const [monthlyPayment, setMonthlyPayment] = React.useState('300');
  const [introPeriod, setIntroPeriod] = React.useState('12');
  const [introApr, setIntroApr] = React.useState('0');
  const [regularApr, setRegularApr] = React.useState('18.99');

  const calculateSavings = () => {
    const balanceAmount = parseFloat(balance) || 0;
    const payment = parseFloat(monthlyPayment) || 0;
    const months = parseInt(introPeriod) || 0;
    const introRate = parseFloat(introApr) / 100 / 12;
    const regularRate = parseFloat(regularApr) / 100 / 12;

    let introBalance = balanceAmount;
    let regularBalance = balanceAmount;
    let introInterest = 0;
    let regularInterest = 0;

    // Calculate for intro period
    for (let i = 0; i < months; i++) {
      if (introBalance > 0) {
        const introMonthlyInterest = introBalance * introRate;
        introInterest += introMonthlyInterest;
        introBalance = Math.max(0, introBalance + introMonthlyInterest - payment);
      }

      if (regularBalance > 0) {
        const regularMonthlyInterest = regularBalance * regularRate;
        regularInterest += regularMonthlyInterest;
        regularBalance = Math.max(0, regularBalance + regularMonthlyInterest - payment);
      }
    }

    return {
      introInterest: introInterest.toFixed(2),
      regularInterest: regularInterest.toFixed(2),
      savings: (regularInterest - introInterest).toFixed(2),
      remainingBalance: introBalance.toFixed(2),
      monthlyInterestSavings: ((regularInterest - introInterest) / months).toFixed(2)
    };
  };

  const results = calculateSavings();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Intro APR Savings Calculator</h2>
        <p className="text-gray-500 mt-1">Calculate your savings during a 0% APR introductory period</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="block">
              <span className="text-gray-700">Current Balance</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{currency.symbol}</span>
                </div>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700">Monthly Payment</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{currency.symbol}</span>
                </div>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700">Intro Period (months)</span>
              <input
                type="number"
                value={introPeriod}
                onChange={(e) => setIntroPeriod(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Intro APR</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  value={introApr}
                  onChange={(e) => setIntroApr(e.target.value)}
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
                  value={regularApr}
                  onChange={(e) => setRegularApr(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </label>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Understanding Intro APR</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                An introductory APR offer can help you save money on interest charges during the promotional period. 
                This is especially useful for large purchases or balance transfers.
              </p>
              <p>
                Keep in mind that after the intro period ends, any remaining balance will be subject to the regular APR. 
                It's important to plan your payments to minimize or eliminate the balance before this happens.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Savings Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Interest Savings</p>
                <p className="text-2xl font-bold text-green-600">{formatAmount(results.savings)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Interest Savings</p>
                <p className="text-2xl font-bold text-green-600">{formatAmount(results.monthlyInterestSavings)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest with Intro APR</p>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.introInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Interest without Intro APR</p>
                <p className="text-2xl font-bold text-red-600">{formatAmount(results.regularInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining Balance</p>
                <p className="text-2xl font-bold text-gray-900">{formatAmount(results.remainingBalance)}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Tips for Success</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Make all payments on time to keep the intro rate</li>
              <li>• Try to pay off the balance before the intro period ends</li>
              <li>• Set up automatic payments to avoid missing due dates</li>
              <li>• Consider paying more than the minimum to clear the balance faster</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}