import React from 'react';
import { Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function MinimumPaymentCalculator() {
  const { currency, formatAmount } = useSettings();
  const [balance, setBalance] = React.useState('5000');
  const [apr, setApr] = React.useState('18.99');
  const [minPaymentPercent, setMinPaymentPercent] = React.useState('2');
  const [minPaymentAmount, setMinPaymentAmount] = React.useState('25');

  const calculatePayoff = () => {
    const balanceAmount = parseFloat(balance) || 0;
    const aprRate = (parseFloat(apr) || 0) / 100 / 12;
    const minPercent = (parseFloat(minPaymentPercent) || 0) / 100;
    const minAmount = parseFloat(minPaymentAmount) || 0;

    let currentBalance = balanceAmount;
    let months = 0;
    let totalInterest = 0;
    let totalPayments = 0;

    while (currentBalance > 0 && months < 600) {
      months++;
      const interest = currentBalance * aprRate;
      totalInterest += interest;
      
      // Calculate minimum payment as greater of percentage or fixed amount
      const percentPayment = currentBalance * minPercent;
      const payment = Math.max(percentPayment, minAmount);
      
      totalPayments += payment;
      currentBalance = currentBalance + interest - payment;

      if (currentBalance < 0.01) break; // Avoid floating point issues
    }

    return {
      months,
      totalInterest: totalInterest.toFixed(2),
      totalPayments: totalPayments.toFixed(2),
      monthlyPayment: (totalPayments / months).toFixed(2)
    };
  };

  const results = calculatePayoff();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Minimum Payment Calculator</h2>
        <p className="text-gray-500 mt-1">See how long it will take to pay off your credit card making only minimum payments</p>
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
              <span className="text-gray-700">Annual Percentage Rate (APR)</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  value={apr}
                  onChange={(e) => setApr(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700">Minimum Payment Percentage</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  value={minPaymentPercent}
                  onChange={(e) => setMinPaymentPercent(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Percent className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </label>

            <label className="block">
              <span className="text-gray-700">Minimum Payment Amount</span>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">{currency.symbol}</span>
                </div>
                <input
                  type="number"
                  value={minPaymentAmount}
                  onChange={(e) => setMinPaymentAmount(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Time to Pay Off</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {Math.floor(results.months / 12)} years {results.months % 12} months
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-2xl font-bold text-red-600">{formatAmount(results.totalInterest)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.totalPayments)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Monthly Payment</p>
                <p className="text-2xl font-bold text-gray-900">{formatAmount(results.monthlyPayment)}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Payment Tips</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Pay more than the minimum to save on interest</li>
              <li>• Consider a balance transfer to a lower APR card</li>
              <li>• Set up automatic payments to avoid late fees</li>
              <li>• Try to pay the full balance when possible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}