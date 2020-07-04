import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SimpleTabs from '@/components/SimpleTabs';
import { Typography } from '@material-ui/core';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const DesktopWrapper = styled.div`
  .title {
    margin: ${props => props.theme.spacing(2)}px 0;
  }
  .content {
    padding: ${props => props.theme.spacing(1)}px 0 ${props => props.theme.spacing(2)}px;
  }
`;

const ResponsiveSections = ({ sections, pageName }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return isDesktop ? (
    <>
      {sections.map(section => {
        return (
          <DesktopWrapper theme={theme}>
            <div className="title">
              <Typography variant="h4">{section.title}</Typography>
            </div>
            <div className="content">{section.content}</div>
          </DesktopWrapper>
        );
      })}
    </>
  ) : (
    <SimpleTabs
      tabs={sections}
      onTabChange={name => {
        trackCustomEvent({
          category: pageName,
          action: 'tab_select',
          label: name,
        });
      }}
    />
  );
};

export default ResponsiveSections;
