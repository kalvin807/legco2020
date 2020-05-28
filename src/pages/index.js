import React from "react"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { graphql } from "gatsby"
import SingleStackedBarChart from "@/components/charts/SingleStackedBar"
import SeatRowChart from "@/components/charts/SeatRow"
import theme from "@/themes"
import { Typography } from "@material-ui/core"
import SimpleTabs from "@/components/SimpleTabs"
import styled from "styled-components"
import { useTranslation } from "react-i18next" 

const GridWrapper = styled.div`
  margin: 0 ${theme.spacing(2)}px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.spacing(1)}px;

  .seat {
    padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
    border: 1px ${theme.palette.divider} solid;
  }
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
  const { data: { allSeats :{ edges: seats }, allSeatsByMethod: { group: seatsByMethod } } } = props
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

  return (
    <Layout>
      <SEO title="Home" />
      <SingleStackedBarChart 
        data={chartData} 
        summary={summary}
      />
      <SimpleTabs
        tabs={seatsByMethod.map(method => {
          const { field, fieldValue, edges } = method
          return {
            name: `${field}_${fieldValue}`,
            title: t(`${field}_${fieldValue}`),
            content: <GridWrapper>
              {edges.map((e, i) => {
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
                  <div key={i} className="seat">
                      <Typography variant="h6">{node.alias_zh} ({node.seats}席)</Typography>
                      <SeatRowChart data={expectedResultRows} />
                <Typography variant="body1">泛民：{candiDemo}名單</Typography>
                <Typography variant="body1">親中：{candiBeijing}名單</Typography>
                  </div>
                )
              })}
          </GridWrapper>
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
    allSeats {
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
    allSeatsByMethod: allSeats(sort: {order: DESC, fields: unresolved_seats}) {
      group(field: method) {
        field
        fieldValue
        totalCount
        edges {
          node {
            type
            seats
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