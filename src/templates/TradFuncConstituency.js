import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Chip from '@/components/Chip';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import { PeopleCircle } from '@/components/People';
import SEO from '@/components/seo';

const TradTemplateWrapper = styled.div`
  .block {
    margin: ${props => props.theme.spacing(1)}px 0;
  }

  .social {
    font-size: 24px;
  }

  .social svg {
    margin-left: ${props => props.theme.spacing(1)}px;
  }
`;

const TradHeader = styled(Grid)`

  .title-box {
    margin-right: ${props => props.theme.spacing(3)}px;
  }
  }
  .title {
    font-size: 24px;
    font-weight: 700;
  }
`;

const CandidatesWrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.spacing(1)}px;
  grid-template-columns: repeat(4, 1fr);
`;

const TradFuncConstituencyTemplate = ({
  pageContext: { uri, constituency, councillors, candidates, tags },
}) => {
  const { t, i18n } = useTranslation();

  const theme = useTheme();

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
      <TradTemplateWrapper theme={theme}>
        <TradHeader container theme={theme}>
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
            <Typography variant="body1">
              {`${t('number_of_voters')} ${
                constituency.electors_total_2020
              }（較16年${
                Number(constituency.electors_total_2020) -
                Number(constituency.electors_total_2016)
              }）`}
            </Typography>
            <Typography variant="body1">
              {t('vote_diff')}{' '}
              {constituency.last_election_vote_beijing_minus_demo}
            </Typography>
          </Grid>
        </TradHeader>
        <Grid className="block" container>
          {tags.map(tag => (
            <Chip label={t(`tag.${tag.i18nKey}`)} variant="outlined" />
          ))}
        </Grid>
        <Typography className="block" variant="body2">
          {withLanguage(i18n, constituency, 'description')}
        </Typography>
        <Typography variant="h5">{t('current_legislator')}</Typography>
        <Grid container>
          {councillors.map(c => (
            <PeopleCircle key={c.node} info={c.node} />
          ))}
        </Grid>
        <Typography variant="h5">{t('intended')}</Typography>
        <CandidatesWrapper theme={theme}>
          {candidates
            .filter(c => c.node.is_2020_candidate === 'TRUE')
            .map(c => (
              <PeopleCircle key={c.node} info={c.node} />
            ))}
        </CandidatesWrapper>
      </TradTemplateWrapper>
    </>
  );
};

export default TradFuncConstituencyTemplate;
