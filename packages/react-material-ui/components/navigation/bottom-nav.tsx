import styled, { css } from 'styled-components';
import {
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MenuRoute } from './navigation-interfaces';
import { iPhoneMediaQuery, UndecoratedLink } from '@blb-ventures/styled-components/components';
import { FC, useMemo, useState } from 'react';
import Scrollspy from 'react-scrollspy';
import * as React from 'react';

const CustomBottomNavigation = styled(BottomNavigation)`
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0px -2px 4px -1px rgba(0, 0, 0, 0.2), 0px -4px 5px 0px rgba(0, 0, 0, 0.14),
    0px -1px 10px 0px rgba(0, 0, 0, 0.12);
  z-index: 800;
  ${(props: any) => props.theme.breakpoints.up('md')} {
    display: none;
  }

  ${iPhoneMediaQuery(
    css`
      & > button {
        padding-bottom: ${props => props.theme.spacing(5)}px;
      }
      height: ${props => props.theme.spacing(11)}px;
    `
  )}
`;

const CustomList = styled(List)`
  ${iPhoneMediaQuery(
    css`
      padding-bottom: ${props => props.theme.spacing(5)}px;
    `
  )}
`;

const CustomBottomNavigationAction = styled(BottomNavigationAction)`
  &.Mui-selected path {
    fill: ${props => props.theme.palette.primary.main} !important;
  }
`;

interface BottomNavProps {
  showLabel?: boolean;
  routes: MenuRoute[];
}

export const BottomNav: FC<BottomNavProps> = ({ showLabel, routes }) => {
  const { asPath, push } = useRouter();
  // States
  const [selectedSubroutes, setSelectedSubroutes] = useState<MenuRoute[] | undefined>();
  const [activeScroll, setActiveScroll] = useState('');
  // Memos
  const activeRoute = useMemo(
    () =>
      routes.findIndex(
        it =>
          it.url === asPath.replace('#', '') ||
          (it.startsWith ? asPath.replace('#', '').startsWith(it.url || '') : false) ||
          activeScroll === it.url
      ),
    [routes, asPath, activeScroll]
  );
  // Handlers
  const handleRouteChange = (_: any, newRoute: number) => {
    const route = routes[newRoute];
    if (route.subroutes != null) {
      setSelectedSubroutes(route.subroutes);
    } else if (typeof window !== 'undefined' && route.external) {
      window.location = (route.url || '') as any;
    } else {
      push(routes[newRoute].url || '');
    }
  };
  return (
    <>
      <Scrollspy
        items={(routes || []).filter(it => it.url != null).map(it => it.url!.replace('/#', ''))}
        onUpdate={(el: any) => setActiveScroll(el != null ? `/#${el.id}` : '')}
        currentClassName="active"
      />
      <CustomBottomNavigation value={activeRoute} onChange={handleRouteChange}>
        {routes.map((it, idx) => (
          <CustomBottomNavigationAction
            key={idx}
            icon={it.icon}
            label={showLabel ? it.label : undefined}
            showLabel
          />
        ))}
      </CustomBottomNavigation>
      <Drawer
        open={selectedSubroutes != null}
        anchor="bottom"
        onClose={() => setSelectedSubroutes(undefined)}
      >
        <CustomList>
          {selectedSubroutes
            ?.filter(it => !it.divider)
            .map((it, idx) => {
              const content = (
                <ListItem key={idx} button onClick={it.onClick}>
                  <ListItemIcon>{it.icon}</ListItemIcon>
                  <ListItemText primary={it.label} />
                </ListItem>
              );
              return it.external ? (
                <UndecoratedLink href={it.url || ''} key={`link-${idx}`}>
                  {content}
                </UndecoratedLink>
              ) : it.url ? (
                <Link href={it.url || ''} passHref key={`link-${idx}`}>
                  <UndecoratedLink>{content}</UndecoratedLink>
                </Link>
              ) : (
                content
              );
            })}
        </CustomList>
      </Drawer>
    </>
  );
};
