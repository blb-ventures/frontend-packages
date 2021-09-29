import * as React from 'react';
import styled from '@emotion/styled';
import { SmartMenu } from './smart-menu';
import { MenuRoute } from './navigation-interfaces';

const FixedMenu = styled.nav<{ menuWidth?: number; $sticky?: boolean }>`
  position: ${props => (props.$sticky ? 'sticky' : 'fixed')};
  top: ${props => props.theme.spacing(8)}px;
  left: 0;

  width: ${props => props.menuWidth ?? 240}px;
  height: 100%;

  padding-top: ${props => props.theme.spacing(4)}px;
  padding-right: ${props => props.theme.spacing(2)}px;

  background-color: white;
  box-shadow: 3px 0px 6px rgb(0 0 0 / 30%);

  ${props => props.theme.breakpoints.down('sm')} {
    display: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }
`;

const ContentWrapper = styled.main<{ menuWidth?: number; $sticky?: boolean }>`
  flex: ${props => (props.$sticky ? 1 : 'none')};
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: ${props => (props.$sticky ? 0 : props.menuWidth ?? 240)}px;
  }
`;

const ContentContainer = styled.div<{ menuWidth?: number; $sticky?: boolean }>`
  box-sizing: content-box;
  max-width: 690px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(0, 2)};
  ${props => props.theme.breakpoints.up('md')} {
    max-width: ${props => (props.menuWidth ?? 240) + 960}px;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 960px;
`;

interface SidebarProps {
  menuItems: MenuRoute[];
  menuWidth: number;
  sticky?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  children,
  sticky,
  menuWidth,
  className,
}) => {
  return (
    <div className={className}>
      <FixedMenu $sticky={sticky} menuWidth={menuWidth}>
        <SmartMenu menuItems={menuItems} rounded />
      </FixedMenu>
      <ContentWrapper $sticky={sticky} menuWidth={menuWidth}>
        <ContentContainer menuWidth={menuWidth}>
          <MaxWidthContainer>{children}</MaxWidthContainer>
        </ContentContainer>
      </ContentWrapper>
    </div>
  );
};
