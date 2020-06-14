import React from "react"
import Layout from "@/components/layout"
import { Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"
import { DC2019Result } from "@/data/ElectionResults"
import VoteVsSeatChart from "@/components/charts/VoteVsSeat"
import { calculateSeatBox } from "@/utils"

const GeoHeader = styled(Grid)`

  .title-box {
    margin-right: ${theme.spacing(3)}px;
  }
  }
  .title {
    font-size: 24px;
    font-weight: 700;
  }
`

const CampWrapper = styled(Grid)`
  .list-number {
    font-size: 32px;
    font-weight: 900;
  }

  .right {
    text-align: right;
  }

  .camp-text {
    padding: 3px 5px;
    font-weight: 700;
  }

  .camp-text.demo {
    background: ${theme.palette.warning.light};
  }

  .camp-text.beijing {
    background: ${theme.palette.info.light};
  }

  .camp-text.other {
    background: ${theme.palette.success.light};
  }
`

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

    ${theme.breakpoints.up('sm')} {
      .avatar {
        width: 48px;
        height: 48px;
      }
    }
    
    ${theme.breakpoints.up('md')} {
      .avatar {
        width: 64px;
        height: 64px;
      }
    }

    .avatar.demo {
      border: 3px ${theme.palette.warning.main} solid;
    }
  
    .avatar.beijing {
      border: 3px ${theme.palette.info.main} solid;
    }

    .avatar.other {
      border: 3px ${theme.palette.success.main} solid;
    }
    
    .center {
      font-size: 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`

const People = props => {
  const { info } = props
  return (
    <div
      className="avatar-group clickable"
      onClick={() => {
        navigate(`/profile/${info.name_zh}`)
      }}
      onKeyDown={() => {}}
    >
      <div className="center">
        <Avatar className={`avatar ${info.camp.toLowerCase()}`} alt={info.name_zh} src={info.img_url} />
        <span>{`${info.name_zh}${info.primary === "FALSE" ? "*" : ""}`}</span>
      </div>
    </div>
  )
}

const GeoFuncDc2ConstituencyTemplate = ({ pageContext: { constituency, candidates } }) => {
  const { t } = useTranslation()

  const demoCandidates = candidates.filter(c => c.node.camp === "DEMO")
  const beijingCandidates = candidates.filter(c => c.node.camp === "BEIJING")
  const otherCandidates = candidates.filter(c => c.node.camp === "OTHER")

  return (
    <Layout>
      <GeoHeader
        container
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            className="title-box"
          >
            <Typography variant="body2" color="textSecondary">{t("no_of_seats", { seats: constituency.seats })}</Typography>
            <div className="title">{constituency.name_zh}</div>
          </Grid>
        </Grid>
        <Grid item>
          <VoteVsSeatChart
            title={{
                vote: t("dc2019_demo_beijing_ratio"),
                seat: t("simulation_result"),
              }}
            votes={DC2019Result[constituency.key].votes}
            seats={calculateSeatBox(constituency)}
          />
        </Grid>
      </GeoHeader>
      <Typography className="block" variant="body2">{constituency.description_zh}</Typography>
      <CampWrapper container spacing={3}>
        <Grid item xs={6}>
          <div>
            <div><span className="camp-text demo">{t("alias.DEMO")}</span></div>
            <div className="list-number">{demoCandidates.length}</div>
            <Typography variant="caption">有意出選名單</Typography>
            <CandidatesWrapper>
              {
                demoCandidates.map(c => <People key={c.node} info={c.node} />)
              }
            </CandidatesWrapper>
          </div>
          <Typography variant="caption">* 表明不參加民主派初選</Typography>
        </Grid>
        <Grid item xs={6}>
          <div className="right">
            <div><span className="camp-text beijing">{t("alias.BEIJING")}</span></div>
            <div className="list-number">{beijingCandidates.length}</div>
            <Typography variant="caption">有意出選名單</Typography>
            <CandidatesWrapper mt={2}>
              {
                beijingCandidates.map(c => <People key={c.node} info={c.node} />)
              }
            </CandidatesWrapper>
          </div>
          {otherCandidates.length ? (
            <div className="right">
              <div><span className="camp-text other">{t("alias.OTHER")}</span></div>
              <Typography variant="caption">有意出選名單</Typography>
              <CandidatesWrapper>
                {
                otherCandidates.map(c => <People key={c.node} info={c.node} />)
              }
              </CandidatesWrapper>
            </div>
        ) : ''}
        </Grid>
      </CampWrapper>
      <CampWrapper container spacing={3}>
        {
          ["DEMO", "BEIJING"].map(camp => {
            return (
              <Grid item xs={6} key={camp}>
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
            )
          })
        }
      </CampWrapper>
      <CampWrapper container spacing={3}>
        {
          ["DEMO", "BEIJING"].map(camp => {
            return (
              <Grid item xs={6} key={camp}>
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
            )
          })
        }
      </CampWrapper>
    </Layout>
  )
}

export default GeoFuncDc2ConstituencyTemplate