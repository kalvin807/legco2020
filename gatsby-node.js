const fetch = require("node-fetch")
const path = require("path")
const csv2json = require("csvtojson")
const isDebug = process.env.DEBUG_MODE === "true"

const PUBLISHED_SPREADSHEET_I18N_URL = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxZuhwUXNXiyFOyMZvBHcb0C1BUBGtOZ852dvx2sVhLVMN-hIXJUS6bDHnxgx7ho5U6J1P7sBWMNd4/pub?gid=0"
const PUBLISHED_SPREADSHEET_GEOGRAPHICAL_CONSTITUENCIES_FC2_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSlXzn8tUEIgTAtQK4cey1JzunOctvquNQr-_76l98vdhD9Y4It5ZoNk06wEuBGoPIccFcjan0RXm7/pub?gid=1850485765"
const PUBLISHED_SPREADSHEET_TRADITIONAL_FUNCTIONAL_CONSTITUENCIES_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTvOc7XgjVmjYxXfCS06AvA3l8_kpjljIh1phw7yhC9uUpj1IdKW_dtMyFC8W5gvPz7a1xGFrve8gZj/pub?gid=1850485765"
const PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg6djWwtsckPWh3PfOmiG9BAYdUNLpAsQdD53GcUQlUhfEPC6e2dQqZxECh8M0qoO74bdS3rW1ouP5/pub?gid=1867647091"
const PUBLISHED_SPREADSHEET_CANDIDATES_URL = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ38fTxaPkEMpdrfPVFKcQdA4nYr7C3uQXkLteSuHYIxIUe2t-E7ECEX5anGdcWrFEuMMDRpasfw94s/pub?gid=0"

    
const createPublishedGoogleSpreadsheetNode = async (
    { actions: { createNode }, createNodeId, createContentDigest },
    publishedURL,
    type,
    { skipFirstLine = false, alwaysEnabled = false, subtype = null }
) => {
    // All table has first row reserved
    const result = await fetch(
        `${publishedURL}&single=true&output=csv&headers=0${
        skipFirstLine ? "&range=A2:ZZ" : ""
        }`
    )
    const data = await result.text()
    const records = await csv2json().fromString(data)
    records
        .filter(
            r => alwaysEnabled || (isDebug && r.enabled === "N") || r.enabled === "Y"
        )
        .forEach((p, i) => {
            // create node for build time data example in the docs
            const meta = {
                // required fields
                id: createNodeId(
                    `${type.toLowerCase()}${subtype ? `-${subtype}` : ""}-${i}`
                ),
                parent: null,
                children: [],
                internal: {
                    type,
                    contentDigest: createContentDigest(p),
                },
            }
            const node = Object.assign({}, { ...p, subtype }, meta)
            createNode(node)
        })
}

exports.sourceNodes = async props => {
    await Promise.all([
        // TODO: Move i18n into google spreadsheet
        // createPublishedGoogleSpreadsheetNode(
        //     props,
        //     PUBLISHED_SPREADSHEET_I18N_URL,
        //     "i18n",
        //     { skipFirstLine: false, alwaysEnabled: true }
        // ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_GEOGRAPHICAL_CONSTITUENCIES_FC2_URL,
            "GeoFuncDC2",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_TRADITIONAL_FUNCTIONAL_CONSTITUENCIES_URL,
            "TradFunc",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL,
            "FcOverview",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_CANDIDATES_URL,
            "Candidates",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
    ])
}



exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const GeoFuncDc2ConstituencyTemplate = path.resolve("./src/templates/GeoFuncDc2Constituency.js")
  const TradFuncTemplate = path.resolve("./src/templates/TradFuncConstituency.js")
  const CandidateTemplate = path.resolve("./src/templates/Candidate.js")
  
  const result = await graphql(`
    {
        allGeoFuncDc2 {
            edges {
              node {
                key
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
                stage_1_title_demo_zh
                stage_1_title_beijing_zh
                stage_1_description_demo_zh
                stage_1_description_beijing_zh
                stage_2_title_demo_zh
                stage_2_title_beijing_zh
                stage_2_description_demo_zh
                stage_2_description_beijing_zh
              }
            }
        }
        allTradFunc {
          edges {
            node {
              key
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
        allCandidates {
            edges {
              node {
                constituency
                camp
                status
                name_zh
                title_zh
              }
            }
        }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const GeoFuncDc2Constituencies = result.data.allGeoFuncDc2.edges
  GeoFuncDc2Constituencies.forEach(constituency => {
    createPage({
      path: `/constituency/${constituency.node.key}`,
      component: GeoFuncDc2ConstituencyTemplate,
      context: {
        constituency: constituency.node
      },
    })
  })

  const TradFuncConstituencies = result.data.allTradFunc.edges
  TradFuncConstituencies.forEach(constituency => {
    createPage({
      path: `/constituency/${constituency.node.key}`,
      component: TradFuncTemplate,
      context: {
        constituency: constituency.node
      },
    })
  })

  const Candidates = result.data.allCandidates.edges
  Candidates.forEach(candidate => {
    createPage({
      path: `/candidate/${candidate.node.name_zh}`,
      component: CandidateTemplate,
      context: {
        candidate: candidate.node
      },
    })
  })
}

