import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts({ ...props }) {
  const classes = useStyles();
  const { severity, action, children } = props;

  return (
    <div className={classes.root}>
      <Alert severity={severity} action={action}>
        {children}
      </Alert>
    </div>
  );
}
