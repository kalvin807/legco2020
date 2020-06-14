import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: 'auto',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
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
        <Typography variant="h6" className={classes.title}>Vote4.hk 投票指南</Typography>
        <p className={classes.text}>敝網站與任何2020年立法會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。</p>
        <p className={classes.text}>敝網站所刊載資訊全為公開資料，刊載前已盡力確保資料真確性。</p>
      </Container>
    </div>
  )
}