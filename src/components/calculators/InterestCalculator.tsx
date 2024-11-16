import React from 'react';
import { DollarSign } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function InterestCalculator() {
  const { currency, formatAmount } = useSettings();
  const [balance, setBalance] = React.useState('1000');
  const [apr, setApr] = React.useState('18.99');
  const [payment, setPayment] = React.useState('50');

  const calculateResults = () => {
    const balanceNum = parseFloat(balance) || 0;
    const aprNum = parseFloat(apr) || 0;
    const paymentNum = parseFloat(payment) || 0;
    
    const monthlyRate = aprNum / 100 / 12;
    const monthlyInterest = balanceNum * monthlyRate;
    
    // Calculate months to payoff using amortization formula
    let monthsToPayoff = 0;
    
    if (paymentNum > monthlyInterest) {
      // Use the loan amortization formula: n = -log(1 - (r*PV)/PMT) / log(1 + r)
      // Where: n = number of months
      //        r = monthly interest rate
      //        PV = present value (balance)
      //        PMT = monthly payment
      monthsToPayoff = Math.ceil(
        -Math.log(1 - (monthlyRate * balanceNum) / paymentNum) / 
        Math.log(1 + monthlyRate)
      );
    } else {
      monthsToPayoff = Infinity; // Payment is too low to ever pay off the debt
    }

    // Calculate total interest over the payoff period
    let remainingBalance = balanceNum;
    let totalInterest = 0;
    let months = 0;
    
    while (remainingBalance > 0 && months < monthsToPayoff) {
      const interest = remainingBalance * monthlyRate;
      totalInterest += interest;
      remainingBalance = remainingBalance + interest - paymentNum;
      months++;
      
      if (months >= 1200) { // 100 years - practical limit
        monthsToPayoff = Infinity;
        break;
      }
    }

    return {
      monthlyInterest: monthlyInterest.toFixed(2),
      yearlyInterest: (monthlyInterest * 12).toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      monthsToPayoff: monthsToPayoff === Infinity ? 'Never' : monthsToPayoff
    };
  };

  const results = calculateResults();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Credit Card Interest Calculator</h2>
        <p className="text-gray-500 mt-1">Calculate your monthly interest and payoff timeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
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
                placeholder="1000"
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
                placeholder="18.99"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400">%</span>
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
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="50"
              />
            </div>
          </label>
        </div>

        <div className="md:col-span-2 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Monthly Interest</p>
              <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.monthlyInterest)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Yearly Interest</p>
              <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.yearlyInterest)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Interest Paid</p>
              <p className="text-2xl font-bold text-indigo-600">{formatAmount(results.totalInterest)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Time to Pay Off</p>
              <p className="text-2xl font-bold text-indigo-600">
                {results.monthsToPayoff === 'Never' ? 'Never' : 
                  `${Math.floor(results.monthsToPayoff / 12)} years ${results.monthsToPayoff % 12} months`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Tips to Save on Interest</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Consider transferring your balance to a 0% APR card</li>
          <li>• Pay more than the minimum payment whenever possible</li>
          <li>• Try to pay your full balance each month to avoid interest charges</li>
        </ul>
      </div>
    </div>
  );
}