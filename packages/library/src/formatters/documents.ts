import { validateCpf } from '../validators/cpf';
import { validateCnpj } from '../validators/cnpj';
import { formatCnpj } from './cnpj';
import { formatCpf } from './cpf';

export const formatDocument = (value: string) => {
  if (validateCpf(value)) {
    return formatCpf(value);
  } else if (validateCnpj(value)) {
    return formatCnpj(value);
  }
  return value;
};
