/* eslint-disable no-await-in-loop */
const fetch = require('node-fetch');
const path = require('path');
const csv2json = require('csvtojson');
const { request } = require('graphql-request');
const { getPath } = require('./src/utils/urlHelper');

const isDebug = process.env.DEBUG_MODE === 'false';
const LANGUAGES = ['zh', 'en'];

require('dotenv').config();

// const PUBLISHED_SPREADSHEET_I18N_URL =
//     "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxZuhwUXNXiyFOyMZvBHcb0C1BUBGtOZ852dvx2sVhLVMN-hIXJUS6bDHnxgx7ho5U6J1P7sBWMNd4/pub?gid=0"
const PUBLISHED_SPREADSHEET_GEOGRAPHICAL_CONSTITUENCIES_FC2_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSlXzn8tUEIgTAtQK4cey1JzunOctvquNQr-_76l98vdhD9Y4It5ZoNk06wEuBGoPIccFcjan0RXm7/pub?gid=1850485765';
const PUBLISHED_SPREADSHEET_TRADITIONAL_FUNCTIONAL_CONSTITUENCIES_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvOc7XgjVmjYxXfCS06AvA3l8_kpjljIh1phw7yhC9uUpj1IdKW_dtMyFC8W5gvPz7a1xGFrve8gZj/pub?gid=1850485765';
const PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQg6djWwtsckPWh3PfOmiG9BAYdUNLpAsQdD53GcUQlUhfEPC6e2dQqZxECh8M0qoO74bdS3rW1ouP5/pub?gid=1867647091';
const AIRTABLE_CANDIDATES_SPREADSHEET_ID = 'appTst6klxEECAHOv';


const createAirtableNode = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  airtableSheetId,
  airtableSheetName,
  type,
  { subtype = null }
) => {
  const AirtableAPIKey = process.env.GATSBY_AIRTABLE_API_KEY;
  if (!AirtableAPIKey) {
    throw new Error('AirtableAPIKey not found. please ensure the environment varaible is set.');
  }

  let offset = '';
  let records = [];
  // max pagesize available = 100
  const pageSize = 100;
  let loadedSize = 0;
  do {
    let query = `pageSize=${pageSize}`;
    if (offset) {
      query += `&offset=${offset}`
    }
    const result = await fetch(
      `https://api.airtable.com/v0/${airtableSheetId}/${airtableSheetName}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${AirtableAPIKey}`
        }
      }
    );
    if (result.status === 429) {
      // TODO: handle rate limit

    }
    const data = await result.json();
    records = records.concat(data.records);

    loadedSize = data.records.length;
    offset = data.offset;
  } while (loadedSize === pageSize);

  records.forEach((p) => {
    // create node for build time data example in the docs
    const meta = {
      // required fields
      id: p.id,
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest: createContentDigest(p),
      },
    };
    const node = { ...p.fields, subtype, ...meta };
    createNode(node);
  });
}

const createPublishedGoogleSpreadsheetNode = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  publishedURL,
  type,
  { skipFirstLine = false, alwaysEnabled = false, subtype = null }
) => {
  // All table has first row reserved
  const result = await fetch(
    `${publishedURL}&single=true&output=csv&headers=0${
    skipFirstLine ? '&range=A2:ZZ' : ''
    }&q=${Math.floor(new Date().getTime(), 1000)}`
  );
  const data = await result.text();
  const records = await csv2json().fromString(data);
  records
    .filter(
      r => alwaysEnabled || (isDebug && r.enabled === 'N') || r.enabled === 'Y'
    )
    .forEach((p, i) => {
      // create node for build time data example in the docs
      const meta = {
        // required fields
        id: createNodeId(
          `${type.toLowerCase()}${subtype ? `-${subtype}` : ''}-${i}`
        ),
        parent: null,
        children: [],
        internal: {
          type,
          contentDigest: createContentDigest(p),
        },
      };
      const node = { ...p, subtype, ...meta };
      createNode(node);
    });
};


const handleTradFCTags = constituency => {
  const tags = [
    {
      i18nKey: constituency.situation
    },
    {
      i18nKey: `electors_composition_${constituency.electors_composition}`
    }
  ]

  if (!Number(constituency.last_election_voted_count)) {
    tags.push({
      i18nKey: 'uncontested_2016'
    })
  }

  return tags;
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  return new Promise(resolve => {
    // If it is already eng path we skip to re-generate the locale
    if (!page.path.match(/^\/en/)) {
      deletePage(page);
      LANGUAGES.forEach(lang => {
        createPage({
          ...page,
          path: getPath(lang, page.path),
          context: {
            ...page.context,
            locale: lang,
          },
        });
      });
    }
    resolve();
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    const regex = [
      /node_modules\/leaflet/,
      /node_modules\\leaflet/,
      /node_modules\/pixi.js/,
      /node_modules\\pixi.js/,
    ];
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: regex,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

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
      'GeoFuncDC2',
      { skipFirstLine: true, alwaysEnabled: true }
    ),
    createPublishedGoogleSpreadsheetNode(
      props,
      PUBLISHED_SPREADSHEET_TRADITIONAL_FUNCTIONAL_CONSTITUENCIES_URL,
      'TradFunc',
      { skipFirstLine: true, alwaysEnabled: true }
    ),
    createPublishedGoogleSpreadsheetNode(
      props,
      PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL,
      'FcOverview',
      { skipFirstLine: false, alwaysEnabled: true }
    ),
    createAirtableNode(
      props,
      AIRTABLE_CANDIDATES_SPREADSHEET_ID,
      'master',
      'Candidates',
      {}
    ),
    createAirtableNode(
      props,
      AIRTABLE_CANDIDATES_SPREADSHEET_ID,
      'tags',
      'CandidateTag',
      {}
    ),
    createAirtableNode(
      props,
      AIRTABLE_CANDIDATES_SPREADSHEET_ID,
      'political_affiliation',
      'CandidatePoliticalAffilation',
      {}
    )]);
};

