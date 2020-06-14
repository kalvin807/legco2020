import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { FaGithub, FaFacebook } from "react-icons/fa"
import { openInNewTab } from "@/utils"

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    marginTop: "auto",
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
  },
  noStyle: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
  text: {
    fontSize: 12,
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <div position="static" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" className={classes.title}>
              Vote4.hk 投票指南
            </Typography>
            <div className={classes.text}>
              <p>
                敝網站與任何2020年立法會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。
              </p>
              <p>敝網站所刊載資訊全為公開資料，刊載前已盡力確保資料真確性。</p>
            </div>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <FaGithub
                  className="clickable"
                  onClick={() =>
                    openInNewTab("https://github.com/vote4hk/legco2020")
                  }
                />
              </Grid>
              <Grid item>
                <FaFacebook
                  className="clickable"
                  onClick={() => openInNewTab("https://fb.me/vote4hongkong")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" className={classes.subtitle}>
              其他網站
            </Typography>
            <div className={classes.text}>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://covid19.vote4.hk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  武漢肺炎民間資訊
                </a>
              </p>
              <p>
                <a
                  className={classes.noStyle}
                  href="http://dce2019.vote4.hk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2019 區議會投票指南
                </a>
              </p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
