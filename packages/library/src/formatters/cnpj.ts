import { formatRegex } from './regex';

export const formatCnpj = (value: any) =>
  formatRegex(value, /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
