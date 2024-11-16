import React from 'react';
import { useSettings } from '../contexts/SettingsContext';

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useSettings();

  return (
    <select
      value={currency.code}
      onChange={(e) => {
        const selected = currencies.find(c => c.code === e.target.value);
        if (selected) setCurrency(selected);
      }}
      className="bg-white/20 text-white border-white/20 rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-white/40"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code} className="text-gray-900">
          {c.code} - {c.name}
        </option>
      ))}
    </select>
  );
}