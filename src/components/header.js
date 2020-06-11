import React from "react"
import { navigate } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
    flexGrow: 1,
  },
  toolBar: {
    padding: 0,
    margin: 0,
  },
  menuButton: {
  },
  title: {
    flexGrow: 1,
  },
}));

const renderTitle = () => {
  return { __html: `vote 4 <br />hongkong` }
}

export default function Header(props) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolBar}>
        <Typography 
          variant="h1" 
          className={`${classes.title} clickable`}
          dangerouslySetInnerHTML={renderTitle()} 
          onClick={() => {
            navigate(`/`)
          }} />
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}