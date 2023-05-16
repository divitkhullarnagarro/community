import { useContext } from 'react';
import style from './../../assets/groupList.module.css';
import darkModeCss from './../../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';
import Skeleton from 'react-loading-skeleton';

const list = [1, 2, 3, 4, 5];

const GroupListSkeleton = (): JSX.Element => {
  const { darkMode } = { ...useContext(WebContext) };

  return (
    <>
      {list.map(() => (
        <>
          <div className={style.groupListBoxContainer}>
            <div className={`${style.groupListHeading} ${darkMode ? darkModeCss.grey_3 : ''}`}>
              <div className={style.groupListHeadingLeft}>
                <Skeleton className={style.groupListLogo} height={32} width={32} />
                <Skeleton
                  className={`${style.groupListName} ${darkMode ? darkModeCss.text_light : ''}`}
                  height={32}
                  width={500}
                />
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default GroupListSkeleton;
