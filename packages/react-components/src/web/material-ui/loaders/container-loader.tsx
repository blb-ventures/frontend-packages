import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';
import * as React from 'react';

interface OwnProps {
  /** A flag that sets if the loading is shown */
  loading?: boolean;
  loadingMessage?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Loader = styled.div<{ show: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(250, 250, 250, 0.7);
  top: 0;
  left: 0;
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingMessage = styled.div`
  margin-top: ${props => props.theme.spacing(2)};
`;

/** A container with a loader inside */
export const ContainerLoader: React.FC<OwnProps> = ({
  children,
  loading = false,
  loadingMessage,
}) => (
  <Container>
    {children}
    <Loader show={loading}>
      <CircularProgress />
      {loadingMessage && <LoadingMessage>{loadingMessage}</LoadingMessage>}
    </Loader>
  </Container>
);

export default ContainerLoader;
