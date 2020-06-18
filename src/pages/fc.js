import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import theme from '@/themes';
import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import SEO from '../components/seo';

const mapCampColor = {
  DEMO: theme.palette.warning.main,
  BEIJING: theme.palette.info.main,
  OTHER: theme.palette.success.main,
};

const AvatarContainer = styled(Grid)`
  margin-right: ${theme.spacing(2)}px;
  margin-bottom: ${theme.spacing(1)}px;

  .avatar {
    width: 64px;
    height: 64px;
    border: 3px ${props => mapCampColor[props.camp]} solid;
  }

  .name {
    font-size: ${theme.typography.body1};
    margin-top: ${theme.spacing(1)}px;
  }

  .hint {
    font-size: ${theme.typography.caption};
  }
`;

const AvatarChart = props => {
  const { content } = props;
  const { i18n } = useTranslation();
  return (
    <Grid container>
      {content.map(c => (
        <AvatarContainer
          item
          key={`${withLanguage(i18n, c, 'councillor_name')}`}
          camp={c.camp}
        >
          <Grid container direction="column" alignItems="center">
            <Avatar
              className="avatar"
              alt={withLanguage(i18n, c, 'alias')}
              src={c.image_url}
            />
            <span className="title">{withLanguage(i18n, c, 'alias')}</span>
            <span className="hint">
              {withLanguage(i18n, c, 'councillor_name')}
            </span>
          </Grid>
        </AvatarContainer>
      ))}
    </Grid>
  );
};

const FcPage = props => {
  const {
    data: {
      allFcOverview: { edges: fc },
    },
  } = props;

  const { i18n } = useTranslation();
  const grouppedFc = fc.reduce((a, c) => {
    const { node } = c;
    const idx = a.findIndex(
      element => element.title === withLanguage(i18n, node, 'chance')
    );
    if (idx < 0) {
      return [
        ...a,
        {
          title: withLanguage(i18n, node, 'chance'),
          order: node.chance_order,
          content: [node],
        },
      ];
    }

    a[idx].content.push(node);
    return a;
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <SEO title="FC" />
        <Typography variant="h5" gutterBottom>
          當民主陣營談35+，究竟機會有多大？
        </Typography>
        <Typography variant="h5" gutterBottom>
          {`功能組別：${grouppedFc
            .filter(g => g.order <= 2)
            .reduce((a, c) => a + c.content.length, 0)}席 - ${grouppedFc
            .filter(g => g.order <= 3)
            .reduce((a, c) => a + c.content.length, 0)}席`}
        </Typography>
        {grouppedFc
          .sort((a, b) => a.order - b.order)
          .map(group => {
            return (
              <Grid key={group.title} container spacing={3}>
                <Grid item xs={12}>
                  <Container disableGutters>
                    <Typography variant="h5" gutterBottom>
                      {`${group.title} (${group.content.length})`}
                    </Typography>
                    <AvatarChart content={group.content} />
                  </Container>
                </Grid>
              </Grid>
            );
          })}
      </Container>
    </>
  );
};

export default FcPage;

export const FcOverviewPageQuery = graphql`
  query {
    allFcOverview {
      edges {
        node {
          councillor_name_zh
          councillor_name_en
          alias_zh
          alias_en
          chance_order
          chance_zh
          camp
          image_url
        }
      }
    }
  }
`;
