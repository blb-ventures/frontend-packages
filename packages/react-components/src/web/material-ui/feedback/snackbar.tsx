import { TransitionProps } from '@mui/material/transitions/transition';
import {
  Slide,
  SnackbarContent,
  Snackbar as MUISnackbar,
  Box,
  SnackbarOrigin,
} from '@mui/material';
import styled from '@emotion/styled';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import * as React from 'react';

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...(props as any)} direction="up" />;
};

type Status = 'default' | 'success' | 'information' | 'danger';

interface OwnProps {
  open: boolean;
  autoHideDuration?: number;
  message: string | React.ReactNode;
  type?: Status;
  onClose: () => void;
}

const SnackbarContainer = styled.div<{ status: Status }>`
  .MuiSnackbarContent-root {
    background-color: ${props =>
      props.status === 'success'
        ? '#4caf50'
        : props.status === 'information'
        ? '#12b9b0'
        : props.status === 'danger'
        ? '#ff4444'
        : 'rgb(49, 49, 49)'} !important;
  }
`;

const snackIcon = {
  default: undefined,
  success: <DoneIcon />,
  information: undefined,
  danger: <ErrorIcon />,
};

const anchor: SnackbarOrigin = { vertical: 'bottom', horizontal: 'center' };

export const Snackbar: React.FC<OwnProps> = ({
  open,
  autoHideDuration = 5000,
  message,
  type = 'default',
  onClose,
}) => (
  <SnackbarContainer status={type}>
    <MUISnackbar
      anchorOrigin={anchor}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      TransitionComponent={SlideTransition}
    >
      <SnackbarContent
        message={
          typeof message === 'string' ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={1}>{snackIcon[type]}</Box>
              {message}
            </Box>
          ) : (
            message
          )
        }
      />
    </MUISnackbar>
  </SnackbarContainer>
);
