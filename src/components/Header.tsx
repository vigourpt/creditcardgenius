import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator as CalculatorIcon, BookOpen } from 'lucide-react';
import CurrencySelector from './CurrencySelector';
import AuthButton from './AuthButton';
import { useSettings } from '../contexts/SettingsContext';

export default function Header() {
  const location = useLocation();
  const { currency } = useSettings();

  return (
    <div>
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <CalculatorIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-white">Credit Card Genius</h1>
            </Link>
            
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-6">
                <Link 
                  to="/" 
                  className={`text-white hover:text-indigo-100 font-medium ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}
                >
                  Calculators
                </Link>
                <Link 
                  to="/blog" 
                  className={`text-white hover:text-indigo-100 font-medium flex items-center ${location.pathname.startsWith('/blog') ? 'border-b-2 border-white' : ''}`}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Blog
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                <CurrencySelector />
                <AuthButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}