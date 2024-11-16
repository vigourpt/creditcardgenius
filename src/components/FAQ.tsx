import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How accurate are these calculators?",
    answer: "Our calculators provide estimates based on the information you input. While we strive for accuracy, actual results may vary depending on factors such as compounding methods, payment timing, and specific card terms."
  },
  {
    question: "Should I transfer my balance to a new card?",
    answer: "Balance transfers can be beneficial if you qualify for a lower APR and can pay off the balance during the promotional period. Consider transfer fees and your ability to make payments when deciding."
  },
  {
    question: "How do credit card rewards work?",
    answer: "Credit card rewards are typically earned as a percentage of your purchases. The rate varies by category and card. Some cards offer cash back, while others provide points or miles that can be redeemed for travel, merchandise, or statement credits."
  },
  {
    question: "What's the best way to pay off credit card debt?",
    answer: "Focus on paying more than the minimum payment and consider strategies like the debt avalanche (paying highest interest first) or debt snowball (paying smallest balances first). Balance transfers to lower-APR cards can also help reduce interest costs."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(current =>
      current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  openItems.includes(index) ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            {openItems.includes(index) && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}