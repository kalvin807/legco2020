import React from 'react';
import styled from 'styled-components';
import theme from '@/themes';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SimpleTabs from '@/components/SimpleTabs';
import { Typography } from '@material-ui/core';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

const DesktopWrapper = styled.div`
  .title {
    margin: ${theme.spacing(2)}px 0;
  }
  .content {
    padding: ${theme.spacing(1)}px 0 ${theme.spacing(2)}px;
  }
`;

const ResponsiveSections = ({ sections, pageName }) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return isDesktop ? (
    <>
      {sections.map(section => {
        return (
          <DesktopWrapper>
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
