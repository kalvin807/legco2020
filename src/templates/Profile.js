import React from "react"
import Layout from "@/components/layout"
import { Avatar, Typography, Grid } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import SimpleTabs from "@/components/SimpleTabs"
import SocialPost from "@/components/SocialPost"
import Chip from "@/components/Chip"

const ProfileHeader = styled(Grid)`

  margin-bottom: ${theme.spacing(0.5)}px;

  .avatar-main {
    width: 80px;
    height: 80px;
  }
  .avatar-main.DEMO {
    border: 5px ${theme.palette.warning.main} solid;
  }

  .avatar-main.BEIJING {
    border: 5px ${theme.palette.info.main} solid;
  }

  .name {
    font-size: 24px;
    font-weight: 600;
  }

  .list-members {
    display: flex;

    .avatar-others {
      width: 32px;
      height: 32px;
      margin-right: ${theme.spacing(1)}px;
    }
  }
`


const ProfileTemplate = ({ pageContext: { person, socialPosts, tags } }) => {
  const { t } = useTranslation()
  return (
    <Layout>
        <ProfileHeader container spacing={3}>
          <Grid item>

          <Avatar className={`avatar-main ${person.camp}`} alt={person.alias_zh} src={person.img_url} />
          </Grid>

          <Grid item xs={8}>
            <Grid 
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              style={{ height: "100%"}}
            >
            <div className="name">{person.name_zh}</div>
            <Typography variant="body2" color="textSecondary">{person.title_zh}</Typography>
            </Grid>
          </Grid>
          {/* <div className="list-members">
            {
              [1, 1, 1, 1, 1, 1, 1, 1].map(c => {
                return (
                  <Avatar className={`avatar-others`} alt={person.alias_zh} src={person.image_url} />
                )
              })
            }
          </div> */}
        </ProfileHeader>
        <Grid container>
          {tags.map(tag =>  <Chip 
            label={t(`tag.${tag.i18nKey}`)}
            variant="outlined" />)}
        </Grid>
        <SimpleTabs
          tabs={[
            {
              name: `social_posts`,
              title: t(`social_posts`),
              content: <SocialPost socialPosts={socialPosts} />,
            }
          ]}
          onTabChange={name => {
            // trackCustomEvent({
            //   category: "news",
            //   action: "tab_select",
            //   label: name,
            // })
          }}
        />
    </Layout>
  )
}

export default ProfileTemplate