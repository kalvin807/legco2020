import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import styled from 'styled-components';
import theme from '@/themes';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

const CandidatesWrapper = styled.div`
  display: grid;
  grid-gap: ${theme.spacing(1)}px;
  grid-template-columns: repeat(3, 1fr);

  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-end;

    .avatar {
      width: 64px;
      height: 64px;
    }

    .avatar.demo {
      border: 3px ${theme.palette.warning.main} solid;
    }

    .avatar.beijing {
      border: 3px ${theme.palette.info.main} solid;
    }

    .title {
      text-align: center;
    }
  }
`;

const TradFuncConstituencyTemplate = ({
  pageContext: { constituency, councillors, candidates },
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="caption">
        {t('no_of_seats', { seats: constituency.seats })}
      </Typography>
      <Typography variant="h6">
        {t(`electors_composition_${constituency.electors_composition}`)}
      </Typography>
      <Typography variant="h2">{constituency.name_zh}</Typography>
      <Typography variant="body1">
        {`選民人數：${constituency.electors_total_2020}（較16年${
          Number(constituency.electors_total_2020) -
          Number(constituency.electors_total_2016)
        }）`}
      </Typography>
      <Typography variant="body1">
        票差：
        {constituency.last_election_vote_beijing_minus_demo}
      </Typography>
      <Typography variant="body1">{constituency.description_zh}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography>現任</Typography>
          <CandidatesWrapper>
            {councillors.map(c => {
              return (
                <div
                  className="avatar-group clickable"
                  onClick={() => {
                    navigate(`/profile/${c.node.name_zh}`);
                  }}
                >
                  <Avatar
                    className={`avatar ${c.node.camp.toLowerCase()}`}
                    alt={c.node.name_zh}
                    src={c.image_url}
                  />
                  <span className="title">{c.node.name_zh}</span>
                </div>
              );
            })}
          </CandidatesWrapper>
        </Grid>
        <Grid item xs={9}>
          <Typography>候選人</Typography>
          <CandidatesWrapper>
            {candidates.map(c => {
              return (
                <div
                  className="avatar-group"
                  onClick={() => {
                    navigate(`/profile/${c.node.name_zh}`);
                  }}
                >
                  <Avatar
                    className={`avatar ${c.node.camp.toLowerCase()}`}
                    alt={c.node.name_zh}
                    src={c.image_url}
                  />
                  <span className="title">{c.node.name_zh}</span>
                </div>
              );
            })}
          </CandidatesWrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default TradFuncConstituencyTemplate;
