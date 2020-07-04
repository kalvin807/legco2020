import React from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';

const StyledTooltip = styled(Tooltip)`
  & .tooltip {
    background-color: ${props => props.theme.palette.background.default};
    color: rgba(0, 0, 0, 0.87);
    font-size: 16px;
    border-radius: 14px;
    padding: 10px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  }
`;

export const DefaultTooltip = props => {
  const { placement, className } = props;
  const theme = useTheme();
  return (
    <StyledTooltip
      placement={placement || 'bottom-start'}
      classes={{ popper: className, tooltip: 'tooltip' }}
      theme={theme}
      {...props}
    />
  )
}