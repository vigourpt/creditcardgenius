import React from 'react';
import { useSettings, currencies } from '../contexts/SettingsContext';

export default function CurrencySelector() {
  const { currency, setCurrency } = useSettings();

  return (
    <div className="flex items-center space-x-2">
      <select
        id="currency"
        value={currency.code}
        onChange={(e) => {
          const selected = currencies.find(c => c.code === e.target.value);
          if (selected) setCurrency(selected);
        }}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white/20 backdrop-blur-sm border-transparent text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm rounded-md"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code} className="text-gray-900">
            {c.code} - {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}