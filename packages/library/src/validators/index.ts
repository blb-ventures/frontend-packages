import { validateCreditCard } from './credit-card';
import { validateDate } from './date';
import { validateEmail } from './email';

export const validators = {
  creditCard: validateCreditCard,
  date: validateDate,
  email: validateEmail,
};

export default validators;
