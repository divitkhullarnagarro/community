import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import CreateGroup from './helperComponents/CreateGroup';
import style from '../assets/groupList.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';
import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import AxiosRequest from 'src/API/AxiosRequest';
import { getFirstTenGroupListUrl, getGroupListUrl } from 'assets/helpers/constants';
import DotLoader from './DotLoader';
import GroupListSkeleton from './skeletons/GroupListSkeleton';
import Link from 'next/link';
import JoinLeaveGroup from './helperComponents/JoinLeaveGroup';

type GroupListProps = ComponentProps & {
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

const GroupList = (props: GroupListProps): JSX.Element => {
  // console.log(props);
  const [createGroupVisibel, setCreateGroupVisibel] = useState(false);
  const [groupListData, setGroupListData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [wantToRerender, setWantToRerender] = useState(false);

  const { darkMode, wantRerender } = { ...useContext(WebContext) };

  const getGroupList = async () => {
    try {
      setReachedEnd(false);
      setSkeletonVisible(true);
      const res: any = await AxiosRequest({
        url: getFirstTenGroupListUrl,
        method: 'GET',
      });
      if (res.data) {
        setGroupListData(res.data);
        setSkeletonVisible(false);

        if (res.hasMorePage) {
          setShowSeeMoreButton(true);
          setPageNumber(1);
        } else {
          setShowSeeMoreButton(false);
        }
        // console.log('groupListData', res.data);
      } else {
        setSkeletonVisible(false);
      }
    } catch (error) {
      setSkeletonVisible(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getGroupList();
  }, [wantToRerender, wantRerender]);
  const getMoreGroups = async (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !reachedEnd) {
      setLoadingMore(true);
      try {
        const res: any = await AxiosRequest({
          url: `${getGroupListUrl}page=${pageNumber}&size=10`,
          method: 'GET',
        });
        setLoadingMore(false);
        setGroupListData([...groupListData, ...res.data]);
        if (res.hasMorePage) {
          setPageNumber((page) => page + 1);
        } else {
          setReachedEnd(true);
          setShowSeeMoreButton(false);
          setLoadingMore(false);
        }
        // console.log('groupListData', res.data);
      } catch (error) {
        console.log(error);
        setLoadingMore(false);
      }
    }
  };

  return (
    <>
      <div className={`${style.groupListContainer} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={style.groupList}>
          <h3 className={`${style.groupListTitle} ${darkMode ? darkModeCss.text_green : ''}`}>
            <Text
              field={
                props?.fields.data?.datasource?.heading?.jsonValue
                  ? props?.fields.data?.datasource?.heading?.jsonValue
                  : {
                      value: 'Group List',
                    }
              }
            />
          </h3>
          <div className={`${style.groupListBox} ${darkMode ? darkModeCss.grey_2 : ''}`}>
            <div className={style.groupListWithMoreButton} onScroll={getMoreGroups}>
              <div className={style.groupListBoxData}>
                {groupListData.length > 0 ? (
                  groupListData.map((ele: any, index: number) => (
                    <>
                      <div className={style.groupListBoxContainer} key={index}>
                        <div
                          className={`${style.groupListHeading} ${
                            darkMode ? darkModeCss.grey_3 : ''
                          }`}
                        >
                          <Link href={`/group?groupId=${ele.id}`}>
                            <div
                              className={style.groupListHeadingLeft}
                              style={{ cursor: 'pointer' }}
                              title="Explore Group"
                            >
                              <Image
                                src={
                                  ele.groupIconUrl
                                    ? ele.groupIconUrl
                                    : 'data:image/png;base64,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'
                                }
                                alt={ele.name}
                                className={style.groupListLogo}
                                height={32}
                                width={32}
                              />
                              <h5
                                className={`${style.groupListName} ${
                                  darkMode ? darkModeCss.text_light : ''
                                }`}
                              >
                                {ele.groupName}
                              </h5>
                            </div>
                          </Link>
                          <div className={style.groupListDropdown}>
                            <JoinLeaveGroup
                              // ele={{ ...ele }}
                              // wantRerender={wantRerender}
                              member={ele.member}
                              groupName={ele.groupName}
                              id={ele.id}
                            />

                            {/* <Dropdown className={style.dropdown}>
                              <Dropdown.Toggle
                                variant="secondary"
                                id="dropdown-basic"
                                className={style.dropdownBtn}
                              >
                                <img
                                  className="postMoreOptionsImage"
                                  src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                                  alt="pan"
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu className={style.dropdownMenu}>
                                <Dropdown.Item
                                  className={`${style.dropdownItem} ${
                                    darkMode ? darkModeCss.grey_1 : ''
                                  } ${darkMode ? darkModeCss.text_light : ''}`}
                                  onClick={() => handleExploreOnClick(ele.id)}
                                >
                                  <div className={style.overlayItem}>
                                    <div className={style.dropdownImage}>
                                      <NextImage
                                        className={style.imgJoinGroup}
                                        field={exploreGroup}
                                        editable={true}
                                      />
                                    </div>
                                    <div className={style.reportContainerBtn}>
                                      Explore the group
                                    </div>
                                  </div>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className={`${style.dropdownItem} ${
                                    darkMode ? darkModeCss.grey_1 : ''
                                  } ${darkMode ? darkModeCss.text_light : ''}`}
                                >
                                  <div className={style.overlayItem}>
                                    <div className={style.dropdownImage}>
                                      <NextImage
                                        field={joinGroup}
                                        className={style.imgGrouplist}
                                        editable={true}
                                      />
                                    </div>
                                    <div className={style.reportContainerBtn}>Join Group</div>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> */}
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                ) : !skeletonVisible ? (
                  <div>No Group Found</div>
                ) : (
                  <GroupListSkeleton />
                )}
              </div>
              {loadingMore && showSeeMoreButton && (
                <div style={{ margin: '18px 0' }}>
                  <DotLoader />
                </div>
              )}
            </div>
            <div className={style.createGroupHeading}>
              <button className={style.createGroupBtn} onClick={() => setCreateGroupVisibel(true)}>
                <Text
                  field={
                    props?.fields.data?.datasource?.createGroupBtnLabel?.jsonValue
                      ? props?.fields.data?.datasource?.createGroupBtnLabel?.jsonValue
                      : {
                          value: '+ Create a Group',
                        }
                  }
                />
              </button>
            </div>
          </div>

          {
            <CreateGroup
              createGroupVisibel={createGroupVisibel}
              setCreateGroupVisibel={setCreateGroupVisibel}
              setWantToRerender={setWantToRerender}
              wantToRerender={wantToRerender}
            />
          }
        </div>
      </div>
    </>
  );
};

export default GroupList;
