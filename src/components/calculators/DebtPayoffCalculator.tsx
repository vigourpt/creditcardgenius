import React from 'react';
import { Percent, Plus, Trash2 } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface Debt {
  id: string;
  name: string;
  balance: string;
  apr: string;
  minPayment: string;
}

export default function DebtPayoffCalculator() {
  const { currency, formatAmount } = useSettings();
  const [debts, setDebts] = React.useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: '5000', apr: '18.99', minPayment: '100' },
    { id: '2', name: 'Credit Card 2', balance: '3000', apr: '15.99', minPayment: '60' },
  ]);
  const [extraPayment, setExtraPayment] = React.useState('200');
  const [strategy, setStrategy] = React.useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    const newId = (Math.max(...debts.map(d => parseInt(d.id))) + 1).toString();
    setDebts([...debts, {
      id: newId,
      name: `Credit Card ${newId}`,
      balance: '0',
      apr: '0',
      minPayment: '0'
    }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts(debts.map(d => 
      d.id === id ? { ...d, [field]: value } : d
    ));
  };

  const calculatePayoff = () => {
    let sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'avalanche') {
        return parseFloat(b.apr) - parseFloat(a.apr);
      }
      return parseFloat(a.balance) - parseFloat(b.balance);
    });

    let totalBalance = debts.reduce((sum, debt) => sum + parseFloat(debt.balance), 0);
    let totalMinPayment = debts.reduce((sum, debt) => sum + parseFloat(debt.minPayment), 0);
    let totalPayment = totalMinPayment + parseFloat(extraPayment);
    let monthsToPayoff = 0;
    let totalInterest = 0;

    while (totalBalance > 0 && monthsToPayoff < 360) {
      monthsToPayoff++;
      let remainingPayment = totalPayment;

      // Pay minimum on all debts
      sortedDebts = sortedDebts.map(debt => {
        let balance = parseFloat(debt.balance);
        if (balance <= 0) return debt;

        let minPayment = Math.min(parseFloat(debt.minPayment), balance);
        let interest = (balance * (parseFloat(debt.apr) / 100 / 12));
        totalInterest += interest;
        balance = balance + interest - minPayment;
        remainingPayment -= minPayment;

        return { ...debt, balance: balance.toString() };
      });

      // Apply extra payment to first debt with remaining balance
      if (remainingPayment > 0) {
        for (let i = 0; i < sortedDebts.length; i++) {
          let balance = parseFloat(sortedDebts[i].balance);
          if (balance > 0) {
            balance = Math.max(0, balance - remainingPayment);
            sortedDebts[i] = { ...sortedDebts[i], balance: balance.toString() };
            break;
          }
        }
      }

      totalBalance = sortedDebts.reduce((sum, debt) => sum + parseFloat(debt.balance), 0);
    }

    return {
      monthsToPayoff,
      totalInterest: totalInterest.toFixed(2),
      monthlyPayment: totalPayment.toFixed(2)
    };
  };

  const results = calculatePayoff();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Debt Payoff Calculator</h2>
        <p className="text-gray-500 mt-1">Plan your debt payoff strategy and see how extra payments can help</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Debt Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">APR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {debts.map((debt) => (
                  <tr key={debt.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={debt.name}
                        onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
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
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          value={debt.apr}
                          onChange={(e) => updateDebt(debt.id, 'apr', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 sm:text-sm border-gray-300 rounded-md"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <Percent className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-400">{currency.symbol}</span>
                        </div>
                        <input
                          type="number"
                          value={debt.minPayment}
                          onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeDebt(debt.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addDebt}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Debt
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block">
                <span className="text-gray-700">Extra Monthly Payment</span>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">{currency.symbol}</span>
                  </div>
                  <input
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </label>
            </div>

            <div>
              <label className="block">
                <span className="text-gray-700">Payoff Strategy</span>
                <select
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value as 'avalanche' | 'snowball')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="avalanche">Debt Avalanche (Highest APR First)</option>
                  <option value="snowball">Debt Snowball (Lowest Balance First)</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payoff Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Time to Pay Off</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {results.monthsToPayoff} months
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatAmount(results.totalInterest)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {formatAmount(results.monthlyPayment)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Strategy Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Debt Avalanche saves the most in interest</li>
              <li>• Debt Snowball provides quick wins for motivation</li>
              <li>• Always pay at least the minimum on all debts</li>
              <li>• Apply extra payments to one debt at a time</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}