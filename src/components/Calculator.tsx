import React, { useState } from 'react';
import { Calculator as CalculatorIcon, CreditCard, DollarSign, Percent, Clock, ArrowRightLeft, Gift, MinusCircle, PiggyBank, Globe, ArrowUpDown, TrendingUp, Timer, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CalculatorCard from './CalculatorCard';
import CurrencySelector from './CurrencySelector';
import AdBlock from './AdBlock';
import FAQ from './FAQ';
import SEOContent from './SEOContent';
import Footer from './Footer';
import InterestCalculator from './calculators/InterestCalculator';
import BalanceTransferCalculator from './calculators/BalanceTransferCalculator';
import RewardsCalculator from './calculators/RewardsCalculator';
import MinimumPaymentCalculator from './calculators/MinimumPaymentCalculator';
import DebtPayoffCalculator from './calculators/DebtPayoffCalculator';
import AnnualFeeCalculator from './calculators/AnnualFeeCalculator';
import ForeignTransactionCalculator from './calculators/ForeignTransactionCalculator';
import CardComparisonCalculator from './calculators/CardComparisonCalculator';
import CreditScoreSimulator from './calculators/CreditScoreSimulator';
import IntroAPRCalculator from './calculators/IntroAPRCalculator';

const calculators = [
  { id: 'interest', icon: Percent, title: 'Interest Calculator', component: InterestCalculator },
  { id: 'balance', icon: ArrowRightLeft, title: 'Balance Transfer', component: BalanceTransferCalculator },
  { id: 'rewards', icon: Gift, title: 'Rewards Calculator', component: RewardsCalculator },
  { id: 'minimum', icon: MinusCircle, title: 'Minimum Payment', component: MinimumPaymentCalculator },
  { id: 'debt', icon: PiggyBank, title: 'Debt Payoff', component: DebtPayoffCalculator },
  { id: 'annual', icon: DollarSign, title: 'Annual Fee Break-Even', component: AnnualFeeCalculator },
  { id: 'foreign', icon: Globe, title: 'Foreign Transaction', component: ForeignTransactionCalculator },
  { id: 'comparison', icon: ArrowUpDown, title: 'Card Comparison', component: CardComparisonCalculator },
  { id: 'score', icon: TrendingUp, title: 'Credit Score Simulator', component: CreditScoreSimulator },
  { id: 'intro', icon: Timer, title: 'Intro APR Savings', component: IntroAPRCalculator }
];

export default function Calculator() {
  const [activeCalculator, setActiveCalculator] = useState('interest');
  const ActiveComponent = calculators.find(calc => calc.id === activeCalculator)?.component;
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
        <AdBlock variant="notification" />
      </div>
      
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <CalculatorIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="ml-3 text-2xl font-bold text-white">Credit Card Genius</h1>
            </div>
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
              <CurrencySelector />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              icon={calc.icon}
              title={calc.title}
              active={activeCalculator === calc.id}
              onClick={() => setActiveCalculator(calc.id)}
            />
          ))}
        </div>

        <div className="mb-8">
          <AdBlock variant="banner" />
        </div>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
            <div className="p-6">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <FAQ />
            </div>
            <div className="lg:col-span-1">
              <AdBlock />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <SEOContent />
          </div>

          <div>
            <AdBlock variant="banner" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}