import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import ScrollSpy, { ScrollspyProps } from 'react-scrollspy';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UndecoratedLink } from '../../styled-components';
import { MenuRoute } from './navigation-interfaces';

const CustomLinkListItem = styled(ListItem).attrs((attrs: any) => ({ $rounded: attrs.$rounded }))`
  border-radius: ${props =>
    props.$rounded ? `0 ${props.theme.spacing(4)}px ${props.theme.spacing(4)}px 0` : 0};
  &.menu-active {
    span,
    svg {
      color: #007fd7;
    }
    background-color: #007fd726;
    &:hover {
      background-color: #007fd736;
    }
  }
`;

const CustomDivider = styled(Divider)`
  margin: ${props => props.theme.spacing(1, 0)};
`;
export interface SmartMenuProps {
  hasDivider?: boolean;
  scrollSpy?: Partial<ScrollspyProps>;
  menuItems: MenuRoute[];
  rounded?: boolean;
  afterClick?: () => any;
}

const handleScrollToEl = (elId: string, onClick?: () => any, afterClick?: () => any) => () => {
  if (onClick) {
    onClick();
  }
  const el = document.getElementById(elId);
  if (el != null) {
    scrollTo({ behavior: 'smooth', top: el.offsetTop - 80 });
  }
  if (afterClick) {
    afterClick();
  }
};

export const SmartMenu: React.FC<SmartMenuProps> = ({
  hasDivider,
  menuItems,
  scrollSpy,
  rounded = false,
  afterClick,
}) => {
  const { asPath } = useRouter();
  const activeRoute = React.useMemo(
    () =>
      menuItems.findIndex(
        it => it.url === asPath || (it.startsWith ? asPath.startsWith(it.url || '') : false)
      ),
    [menuItems, asPath]
  );
  const ListComponent = scrollSpy != null ? (ScrollSpy as any) : List;
  const listComponentProps = React.useMemo(
    () =>
      scrollSpy != null
        ? { items: menuItems.map(it => it.scrollToEl), ...scrollSpy }
        : { disablePadding: true },
    [menuItems, scrollSpy]
  );
  const menu = React.useMemo(
    () =>
      menuItems.map((it, idx) => {
        if (it.divider) {
          return <CustomDivider key={idx} />;
        }
        const content = (
          <>
            {hasDivider && idx > 0 && <Divider />}
            <CustomLinkListItem
              button
              onClick={
                it.scrollToEl ? handleScrollToEl(it.scrollToEl, it.onClick, afterClick) : it.onClick
              }
              className={it.active || idx === activeRoute ? 'menu-active' : undefined}
              key={`side-menu-item-component-${idx}`}
              $rounded={rounded}
              disabled={it.disabled}
            >
              {it.icon != null && <ListItemIcon>{it.icon}</ListItemIcon>}
              {it.label != null && <ListItemText primary={it.label} />}
            </CustomLinkListItem>
          </>
        );
        return it.url != null ? (
          <Link key={idx} href={it.url} passHref>
            <UndecoratedLink>{content}</UndecoratedLink>
          </Link>
        ) : (
          content
        );
      }),
    [menuItems, rounded, afterClick, activeRoute, hasDivider]
  );
  return <ListComponent {...listComponentProps}>{menu}</ListComponent>;
};
