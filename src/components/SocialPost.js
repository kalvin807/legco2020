import React, { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Container, Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import Alert from "@/components/Alert"  
import moment from "moment"

const PostsWrapper = styled.div`
  margin: ${theme.spacing(2)}px 0;
`

const Post = styled.div`
  margin: ${theme.spacing(2)}px 0;
  padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
  box-shadow: 0 1px 6px 0 ${theme.palette.divider};

  .caption {
    display: flex;
    justify-content: space-between;
  }
`

const query = `
  query getSocialPosts($regex: String!) {
    socialPosts(query: $regex, timeframe: "1w", orderBy: performance, reverse: false) {
      nodes {
        createdAt
        title
        platformUrl
        performance
      }
    }
  }
`

const SocialPost = ({ ...props }) => {
  const { t } = useTranslation()
  const { socialPosts } = props
  return (
    <PostsWrapper>
      <Alert 
        severity="warning"
        children="以下鏈結皆由系統自動搜集，並非完全準確。" />
      {
        socialPosts.map(post => {
          return (
            <Post onClick={() => {
              window.open(post.platformUrl, '_blank')
            }}>
              <div className="caption">
              <Typography variant="caption">
                {moment(post.createdAt).fromNow()}
              </Typography>
              <Typography variant="caption">
                {post.performance && post.performance.toFixed(2)}
              </Typography>
              </div>
              <Typography variant="h6">
                {post.title}
              </Typography>
            </Post>
          )
        })
      }
    </PostsWrapper>
  )
}

export default SocialPost