import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import theme from '@/themes';
import { useTranslation } from 'react-i18next';
import { DC2019Result } from '@/data/ElectionResults';
import VoteVsSeatChart from '@/components/charts/VoteVsSeat';
import { calculateSeatBoxForPrimary } from '@/utils';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';
import { navigate } from 'gatsby';
import { PeopleCircle } from '@/components/People';

const Header = styled(Grid)`
  margin-bottom: ${theme.spacing(2)}px;

  .title-box {
    margin-right: ${theme.spacing(3)}px;
  }
  }
  .title {
    font-size: 24px;
    font-weight: 700;
  }
`;

const CandidatesWrapper = styled.div`
  margin-top: ${theme.spacing(2)}px;
  display: grid;
  grid-gap: ${theme.spacing(1)}px;
  grid-template-columns: repeat(2, 1fr);

  ${theme.breakpoints.up('sm')} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${theme.breakpoints.up('md')} {
    grid-template-columns: repeat(6, 1fr);
  }

  .candi-box {
    display: flex;
    align-items: center;

    .candi-box-info {
      margin-left: ${theme.spacing(1)}px;
      display: flex;
      flex-direction: column;
    }
  }
`;

const PrimaryTemplate = ({ pageContext: { constituency, candidates } }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Header container>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            className="title-box"
          >
            <Typography variant="body2" color="textSecondary">
              {withLanguage(i18n, constituency, 'primary_rule')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {t('list_count', { list_count: candidates.length })}
            </Typography>
            <div className="title">
              {withLanguage(i18n, constituency, 'name')}
            </div>
          </Grid>
        </Grid>
        <Grid item>
          {DC2019Result[constituency.key] && (
            <VoteVsSeatChart
              title={{
                vote: t('dc2019_demo_beijing_ratio'),
                seat:
                  Number(constituency.target) > 0
                    ? t('demo_target')
                    : t('demo_target_not_decide'),
              }}
              votes={DC2019Result[constituency.key].votes}
              seats={calculateSeatBoxForPrimary(constituency)}
            />
          )}
        </Grid>
      </Header>
      {withLanguage(i18n, constituency, 'primary_description') && (
        <Typography
          className="block"
          variant="body2"
          dangerouslySetInnerHTML={{
            __html: withLanguage(i18n, constituency, 'primary_description'),
          }}
        />
      )}
      <CandidatesWrapper>
        {candidates.map(c => (
          <Grid
            item
            className="candi-box clickable"
            key={c.node.name_zh}
            onClick={() => {
              navigate(
                getLocalizedPath(
                  i18n,
                  `/profile/${c.node.uuid}/${c.node.name_zh}`
                )
              );
            }}
          >
            <PeopleCircle key={c.node} info={c.node} showName={false} />
            <div className="candi-box-info">
              <Typography variant="h5">
                {withLanguage(i18n, c.node, 'name')}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {c.node.political_affiliations &&
                  c.node.political_affiliations
                    .map(pa => withLanguage(i18n, pa, 'alias'))
                    .join('/')}
              </Typography>
            </div>
          </Grid>
        ))}
      </CandidatesWrapper>
    </>
  );
};

export default PrimaryTemplate;
