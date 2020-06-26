import React from 'react';
import Grid from '@material-ui/core/Grid';

const List = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {children.map(child => (
        <Grid item xs={12} sm={6} md={4}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default List;
