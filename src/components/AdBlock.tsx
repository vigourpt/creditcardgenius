import React from 'react';
import { CreditCard, X } from 'lucide-react';

interface AdBlockProps {
  variant?: 'vertical' | 'horizontal' | 'banner' | 'notification';
}

export default function AdBlock({ variant = 'vertical' }: AdBlockProps) {
  const isNotification = variant === 'notification';
  const isBanner = variant === 'banner';
  const isVertical = variant === 'vertical';

  if (isNotification) {
    return (
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              // Add your click handler here
              console.log('Notification clicked');
            }}
            className="flex items-center justify-between py-3 group hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className="bg-indigo-500 p-1 rounded">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <p className="ml-3 text-sm font-medium">
                <span className="text-indigo-400">Special Offer:</span>{' '}
                Get 80,000 bonus points when you spend $4,000 in the first 3 months
              </p>
            </div>
            <div className="flex items-center">
              <span className="hidden sm:inline text-sm text-indigo-400 mr-3 group-hover:underline">
                Learn More →
              </span>
              <button className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </a>
        </div>
      </div>
    );
  }

  if (isBanner) {
    return (
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-lg shadow-lg p-1">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-lg flex-shrink-0">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Featured Credit Card Offer</h3>
              <p className="text-lg text-indigo-100 mb-4">
                Earn 2% cash back on all purchases with no annual fee. Plus, get a $200 welcome bonus!
              </p>
              <div className="flex items-center space-x-8 text-sm text-indigo-100 mb-4">
                <p>✓ No annual fee</p>
                <p>✓ 0% APR for 15 months</p>
                <p>✓ No foreign transaction fees</p>
                <p>✓ Free credit score monitoring</p>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <p className="text-xs text-indigo-200 mt-4">Advertisement - This offer may be from our partners</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-lg shadow-lg p-1">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-white">
        <div className={`flex ${isVertical ? 'flex-col' : 'items-center'} space-x-4`}>
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-lg flex-shrink-0 mb-4">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Featured Credit Card Offer</h3>
            <p className="text-indigo-100 mb-4">
              Get 0% APR for 18 months on balance transfers and earn 2% cash back on all purchases.
            </p>
            <div className="space-y-2 text-sm text-indigo-100 mb-4">
              <p>✓ No annual fee</p>
              <p>✓ $200 welcome bonus</p>
              <p>✓ Free credit score monitoring</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <p className="text-xs text-indigo-200 mt-4">Advertisement - This offer may be from our partners</p>
      </div>
    </div>
  );
}