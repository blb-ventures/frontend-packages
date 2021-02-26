import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import * as React from 'react';

const LoaderContainer = styled.div.attrs((props: any) => ({
  position: props.position || 'fixed',
}))`
  position: ${props => props.position};
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
