import React from "react"
import Layout from "@/components/layout"
import { Container, Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import { navigate } from "gatsby"

const CandidateTemplate = ({ pageContext: { candidate } }) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h2">{candidate.name_zh}</Typography>
        <Typography variant="body1">{candidate.title_zh}</Typography>
      </Container>
    </Layout>
  )
}

export default CandidateTemplate