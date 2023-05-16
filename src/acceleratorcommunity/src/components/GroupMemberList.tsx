import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';
import groupLogo from '../assets/images/ProfilePic.jpeg';
import style from '../assets/groupMemberList.module.css';
import { useRouter } from 'next/router';
import {
  getFirstTenMemberListUrl,
  getMemberListUrl,
  viewProfileLinkUrl,
} from 'assets/helpers/constants';
import darkTheme from '../assets/darkTheme.module.css';
import WebContext from '../Context/WebContext';
import { useContext, useEffect, useRef, useState } from 'react';
import AxiosRequest from 'src/API/AxiosRequest';
import DotLoader from './DotLoader';

type GroupMembersListProps = ComponentProps & {
  fields: {
    heading: string;
  };
};

const GroupMemberList = (props: GroupMembersListProps): JSX.Element => {
  const { darkMode } = {
    ...useContext(WebContext),
  };

  const [memberList, setMemberList] = useState<any>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);

  const counter = useRef(0);

  console.log(props);
  const router = useRouter();
  console.log('groupMemberquery', router.query.groupId);
  const getMemberList = async () => {
    try {
      const res: any = await AxiosRequest({
        url: getFirstTenMemberListUrl,
        method: 'GET',
      });
      if (res.data) {
        setMemberList(res.data);
        if (res.hasMorePage) {
          setShowSeeMoreButton(true);
        } else {
          setShowSeeMoreButton(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMemberList();
  }, []);
  const getMoreMembers = async (e: any) => {
    counter.current = 1;
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setLoadingMore(true);
      try {
        const res: any = await AxiosRequest({
          url: `${getMemberListUrl}/${router?.query?.groupId}/members?page=${pageNumber}&size=10`,
          method: 'GET',
        });
        setLoadingMore(false);
        setMemberList([...memberList, ...res.data]);
        setPageNumber((page) => page + 1);
        if (!res.hasMorePage) {
          setShowSeeMoreButton(false);
          setLoadingMore(false);
        }
        console.log('groupMemberData', res.data);
      } catch (error) {
        console.log('groupMemberData', error);
        setLoadingMore(false);
      }
    }
  };
  const onMemberClick = (email: string) => {
    router.push(`${viewProfileLinkUrl}${email}`);
  };
  return (
    <>
      <div className={`${style.groupMemberListBox} ${darkMode && darkTheme.grey_3}`}>
        <h3 className={`${style.groupMemberTitle} ${darkMode && darkTheme.text_green}`}>
          Members List
        </h3>
        <div
          className={`${style.groupMemberList} ${darkMode && darkTheme.grey_1} ${
            style.groupMemberWithMoreButton
          }`}
          onScroll={getMoreMembers}
        >
          {memberList.map((ele: any) => (
            <>
              <div
                key={ele.objectId}
                className={`${style.groupMemberListHeading} ${darkMode && darkTheme.grey_1}`}
                onClick={() => {
                  onMemberClick(ele.objectId);
                }}
              >
                <div
                  className={`${style.groupMemberListHeadingLeft} ${
                    darkMode && style.groupMemberListHeadingDarkTheme
                  } ${darkMode && darkTheme.grey_2}`}
                >
                  <Image
                    // src={ele.profilePictureUrl ? ele.profilePictureUrl : groupLogo.src}
                    src={groupLogo}
                    alt={ele.name}
                    className={style.groupMemberListLogo}
                    height={50}
                    width={50}
                  />
                  <div
                    className={`d-flex flex-column ${style.groupMemberNameAndEmail}  ${
                      darkMode && darkTheme.text_light
                    }`}
                  >
                    <h5
                      className={`${style.groupMemberListName} `}
                    >{`${ele.firstName} ${ele.firstName}`}</h5>
                    <h6 className={`${style.groupMemberListEmail}`}>{ele.objectId}</h6>
                  </div>
                </div>
              </div>
            </>
          ))}
          {loadingMore && (
            <div style={{ margin: '18px 0' }}>
              <DotLoader />
            </div>
          )}
          {showSeeMoreButton && !loadingMore && counter.current < 1 && (
            <div onClick={getMoreMembers} className={style.seeMore}>
              more+
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<GroupMembersListProps>(GroupMemberList);
export default GroupMemberList;
