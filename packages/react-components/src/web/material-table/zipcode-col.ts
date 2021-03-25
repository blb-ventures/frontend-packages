import { Column } from 'material-table';
import { formatToCEP } from 'brazilian-values';
import { fnCol } from './fn-col';

export const zipcodeCol = (field: string, title: string, options?: Column<any>) =>
  fnCol(field, title, formatToCEP, options);
