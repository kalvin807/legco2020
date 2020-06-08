import React, { useState } from "react"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { graphql, navigate } from "gatsby"
import SingleStackedBarChart from "@/components/charts/SingleStackedBar"
import SeatRowChart from "@/components/charts/SeatRow"
import FCStackedBarChart from "@/components/charts/FCStackedBar"
import theme from "@/themes"
import { Typography, Collapse, useMediaQuery, Grid } from "@material-ui/core"
import SimpleTabs from "@/components/SimpleTabs"
import styled from "styled-components"
import { useTranslation } from "react-i18next" 
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { PastElectionResult } from "@/data/ElectionResults"

const FullWidithWrapper = styled.div`
  margin: 0 -${theme.spacing(2)}px;
`

const Container = styled.div`
  margin: 0 ${theme.spacing(2)}px;
`

const DirectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.spacing(1)}px;

  .seat {
    padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
    border-radius: 2px;
    box-shadow: 0 1px 6px 0 ${theme.palette.divider};
    cursor: pointer;
    
    .title {
      display: flex;
      justify-content: space-between;
    }

    .sub-title {
      font-size: 0.65rem;
    }

    .roundup-title {
      margin-top: ${theme.spacing(0.5)}px;
      display: flex;
      justify-content: space-between;
    }

    .roundup-title div {
      line-height: 0.5;
    }

    .roundup-title div:last-child {
      text-align: right;
    }

    .roundup {
      display: flex;
      justify-content: space-between;
      line-height: 1.2;
    }

    .large-number {
      font-size: 2rem;
      font-weight: 900;
    }
    
    .demo {
      text-align: left;
      color: ${theme.palette.warning.main};
    }

    .beijing {
      text-align: right;
      color: ${theme.palette.info.main};
    }

    .moderate {
      color: ${theme.palette.success.main};
    }
  }
`

const TradFCWrapper = styled.div`

  .seat-group {
    display: grid;
    grid-gap: ${theme.spacing(1)}px;
  }

  .group-title {
    font-weight: 500;
    margin: ${theme.spacing(1.5)}px 0;
  }

  .fierce, .compatible {
    grid-template-columns: repeat(1, 1fr);
  }

  .foreseeable, .uncontested {
    grid-template-columns: repeat(2, 1fr);
  }

  .seat {
    padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
    border-radius: 2px;
    box-shadow: 0 1px 6px 0 ${theme.palette.divider};
    cursor: pointer;
    
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 0;
    }

  }


  .seat.demo {
    border-top: 3px ${theme.palette.warning.main} solid;
  }

  .seat.beijing {
    border-top: 3px ${theme.palette.info.main} solid;
  }
`

const ExpandButton = styled.div`
  text-align: center;
