import React from 'react';
import { DollarSign, Percent } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function BalanceTransferCalculator() {
  const { currency, formatAmount } = useSettings();
  const [currentBalance, setCurrentBalance] = React.useState('5000');
  const [currentApr, setCurrentApr] = React.useState('19.99');
  const [transferApr, setTransferApr] = React.useState('0');
  const [transferFeePercent, setTransferFeePercent] = React.useState('3');
  const [monthsIntro, setMonthsIntro] = React.useState('12');
  const [monthlyPayment, setMonthlyPayment] = React.useState('300');

  const calculateResults = () => {
    const balance = parseFloat(currentBalance);
    const payment = parseFloat(monthlyPayment);
    const currentAprRate = parseFloat(currentApr) / 100 / 12;
    const transferAprRate = parseFloat(transferApr) / 100 / 12;
    const months = parseInt(monthsIntro);
    const transferFee = (parseFloat(transferFeePercent) / 100) * balance;

    let currentInterestPaid = 0;
    let currentBalance1 = balance;
    let transferBalance = balance + transferFee;
    
    // Calculate current card scenario
    for (let i = 0; i < months; i++) {
      if (currentBalance1 <= 0) break;
      const interest = currentBalance1 * currentAprRate;
      currentInterestPaid += interest;
      currentBalance1 = currentBalance1 + interest - payment;
    }

    // Calculate transfer card scenario
    for (let i = 0; i < months; i++) {
      if (transferBalance <= 0) break;
      const interest = transferBalance * transferAprRate;
      transferBalance = transferBalance + interest - payment;
    }

    return {
      transferFee: transferFee.toFixed(2),
      currentInterestPaid: currentInterestPaid.toFixed(2),
      potentialSavings: (currentInterestPaid - transferFee).toFixed(2),
      remainingBalanceOriginal: Math.max(0, currentBalance1).toFixed(2),
      remainingBalanceTransfer: Math.max(0, transferBalance).toFixed(2),
      transferTotalCost: (transferFee + Math.max(0, transferBalance)).toFixed(2)
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Balance Transfer Calculator</h2>
        <p className="text-gray-500 mt-1">Compare costs between keeping a balance or transferring it</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Current Card Details</h3>
          <label className="block">
            <span className="text-gray-700">Current Balance</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">{currency.symbol}</span>
              </div>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700">Current APR</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={currentApr}
                onChange={(e) => setCurrentApr(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-5 w-5 text-gray-400" />
              </div>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Balance Transfer Details</h3>
          <label className="block">
            <span className="text-gray-700">Transfer APR</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={transferApr}
                onChange={(e) => setTransferApr(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700">Transfer Fee</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={transferFeePercent}
                onChange={(e) => setTransferFeePercent(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-8 border border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Percent className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </label>

          <label className="block">
            <span className="text-gray-700">Intro Period (months)</span>
            <input
              type="number"
              value={monthsIntro}
              onChange={(e) => setMonthsIntro(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md"
            />
          </label>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Comparison Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Transfer Fee</p>
            <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.transferFee)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Potential Savings</p>
            <p className="text-2xl font-bold text-green-600">{formatAmount(results.potentialSavings)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Current Card Interest</p>
            <p className="text-2xl font-bold text-red-600">{formatAmount(results.currentInterestPaid)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Transfer Total Cost</p>
            <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.transferTotalCost)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Original Remaining Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatAmount(results.remainingBalanceOriginal)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Transfer Remaining Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatAmount(results.remainingBalanceTransfer)}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Balance Transfer Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Look for cards with 0% intro APR and low transfer fees</li>
          <li>• Transfer high-interest balances first</li>
          <li>• Make sure to complete the transfer within the promotional window</li>
          <li>• Try to pay off the balance before the intro period ends</li>
        </ul>
      </div>
    </div>
  );
}