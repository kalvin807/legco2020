import React from "react"
import Layout from "@/components/layout"
import { Avatar, Typography } from '@material-ui/core';
import styled from "styled-components";
import theme from "@/themes";
import { useTranslation } from "react-i18next"
import SimpleTabs from "@/components/SimpleTabs"
import SocialPost from "@/components/SocialPost"  

const Header = styled.div`
  .avatar-main {
    width: 64px;
    height: 64px;
  }
  .avatar-main.DEMO {
    border: 5px ${theme.palette.warning.main} solid;
  }

  .avatar-main.BEIJING {
    border: 5px ${theme.palette.info.main} solid;
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


const PersonTemplate = ({ pageContext: { person, socialPosts } }) => {
  const { t } = useTranslation()
  return (
    <Layout>
        <Header>
          <Avatar className={`avatar-main ${person.camp}`} alt={person.alias_zh} src={person.image_url} />
          <Typography variant="h2">{person.name_zh}</Typography>
          <Typography variant="body2" color="textSecondary">{person.title_zh}</Typography>
          <div className="list-members">
            {
              [1, 1, 1, 1, 1, 1, 1, 1].map(c => {
                return (
                  <Avatar className={`avatar-others`} alt={person.alias_zh} src={person.image_url} />
                )
              })
            }
          </div>
        </Header>
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

export default PersonTemplate