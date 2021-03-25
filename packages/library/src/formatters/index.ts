import { formatCurrency } from './currency';
import { formatDate } from './date';
import { formatDistance } from './distance';
import { formatNumber } from './number';
import { formatPercentage } from './percentage';
import { formatRegex } from './regex';
import { truncString } from './truncate';

export const formatter = {
  currency: formatCurrency,
  date: formatDate,
  distance: formatDistance,
  number: formatNumber,
  percentage: formatPercentage,
  regex: formatRegex,
  truncateString: truncString,
};

export default formatter;
