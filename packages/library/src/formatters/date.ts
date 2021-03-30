import { parse, format } from 'date-fns';

export interface FormatOptions {
  parse: string;
  format: string;
  isISO?: boolean;
  locale?: any;
}

const defaultOps: FormatOptions = {
  parse: 'yyyy-MM-dd',
  format: 'dd/MM/yyyy',
  isISO: false,
};

export const formatDate = (
  value?: string | Date | null | undefined,
  ops: Partial<FormatOptions> = {}
): string => {
  if (value == null) {
    return '';
  }
  const options = { ...defaultOps, ...ops };
  const date =
    typeof value === 'string'
      ? options.isISO
        ? new Date(value)
        : parse(value, options.parse, new Date())
      : value;
  return format(date, options.format, { locale: options.locale });
};

const defaultTimeOps: FormatOptions = {
  parse: 'yyyy-MM-dd HH:mm:ss',
  format: 'dd/MM/yyyy - HH:mm:ss',
  isISO: false,
};

export const formatDateTime = (value?: string, ops: Partial<FormatOptions> = {}) => {
  return formatDate(value, { ...defaultTimeOps, ...ops });
};
