import React, { useEffect, useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

interface Transaction {
  id: string;
  description: string;
  amount: string;
  currency: string;
  fee: string;
}

interface ExchangeRates {
  [key: string]: number;
}

// Mock exchange rates for development
const mockExchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.35,
  AUD: 1.52,
  JPY: 150.25,
  CNY: 7.19,
  CHF: 0.88,
  BRL: 4.97
};

export default function ForeignTransactionCalculator() {
  const { currency, formatAmount } = useSettings();
  const [transactions, setTransactions] = React.useState<Transaction[]>([
    { id: '1', description: 'Hotel Booking', amount: '500', currency: 'EUR', fee: '3' },
    { id: '2', description: 'Restaurant', amount: '100', currency: 'EUR', fee: '3' },
  ]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(mockExchangeRates);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setExchangeRates(mockExchangeRates);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const convertAmount = (amount: number, fromCurrency: string) => {
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return amount;
    }

    if (fromCurrency === currency.code) return amount;

    // Convert to USD first (base currency)
    const inUSD = amount / exchangeRates[fromCurrency];
    // Then convert to target currency
    return inUSD * exchangeRates[currency.code];
  };

  const calculateTotals = () => {
    return transactions.reduce((acc, t) => {
      const amount = parseFloat(t.amount) || 0;
      const convertedAmount = convertAmount(amount, t.currency);
      const fee = parseFloat(t.fee) || 0;
      const feeAmount = convertedAmount * (fee / 100);
      
      return {
        totalAmount: acc.totalAmount + convertedAmount,
        totalFees: acc.totalFees + feeAmount,
      };
    }, { totalAmount: 0, totalFees: 0 });
  };

  const addTransaction = () => {
    const newId = (Math.max(...transactions.map(t => parseInt(t.id))) + 1).toString();
    setTransactions([...transactions, {
      id: newId,
      description: '',
      amount: '0',
      currency: currency.code,
      fee: '3'
    }]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (id: string, field: keyof Transaction, value: string) => {
    setTransactions(transactions.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Foreign Transaction Calculator</h2>
        <p className="text-gray-500 mt-1">Calculate foreign transaction fees and total costs in {currency.code}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {lastUpdated && (
            <span>Exchange rates last updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
        </div>
        <button
          onClick={fetchExchangeRates}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Rates
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount & Currency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Rate (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total in {currency.code}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => {
                const amount = parseFloat(transaction.amount) || 0;
                const convertedAmount = convertAmount(amount, transaction.currency);
                const fee = parseFloat(transaction.fee) || 0;
                const feeAmount = convertedAmount * (fee / 100);
                const total = convertedAmount + feeAmount;

                return (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={transaction.description}
                        onChange={(e) => updateTransaction(transaction.id, 'description', e.target.value)}
                        className="border-0 bg-transparent focus:ring-0 w-full"
                        placeholder="Enter description"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <div className="relative rounded-md shadow-sm flex-1">
                          <input
                            type="number"
                            value={transaction.amount}
                            onChange={(e) => updateTransaction(transaction.id, 'amount', e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <select
                          value={transaction.currency}
                          onChange={(e) => updateTransaction(transaction.id, 'currency', e.target.value)}
                          className="focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        >
                          {Object.keys(exchangeRates).map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={transaction.fee}
                        onChange={(e) => updateTransaction(transaction.id, 'fee', e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-24 sm:text-sm border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {formatAmount(feeAmount)}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {formatAmount(total)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeTransaction(transaction.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <button
          onClick={addTransaction}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </button>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Amount ({currency.code})</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatAmount(totals.totalAmount)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="text-2xl font-bold text-red-600">
                {formatAmount(totals.totalFees)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Foreign Transaction Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Look for cards with no foreign transaction fees</li>
            <li>• Consider getting a local currency card for frequent travel</li>
            <li>• Avoid dynamic currency conversion at point of sale</li>
            <li>• Notify your card issuer before international travel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}