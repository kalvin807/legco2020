import React, { useState } from 'react';
import SEO from '@/components/seo';
import { graphql, navigate } from 'gatsby';
import SingleStackedBarChart from '@/components/charts/SingleStackedBar';
import SeatRowChart from '@/components/charts/SeatRow';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Collapse, useMediaQuery, Grid } from '@material-ui/core';
import SimpleTabs from '@/components/SimpleTabs';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PastElectionResult } from '@/data/ElectionResults';
import { seatColorMapping } from '@/config';
import { calculateSeatBox } from '@/utils';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';

const FullWidithWrapper = styled.div`
  margin: 0 -${props => props.theme.spacing(2)}px;

  .fullWidth-title {
    font-weight: 700;
    text-align: center;
    padding: ${props => props.theme.spacing(1)}px 0;
  }
`;

const Container = styled.div`
  margin: 0 ${props => props.theme.spacing(2)}px;
`;

const DirectHeader = styled.div`
  margin: ${props => props.theme.spacing(2)}px 0;
`;

const DirectWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${props => props.theme.spacing(1)}px;

  .seat {
    padding: ${props => props.theme.spacing(1)}px ${props => props.theme.spacing(1.5)}px;
    border-radius: 2px;
    box-shadow: 0 1px 6px 0 ${props => props.theme.palette.divider};

    .title {
      display: flex;
      justify-content: space-between;
    }

    .sub-title {
      font-size: 0.65rem;
    }

    .roundup-title {
      margin-top: ${props => props.theme.spacing(0.5)}px;
      display: flex;
      justify-content: space-between;
    }

    .roundup-title div {
      line-height: 0.5;
    }

    .roundup-title div:last-child {
      text-align: right;
    }

    .roundup {
      display: flex;
      justify-content: space-between;
      line-height: 1.2;
    }

    .large-number {
      font-size: 2rem;
      font-weight: 900;
    }

    .demo {
      text-align: left;
      color: ${props => props.theme.palette.warning.main};
    }

    .beijing {
      text-align: right;
      color: ${props => props.theme.palette.info.main};
    }

    .other {
      color: ${props => props.theme.palette.success.main};
    }
  }
