import React from "react"
import Layout from "@/components/layout"
import { Container, Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"

const CandidatesWrapper = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(1)}px;
  grid-template-columns: repeat(3, 1fr);

  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-end;

    .avatar.DEMO {
      border: 3px ${theme.palette.warning.main} solid;
    }
  
    .avatar.BEIJING {
      border: 3px ${theme.palette.info.main} solid;
    }
    
    .title {
      font-size: 12px;
      text-align: center;
    }
  }

`

const ConstituencyTemplate = ({ data: { allCandidates }, pageContext: { constituency } }) => {
  const candidates = allCandidates.edges.filter(c => c.node.constituency === constituency.key)
  const { t } = useTranslation()

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="caption">{t("no_of_seats", { seats: constituency.seats })}</Typography>
        <Typography variant="h2">{constituency.name_zh}</Typography>
        <Typography variant="body1" color="textSecondary">{t("expected_list")}</Typography>
        <Grid container spacing={3}>
          {
            ["DEMO", "BEIJING"].map(camp => <Grid item xs={6}>
              <CandidatesWrapper>
                {
                  candidates.filter(c => c.node.camp === camp).map(c => {
                    return (
                      <div 
                        className="avatar-group"
                        onClick={() => {
                          navigate(`/candidate/${c.node.name_zh}`)
                        }}
                        >
                        <Avatar className={`avatar ${camp}`} alt={c.node.name_zh} src={c.image_url} />
                        <span className="title">{c.node.name_zh}</span>
                      </div>
                    )
                  })
                }
              </CandidatesWrapper>
            </Grid>)
          }
        </Grid>
      </Container>
    </Layout>
  )
}

export default ConstituencyTemplate

export const ConstituencyTemplateQuery = graphql`
  query {
    allCandidates {
      edges {
        node {
          constituency
          camp
          status
          name_zh
        }
      }
    }
  }
`

