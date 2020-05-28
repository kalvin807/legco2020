const fetch = require("node-fetch")
const csv2json = require("csvtojson")
const isDebug = process.env.DEBUG_MODE === "true"

const PUBLISHED_SPREADSHEET_I18N_URL = 
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxZuhwUXNXiyFOyMZvBHcb0C1BUBGtOZ852dvx2sVhLVMN-hIXJUS6bDHnxgx7ho5U6J1P7sBWMNd4/pub?gid=0"
const PUBLISHED_SPREADSHEET_SEATS_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTSlXzn8tUEIgTAtQK4cey1JzunOctvquNQr-_76l98vdhD9Y4It5ZoNk06wEuBGoPIccFcjan0RXm7/pub?gid=1850485765"
const PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg6djWwtsckPWh3PfOmiG9BAYdUNLpAsQdD53GcUQlUhfEPC6e2dQqZxECh8M0qoO74bdS3rW1ouP5/pub?gid=1867647091"


    
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
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_I18N_URL,
            "i18n",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_SEATS_URL,
            "Seats",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
        createPublishedGoogleSpreadsheetNode(
            props,
            PUBLISHED_SPREADSHEET_FUNCTIONAL_CONSTITUENCIES_URL,
            "FcOverview",
            { skipFirstLine: false, alwaysEnabled: true }
        ),
    ])
}