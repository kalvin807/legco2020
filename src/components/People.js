import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';
import { navigate } from 'gatsby';
import theme from '@/themes';

const campColorMapping = {
  demo: theme.palette.warning.main,
  beijing: theme.palette.info.main,
  other: theme.palette.success.main,
};

const CampAvatar = styled(Avatar)`
  width: ${props => props.xsdimension || 48}px;
  height: ${props => props.xsdimension || 48}px;
  border: ${props => props.border || 3}px
    ${props => campColorMapping[props.camp]} solid;
`;

const PeopleWrapper = styled.div`
  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-end;
  }

  ${theme.breakpoints.up('md')} {
    .avatar {
      width: 64px;
      height: 64px;
    }
  }

  .avatar.demo {
    border: 3px ${theme.palette.warning.main} solid;
  }

  .avatar.beijing {
    border: 3px ${theme.palette.info.main} solid;
  }

  .avatar.other {
    border: 3px ${theme.palette.success.main} solid;
  }

  .center {
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PeopleCircle = ({ info }) => {
  const { i18n } = useTranslation();
  const name = withLanguage(i18n, info, 'name');
  return (
    <PeopleWrapper
      className="avatar-group clickable"
      onClick={() => {
        navigate(getLocalizedPath(i18n, `/profile/${info.uuid}/${name}`));
      }}
      onKeyDown={() => {}}
    >
      <div className="center">
        <CampAvatar
          alt={name}
          src={info.img_url}
          camp={info.camp.toLowerCase()}
        />
        <span>
          {`${name}${
            info.tags &&
            info.tags.findIndex(tag => tag.name_zh === '不參加民主派初選') !==
              -1
              ? '*'
              : ''
          }`}
        </span>
      </div>
    </PeopleWrapper>
  );
};

export const PeopleBox = ({ onClick, name, info, subText }) => {
  const Wrapper = styled.div`
    display: flex;

    .main {
      margin-left: ${theme.spacing(1)}px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .subText {
      line-height: 0.8rem;
    }
  `;
  return (
    <Wrapper item onClick={onClick}>
      <CampAvatar
        alt={name}
        src={info.img_url}
        camp={info.camp.toLowerCase()}
        xsdimension={56}
        border={5}
      />
      <div className="main">
        <Typography variant="h5">{name}</Typography>
        <Typography className="subText" variant="caption" color="textSecondary">
          {subText}
        </Typography>
      </div>
    </Wrapper>
  );
};
