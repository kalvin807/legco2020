import React from 'react';
import styled from 'styled-components';
import theme from '@/themes';

const ListWrapper = styled.div`
  margin: ${theme.spacing(2)}px 0;
`;
const List = ({ children }) => {
  return <ListWrapper>{children}</ListWrapper>;
};

export default List;
