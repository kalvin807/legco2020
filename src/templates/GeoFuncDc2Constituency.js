import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { DC2019Result } from '@/data/ElectionResults';
import VoteVsSeatChart from '@/components/charts/VoteVsSeat';
import { calculateSeatBox } from '@/utils';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';
import { PeopleCircle } from '@/components/People';
import SEO from '@/components/seo';
import { useStaticQuery, graphql, navigate } from 'gatsby';


const GeoHeader = styled(Grid)`

  .title-box {
    margin-right: ${props => props.theme.spacing(3)}px;
  }
  }
  .title {
    font-size: 24px;
    font-weight: 700;
  }
`;

const CampWrapper = styled(Grid)`
  .list-number {
    font-size: 32px;
    font-weight: 900;
  }

  .right {
    text-align: right;
  }

  .camp-text {
    color: #000000;
    padding: 3px 5px;
    font-weight: 700;
  }

  .camp-text.demo {
    background: ${props => props.theme.palette.warning.light};
  }

  .camp-text.beijing {
    background: ${props => props.theme.palette.info.light};
  }

  .camp-text.other {
    background: ${props => props.theme.palette.success.light};
  }
`;

const CandidatesWrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.spacing(1)}px;
  grid-template-columns: repeat(3, 1fr);

  ${props => props.theme.breakpoints.up('sm')} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${props => props.theme.breakpoints.up('md')} {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const GeoFuncDc2ConstituencyTemplate = ({
  pageContext: { uri, constituency, candidates },
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

  const demoCandidates = candidates.filter(c => c.node.camp === 'DEMO');
  const beijingCandidates = candidates.filter(c => c.node.camp === 'BEIJING');
  const otherCandidates = candidates.filter(c => c.node.camp === 'OTHER');

  return (
    <>
      <SEO
        uri={uri}
        titleOveride={withLanguage(i18n, constituency, 'name')}
        // TODO: duplicated entries, filter out in SEO later?
        meta={[
          {
            property: 'og:title',
            content: withLanguage(i18n, constituency, 'name'),
          },
          {
            property: 'og:description',
            content: withLanguage(i18n, constituency, 'description'),
          },
        ]}
      />
      <GeoHeader container theme={theme}>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            className="title-box"
          >
            <Typography variant="body2" color="textSecondary">
              {t('no_of_seats', { seats: constituency.seats })}
            </Typography>
            <div className="title">
              {withLanguage(i18n, constituency, 'name')}
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <VoteVsSeatChart
            title={{
              vote: t('dc2019_demo_beijing_ratio'),
              seat: t('simulation_result'),
            }}
            votes={DC2019Result[constituency.key].votes}
            seats={calculateSeatBox(constituency)}
          />
        </Grid>
      </GeoHeader>
      <Typography className="block" variant="body2">
        {withLanguage(i18n, constituency, 'description')}
      </Typography>
      <CampWrapper container spacing={3} theme={theme}>
        <Grid item xs={6}>
          <div>
            <div>
              <span className="camp-text demo">{t('alias.DEMO')}</span>
            </div>
            <div className="list-number">{demoCandidates.length}</div>
            <Typography variant="caption">{t('intented_list')}</Typography>
            <CandidatesWrapper theme={theme}>
              {demoCandidates.map(c => (
                <PeopleCircle
                  onClick={() => {
                    navigate(getLocalizedPath(i18n, `/profile/${c.node.uuid}/${c.node.name_zh}`));
                  }}
                  imgUrl={`${site.siteMetadata.siteUrl}/images/avatars/${c.node.uuid}.png`}
                  key={withLanguage(i18n, c.node, 'name')}
                  info={c.node}
                />
              ))}
            </CandidatesWrapper>
          </div>
          <Typography variant="caption">
            {t('intented_list_postscript')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className="right">
            <div>
              <span className="camp-text beijing">{t('alias.BEIJING')}</span>
            </div>
            <div className="list-number">{beijingCandidates.length}</div>
            <Typography variant="caption">{t('intented_list')}</Typography>
            <CandidatesWrapper mt={2} theme={theme}>
              {beijingCandidates.map(c => (
                <PeopleCircle
                  key={withLanguage(i18n, c.node, 'name')}
                  info={c.node}
                />
              ))}
            </CandidatesWrapper>
          </div>
          {otherCandidates.length ? (
            <div className="right">
              <div>
                <span className="camp-text other">{t('alias.OTHER')}</span>
              </div>
              <Typography variant="caption">{t('intented_list')}</Typography>
              <CandidatesWrapper theme={theme}>
                {otherCandidates.map(c => (
                  <PeopleCircle key={c.node} info={c.node} />
                ))}
              </CandidatesWrapper>
            </div>
          ) : (
            ''
          )}
        </Grid>
      </CampWrapper>
      {/* <CampWrapper container spacing={3}>
        {['DEMO', 'BEIJING'].map(camp => {
          return (
            <Grid item xs={6} key={camp}>
              <Typography variant="h6">{t('coordination_method')}</Typography>

              <Typography variant="body1">
                {constituency[`stage_1_title_${camp.toLowerCase()}_zh`]}
              </Typography>

              <Typography variant="body1">
                {constituency[`stage_1_description_${camp.toLowerCase()}_zh`]}
              </Typography>
            </Grid>
          );
        })}
      </CampWrapper>
      <CampWrapper container spacing={3}>
        {['DEMO', 'BEIJING'].map(camp => {
          return (
            <Grid item xs={6} key={camp}>
              <Typography variant="h6">{t('vote_allocaton')}</Typography>

              <Typography variant="body1">
                {constituency[`stage_2_title_${camp.toLowerCase()}_zh`]}
              </Typography>

              <Typography variant="body1">
                {constituency[`stage_2_description_${camp.toLowerCase()}_zh`]}
              </Typography>
            </Grid>
          );
        })}
      </CampWrapper> */}
    </>
  );
};

export default GeoFuncDc2ConstituencyTemplate;
