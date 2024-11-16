import React from 'react';
import { DollarSign, Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface SpendingCategory {
  name: string;
  amount: string;
  rewardRate: string;
}

export default function RewardsCalculator() {
  const { currency, formatAmount } = useSettings();
  const [categories, setCategories] = React.useState<SpendingCategory[]>([
    { name: 'Groceries', amount: '500', rewardRate: '3' },
    { name: 'Gas', amount: '200', rewardRate: '3' },
    { name: 'Dining', amount: '300', rewardRate: '2' },
    { name: 'Other', amount: '1000', rewardRate: '1' },
  ]);

  const [annualFee, setAnnualFee] = React.useState('95');

  const calculateRewards = () => {
    const monthlyRewards = categories.reduce((total, category) => {
      const amount = parseFloat(category.amount) || 0;
      const rate = parseFloat(category.rewardRate) || 0;
      return total + (amount * (rate / 100));
    }, 0);

    const yearlyRewards = monthlyRewards * 12;
    const fee = parseFloat(annualFee) || 0;
    const netRewards = yearlyRewards - fee;

    return {
      monthlyRewards: monthlyRewards.toFixed(2),
      yearlyRewards: yearlyRewards.toFixed(2),
      netRewards: netRewards.toFixed(2),
      effectiveRate: ((yearlyRewards / (categories.reduce((total, cat) => total + (parseFloat(cat.amount) || 0), 0) * 12)) * 100).toFixed(2),
    };
  };

  const updateCategory = (index: number, field: keyof SpendingCategory, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [field]: value };
    setCategories(newCategories);
  };

  const results = calculateRewards();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Rewards Calculator</h2>
        <p className="text-gray-500 mt-1">Calculate your potential credit card rewards based on spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Spend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateCategory(index, 'name', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 w-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">{currency.symbol}</span>
                        </div>
                        <input
                          type="number"
                          value={category.amount}
                          onChange={(e) => updateCategory(index, 'amount', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={category.rewardRate}
                          onChange={(e) => updateCategory(index, 'rewardRate', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <Percent className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <label className="block">
              <span className="text-gray-700">Annual Fee</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{currency.symbol}</span>
                </div>
                <input
                  type="number"
                  value={annualFee}
                  onChange={(e) => setAnnualFee(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rewards Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Rewards</p>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.monthlyRewards)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yearly Rewards</p>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.yearlyRewards)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Net Rewards (After Annual Fee)</p>
                <p className="text-2xl font-bold text-green-600">{formatAmount(results.netRewards)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Effective Reward Rate</p>
                <p className="text-2xl font-bold text-indigo-600">{results.effectiveRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Maximizing Your Rewards</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use your card for all eligible purchases</li>
              <li>• Pay your balance in full to avoid interest charges</li>
              <li>• Consider if the annual fee is worth the rewards</li>
              <li>• Check for bonus categories and promotions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}