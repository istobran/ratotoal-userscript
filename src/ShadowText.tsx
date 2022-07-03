import type { ReactNode } from 'react';
import * as React from 'react';
import styled from '@emotion/styled';

const StyledText = styled.span`
  text-shadow: 1px 1px 0 #000,
  -1px 1px 0 #000,
    1px -1px 0 #000,
    -1px -1px 0 #000,
  0px 1px 0 #000,
    0px -1px 0 #000,
  -1px 0px 0 #000,
  1px 0px 0 #000,
  2px 2px 0 #000,
  -2px 2px 0 #000,
    2px -2px 0 #000,
    -2px -2px 0 #000,
  0px 2px 0 #000,
    0px -2px 0 #000,
  -2px 0px 0 #000,
  2px 0px 0 #000,
  1px 2px 0 #000,
  -1px 2px 0 #000,
    1px -2px 0 #000,
    -1px -2px 0 #000,
  2px 1px 0 #000,
  -2px 1px 0 #000,
    2px -1px 0 #000,
    -2px -1px 0 #000;
`;

export function ShadowText(props: { children?: ReactNode }) {
  return <StyledText>{props.children}</StyledText>
}
