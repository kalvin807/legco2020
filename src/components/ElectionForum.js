import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import theme from '@/themes';

const ListWrapper = styled.div`
  margin: ${theme.spacing(2)}px 0;
`;

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

const ElectionForum = ({ assets }) => {
  return (
    <ListWrapper>
      {assets.map(asset => {
        return (
          <List
            container
            className="clickable"
            key={asset.id}
            onClick={() => {
              window.open(
                `https://www.youtube.com/watch?v=${asset.asset_id}`,
                '_blank'
              );
            }}
          >
            <Grid item xs={4}>
              <img
                src={`https://i.ytimg.com/vi/${asset.asset_id}/hqdefault.jpg`}
                alt={asset.title}
              />
            </Grid>
            <Grid item xs={8} className="details">
              <Typography variant="h6">{asset.title}</Typography>
            </Grid>
          </List>
        );
      })}
    </ListWrapper>
  );
};

export default ElectionForum;
