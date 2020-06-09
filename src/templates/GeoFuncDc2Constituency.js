import React from "react"
import Layout from "@/components/layout"
import { Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"

const CandidatesWrapper = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(1)}px;
  grid-template-columns: repeat(3, 1fr);

  ${theme.breakpoints.up('sm')} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${theme.breakpoints.up('md')} {
    grid-template-columns: repeat(6, 1fr);
  }

  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-end;
    cursor: pointer;

    .avatar.demo {
      border: 3px ${theme.palette.warning.main} solid;
    }
  
    .avatar.beijing {
      border: 3px ${theme.palette.info.main} solid;
    }

    .avatar.other {
      border: 3px ${theme.palette.success.main} solid;
    }
    
    .title {
      font-size: 12px;
      text-align: center;
    }
  }
`

const GeoFuncDc2ConstituencyTemplate = ({ data: { allPeople }, pageContext: { constituency, candidates } }) => {
  const { t } = useTranslation()

  return (
    <Layout>
        <Typography variant="caption">{t("no_of_seats", { seats: constituency.seats })}</Typography>
        <Typography variant="h2">{constituency.name_zh}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
              <div>
                <Typography>有意出選：{candidates.filter(c => c.node.camp === "DEMO").length}張名單</Typography>
                <CandidatesWrapper>
                  {
                    candidates.filter(c => c.node.camp === "DEMO").map(c => {
                      return (
                        <div 
                          className="avatar-group"
                          onClick={() => {
                            navigate(`/person/${c.node.name_zh}`)
                          }}
                          >
                          <Avatar className={`avatar ${"DEMO".toLowerCase()}`} alt={c.node.name_zh} src={c.image_url} />
                          <span className="title">{c.node.name_zh}</span>
                        </div>
                      )
                    })
                  }
                </CandidatesWrapper>
              </div>
          </Grid>
          <Grid item xs={6}>
            <div>
                <Typography>有意出選：{candidates.filter(c => c.node.camp === "BEIJING").length}張名單</Typography>
                <CandidatesWrapper>
                  {
                    candidates.filter(c => c.node.camp === "BEIJING").map(c => {
                      return (
                        <div 
                          className="avatar-group"
                          onClick={() => {
                            navigate(`/person/${c.node.name_zh}`)
                          }}
                          >
                          <Avatar className={`avatar ${"BEIJING".toLowerCase()}`} alt={c.node.name_zh} src={c.image_url} />
                          <span className="title">{c.node.name_zh}</span>
                        </div>
                      )
                    })
                  }
                </CandidatesWrapper>
              </div>
             {candidates.filter(c => c.node.camp === "OTHER").length ? <div>
                <Typography>有意出選：{candidates.filter(c => c.node.camp === "OTHER").length}張名單</Typography>
                <CandidatesWrapper>
                  {
                    candidates.filter(c => c.node.camp === "OTHER").map(c => {
                      return (
                        <div 
                          className="avatar-group"
                          onClick={() => {
                            navigate(`/person/${c.node.name_zh}`)
                          }}
                          >
                          <Avatar className={`avatar ${"OTHER".toLowerCase()}`} alt={c.node.name_zh} src={c.image_url} />
                          <span className="title">{c.node.name_zh}</span>
                        </div>
                      )
                    })
                  }
                </CandidatesWrapper>
                </div> : ''}
          </Grid>
       </Grid>
       <Grid container spacing={3}>
          {
            ["DEMO", "BEIJING"].map(camp => {
              return (
                  <>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      名單協調方法
                    </Typography>

                    <Typography variant="body1">
                      {constituency[`stage_1_title_${camp.toLowerCase()}_zh`]}
                    </Typography>

                    <Typography variant="body1">
                      {constituency[`stage_1_description_${camp.toLowerCase()}_zh`]}
                    </Typography>
                </Grid>
                  </>
              )
            })
          }
        </Grid>
        <Grid container spacing={3}>
          {
            ["DEMO", "BEIJING"].map(camp => {
              return (
                  <>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      配票方法
                    </Typography>

                    <Typography variant="body1">
                      {constituency[`stage_2_title_${camp.toLowerCase()}_zh`]}
                    </Typography>

                    <Typography variant="body1">
                      {constituency[`stage_2_description_${camp.toLowerCase()}_zh`]}
                    </Typography>
                </Grid>
                  </>
              )
            })
          }
        </Grid>
    </Layout>
  )
}

export default GeoFuncDc2ConstituencyTemplate

export const GeoFuncDc2ConstituencyTemplateQuery = graphql`
  query {
    allPeople {
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

