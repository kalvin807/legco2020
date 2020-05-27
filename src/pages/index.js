import React from "react"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import { graphql } from "gatsby"
import SingleStackedBarChart from "@/components/charts/SingleStackedBar"
import theme from "@/themes"

const IndexPage = props => {
  const { data: { allSeats :{ edges: seats } } } = props

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

  const seatColorMapping = {
    FC_EXPECTED_WIN_DEMO: theme.palette.warning.main,
    GC_EXPECTED_WIN_DEMO: theme.palette.warning.light,
    GC_EXPECTED_WIN_MODERATE: theme.palette.success.main,
    FC_EXPECTED_WIN_MODERATE: theme.palette.success.main,
    UNRESOLVED: theme.palette.divider,
    GC_EXPECTED_WIN_BEIJING: theme.palette.info.light,
    FC_EXPECTED_WIN_BEIJING: theme.palette.info.main,
  }

  // TODO: i18n support
  const seatTextMapping = {
    FC_EXPECTED_WIN_DEMO: '功能組別',
    GC_EXPECTED_WIN_DEMO: '地區直選',
    GC_EXPECTED_WIN_MODERATE: '其他',
    FC_EXPECTED_WIN_MODERATE: '其他',
    UNRESOLVED: '未知',
    GC_EXPECTED_WIN_BEIJING: '地區直選',
    FC_EXPECTED_WIN_BEIJING: '功能組別',
  }

  // Build chart data
  const chartData = Object.keys(seatColorMapping).map(scm => ({
    key: scm,
    label: seatTextMapping[scm],
    value: seatCount[scm],
    color: seatColorMapping[scm]
  }))

  // Build chart data
  let summary = {
    DEMO: {
      name: '民主', // TODO: i18n
      pos: 'start',
      total: 0,
      background: theme.palette.warning.light
    },
    BEIJING: {
      name: '親中',
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
          name_zh
          name_en
          alias_zh
          alias_en
          seats
          unresolved_seats
          expected_win_demo
          expected_win_beijing
          expected_win_moderate
        }
      }
    }
  }
`