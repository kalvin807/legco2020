import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';

const UnstyledAppBar = styled(AppBar)`
  background: transparent;
  box-shadow: none;

  button {
    text-transform: inherit;
  }

  .tab {
    color: ${props => props.theme.palette.text.primary};
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const { tabs, onTabChange } = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <UnstyledAppBar position="static" theme={theme}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          {tabs.map(tab => (
            <Tab
              className="tab"
              onClick={() => onTabChange(tab.name)}
              key={tab.title}
              label={tab.title}
              {...a11yProps(0)}
            />
          ))}
        </Tabs>
      </UnstyledAppBar>
      {tabs.map((tab, i) => (
        <TabPanel key={tab.title} value={value} index={i}>
          <div
            style={{
              marginTop: theme.spacing(2),
            }}
          >
            {tab.content}
          </div>
        </TabPanel>
      ))}
    </>
  );
}
