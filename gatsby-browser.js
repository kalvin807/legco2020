/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"
import "@/i18n"
import I18nWrapper from "@/components/I18nWrapper"

export const wrapPageElement = ({ element, props : { pageContext : { locale } } }) => {
    return (
      <>
        <I18nWrapper locale={locale}>{element}</I18nWrapper>
      </>
    )
  }