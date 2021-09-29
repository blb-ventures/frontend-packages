import * as React from 'react';
import { BottomNavigation, BottomNavigationAction, Drawer, List } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { SmartMenu } from './smart-menu';
import { MenuRoute } from './navigation-interfaces';

const StyledBottomNavigation = styled(BottomNavigation)`
  background-color: white;
  width: 100%;
  box-shadow: none;
  height: calc(${props => props.theme.spacing(8)}px + env(safe-area-inset-bottom, 0));
  &[data-has-shadow='1'] {
    box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14),
      0px -1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  ${props => props.theme.breakpoints.up('md')} {
    display: none;
  }

  & > button {
    padding-bottom: env(safe-area-inset-bottom, 0);
    min-width: 60px;
  }
`;

const StyledList = styled(List)`
  padding-bottom: env(safe-area-inset-bottom, 0);
`;

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  &.Mui-selected path {
    fill: ${props => props.theme.palette.primary.main} !important;
  }
`;

interface BottomNavProps {
  showLabel?: boolean;
  hasShadow?: boolean;
  routes: MenuRoute[];
}

export const BottomNav: FC<BottomNavProps> = ({ showLabel, hasShadow = true, routes }) => {
  const { asPath, push } = useRouter();

  // States
  const [selectedSubRoutes, setSelectedSubRoutes] = useState<MenuRoute[] | undefined>();
  // Memos
  const activeRoute = useMemo(
    () =>
      routes.findIndex(
        it =>
          it.url === asPath.replace('#', '') ||
          (it.startsWith
            ? asPath
                .replace('#', '')
                .startsWith(
                  it.url != null
                    ? typeof it.url === 'string'
                      ? it.url
                      : it.url.pathname || ''
                    : ''
                )
            : false)
      ),
    [routes, asPath]
  );
  // Handlers
  const handleRouteChange = (_: any, newRoute: number) => {
    const route = routes[newRoute];
    if (route.subRoutes != null) {
      setSelectedSubRoutes(route.subRoutes);
    } else if (typeof window !== 'undefined' && route.external) {
      // eslint-disable-next-line no-undef
      window.location = (route.url || '') as any;
    } else if (routes[newRoute].url) {
      push(routes[newRoute].url || '');
    }
  };

  return (
    <>
      <StyledBottomNavigation
        value={activeRoute}
        onChange={handleRouteChange}
        data-has-shadow={hasShadow ? 1 : 0}
      >
        {routes.map((it, idx) => (
          <StyledBottomNavigationAction
            key={idx}
            icon={it.icon}
            label={showLabel ? it.label : undefined}
            // eslint-disable-next-line react/jsx-handler-names
            onClick={it.onClick}
            showLabel
          />
        ))}
      </StyledBottomNavigation>
      <Drawer
        open={selectedSubRoutes != null}
        anchor="bottom"
        onClose={() => setSelectedSubRoutes(undefined)}
      >
        <StyledList>
          <SmartMenu menuItems={selectedSubRoutes || []} />
        </StyledList>
      </Drawer>
    </>
  );
};