`

const seatColorMapping = {
  FC_EXPECTED_WIN_DEMO: theme.palette.warning.main,
  GC_EXPECTED_WIN_DEMO: theme.palette.warning.light,
  GC_EXPECTED_WIN_MODERATE: theme.palette.success.main,
  FC_EXPECTED_WIN_MODERATE: theme.palette.success.main,
  UNRESOLVED: theme.palette.divider,
  GC_EXPECTED_WIN_BEIJING: theme.palette.info.light,
  FC_EXPECTED_WIN_BEIJING: theme.palette.info.main,
}

const IndexPage = props => {
  const { data: { allGeoFuncDc2, allTradFunc } } = props
  const [ showSeatHistory, setShowSeatHistory ] = useState(false)
  const seat = [...Array.from(allGeoFuncDc2.nodes), ...Array.from(allTradFunc.nodes)]
  
  const { t } = useTranslation()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  // group data for chart
  let seatCount = {
    UNRESOLVED: 70
  }

  seat.forEach(seat => {
    Object.keys(seat).filter(k => k.includes('expected')).map(key => {
      const seatType = `${seat.type}_${key}`.toUpperCase()
      if (typeof seatCount[seatType] === 'undefined') {
        seatCount[seatType] = Number(seat[key])
      } else {
        seatCount[seatType] += Number(seat[key])
      }
      seatCount['UNRESOLVED'] -= Number(seat[key])
    })
  });


  // Build chart data
  const chartData = Object.keys(seatColorMapping).map(scm => ({
    key: scm,
    label: t(`stackedBar.${scm}`),
    value: seatCount[scm],
    color: seatColorMapping[scm]
  }))

  // Build chart data
  let summary = {
    DEMO: {
      name: t(`alias.DEMO`),
      pos: 'start',
      total: 0,
      background: theme.palette.warning.light
    },
    BEIJING: {
      name: t(`alias.BEIJING`),
      pos: 'end',
      total: 0,
      background: theme.palette.info.light
    }
  }

  chartData.forEach(c => {
    if (c.key.includes('DEMO')) {
      summary['DEMO'].total += c.value
    }
    if (c.key.includes('BEIJING')) {
      summary['BEIJING'].total += c.value
    }
  })

  const renderDirect = edges => {
    return (
      <DirectWrapper>
        {edges.sort((a, b) => {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
        }).map((e, i) => {
          const expectedWinDemo = Number(e.expected_win_demo) || 0
          const unresolvedSeats = Number(e.unresolved_seats) || 0
          const expectedWinBeijing = Number(e.expected_win_beijing) || 0

          const candiBeijing = Number(e.candidates_beijing) || 0
          const candiModerate = Number(e.candidates_moderate) || 0
          const candiDemo = Number(e.candidates_demo) || 0
          
          const expectedResultRows = [
            ...[...Array(expectedWinDemo).keys()].map((d, i) => ({
              color: seatColorMapping['GC_EXPECTED_WIN_DEMO']
            })),
            ...[...Array(unresolvedSeats).keys()].map((d, i) => ({
              color: seatColorMapping['UNRESOLVED']
            })),
            ...[...Array(expectedWinBeijing).keys()].map((d, i) => ({
              color: seatColorMapping['GC_EXPECTED_WIN_BEIJING']
            })),
          ]
          return (
            <div key={i} className="seat" onClick={() => {
              navigate(
                `/constituency/${e.key}`
              )
            }}>
              <div className="title">
                  <Typography variant="caption" color="textSecondary">{t("no_of_seats", { seats: e.seats })}</Typography>
                  <div className="sub-title">{t("estimated_result")}</div>
              </div>
              <div className="title">
                <div>
                  <Typography variant="h5">{e.alias_zh}</Typography>
                </div>
                <div>
                  <div style={{ width: "40px", height: "40px" }} >
                    <SeatRowChart width={40} height={40} data={expectedResultRows} />
                  </div>
                </div>
              </div>
              <div className="roundup-title">
                <div>
                  <Typography variant="caption">{t("alias.DEMO")}</Typography>
                  <div className="sub-title">{t("intented_list")}</div>
                </div>
                <div>
                  <Typography variant="caption">{t("alias.BEIJING")}</Typography>
                  <div className="sub-title">{t("intented_list")}</div>
                </div>
              </div>
              <div className="roundup">
              <div className="large-number demo">{candiDemo || "-"}</div>
                <div>
                  <Typography variant="body1" color="textSecondary">vs</Typography>
                </div>
                {candiModerate ? <>
                <div className="large-number moderate">{candiModerate || "-"}</div>
                <div>
                  <Typography variant="body1" color="textSecondary">vs</Typography>
                </div>
                </> : 
                ''}
                <div className="large-number beijing">{candiBeijing || "-"}</div>
              </div>
            </div>
          )
        })}
      </DirectWrapper>
    )
  }

  const renderTradFC = edges => {

    const grouppedFc = edges.reduce((a, c) => {
      const idx = a.findIndex(a => a.title === t(c.situation))
      if (idx < 0) {
        return [...a, {
          key: c.key,
          title: t(c.situation),
          situation: c.situation,
          order: c.situation_order,
          content: [c]
        }]
      }
  
      a[idx].content.push(c)
      return a
    }, [])

    return (
      <TradFCWrapper>
        {grouppedFc.sort((a, b) => {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
        }).map(group => {

          return (
            <>
              <div className="group-title">{t("no_of_seats_fc", { title: group.title, seats: group.content.length } )}</div>
              <div className={`seat-group ${group.situation}`}>
                {
                  group.content.map((c, i) => {

                    const expectedWinDemo = Number(c.expected_win_demo) || 0
                    const unresolvedSeats = Number(c.unresolved_seats) || 0
                    const expectedWinBeijing = Number(c.expected_win_beijing) || 0

                    return (
                      <div 
                        key={i} 
                        className={`seat ${expectedWinDemo > expectedWinBeijing ? "demo" : ( expectedWinDemo < expectedWinBeijing ? "beijing" : "")}`}
                        onClick={() => {
                          navigate(
                            `/constituency/${c.key}`
                          )
                        }}>
                        <Typography variant="caption" color="textSecondary">{t(`electors_composition_${c.electors_composition}`)}</Typography>
                        <Typography variant="h5">{c.name_zh}</Typography>
                        <Typography variant="body2">親中 - 民主 = {c.last_election_vote_beijing_minus_demo}</Typography>
                        <Typography variant="body2">新增選民 + 上屆未投票 = {Number(c.electors_total_2020) - Number(c.electors_total_2016) + Number(c.electors_total_2016) - Number(c.last_election_voted_count)}</Typography>
                        {/* <FCStackedBarChart data={{
                            electors_total_2020: Number(c.electors_total_2020),
                            electors_total_2016: Number(c.electors_total_2016),
                            last_election_vote_beijing_minus_demo: Number(c.last_election_vote_beijing_minus_demo),
                            last_election_voted_count: Number(c.last_election_voted_count)
                        }}/> */}
                      </div>
                    )
                  })
                }
              </div>
            </>
          )
        })}
      </TradFCWrapper>
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
      <FullWidithWrapper>
        <SingleStackedBarChart data={chartData} summary={summary} />
      <ExpandButton onClick={() => setShowSeatHistory(!showSeatHistory)}>
        {showSeatHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ExpandButton>
      <Collapse in={showSeatHistory} timeout={100}>
        {
          PastElectionResult.map(r => <>
          <Typography variant="body1" style={{ textAlign: "center"}}>{r.year}</Typography>
          <SingleStackedBarChart data={r.result} summary={r.summary} />
          </>)
        }
      </Collapse>
      {isDesktop ? <Grid container spacing={3}>
        <Grid item xs={6}>
        <Typography variant="h5">{t(`geo_func_dc2`)}</Typography>
          {renderDirect(allGeoFuncDc2.nodes)}
        </Grid>
        <Grid item xs={6}>
        <Typography variant="h5">{t(`trad_func`)}</Typography>
          {renderTradFC(allTradFunc.nodes)}
        </Grid>
      </Grid> : <SimpleTabs
        tabs={[
          {
            name: `geo_func_dc2`,
            title: t(`geo_func_dc2`),
            content: <Container>{renderDirect(allGeoFuncDc2.nodes)}</Container>,
          },
          {
            name: `trad_func`,
            title: t(`trad_func`),
            content: <Container>{renderTradFC(allTradFunc.nodes)}</Container>,
          }
        ]}
        onTabChange={name => {
          // trackCustomEvent({
          //   category: "news",
          //   action: "tab_select",
          //   label: name,
          // })
        }}
      />}
      
      </FullWidithWrapper>
    </Layout>
  )

}

export default IndexPage

export const IndexPageQuery = graphql`
  query {
    allGeoFuncDc2 {
      nodes {
        key
        type
        order
        seats
        situation
        situation_order
        name_zh
        name_en
        alias_zh
        alias_en
        seats
        unresolved_seats
        expected_win_demo
        expected_win_beijing
        expected_win_moderate
        candidates_demo
        candidates_beijing
        candidates_moderate
      }
    }
    allTradFunc {
      nodes {
        key
        type
        order
        seats
        electors_composition
        electors_total_2016
        electors_total_2020
        last_election_vote_beijing_minus_demo
        last_election_voted_count
        situation
        situation_order
        candidates_beijing
        candidates_demo
        candidates_moderate
        unresolved_seats
        expected_win_beijing
        expected_win_demo
        expected_win_moderate
        name_zh
        name_en
        alias_zh
        alias_en
      }
    }
  }
`