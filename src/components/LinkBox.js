import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import theme from '@/themes';

const List = styled(Grid)`
  margin: ${theme.spacing(2)}px 0;
  box-shadow: 0 1px 6px 0 ${theme.palette.divider};
  line-height: 0;

  .details {
    padding-left: ${theme.spacing(1.5)}px;
    padding-right: ${theme.spacing(1.5)}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    width: 100%;
  }
`;

export const CompactImageLinkBox = ({ onClick, image, title, subTitle }) => {
  return (
    <List container className="clickable" key={title} onClick={onClick}>
      <Grid item xs={4}>
        {image}
      </Grid>
      <Grid item xs={8} className="details">
        {subTitle && (
          <Typography variant="caption" color="textSecondary">
            {subTitle}
          </Typography>
        )}
        <Typography variant="h6">{title}</Typography>
      </Grid>
    </List>
  );
};
