import React, { FC, PropsWithChildren } from 'react';
import { HeaderProps } from './header';

export function CountCart({ cart }: HeaderProps) {
  return <div className="header-count">Cart total: ${cart}</div>;
}
