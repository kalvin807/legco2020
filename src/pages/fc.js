import React from "react"
import styled from 'styled-components';
import Layout from "@/components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import theme from "@/themes"

const mapCampColor = {
  'DEMO': theme.palette.warning.main,
  'BEIJING': theme.palette.info.main,
  'OTHER': theme.palette.success.main,
}

const AvatarContainer = styled(Grid)`
  margin-right: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(1)}px;

  .avatar {
    width: 64px;
    height: 64px;
    border: 3px ${props => mapCampColor[props.camp]} solid;
  }

  .name {
    fontSize: ${theme.typography.body1};
    marginTop: ${theme.spacing(1)}px;
  }

  .hint {
    fontSize: ${theme.typography.caption};
  }
`

const AvatarChart = props => {
  const { content } = props
  return <Grid container>
  {
   content.map((c, i) => <AvatarContainer item key={i} camp={c.camp}>
      <Grid container direction='column' alignItems='center'>
        <Avatar className='avatar' alt={c.alias_zh} src={c.image_url} />
        <span className='title'>{c.alias_zh}</span>
        <span className='hint'>{c.councillor_name_zh}</span>
      </Grid>
    </AvatarContainer>)
  }

</Grid>
}

const FcPage = props => {
  const { data: { allFcOverview: { edges: fc } } } = props

  const grouppedFc = fc.reduce((a, c) => {
    const { node } = c
    const idx = a.findIndex(a => a.title === node.chance_zh)
    if (idx < 0) {
      return [...a, {
        title: node.chance_zh,
        order: node.chance_order,
        content: [node]
      }]
    }

    a[idx].content.push(node)
    return a
  }, [])

  return (
    <Layout>
      <Container maxWidth="lg">
      <SEO title="FC" />
      <Typography variant="h5" gutterBottom>當民主陣營談35+，究竟機會有多大？</Typography>
      <Typography variant="h5" gutterBottom>{`功能組別：${grouppedFc.filter(g => g.order <= 2).reduce((a, c) => a + c.content.length, 0)}席 - ${grouppedFc.filter(g => g.order <= 3).reduce((a, c) => a + c.content.length, 0)}席`}</Typography>
      {grouppedFc.sort((a, b) => a.order - b.order).map(group => {
        return (
          <Grid key={group.title} container spacing={3}>
            <Grid item xs={12}>
              <Container disableGutters>
                <Typography variant="h5" gutterBottom>{`${group.title} (${group.content.length})`}</Typography>
                <AvatarChart content={group.content} />
              </Container>
            </Grid>
          </Grid>
        )
      })}
      </Container>
    </Layout>
  )

}

export default FcPage

export const FcOverviewPageQuery = graphql`
  query {
    allFcOverview {
      edges {
        node {
          councillor_name_zh
          councillor_name_en
          alias_zh
          alias_en
          chance_order
          chance_zh
          camp
          image_url
        }
      }
    }
  }
`