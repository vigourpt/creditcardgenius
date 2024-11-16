import { BlogPost } from '../types/blog';
import { post as dailyVsMonthly } from './articles/interest-calculators/daily-vs-monthly-interest';
import { post as howMuchInterest } from './articles/interest-calculators/how-much-credit-card-interest-per-month';
import { post as howIsCalculated } from './articles/interest-calculators/how-is-credit-card-interest-calculated';
import { post as monthlyDemystified } from './articles/interest-calculators/monthly-credit-card-interest-demystified';
import { post as top5Tools } from './articles/comparison-tools/top-5-credit-card-comparison-tools';
import { post as ultimateApp } from './articles/comparison-tools/ultimate-credit-card-comparison-app';
import { post as howToFind } from './articles/comparison-tools/how-to-find-best-credit-card';
import { post as saveHundreds } from './articles/interest-calculators/credit-card-interest-calculator-save-hundreds';
import { post as payOffFaster } from './articles/payoff-calculators/pay-off-credit-card-debt-faster';
import { post as bestInterestCalculator } from './articles/payoff-calculators/best-interest-calculator-daily-payoff';
import { post as balanceTransferSavings } from './articles/payoff-calculators/balance-transfer-calculator-savings';
import { post as maximizeRewards } from './articles/rewards-calculators/maximize-rewards-calculator';
import { post as amexRewards } from './articles/rewards-calculators/amex-rewards-calculator';
import { post as topRewardsCalculators } from './articles/rewards-calculators/top-rewards-calculators';
import { post as minimumPaymentCalculators } from './articles/minimum-payment/credit-card-minimum-payment-calculators';
import { post as trueCostMinimumPayments } from './articles/minimum-payment/true-cost-minimum-payments';
import { post as studentLoansVsCards } from './articles/minimum-payment/student-loans-vs-credit-cards';

export const blogPosts: BlogPost[] = [
  dailyVsMonthly,
  howMuchInterest,
  howIsCalculated,
  monthlyDemystified,
  top5Tools,
  ultimateApp,
  howToFind,
  saveHundreds,
  payOffFaster,
  bestInterestCalculator,
  balanceTransferSavings,
  maximizeRewards,
  amexRewards,
  topRewardsCalculators,
  minimumPaymentCalculators,
  trueCostMinimumPayments,
  studentLoansVsCards
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());