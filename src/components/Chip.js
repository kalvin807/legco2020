import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    borderColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
  },
}));

export default function OutlinedChips({ label, variant, size = 'medium' }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        className={classes.chip}
        label={label}
        variant={variant}
        size={size}
      />
    </div>
  );
}
