import React from 'react';
import { Grid, Avatar, Typography } from '@material-ui/core';
import Chip from '@/components/Chip';
import styled from 'styled-components';
import theme from '@/themes';
import { useTranslation } from 'react-i18next';
import { navigate } from 'gatsby';

const TradTemplateWrapper = styled.div`
  .block {
    margin: ${theme.spacing(1)}px 0;
  }

  .social {
    font-size: 24px;
  }

  .social svg {
    margin-left: ${theme.spacing(1)}px;
  }
`;

const TradHeader = styled(Grid)`

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
  pageContext: { constituency, councillors, candidates, tags },
}) => {
  const { t } = useTranslation();

  return (
    <TradTemplateWrapper>
      <TradHeader container>
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
            <div className="title">{constituency.name_zh}</div>
          </Grid>
        </Grid>
        <Grid item>
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
        </Grid>
      </TradHeader>
      <Grid className="block" container>
        {tags.map(tag => (
          <Chip label={t(`tag.${tag.i18nKey}`)} variant="outlined" />
        ))}
      </Grid>
      <Typography className="block" variant="body2">
        {constituency.description_zh}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography>現任</Typography>
          <CandidatesWrapper>
            {councillors.map(c => {
              return (
                <div
                  className="avatar-group clickable"
                  onClick={() => {
                    navigate(`/profile/${c.node.uuid}/${c.node.name_zh}`);
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
                    navigate(`/profile/${c.node.uuid}/${c.node.name_zh}`);
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
    </TradTemplateWrapper>
  );
};

export default TradFuncConstituencyTemplate;
