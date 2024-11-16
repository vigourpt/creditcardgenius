import React from 'react';
import { Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function AnnualFeeCalculator() {
  const { currency, formatAmount } = useSettings();
  const [basicAnnualFee, setBasicAnnualFee] = React.useState('0');
  const [premiumAnnualFee, setPremiumAnnualFee] = React.useState('95');
  const [monthlySpending, setMonthlySpending] = React.useState('1000');
  const [basicRewardRate, setBasicRewardRate] = React.useState('1');
  const [premiumRewardRate, setPremiumRewardRate] = React.useState('2');
  const [additionalPerks, setAdditionalPerks] = React.useState('100');

  const calculateBreakEven = () => {
    const basicFee = parseFloat(basicAnnualFee) || 0;
    const premiumFee = parseFloat(premiumAnnualFee) || 0;
    const spending = parseFloat(monthlySpending) || 0;
    const basicRate = parseFloat(basicRewardRate) || 0;
    const premiumRate = parseFloat(premiumRewardRate) || 0;
    const perks = parseFloat(additionalPerks) || 0;

    const yearlySpending = spending * 12;
    const basicRewards = yearlySpending * (basicRate / 100);
    const premiumRewards = yearlySpending * (premiumRate / 100);

    const basicTotal = basicRewards - basicFee;
    const premiumTotal = premiumRewards + perks - premiumFee;

    // Calculate monthly spending needed to break even
    const rewardRateDiff = (premiumRate - basicRate) / 100;
    const feeDiff = premiumFee - basicFee;
    const breakEvenYearlySpending = (feeDiff - perks) / rewardRateDiff;
    const breakEvenMonthlySpending = breakEvenYearlySpending / 12;
    
    // Calculate months to break even at current spending rate
    const monthsToBreakEven = spending > 0 
      ? Math.ceil((breakEvenYearlySpending / spending))
      : Infinity;

    return {
      basicRewards: basicRewards.toFixed(2),
      premiumRewards: premiumRewards.toFixed(2),
      basicTotal: basicTotal.toFixed(2),
      premiumTotal: premiumTotal.toFixed(2),
      difference: (premiumTotal - basicTotal).toFixed(2),
      breakEvenSpending: breakEvenMonthlySpending.toFixed(2),
      monthsToBreakEven
    };
  };

  const results = calculateBreakEven();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Annual Fee Break-Even Calculator</h2>
        <p className="text-gray-500 mt-1">Compare cards with different annual fees and reward rates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Basic Card</h3>
              <label className="block">
                <span className="text-gray-700">Annual Fee</span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">{currency.symbol}</span>
                  </div>
                  <input
                    type="number"
                    value={basicAnnualFee}
                    onChange={(e) => setBasicAnnualFee(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Reward Rate</span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={basicRewardRate}
                    onChange={(e) => setBasicRewardRate(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Percent className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Premium Card</h3>
              <label className="block">
                <span className="text-gray-700">Annual Fee</span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">{currency.symbol}</span>
                  </div>
                  <input
                    type="number"
                    value={premiumAnnualFee}
                    onChange={(e) => setPremiumAnnualFee(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-gray-700">Reward Rate</span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    value={premiumRewardRate}
                    onChange={(e) => setPremiumRewardRate(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Percent className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

            <label className="block">
              <span className="text-gray-700">Additional Premium Card Perks Value</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{currency.symbol}</span>
                </div>
                <input
                  type="number"
                  value={additionalPerks}
                  onChange={(e) => setAdditionalPerks(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Break-Even Analysis</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Spending to Break Even</p>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.breakEvenSpending)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Months to Break Even</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {results.monthsToBreakEven === Infinity ? '∞' : results.monthsToBreakEven}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Value Difference</p>
                <p className={`text-2xl font-bold ${parseFloat(results.difference) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatAmount(results.difference)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Annual Returns</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Basic Card Net Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatAmount(results.basicTotal)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Premium Card Net Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatAmount(results.premiumTotal)}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Decision Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Consider all card benefits, not just rewards</li>
              <li>• Factor in sign-up bonuses separately</li>
              <li>• Evaluate if you'll use premium perks</li>
              <li>• Review your spending patterns regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}