import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { withLanguage } from '@/utils/i18n';
import { useTheme } from '@material-ui/core/styles';

const campColorMapping = (camp, theme) => {
  const mapping = {
    demo: theme.palette.warning.main,
    beijing: theme.palette.info.main,
    other: theme.palette.success.main,
  }
  return mapping[camp]
};

const CampAvatar = styled(Avatar)`
  width: ${props => props.xsdimension || 48}px;
  height: ${props => props.xsdimension || 48}px;
  border: ${props => (props.camp ? props.border || 3 : 0)}px
    ${props => campColorMapping(props.camp, props.theme)} solid;
`;

const PeopleWrapper = styled.div`
  .avatar-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-end;
  }

  ${props => props.theme.breakpoints.up('md')} {
    .avatar {
      width: 64px;
      height: 64px;
    }
  }

  .avatar.demo {
    border: 3px ${props => props.theme.palette.warning.main} solid;
  }

  .avatar.beijing {
    border: 3px ${props => props.theme.palette.info.main} solid;
  }

  .avatar.other {
    border: 3px ${props => props.theme.palette.success.main} solid;
  }

  .center {
    font-size: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PeopleCircle = ({
  info,
  imgUrl,
  onClick,
  xsdimension,
  showName = true,
  ...props
}) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const name = withLanguage(i18n, info, 'name');
  return (
    <PeopleWrapper
      className="avatar-group clickable"
      onClick={onClick}
      onKeyDown={() => {}}
      theme={theme}
    >
      <div className="center" {...props}>
        <CampAvatar
          alt={name}
          src={imgUrl}
          camp={info.camp && info.camp.toLowerCase()}
          xsdimension={xsdimension}
          theme={theme}
        >
          <img
            alt={name}
            src={info.img_url}
            style={{
              maxWidth: '100%',
            }}
          />
        </CampAvatar>
        {showName && (
          <span>
            {`${name}${
              info.tags &&
              info.tags.findIndex(tag => tag.name_zh === '不參加民主派初選') !==
                -1
                ? '*'
                : ''
            }`}
          </span>
        )}
      </div>
    </PeopleWrapper>
  );
};

export const PeopleBox = ({ onClick, name, info, subText, imgUrl }) => {
  const theme = useTheme();
  const Wrapper = styled.div`
    display: flex;

    .main {
      margin-left: ${props => props.theme.spacing(1)}px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .subText {
      line-height: 0.8rem;
    }
  `;
  return (
    <Wrapper item onClick={onClick} theme={theme}>
      <CampAvatar
        alt={name}
        src={imgUrl}
        camp={info.camp.toLowerCase()}
        xsdimension={56}
        border={5}
        theme={theme}
      >
        <img
          alt={name}
          src={info.img_url}
          style={{
            maxWidth: '100%',
          }}
        />
      </CampAvatar>
      <div className="main">
        <Typography variant="h5">{name}</Typography>
        <Typography className="subText" variant="caption" color="textSecondary">
          {subText}
        </Typography>
      </div>
    </Wrapper>
  );
};
