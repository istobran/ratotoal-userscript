import styled from '@emotion/styled';
import buttonInactive from './assets/button_inactive.png';
import buttonHover from './assets/button_hover.png';
import buttonActive from './assets/button_active.png';

export const Button = styled.button`
  border: none;
  background: url(${buttonInactive});
  width: 165px;
  height: 55px;
  display: block;
  color: #ff7f00;
  font-weight: bolder;
  font-size: 30px;
  cursor: pointer;
  &:hover, &:active {
    color: #ffffc3;
  }
  &:hover {
    background: url(${buttonHover});
  }
  &:active {
    background: url(${buttonActive});
  }
  &:focus {
    outline: none;
  }
`;
