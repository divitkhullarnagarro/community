// import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';
import groupBackground from '../assets/images/groupBackground.svg';
import groupLogoImg from '../assets/images/groupLogoImg.svg';

import style from '../assets/groupPageHeader.module.css';
import { useState } from 'react';
type GroupPageHeaderProps = ComponentProps & {
  fields: {
    heading: string;
  };
};

const GroupPageHeader = (props: GroupPageHeaderProps): JSX.Element => {
  // console.log('Group Page Header', props);
  props;
  const [joinValue, setJoinValue] = useState(true);
  const [leaveValue, setLeaveValue] = useState(false);

  const onClickJoinButton = () => {
    setLeaveValue(true);
    setJoinValue(false);
  };

  const onLeaveButtonClick = () => {
    setJoinValue(true);
    setLeaveValue(false);
  };
  return (
    <>
      <div className={style.groupPageHeader}>
        <Image src={groupBackground} className={style.groupPageBackground} />
        <div className={`d-flex align-items-center justify-content-between ms-2 me-4`}>
          <div className={`d-flex align-items-center ${style.groupLogoAndName}`}>
            <Image src={groupLogoImg} height={100} width={100} className={style.groupPageLogo} />
            <h3>Group Name</h3>
          </div>
          {joinValue && (
            <button className={`btn  ${style.joinButton}`} onClick={onClickJoinButton}>
              <svg
                style={{ color: 'blue' }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />{' '}
                </g>
              </svg>
              &nbsp; Join
            </button>
          )}
          {leaveValue && (
            <button className={`btn  ${style.leaveButton}`} onClick={onLeaveButtonClick}>
              <svg
                style={{ color: 'red' }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 12-4-4m4 4-4 4m4-4H9m5 9a9 9 0 1 1 0-18"
                  fill="red"
                ></path>
              </svg>
              &nbsp; Leave
            </button>
          )}
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<GroupPageHeaderProps>(GroupPageHeader);
export default GroupPageHeader;
