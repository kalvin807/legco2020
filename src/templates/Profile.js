import React from 'react';
import {
  Avatar,
  Typography,
  Grid,
  Breadcrumbs,
  Fab,
  Container,
} from '@material-ui/core';
import styled from 'styled-components';
import theme from '@/themes';
import { useTranslation } from 'react-i18next';
import SimpleTabs from '@/components/SimpleTabs';
import SocialPost from '@/components/SocialPost';
import Chip from '@/components/Chip';
import { Link } from 'gatsby';
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterLine,
  RiYoutubeLine,
  RiTelegramLine,
} from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa';
import { openInNewTab } from '@/utils';
import { withLanguage } from '@/utils/i18n';
import HKFactcheckIcon from '@/components/icons/hkfactcheck.svg';

const ProfileTemplateWrapper = styled.div`
  .top-row {
    margin-bottom: ${theme.spacing(1)}px;
  }

  .block {
    margin: ${theme.spacing(1)}px 0;
  }

  .nav-link {
    color: ${theme.palette.primary.main};
    text-decoration: none;
    font-size: 14px;
    margin-bottom: ${theme.spacing(1)}px;
  }

  .nav-link:hover {
    color: ${theme.palette.secondary.main};
    font-weight: 700;
  }

  .social {
    font-size: 24px;
  }

  .social svg {
    margin-left: ${theme.spacing(1)}px;
  }
`;

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
`;

const ProfileTemplate = ({ pageContext: { person, socialPosts } }) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <ProfileTemplateWrapper>
        <Grid
          className="top-row"
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Breadcrumbs separator={<FaAngleRight />} aria-label="breadcrumb">
              <Link className="nav-link" to="/primary">
                {t('primary.short_title')}
              </Link>
              <Link className="nav-link" to={`/primary/${person.constituency}`}>
                {t(`constituencies.alias_${person.constituency}`)}
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid item>
            <Grid
              className="social"
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-start"
            >
              {person.facebook_id && (
                <Grid
                  item
                  className="clickable"
                  onClick={() =>
                    openInNewTab(`https://fb.me/${person.facebook_id}`)
                  }
                >
                  <RiFacebookCircleLine />
                </Grid>
              )}
              {person.instagram_id && (
                <Grid
                  item
                  className="clickable"
                  onClick={() =>
                    openInNewTab(
                      `https://www.instagram.com/${person.instagram_id}`
                    )
                  }
                >
                  <RiInstagramLine />
                </Grid>
              )}
              {person.twitter_id && (
                <Grid
                  className="clickable"
                  onClick={() =>
                    openInNewTab(`https://twitter.com/${person.twitter_id}`)
                  }
                >
                  <RiTwitterLine />
                </Grid>
              )}
              {person.telegram_id && (
                <Grid
                  className="clickable"
                  onClick={() =>
                    openInNewTab(`https://t.me/${person.telegram_id}`)
                  }
                >
                  <RiTelegramLine />
                </Grid>
              )}
              {person.youtube_id && (
                <Grid
                  className="clickable"
                  onClick={() =>
                    openInNewTab(
                      `https://youtube.com/channel/${person.youtube_id}`
                    )
                  }
                >
                  <RiYoutubeLine />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <ProfileHeader container spacing={3}>
          <Grid item>
            <Avatar
              className={`avatar-main ${person.camp}`}
              alt={withLanguage(i18n, person, 'alias')}
              src={person.img_url}
            />
          </Grid>

          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              style={{ height: '100%' }}
            >
              <div className="name">{withLanguage(i18n, person, 'name')}</div>
              <Typography variant="body2" color="textSecondary">
                {withLanguage(i18n, person, 'title')}
              </Typography>
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
        <Typography className="block" variant="body2">
          {withLanguage(i18n, person, 'description')}
        </Typography>
        <Grid className="block" container>
          {person.tags &&
            person.tags.map(tag => (
              <Chip
                key={withLanguage(i18n, tag, 'name')}
                label={withLanguage(i18n, tag, 'name')}
                variant="outlined"
              />
            ))}
        </Grid>
        <SimpleTabs
          tabs={[
            {
              name: 'social_posts',
              title: t('social_posts'),
              content: <SocialPost socialPosts={socialPosts} />,
            },
          ]}
          onTabChange={() => {
            // trackCustomEvent({
            //   category: "news",
            //   action: "tab_select",
            //   label: name,
            // })
          }}
        />
        {person.hkfactcheck_id && (
          <Container maxWidth="lg">
            <Fab
              className="clickable"
              onClick={() =>
                openInNewTab(
                  `https://legco2020.com/candidates/${person.hkfactcheck_id}/${person.name_zh}`
                )
              }
              variant="extended"
              size="medium"
              aria-label="add"
              style={{
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
                backgroundColor: '#00897b',
                color: theme.palette.background.default,
              }}
            >
              <HKFactcheckIcon
                style={{
                  width: 24,
                  height: 24,
                  marginRight: theme.spacing(1),
                }}
              />
              {t('profile.hkfactcheck_link')}
            </Fab>
          </Container>
        )}
      </ProfileTemplateWrapper>
    </>
  );
};

export default ProfileTemplate;
