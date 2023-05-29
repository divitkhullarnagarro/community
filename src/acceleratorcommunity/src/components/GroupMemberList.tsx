import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';
import groupLogo from '../assets/images/ProfilePic.jpeg';
import style from '../assets/groupMemberList.module.css';
import { useRouter } from 'next/router';
import { getMemberListUrl, viewProfileLinkUrl } from 'assets/helpers/constants';
import darkTheme from '../assets/darkTheme.module.css';
import WebContext from '../Context/WebContext';
import { useContext, useEffect, useState } from 'react';
import AxiosRequest from 'src/API/AxiosRequest';
import DotLoader from './DotLoader';
import MemberListSkeleton from './skeletons/MemberListSkeleton';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type GroupMembersListProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        heading: {
          jsonValue: Field<string>;
        };
        createGroupBtnLabel: {
          jsonValue: Field<string>;
        };
      };
    };
  };
};

const GroupMemberList = (props: GroupMembersListProps): JSX.Element => {
  const { darkMode, wantRerender } = {
    ...useContext(WebContext),
  };

  const [memberList, setMemberList] = useState<any>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);

  // console.log(props);
  const router = useRouter();
  // console.log('groupMemberquery', router.query.groupId);
  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams('');
  let groupId = params.get('groupId') as string;
  const getMemberList = async () => {
    try {
      // debugger;
      setSkeletonVisible(true);
      const res: any = await AxiosRequest({
        url: `${getMemberListUrl}/${groupId}/members?page=0&size=10`,
        method: 'GET',
      });
      if (res.data) {
        setSkeletonVisible(false);
        setMemberList(res.data);
        if (res.hasMorePage) {
          setShowSeeMoreButton(true);
          setPageNumber(1);
        } else {
          setReachedEnd(true);
          setShowSeeMoreButton(false);
        }
      } else {
        setSkeletonVisible(false);
      }
    } catch (error) {
      // debugger;
      setSkeletonVisible(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getMemberList();
  }, [groupId, wantRerender]);
  const getMoreMembers = async (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !reachedEnd) {
      setLoadingMore(true);
      try {
        const res: any = await AxiosRequest({
          url: `${getMemberListUrl}/${groupId}/members?page=${pageNumber}&size=10`,
          method: 'GET',
        });
        setLoadingMore(false);
        setMemberList([...memberList, ...res.data]);
        if (res.hasMorePage) {
          setPageNumber((page) => page + 1);
        } else {
          setReachedEnd(true);
          setShowSeeMoreButton(false);
          setLoadingMore(false);
        }
        // console.log('groupMemberData', res.data);
      } catch (error) {
        console.log(error);
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
          <Text
            field={
              props?.fields?.data?.datasource?.heading?.jsonValue
                ? props?.fields?.data?.datasource?.heading?.jsonValue
                : {
                    value: 'Members List',
                  }
            }
          />
        </h3>
        <div
          className={`${style.groupMemberList} ${darkMode && darkTheme.grey_1} ${
            style.groupMemberWithMoreButton
          }`}
          onScroll={getMoreMembers}
        >
          {memberList.length > 0 ? (
            memberList.map((ele: any) => (
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
                      src={ele.profilePictureUrl ? ele.profilePictureUrl : groupLogo.src}
                      // src={groupLogo}
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
                      >{`${ele.firstName} ${ele.lastName}`}</h5>
                      <h6 className={`${style.groupMemberListEmail}`}>{ele.objectId}</h6>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : !skeletonVisible ? (
            <div>No Member Found</div>
          ) : (
            <MemberListSkeleton />
          )}
          {loadingMore && showSeeMoreButton && (
            <div style={{ margin: '18px 0' }}>
              <DotLoader />
            </div>
          )}
          {/* {showSeeMoreButton && !loadingMore && counter.current < 1 && (
            <div onClick={getMoreMembers} className={style.seeMore}>
              <Text
                field={
                  props?.fields?.data?.datasource?.createGroupBtnLabel?.jsonValue
                    ? props?.fields?.data?.datasource?.createGroupBtnLabel?.jsonValue
                    : {
                        value: 'More +',
                      }
                }
              />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<GroupMembersListProps>(GroupMemberList);
export default GroupMemberList;
