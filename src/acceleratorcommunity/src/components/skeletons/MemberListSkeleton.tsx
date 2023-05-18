import style from './../../assets/groupMemberList.module.css';
import darkTheme from './../../assets/darkTheme.module.css';
import WebContext from './../../Context/WebContext';
import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

function MemberListSkeleton() {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  const memberList = [1, 2, 3, 4, 5];

  return (
    <>
      {memberList.map(() => (
        <>
          <div className={`${style.groupMemberListHeading} ${darkMode && darkTheme.grey_1}`}>
            <div
              className={`${style.groupMemberListHeadingLeft} ${
                darkMode && style.groupMemberListHeadingDarkTheme
              } ${darkMode && darkTheme.grey_2}`}
            >
              <Skeleton className={style.groupMemberListLogo} height={50} width={50} />
              <div
                className={`d-flex flex-column ${style.groupMemberNameAndEmail}  ${
                  darkMode && darkTheme.text_light
                }`}
              >
                <Skeleton className={`${style.groupMemberListName}`} width={500} />
                <Skeleton className={`${style.groupMemberListEmail}`} width={500} />
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default MemberListSkeleton;
