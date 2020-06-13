/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from "react"
import "@/i18n"
import I18nWrapper from "@/components/I18nWrapper"
import { removePathTrailingSlash } from "@/utils/urlHelper"

export const wrapPageElement = ({ element, props }) => {
  // remove the trailing slash
  const fullPath = removePathTrailingSlash(props.location.pathname)
  const path = fullPath.replace(/^\/en(?!\w)/, "") || "/"
  return (
    <>
       <I18nWrapper locale={props.pageContext.locale} ssr={true}>
          {element}
        </I18nWrapper>
    </>
  )
}
