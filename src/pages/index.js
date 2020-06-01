import React, { useState } from "react"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { graphql, navigate } from "gatsby"
import SingleStackedBarChart from "@/components/charts/SingleStackedBar"
import SeatRowChart from "@/components/charts/SeatRow"
import theme from "@/themes"
import { Typography, Collapse } from "@material-ui/core"
import SimpleTabs from "@/components/SimpleTabs"
import styled from "styled-components"
import { useTranslation } from "react-i18next" 
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { PastElectionResult } from "@/data/ElectionResults"

const DirectWrapper = styled.div`
  margin: 0 ${theme.spacing(2)}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.spacing(1)}px;

  .seat {
    padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
    border-radius: 2px;
    box-shadow: 0 1px 6px 0 ${theme.palette.divider};
    
    .title {
      display: flex;
      justify-content: space-between;
      line-height: 0;
    }

    .sub-title {
      font-size: 0.65rem;
    }

    .roundup {
      display: flex;
      justify-content: space-between;
      line-height: 1.5rem;
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
  }
`

const TradFCWrapper = styled.div`
  margin: 0 ${theme.spacing(2)}px;

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
  const { data: { allConstituencies :{ edges: seats }, allConstituenciesByMethod: { group: constituenciesByMethod } } } = props
  const [ showSeatHistory, setShowSeatHistory ] = useState(false)

  const { t } = useTranslation()
  // group data for chart
  let seatCount = {
    UNRESOLVED: 70
  }
  seats.forEach(seat => {
    const { node } = seat
    Object.keys(node).filter(k => k.includes('expected')).map(key => {
      const seatType = `${node.type}_${key}`.toUpperCase()
      if (typeof seatCount[seatType] === 'undefined') {
        seatCount[seatType] = Number(node[key])
      } else {
        seatCount[seatType] += Number(node[key])
      }
      seatCount['UNRESOLVED'] -= Number(node[key])
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
          if (a.node.order > b.node.order) return 1
          if (a.node.order < b.node.order) return -1
        }).map((e, i) => {
          const { node } = e
          const expectedWinDemo = Number(node.expected_win_demo) || 0
          const unresolvedSeats = Number(node.unresolved_seats) || 0
          const expectedWinBeijing = Number(node.expected_win_beijing) || 0

          const candiBeijing = Number(node.candidates_beijing) || 0
          // const candiModerate = Number(node.candidates_moderate) || 0
          const candiDemo = Number(node.candidates_demo) || 0

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
                `/constituency/${node.key}`
              )
            }}>
              <div className="title">
                <div>
                  <Typography variant="caption" color="textSecondary">{t("no_of_seats", { seats: node.seats })}</Typography>
                  <Typography variant="h6">{node.alias_zh}</Typography>
                </div>
                <SeatRowChart data={expectedResultRows} />
              </div>
              <div className="sub-title">{t("expected_list")}</div>
              <div className="roundup">
                  <Typography variant="caption">{t("alias.DEMO")}</Typography>
                  <Typography variant="caption">{t("alias.BEIJING")}</Typography>
              </div>
              <div className="roundup">
              <div className="large-number demo">{candiDemo || "-"}</div>
                <div>
                  <Typography variant="body1" color="textSecondary">vs</Typography>
                </div>
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
      const { node } = c
      const idx = a.findIndex(a => a.title === t(node.situation))
      if (idx < 0) {
        return [...a, {
          key: node.key,
          title: t(node.situation),
          situation: node.situation,
          order: node.situation_order,
          content: [node]
        }]
      }
  
      a[idx].content.push(node)
      return a
    }, [])

    return (
      <TradFCWrapper>
        {grouppedFc.sort((a, b) => {
          if (a.order > b.order) return 1
          if (a.order < b.order) return -1
        }).map(group => {

          return (
            <div key={group.title} onClick={() => {
              navigate(
                `/constituency/${group.key}`
              )
            }}>
              <div className="group-title">{t("no_of_seats_fc", { title: group.title, seats: group.content.length } )}</div>
              <div className={`seat-group ${group.situation}`}>
                {
                  group.content.map((c, i) => {

                    const expectedWinDemo = Number(c.expected_win_demo) || 0
                    const unresolvedSeats = Number(c.unresolved_seats) || 0
                    const expectedWinBeijing = Number(c.expected_win_beijing) || 0

                    return (
                      <div key={i} className={`seat ${expectedWinDemo > expectedWinBeijing ? "demo" : ( expectedWinDemo < expectedWinBeijing ? "beijing" : "")}`}>
                        <Typography variant="caption" color="textSecondary">{t("no_of_seats", { seats: c.seats })}</Typography>
                        <Typography variant="h6">{c.name_zh}</Typography>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })}
      </TradFCWrapper>
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
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
      <SimpleTabs
        tabs={constituenciesByMethod.map(method => {
          const { field, fieldValue, edges } = method
          return {
            name: `${field}_${fieldValue}`,
            title: t(`${field}_${fieldValue}`),
            content:
              fieldValue === "direct"
                ? renderDirect(edges)
                : renderTradFC(edges),
          }
        })}
        onTabChange={name => {
          // trackCustomEvent({
          //   category: "news",
          //   action: "tab_select",
          //   label: name,
          // })
        }}
      />
    </Layout>
  )

}

export default IndexPage

export const IndexPageQuery = graphql`
  query {
    allConstituencies {
      edges {
        node {
          type
          method
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
        }
      }
    }
    allConstituenciesByMethod: allConstituencies {
      group(field: method) {
        field
        fieldValue
        totalCount
        edges {
          node {
            key
            type
            order
            seats
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
    }
  }
`