`;

const TradFCWrapper = styled.div`
  .situation-group {
    margin-bottom: ${props => props.theme.spacing(3)}px;
  }

  .seat-group {
    margin-top: ${props => props.theme.spacing(1.5)}px;
    display: grid;
    grid-gap: ${props => props.theme.spacing(1)}px;
  }

  .group-title {
    font-weight: 500;
    margin: ${props => props.theme.spacing(2)}px 0;
  }

  .fierce {
    grid-template-columns: repeat(1, 1fr);
  }

  ${props => props.theme.breakpoints.up('sm')} {
    .fierce {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .probably_demo,
  .probably_beijing {
    grid-template-columns: repeat(2, 1fr);
  }

  .seat {
    padding: ${props => props.theme.spacing(1)}px ${props => props.theme.spacing(1.5)}px;
    border-radius: 2px;
    box-shadow: 0 1px 6px 0 ${props => props.theme.palette.divider};

    .title {
      display: flex;
      justify-content: space-between;
      line-height: 0;
    }
  }

  .seat.demo {
    border-top: 3px ${props => props.theme.palette.warning.main} solid;
  }

  .seat.beijing {
    border-top: 3px ${props => props.theme.palette.info.main} solid;
  }
`;

const ExpandButton = styled.div`
  text-align: center;
`;

const IndexPage = props => {
  const {
    data: { allGeoFuncDc2, allTradFunc, candidatesGroupByCamp },
  } = props;
  const [showSeatHistory, setShowSeatHistory] = useState(false);
  const seats = [
    ...Array.from(allGeoFuncDc2.nodes),
    ...Array.from(allTradFunc.nodes),
  ];

  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  // group data for chart
  const seatCount = {
    UNRESOLVED: 70,
  };

  seats.forEach(seat => {
    Object.keys(seat)
      .filter(k => k.includes('expected'))
      .map(key => {
        const seatType = `${seat.type}_${key}`.toUpperCase();
        if (typeof seatCount[seatType] === 'undefined') {
          seatCount[seatType] = Number(seat[key]);
        } else {
          seatCount[seatType] += Number(seat[key]);
        }
        seatCount.UNRESOLVED -= Number(seat[key]);
      });
  });

  // Build chart data
  const chartData = Object.keys(seatColorMapping).map(scm => ({
    key: scm,
    label: t(`stackedBar.${scm}`),
    value: seatCount[scm],
    color: seatColorMapping[scm],
  }));

  // Build chart data
  const summary = {
    DEMO: {
      name: t('alias.DEMO'),
      pos: 'start',
      total: 0,
      background: theme.palette.warning.light,
    },
    BEIJING: {
      name: t('alias.BEIJING'),
      pos: 'end',
      total: 0,
      background: theme.palette.info.light,
    },
  };

  chartData.forEach(c => {
    if (c.key.includes('DEMO')) {
      summary.DEMO.total += c.value;
    }
    if (c.key.includes('BEIJING')) {
      summary.BEIJING.total += c.value;
    }
  });

  const { i18n } = useTranslation();

  const renderDirect = edges => {
    return (
      <>
        <DirectHeader theme={theme}>
          <Typography variant="body2">
            {t('direct_election_description')}
          </Typography>
        </DirectHeader>
        <DirectWrapper theme={theme}>
          {edges
            .sort((a, b) => {
              if (a.order > b.order) return 1;
              if (a.order < b.order) return -1;
              return 0;
            })
            .map(e => {
              const candiBeijing =
                candidatesGroupByCamp.group
                  .find(g => g.camp === 'BEIJING')
                  .edges.filter(c => c.node.constituency === e.key).length || 0;
              const candiOther =
                candidatesGroupByCamp.group
                  .find(g => g.camp === 'OTHER')
                  .edges.filter(c => c.node.constituency === e.key).length || 0;
              const candiDemo =
                candidatesGroupByCamp.group
                  .find(g => g.camp === 'DEMO')
                  .edges.filter(c => c.node.constituency === e.key).length || 0;

              return (
                <div
                  key={e.key}
                  className="seat clickable"
                  onClick={() => {
                    navigate(getLocalizedPath(i18n, `/constituency/${e.key}`));
                  }}
                >
                  <div className="title">
                    <Typography variant="caption" color="textSecondary">
                      {t('no_of_seats', { seats: e.seats })}
                    </Typography>
                    <div className="sub-title">{t('estimated_result')}</div>
                  </div>
                  <div className="title">
                    <div>
                      <Typography variant="h5">
                        {withLanguage(i18n, e, 'alias')}
                      </Typography>
                    </div>
                    <div>
                      <div style={{ width: '40px', height: '40px' }}>
                        <SeatRowChart
                          width={40}
                          height={40}
                          data={calculateSeatBox(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="roundup-title">
                    <div>
                      <Typography variant="caption">
                        {t('alias.DEMO')}
                      </Typography>
                      <div className="sub-title">{t('intented_list')}</div>
                    </div>
                    <div>
                      <Typography variant="caption">
                        {t('alias.BEIJING')}
                      </Typography>
                      <div className="sub-title">{t('intented_list')}</div>
                    </div>
                  </div>
                  <div className="roundup">
                    <div className="large-number demo">{candiDemo || '-'}</div>
                    <div>
                      <Typography variant="body1" color="textSecondary">
                        vs
                      </Typography>
                    </div>
                    {candiOther ? (
                      <>
                        <div className="large-number other">
                          {candiOther || '-'}
                        </div>
                        <div>
                          <Typography variant="body1" color="textSecondary">
                            vs
                          </Typography>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                    <div className="large-number beijing">
                      {candiBeijing || '-'}
                    </div>
                  </div>
                </div>
              );
            })}
        </DirectWrapper>
      </>
    );
  };

  const renderTradFC = edges => {
    const grouppedFc = edges.reduce((a, c) => {
      const idx = a.findIndex(
        element => element.title === t(`tag.${c.situation}`)
      );
      if (idx < 0) {
        return [
          ...a,
          {
            key: c.key,
            title: t(`tag.${c.situation}`),
            situation: c.situation,
            order: parseFloat(c.situation_order),
            content: [c],
          },
        ];
      }

      a[idx].content.push(c);
      return a;
    }, []);

    return (
      <TradFCWrapper theme={theme}>
        {grouppedFc
          .sort((a, b) => {
            if (a.order > b.order) return 1;
            if (a.order < b.order) return -1;
            return 0;
          })
          .map(group => {
            return (
              <div className="situation-group" key={`group-${group.title}`}>
                <div className="group-title">
                  {t('no_of_seats_fc', {
                    title: group.title,
                    seats: group.content.reduce(
                      (a, c) => a + Number(c.seats),
                      0
                    ),
                  })}
                </div>
                <Typography variant="body2">
                  {t(`${group.situation}_description`)}
                </Typography>
                <div className={`seat-group ${group.situation}`}>
                  {group.content
                    .sort((a, b) => {
                      if (Number(a.situation_order) > Number(b.situation_order))
                        return 1;
                      if (Number(a.situation_order) < Number(b.situation_order))
                        return -1;
                      return 0;
                    })
                    .map(c => {
                      const expectedWinDemo = Number(c.expected_win_demo) || 0;
                      // const unresolvedSeats = Number(c.unresolved_seats) || 0
                      const expectedWinBeijing =
                        Number(c.expected_win_beijing) || 0;

                      let className = '';
                      if (expectedWinDemo > expectedWinBeijing) {
                        className = 'demo';
                      } else if (expectedWinDemo < expectedWinBeijing) {
                        className = 'beijing';
                      }

                      return (
                        <div
                          key={c.key}
                          className={`seat ${className}`}
                          // onClick={() => {
                          //   navigate(
                          //     getLocalizedPath(i18n, `/constituency/${c.key}`)
                          //   );
                          // }}
                        >
                          <Typography variant="caption" color="textSecondary">
                            {c.seats}席 -{' '}
                            {t(
                              `tag.electors_composition_${c.electors_composition}`
                            )}
                          </Typography>
                          <Typography variant="h5">
                            {withLanguage(i18n, c, 'name')}
                          </Typography>
                          {/* {c.situation !== 'uncontested' ? (
                            <>
                              <Typography variant="body2">
                                親中 - 民主 ={' '}
                                {c.last_election_vote_beijing_minus_demo}
                              </Typography>
                              <Typography variant="body2">
                                新增選民 + 上屆未投票 ={' '}
                                {Number(c.electors_total_2020) -
                                  Number(c.electors_total_2016) +
                                  Number(c.electors_total_2016) -
                                  Number(c.last_election_voted_count)}
                              </Typography>
                            </>
                          ) : null} */}

                          {/* <FCStackedBarChart data={{
                            electors_total_2020: Number(c.electors_total_2020),
                            electors_total_2016: Number(c.electors_total_2016),
                            last_election_vote_beijing_minus_demo: Number(c.last_election_vote_beijing_minus_demo),
                            last_election_voted_count: Number(c.last_election_voted_count)
                        }}/> */}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </TradFCWrapper>
    );
  };

  return (
    <>
      <SEO title="Home" />
      <FullWidithWrapper theme={theme}>
        <SingleStackedBarChart
          data={chartData}
          summary={summary}
          title={t('simulation_result')}
        />
        <ExpandButton onClick={() => setShowSeatHistory(!showSeatHistory)}>
          {showSeatHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ExpandButton>
        <Collapse in={showSeatHistory} timeout={100}>
          {PastElectionResult.map(r => (
            <SingleStackedBarChart
              key={r.year}
              data={r.result}
              summary={r.summary}
              title={r.year}
            />
          ))}
        </Collapse>
        {isDesktop ? (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <div className="fullWidth-title">{t('geo_func_dc2')}</div>
              {renderDirect(allGeoFuncDc2.nodes)}
            </Grid>
            <Grid item xs={6}>
              <div className="fullWidth-title">{t('trad_func')}</div>
              {renderTradFC(allTradFunc.nodes)}
            </Grid>
          </Grid>
        ) : (
          <SimpleTabs
            tabs={[
              {
                name: 'geo_func_dc2',
                title: t('geo_func_dc2'),
                content: (
                  <Container theme={theme}>{renderDirect(allGeoFuncDc2.nodes)}</Container>
                ),
              },
              {
                name: 'trad_func',
                title: t('trad_func'),
                content: (
                  <Container theme={theme}>{renderTradFC(allTradFunc.nodes)}</Container>
                ),
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
        )}
      </FullWidithWrapper>
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
  query {
    allGeoFuncDc2 {
      nodes {
        key
        type
        order
        seats
        situation
        situation_order
        name_zh
        name_en
        alias_zh
        alias_en
        seats
        unresolved_seats
        expected_win_demo
        expected_win_beijing
        expected_win_other
      }
    }
    allTradFunc {
      nodes {
        key
        type
        order
        seats
        electors_composition
        electors_total_2016
        electors_total_2020
        last_election_vote_beijing_minus_demo
        last_election_voted_count
        situation
        situation_order
        unresolved_seats
        expected_win_beijing
        expected_win_demo
        expected_win_other
        name_zh
        name_en
        alias_zh
        alias_en
      }
    }
    candidatesGroupByCamp: allCandidates(filter: { enabled: { eq: "Y" } }) {
      group(field: camp) {
        camp: fieldValue
        edges {
          node {
            constituency
          }
        }
      }
    }
  }
`;
