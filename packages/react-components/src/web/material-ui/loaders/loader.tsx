import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import * as React from 'react';

const LoaderContainer = styled.div<{ position?: string }>`
  position: ${props => props.position ?? 'fixed'};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

export interface LoaderProps {
  position?:
    | 'fixed'
    | 'absolute'
    | 'relative'
    | 'inherit'
    | 'initial'
    | 'sticky'
    | 'static'
    | 'unset';
}

export const Loader: React.FC<LoaderProps> = ({ position }) => (
  <LoaderContainer position={position}>
    <CircularProgress size="4rem" />
  </LoaderContainer>
);
