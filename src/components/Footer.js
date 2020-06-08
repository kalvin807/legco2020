import React from "react"
import { navigate } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: 'auto',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  text: {
    fontSize: 12,
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div position="static" className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h6">Vote4HK 投票指南</Typography>
        <p className={classes.text}>本網站與任何2019年區議會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。</p>
      </Container>
    </div>
  )
}