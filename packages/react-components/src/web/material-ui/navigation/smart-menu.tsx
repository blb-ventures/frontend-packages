import * as React from 'react';
import {
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListProps,
} from '@mui/material';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UndecoratedLink } from '@blb-ventures/react-components';
import { MenuRoute } from './navigation-interfaces';
import { FC, Fragment, MouseEvent, useMemo } from 'react';

const StyledLinkListItem = styled(ListItem)`
  &[data-rounded='1'] {
    border-radius: 0 ${props => props.theme.spacing(4)}px ${props => props.theme.spacing(4)}px 0;
  }
  &.menu-active {
    path {
      fill: ${props => props.theme.palette.primary.main} !important;
    }
    span {
      color: ${props => props.theme.palette.primary.main};
    }
    background-color: #007fd726;
    &:hover {
      background-color: #007fd736;
    }
  }
`;

const StyledDivider = styled(Divider)`
  margin: ${props => props.theme.spacing(1, 0)};
`;

export interface SmartMenuProps extends ListProps {
  hasDivider?: boolean;
  menuItems: MenuRoute[];
  rounded?: boolean;
  itemsOnly?: boolean;
  afterClick?: () => any;
}

const handleScrollToEl = (
  elId: string,
  onClick?: (e: MouseEvent) => void,
  afterClick?: (e: MouseEvent) => void
) => (e: MouseEvent) => {
  if (onClick) {
    onClick(e);
  }
  const el = document.getElementById(elId);
  if (el != null) {
    window.scrollTo({ behavior: 'smooth', top: el.offsetTop - 80 });
  }
  if (afterClick) {
    afterClick(e);
  }
};

export const SmartMenu: FC<SmartMenuProps> = ({
  hasDivider,
  menuItems,
  rounded = false,
  itemsOnly,
  afterClick,
  ...props
}) => {
  const { asPath } = useRouter();
  const activeRoute = useMemo(
    () =>
      menuItems.findIndex(
        it =>
          it.url === asPath ||
          (it.startsWith
            ? asPath.startsWith(
                it.url != null ? (typeof it.url === 'string' ? it.url : it.url.pathname || '') : ''
              )
            : false)
      ),
    [menuItems, asPath]
  );

  const menu = useMemo(
    () =>
      menuItems.map((it, idx) => {
        if (it.divider) {
          // eslint-disable-next-line react/no-array-index-key
          return <StyledDivider key={idx} />;
        }
        const content = (
          <StyledLinkListItem
            onClick={
              it.scrollToEl ? handleScrollToEl(it.scrollToEl, it.onClick, afterClick) : it.onClick
            }
            className={it.active || idx === activeRoute ? 'menu-active' : undefined}
            data-rounded={rounded ? 1 : 0}
            disabled={it.disabled}
            data-e2e="smart-menu-list-item"
          >
            {it.icon != null && <ListItemIcon>{it.icon}</ListItemIcon>}
            {it.label != null && (
              <ListItemText
                primary={it.label}
                primaryTypographyProps={it.labelProps}
                secondary={it.subtitle}
              />
            )}
            {it.endIcon?.icon != null && (
              <ListItemSecondaryAction>
                {it.endIcon.onClick ? (
                  // eslint-disable-next-line react/jsx-handler-names
                  <IconButton onClick={it.endIcon.onClick} size="small">
                    {it.endIcon.icon}
                  </IconButton>
                ) : (
                  <Icon>{it.endIcon.icon}</Icon>
                )}
              </ListItemSecondaryAction>
            )}
          </StyledLinkListItem>
        );
        const linkedContent =
          it.url != null ? (
            // eslint-disable-next-line react/no-array-index-key
            <Link key={idx} href={it.url} passHref>
              <UndecoratedLink target={it.external ? '_blank' : undefined}>
                {content}
              </UndecoratedLink>
            </Link>
          ) : (
            content
          );
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`side-menu-item-component-${idx}`}>
            {hasDivider && idx > 0 && <Divider />}
            {linkedContent}
          </Fragment>
        );
      }),
    [menuItems, rounded, afterClick, activeRoute, hasDivider]
  );
  return itemsOnly ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{menu}</>
  ) : (
    <List disablePadding {...props}>
      {menu}
    </List>
  );
};
