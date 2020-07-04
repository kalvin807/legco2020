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
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ResponsiveSections from '@/components/ResponsiveSections';
import SocialPost from '@/components/SocialPost';
import Chip from '@/components/Chip';
import { Link, useStaticQuery, graphql } from 'gatsby';
import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiTwitterLine,
  RiYoutubeLine,
  RiTelegramLine,
} from 'react-icons/ri';
import { FaAngleRight } from 'react-icons/fa';
import { openInNewTab } from '@/utils';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';
import HKFactcheckIcon from '@/components/icons/hkfactcheck.svg';
import SEO from '@/components/seo';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import List from '@/components/List';
import { CompactImageLinkBox } from '@/components/LinkBox';
import Alert from '@/components/Alert';
import { GoLinkExternal } from 'react-icons/go';
import { PeopleCircle } from '@/components/People';
import { DefaultTooltip } from '@/components/Tooltip';

const ProfileTemplateWrapper = styled.div`
  .top-row {
    margin-bottom: ${props => props.theme.spacing(1)}px;
  }

  .base-margin {
    margin: ${props => props.theme.spacing(2)}px 0;
  }

  .block {
    margin: ${props => props.theme.spacing(1)}px 0;
  }

  .nav-link {
    color: ${props => props.theme.palette.text.primary};
    text-decoration: none;
    font-size: 14px;
    margin-bottom: ${props => props.theme.spacing(1)}px;
  }

  .nav-link:hover {
    color: ${props => props.theme.palette.text.primary};
    font-weight: 700;
  }

  .social {
    font-size: 24px;
  }

  .social svg {
    margin-left: ${props => props.theme.spacing(1)}px;
  }

  .list-member {
    display: flex;
  }

  .highlights {
    max-width: 600px;
  }

  .highlight-items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .value {
      font-weight: 500;
    }

    .title {
      font-size: 0.75rem;
      color: ${props => props.theme.palette.text.secondary};
    }
  }
`;

const ProfileHeader = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing(0.5)}px;

  .avatar-main {
    width: 80px;
    height: 80px;
  }
  .avatar-main.DEMO {
    border: 5px ${props => props.theme.palette.warning.main} solid;
  }

  .avatar-main.BEIJING {
    border: 5px ${props => props.theme.palette.info.main} solid;
  }

  .name {
    font-size: 24px;
    font-weight: 600;
  }
`;

const TooltipContent = styled.div`
  .name {
    font-weight: 700;
    margin-bottom: ${props => props.theme.spacing(0.5)}px;
  }

  .detail {
    margin-bottom: ${props => props.theme.spacing(0.5)}px;
  }