// https://www.gatsbyjs.org/docs/schema-customization/#foreign-key-fields
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = [
    `type Candidates implements Node {
      tags: [CandidateTag] @link(by: "id")
    }`,
    `type Candidates implements Node {
      political_affiliations: [CandidatePoliticalAffilation] @link(by: "id")
    }`,
  ]
  createTypes(typeDefs)
}

exports.createPages = async function createPages({
  graphql,
  actions,
  reporter,
}) {
  const { createPage } = actions;
  const GeoFuncDc2ConstituencyTemplate = path.resolve(
    './src/templates/GeoFuncDc2Constituency.js'
  );
  const TradFuncTemplate = path.resolve(
    './src/templates/TradFuncConstituency.js'
  );
  const ProfileTemplate = path.resolve('./src/templates/Profile.js');

  const result = await graphql(`
    {
      allGeoFuncDc2 {
        edges {
          node {
            key
            type
            name_zh
            name_en
            alias_zh
            alias_en
            seats
            unresolved_seats
            expected_win_demo
            expected_win_beijing
            expected_win_other
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
            name_zh
            name_en
            alias_zh
            alias_en
            situation
            electors_composition
            electors_total_2016
            electors_total_2020
            last_election_vote_beijing_minus_demo
            last_election_voted_count
            description_zh
            description_en
            seats
            unresolved_seats
            expected_win_demo
            expected_win_beijing
            expected_win_other
            candidates_demo
            candidates_beijing
          }
        }
      }
      allCandidates {
        edges {
          node {
            enabled
            uuid
            constituency
            camp
            status
            name_zh
            description_zh
            tags {
              name_zh
              name_en
            }
            political_affiliations {
              alias_zh
              alias_en
            }
            keywords
            title_zh
            is_current_lc
            is_current_dc
            primary
            is_2020_candidate
            img_url
            facebook_id
            instagram_id
            twitter_id
            telegram_id
            youtube_id
          }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return Promise.resolve(false);
  }
  const GeoFuncDc2Constituencies = result.data.allGeoFuncDc2.edges;
  GeoFuncDc2Constituencies.forEach(constituency => {
    LANGUAGES.forEach(lang => {
      createPage({
        path: getPath(lang, `/constituency/${constituency.node.key}`),
        component: GeoFuncDc2ConstituencyTemplate,
        context: {
          constituency: constituency.node,
          candidates: result.data.allCandidates.edges.filter(
            p =>
              p.node.constituency === constituency.node.key
          ),
          locale: lang,
        },
      });
    });
  });

  const TradFuncConstituencies = result.data.allTradFunc.edges;
  TradFuncConstituencies.forEach(constituency => {
    LANGUAGES.forEach(lang => {
      createPage({
        path: getPath(lang, `/constituency/${constituency.node.key}`),
        component: TradFuncTemplate,
        context: {
          constituency: constituency.node,
          councillors: result.data.allCandidates.edges.filter(
            p =>
              p.node.constituency === constituency.node.key &&
              p.node.is_current_lc === 'TRUE'
          ),
          candidates: result.data.allCandidates.edges.filter(
            p =>
              p.node.constituency === constituency.node.key
          ),
          tags: handleTradFCTags(constituency.node),
          locale: lang,
        },
      });
    });
  });

  const People = result.data.allCandidates.edges;

  const requests = People.map(person => {
    const query = `
          query getSocialPosts($regex: String!, $timeframe: String!) {
            socialPosts(query: $regex, timeframe: $timeframe, orderBy: performance, reverse: false) {
              nodes {
                title
                content
                createdAt
                poster {
                  platform {
                    name
                  }
                  name
                }
                group {
                  platform {
                      name
                  }
                  name
                }
                performance
                platformUrl
                platformId
                ... on LIHKGSocialPost {
                  likeCount
                  dislikeCount
                  replyCount
                }
                ... on DiscussHKSocialPost {
                  replyCount
                  viewCount
                }
                ... on UwantsSocialPost {
                  likeCount
                  dislikeCount
                  replyCount
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
              totalCount
            }
          }
        `;

    const variables = {
      regex: `(${person.node.name_zh}${
        person.nodekeywords ? `|${person.nodekeywords}` : ''
        })`,
      timeframe: '1w',
    };

    return request('https://graphql.maatproject.org', query, variables).then(
      data => ({
        person: person.node,
        socialPosts: data.socialPosts.nodes,
      })
    );
  });

  return Promise.all(requests).then(responses =>
    responses.forEach(response => {
      const { person, socialPosts } = response;
      LANGUAGES.forEach(lang => {
        createPage({
          path: getPath(lang, `/profile/${person.uuid}/${person.name_zh}`),
          component: ProfileTemplate,
          context: {
            person,
            socialPosts,
            locale: lang,
          },
        });
      });
    })
  );
};
