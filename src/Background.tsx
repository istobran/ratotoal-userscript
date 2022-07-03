import styled from '@emotion/styled';

export const Border = styled.div<{
  width: string;
  color: string;
}>`
  border: ${props => props.width} solid ${props => props.color};
`;

export const LinearBackground = styled.div<{
  start: string;
  end: string;
  direction: string;
}>`
  background: linear-gradient(to ${props => props.direction}, ${props => props.start}, ${props => props.end});
`;