`;

const ProfileTemplate = ({
  pageContext: { uri, person, socialPosts, links, listMember },
}) => {
  const { t, i18n } = useTranslation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  );

  const theme = useTheme();

  const personHighlights = [
    {
      value: person.estimated_yob
        ? t('profile.age_value', {
            n: 2020 - person.estimated_yob,
          })
        : '-',
      title: t('profile.age_title'),
      span: 2,
    },
    {
      value: person.political_affiliations
        ? person.political_affiliations
            .map(pa => withLanguage(i18n, pa, 'alias'))
            .join(t('seperator.and'))
        : t('no'),
      title: t('profile.reportedPoliticalAffiliation_title'),
      span: 5,
    },
  ];

  if (withLanguage(i18n, person, 'occupation')) {
    personHighlights.push({
      value: withLanguage(i18n, person, 'occupation'),
      title: t('profile.occupation_title'),
      span: 5,
    });
  }

  const sections = [];

  if (
    links.filter(
      link => link.type === 'interview' && link.language === i18n.language
    ).length
  ) {
    sections.push({
      name: 'interviews',
      title: t('interviews'),
      content: (
        <List>
          {links
            .filter(
              link =>
                link.type === 'interview' && link.language === i18n.language
            )
            .map(link => (
              <CompactImageLinkBox
                key={link.id}
                onClick={() => {
                  window.open(link.url, '_blank');
                }}
                image={(
                  <img
                    style={{
                      height: '100%',
                    }}
                    src={link.thumbnail_url}
                    alt={link.title}
                  />
                )}
                title={link.title}
                subTitle={link.media}
              />
            ))}
        </List>
      ),
    });
  }

  sections.push({
    name: 'social_posts',
    title: t('social_posts'),
    content: (
      <>
        <Alert
          severity="warning"
          action={(
            <GoLinkExternal
              className="clickable"
              onClick={() => {
                trackCustomEvent({
                  category: 'social_post',
                  action: 'click',
                  label: 'factchecklab',
                });
                window.open(
                  'https://www.facebook.com/FactcheckLabHK',
                  '_blank'
                );
              }}
            />
          )}
        >
          {t('socialPost.discalimer')}
        </Alert>
        <List>
          {socialPosts.map(post => (
            <SocialPost
              key={post.title || post.content}
              post={post}
              candiName={person.name_zh}
            />
          ))}
        </List>
      </>
    ),
  });

  return (
    <>
      <SEO
        uri={uri}
        titleOveride={withLanguage(i18n, person, 'name')}
        // TODO: duplicated entries, filter out in SEO later?
        meta={[
          {
            property: 'og:title',
            content: withLanguage(i18n, person, 'name'),
          },
          {
            property: 'og:description',
            content: withLanguage(i18n, person, 'description'),
          },
        ]}
      />
      <ProfileTemplateWrapper theme={theme}>
        <Grid
          className="top-row"
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Breadcrumbs separator={<FaAngleRight />} aria-label="breadcrumb">
              <Link
                className="nav-link"
                to={getLocalizedPath(i18n, '/primary')}
              >
                {t('primary.short_title')}
              </Link>
              <Link
                className="nav-link"
                to={getLocalizedPath(i18n, `/primary/${person.constituency}`)}
              >
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
                  onClick={() => {
                    trackCustomEvent({
                      category: 'profile',
                      action: 'click_facebook',
                      label: person.name_zh,
                    });
                    openInNewTab(`https://fb.me/${person.facebook_id}`);
                  }}
                >
                  <RiFacebookCircleLine />
                </Grid>
              )}
              {person.instagram_id && (
                <Grid
                  item
                  className="clickable"
                  onClick={() => {
                    trackCustomEvent({
                      category: 'profile',
                      action: 'click_instagram',
                      label: person.name_zh,
                    });
                    openInNewTab(
                      `https://www.instagram.com/${person.instagram_id}`
                    );
                  }}
                >
                  <RiInstagramLine />
                </Grid>
              )}
              {person.twitter_id && (
                <Grid
                  className="clickable"
                  onClick={() => {
                    trackCustomEvent({
                      category: 'profile',
                      action: 'click_twitter',
                      label: person.name_zh,
                    });
                    openInNewTab(`https://twitter.com/${person.twitter_id}`);
                  }}
                >
                  <RiTwitterLine />
                </Grid>
              )}
              {person.telegram_id && (
                <Grid
                  className="clickable"
                  onClick={() => {
                    trackCustomEvent({
                      category: 'profile',
                      action: 'click_telegram',
                      label: person.name_zh,
                    });
                    openInNewTab(`https://t.me/${person.telegram_id}`);
                  }}
                >
                  <RiTelegramLine />
                </Grid>
              )}
              {person.youtube_id && (
                <Grid
                  className="clickable"
                  onClick={() => {
                    trackCustomEvent({
                      category: 'profile',
                      action: 'click_youtube',
                      label: person.name_zh,
                    });
                    openInNewTab(
                      `https://youtube.com/channel/${person.youtube_id}`
                    );
                  }}
                >
                  <RiYoutubeLine />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        <ProfileHeader container spacing={3} theme={theme}>
          <Grid item>
            <Avatar
              className={`avatar-main ${person.camp}`}
              alt={withLanguage(i18n, person, 'alias')}
              src={`${site.siteMetadata.siteUrl}/images/avatars/${person.uuid}.png`}
            >
              <img
                alt={withLanguage(i18n, person, 'alias')}
                src={person.img_url}
                style={{
                  maxWidth: '100%',
                }}
              />
            </Avatar>
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
        </ProfileHeader>
        {!!listMember.length && (
          <Grid container spacing={1} className="list-member">
            {listMember
              .sort((a, b) => {
                if (a.order > b.order) return 1;
                if (a.order < b.order) return -1;
                return 0;
              })
              .map(c => {
                const details = [
                  {
                    value: c.estimated_yob
                      ? t('profile.age_value', {
                          n: 2020 - c.estimated_yob,
                        })
                      : '-',
                    title: t('profile.age_title'),
                  },
                  {
                    value: withLanguage(i18n, c, 'occupation') || '-',
                    title: t('profile.occupation_title'),
                  },
                  {
                    value:
                      withLanguage(i18n, c, 'political_affiliation') || '-',
                    title: t('profile.reportedPoliticalAffiliation_title'),
                  },
                ];
                return (
                  <Grid item key={withLanguage(i18n, c, 'name')}>
                    <DefaultTooltip
                      theme={theme}
                      title={(
                        <TooltipContent theme={theme}>
                          <Typography className="name" variant="h5">
                            {withLanguage(i18n, c, 'name')}
                          </Typography>
                          {details.map(d => (
                            <div className="detail">
                              <Typography variant="body2">{d.value}</Typography>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                {d.title}
                              </Typography>
                            </div>
                          ))}
                        </TooltipContent>
                      )}
                      enterTouchDelay={10}
                      leaveTouchDelay={5000}
                      interactive
                    >
                      <div>
                        <PeopleCircle
                          info={c}
                          imgUrl={`${site.siteMetadata.siteUrl}/images/avatars/${c.uuid}.png`}
                          xsdimension={32}
                          showName={false}
                        />
                      </div>
                    </DefaultTooltip>
                  </Grid>
                );
              })}
          </Grid>
        )}
        <Typography className="block" variant="body2">
          {withLanguage(i18n, person, 'description')}
        </Typography>
        <Grid container className="highlights">
          {personHighlights.map(ph => (
            <Grid
              key={ph.title}
              className="highlight-items"
              item
              xs={ph.span}
              sm={ph.span}
            >
              <div className="value">{ph.value}</div>
              <div className="title">{ph.title}</div>
            </Grid>
          ))}
        </Grid>
        <Grid className="block" container>
          {person.tags &&
            person.tags.map(tag => (
              <Chip
                key={withLanguage(i18n, tag, 'name')}
                label={withLanguage(i18n, tag, 'name')}
                variant="outlined"
                size="small"
              />
            ))}
        </Grid>
        <ResponsiveSections
          sections={sections}
          pageName={`profile_${person.name_zh}`}
        />
        {person.hkfactcheck_id && (
          <Container maxWidth="lg">
            <Fab
              className="clickable"
              onClick={() => {
                trackCustomEvent({
                  category: 'profile',
                  action: 'click_hkfactcheck',
                  label: person.name_zh,
                });
                openInNewTab(
                  `https://legco2020.com/candidates/${person.hkfactcheck_id}/${person.name_zh}`
                );
              }}
              variant="extended"
              size="medium"
              aria-label="add"
              style={{
                position: 'fixed',
                bottom: theme.spacing(2),
                right: theme.spacing(2),
                backgroundColor: '#00897b',
                color: '#FFFFFF',
              }}
            >
              <HKFactcheckIcon
                theme={theme}
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
