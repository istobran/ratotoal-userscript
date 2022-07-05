import * as React from 'react';
import { useState } from 'react';
import { useInterval } from 'react-use';
import starLight from './assets/star_light.png';
import starDark from './assets/star_dark.png';
import styled from '@emotion/styled';

const StyledLoading = styled.div`
  img + img {
    margin-left: 10px;
  }
`;

export function Loading(props: { loading?: boolean }) {
  const [active, setActive] = useState(0);
  useInterval(() => {
    setActive((active + 1) % 5);
  }, props.loading ? 300 : null);
  return (
    <StyledLoading>
      {new Array(5).fill(1).map((_, index) => <img
        key={index}
        src={active === index ? starLight : starDark}
        alt="star_dark"/>)}
    </StyledLoading>
  )
}
