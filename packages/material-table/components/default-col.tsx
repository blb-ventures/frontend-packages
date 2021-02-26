import { Column } from 'material-table';
import * as React from 'react';

export const defaultCol = (
  field: string,
  title: string,
  defaultVal: any,
  options?: Column<any> & { orderFields?: string[] }
) => ({
  ...options,
  title,
  field,
  render: (rowData: any) => <span>{rowData[field] != null ? rowData[field] : defaultVal}</span>,
});
