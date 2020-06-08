import React, { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Container, Grid, Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import { request } from "graphql-request"
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

  const useFetch = (url, { query, variables }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await request(url, query, variables)
          setResponse(data)

        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error };
  };

  const res = useFetch(`https://graphql.maatproject.org`,
    {
      query,
      variables: {
        regex: `(${props.candidate.name_zh})`,
      }
    }
  );

  if (!res.response) {
    return <div>Loading...</div>
  }
  const { socialPosts: { nodes: posts } } = res.response
  return (
    <PostsWrapper>
      {
        posts.map(post => {
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