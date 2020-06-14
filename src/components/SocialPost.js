import React from "react"
import { Grid, Typography } from "@material-ui/core"
import styled from "styled-components"
import theme from "@/themes"
import { useTranslation } from "react-i18next"
import Alert from "@/components/Alert"
import moment from "moment"
import { FcLike } from "react-icons/fc"
import { IoMdHeartDislike, IoMdTrendingUp } from "react-icons/io"
import { MdModeComment } from "react-icons/md"

const PostsWrapper = styled.div`
  margin: ${theme.spacing(2)}px 0;
`

const MetricsWrapper = styled(Grid)`
  margin-top: ${theme.spacing(1)}px;
  display: flex;
  align-items: center;
  font-size: 12px;

  svg {
    margin-right: 3px;
  }
`

const Post = styled.div`
  margin: ${theme.spacing(2)}px 0;
  padding: ${theme.spacing(1)}px ${theme.spacing(1.5)}px;
  box-shadow: 0 1px 6px 0 ${theme.palette.divider};

  .sub-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${theme.spacing(1)}px;
  }
`

const SocialPost = ({ ...props }) => {
  const { t } = useTranslation()
  const { socialPosts } = props
  return (
    <PostsWrapper>
      <Alert severity="warning">
        以下帖子由Factcheck Lab自動搜集，現正全力提升準確度。
      </Alert>
      {socialPosts.map(post => {
        return (
          <Post
            onClick={() => {
              window.open(post.platformUrl, "_blank")
            }}
          >
            <div className="sub-title">
              <Typography variant="caption">
                {t(`platform.${post.group.platform.name}`)} {post.group.name}
              </Typography>
              <Typography variant="caption">
                {moment(post.createdAt).fromNow()}
              </Typography>
            </div>

            <Typography variant="h5">{post.title}</Typography>

            <Grid container spacing={3}>
              <MetricsWrapper item>
                <IoMdTrendingUp />
                {post.performance ? `${post.performance.toFixed(2)}x` : "-"}
              </MetricsWrapper>
              <MetricsWrapper item>
                <FcLike /> {post.likeCount || "-"}
              </MetricsWrapper>
              <MetricsWrapper item>
                <IoMdHeartDislike /> {post.dislikeCount || "-"}
              </MetricsWrapper>
              <MetricsWrapper item>
                <MdModeComment /> {post.replyCount || "-"}
              </MetricsWrapper>
            </Grid>
          </Post>
        )
      })}
    </PostsWrapper>
  )
}

export default SocialPost
