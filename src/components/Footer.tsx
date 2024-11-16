import React from 'react';
import { CreditCard, Calculator, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              About Our Calculators
            </h3>
            <p className="text-indigo-100 text-sm">
              Our comprehensive suite of credit card calculators helps you make informed financial decisions. 
              Compare cards, calculate rewards, and plan your debt repayment strategy with confidence.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Credit Card Resources
            </h3>
            <ul className="space-y-2 text-sm text-indigo-100">
              <li>
                <a href="https://www.consumerfinance.gov/consumer-tools/credit-cards/answers/key-terms/#apr" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Understanding Credit Card APR
                </a>
              </li>
              <li>
                <a href="https://www.nerdwallet.com/article/credit-cards/how-to-maximize-credit-card-rewards" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Maximizing Credit Card Rewards
                </a>
              </li>
              <li>
                <a href="https://www.bankrate.com/finance/credit-cards/balance-transfer-guide/" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Balance Transfer Strategies
                </a>
              </li>
              <li>
                <a href="https://www.myfico.com/credit-education/improve-your-credit-score" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Building Credit Score
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-indigo-100">
              <li>
                <a href="https://www.creditcards.com/credit-card-news/best-credit-card-offers-signup-bonus/" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Updated Credit Card Offers
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/consumer-tools/credit-cards/" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Financial Education Resources
                </a>
              </li>
              <li>
                <a href="https://www.experian.com/blogs/ask-experian/credit-education/score-basics/" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Credit Score Tips
                </a>
              </li>
              <li>
                <a href="https://www.ftc.gov/tips-advice/business-center/privacy-and-security" 
                   className="hover:text-white" target="_blank" rel="noopener noreferrer">
                  • Security & Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-800 pt-8">
          <div className="text-sm text-indigo-200 space-y-4">
            <div className="bg-indigo-800/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">Affiliate Disclosure:</p>
              <p>
                Some links on this site are affiliate links. We may receive compensation when you click on these links 
                and apply for credit card products. However, all opinions expressed here are our own and calculations 
                are provided for informational purposes only.
              </p>
            </div>

            <div>
              <p className="mb-2">
                <strong>Disclaimer:</strong> The information provided through these calculators is for illustrative 
                purposes only. Actual credit card terms, interest rates, and fees may vary. Always review the 
                complete terms and conditions when applying for any financial product.
              </p>
              
              <p className="mb-2">
                <strong>Keywords:</strong> credit card calculator, rewards calculator, APR calculator, balance 
                transfer calculator, credit score simulator, debt payoff calculator, credit card comparison tool
              </p>

              <p>
                © {new Date().getFullYear()} Credit Card Comparison Calculators. All rights reserved. 
                The calculators and information provided are for educational purposes only and should not 
                be considered financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}