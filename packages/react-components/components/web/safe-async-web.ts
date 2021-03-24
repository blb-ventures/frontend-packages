import { safeAsyncCore } from '@blb-ventures/library/src/safe-async-core';
import { WebSnackbar } from './material-ui/feedback/global-snackbar';

export const safeAsyncWeb = safeAsyncCore({
  dangerFeedback: (message: string) => WebSnackbar.showDangerSnackbar(message),
  successFeedback: (message: string) => WebSnackbar.showSuccessSnackbar(message),
  supressConsoleError: true,
});
