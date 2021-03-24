import Link from 'next/link';
import { UndecoratedLink } from '../styled-components';
import { isExternal } from '@blb-ventures/library';
import * as React from 'react';

interface OwnProps {
  url: string;
}

export const UrlAction: React.FC<OwnProps> = ({ url, children }) => {
  return isExternal(url) ? (
    <UndecoratedLink href={url} target="_blank" rel="nofollow">
      {children}
    </UndecoratedLink>
  ) : (
    <Link href={url} passHref>
      <UndecoratedLink>{children}</UndecoratedLink>
    </Link>
  );
};
