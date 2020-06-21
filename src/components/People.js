import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import { withLanguage, getLocalizedPath } from '@/utils/i18n';
import { navigate } from 'gatsby';
import theme from '@/themes';

const PeopleWrapper = styled.div`
  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-end;
  }

  ${theme.breakpoints.up('sm')} {
    .avatar {
      width: 48px;
      height: 48px;
    }
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

export const PeopleCircle = ({ info, showName = true }) => {
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
        <Avatar
          className={`avatar ${info.camp.toLowerCase()}`}
          alt={name}
          src={info.img_url}
        />
        {showName && (
          <span>{`${name}${info.primary === 'FALSE' ? '*' : ''}`}</span>
        )}
      </div>
    </PeopleWrapper>
  );
};
