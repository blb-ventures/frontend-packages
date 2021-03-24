import * as React from 'react';
import styled from 'styled-components';
import { ScrollspyProps } from 'react-scrollspy';
import { SmartMenu } from './smart-menu';
import { MenuRoute } from '@web/modules/common/components/navigation/navigation-interfaces';

const FixedMenu = styled.nav.attrs((attrs: { menuWidth: number; $sticky?: boolean }) => ({
  menuWidth: attrs.menuWidth || 240,
  $sticky: attrs.$sticky,
}))`
  position: ${props => (props.$sticky ? 'sticky' : 'fixed')};
  top: ${props => props.theme.spacing(8)}px;
  left: 0;

  width: ${props => props.menuWidth}px;
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

const ContentWrapper = styled.main.attrs((attrs: { menuWidth: number; $sticky?: boolean }) => ({
  menuWidth: attrs.menuWidth || 240,
  $sticky: attrs.$sticky,
}))`
  flex: ${props => (props.$sticky ? 1 : 'none')};
  ${props => props.theme.breakpoints.up('md')} {
    margin-left: ${props => (props.$sticky ? 0 : props.menuWidth)}px;
  }
`;

const ContentContainer = styled.div.attrs((attrs: { menuWidth: number }) => ({
  menuWidth: attrs.menuWidth || 240,
}))`
  box-sizing: content-box;
  max-width: 690px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing(0, 2)};
  ${props => props.theme.breakpoints.up('md')} {
    max-width: ${props => props.menuWidth + 960}px;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 960px;
`;

interface SidebarProps {
  menuItems: MenuRoute[];
  menuWidth: number;
  scrollSpy?: Partial<ScrollspyProps>;
  sticky?: boolean;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  scrollSpy,
  children,
  sticky,
  menuWidth,
  className,
}) => {
  return (
    <div className={className}>
      <FixedMenu $sticky={sticky} menuWidth={menuWidth}>
        <SmartMenu scrollSpy={scrollSpy} menuItems={menuItems} rounded />
      </FixedMenu>
      <ContentWrapper $sticky={sticky} menuWidth={menuWidth}>
        <ContentContainer menuWidth={menuWidth}>
          <MaxWidthContainer>{children}</MaxWidthContainer>
        </ContentContainer>
      </ContentWrapper>
    </div>
  );
};
