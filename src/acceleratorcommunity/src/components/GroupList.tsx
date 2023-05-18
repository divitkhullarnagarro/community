import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import CreateGroup from './helperComponents/CreateGroup';
import joinGroup from '../assets/images/JoinGroup_icon.svg';
import exploreGroup from '../assets/images/ExploreGroup_icon.svg';
import style from '../assets/groupList.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';
import { Dropdown } from 'react-bootstrap';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import AxiosRequest from 'src/API/AxiosRequest';
import { getFirstTenGroupListUrl, getGroupListUrl } from 'assets/helpers/constants';
import DotLoader from './DotLoader';
import GroupListSkeleton from './skeletons/GroupListSkeleton';
// import Skeleton from 'react-loading-skeleton';

type GroupListProps = ComponentProps & {
  fields: {
    heading: string;
  };
};

// const list = [
//   {
//     img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAACTlZiPkZSMjpHq6uqkpqiKjJDs7Ozz8/NqamptbW2Nj5MVFRX7+/v4+PiZm57U1da3t7e5urxxcXHKysqCgoLd3d5VVVUaGhrBwsOqq67Q0dOfoaO3uLrj4+QwMDBERESGhoYLCwt4eHgpKSkiIiI4ODhMTExYWFhiYmJE55aSAAAG6UlEQVR4nO2da2OiOhCGlQTFXdZrkS6I1m637vr/f+AhWrteAuQyk4Seeb70m8Pjm0BsBhgMCIIgCIIgCIIgCIIgCIIgCIIgek+cx07rzfKd03rJfMz53KFjIeq5KzeI00jAnX2tpSjIRq7KDWIeneG5m4IlO5VjlZty/wRrxYWLgiP2UY5VUxf1PobomXGGXm9Wsc9ybO5A8SrBU4or5HrJTTk2nyHXu01QkI5Qv9ac3dWLkBXvEjx9rRHiVWM1fqgXTfDKSQUxJ+OkekgQWVEuWE/GCqXopqEcSzCqCR7m4FXRDXi1adkgiKfYlOA5xhFwjBsmHaEf1VCmfiyZ9NeMC8hiVfN4OSkiLBhbEzyRRlArnMm249usv09wxW5B8c3OIRaqsxVvGaCfisBrYiVB4VjZ5jhZpQp+4Ipdc/DaMcosFjlxOVbzE4qAy37VBM8wtjI71c0WlbofqGLLdbDBkc8z3YvHdKER30UR6Cqsl+BFMh1l6tfl2aJkJlU4yHrRSFCQjufbRXeUs7yYa6d3AWJJbCwoYCmPyixv0pztNts5V7k2NCtarzOsBD80a4eqXGWLfBcnySRJdrt8kxVlFfG0bWmmqGj5E1zjMtEBSxlP+QWmeNFTIN16ThAfbqHYC8FasfzigvUMMFRM+iJorDj3fdwaGC3gejNGT5jsaeS9Moy+fIZGmza+D1oHbvQrA249g47p1uKuL4rme6d5PxRtNod7cT612/3uQYq22/uL0BXt+xcCV4Ro0NiErAjTgdK0jRcAUC02WaiKcD1EgSpCNkkVIc5F2C4we0XGOB+POaup/3D7fyNCt7kVFgOVpWlUFps8npx3pWaTOM+2FbPShO/jWxkqsvF81fC//WSxjUz/4Y3RqGiiyNJRx85FUsxNJHE6Mbe6ijxS2mOLt9qOWK2mS519RMZL5W3oaRbp7cGi9dKW6t/1uNTr6lloOGI2C6sq8kp/n7u1RciV4EfDdechMKMN9qnauQy73VshRb41bcZI5t2fjt/PPuo4CMZs+lw6FxYuGvbbFdORXQ/vY0+wc8F2Rds953pJ1zZSXd1yIe/cPQlCNLg0T3V395Q0KaYtU3C6WL4e9y8/h++HP29V0XY1aVo8ObxpZiofSc1NnxnfD+94fyobZ6z8suFQUCjKjqAhl/z13u7CsanfR3ZKdSoozgePQ1QuWDykd5Nkw/b0Y4qOBSWK8tbr5Xub3wn5zt+9onPBWlFBMP7T6VfzIl3j3Sp6EBwMJp1DtFLxE6xln389F70I3ijKTjLTZ1XBejrKzsL/FD0J1oqXa4ZsiO5+qQvWLCWffxmo3gQ/FWUJ5lp+NUzy+WdFj4IfbVNjWYK6gvLJKBS9CtaKqTTBWF+wvv5LPr/gngVF1w2U4HD4TfL5K1d3Nzcj+T1vKChXDBFjweHwu+9jV8JCsB8pWgn2IUVLwfAVrQVDH6iJvWDYKQIkKAg3RSDBcFMEEww1RUDBMFMEFQwxRWDB8FIEuUyErAieoCCkgYqQoCCcFFESFISSIlKCgjBSREtQEEKKiAkK/KeILOg/RdQhesZviugJ+lZ0kKDA30B1kqDAV4qOEhT4SdFZggIfKTpMUOA+RacJClyn6FzQdYqOh+gZlyl6SNCtopcEBa4GqqcEBW5S9JagwEWKHhMU4KfoNUEBdoqeExTgphiAIG6K3ofoGbwUg0hQgKUYSIICnIEaTIKCp68uiJFiYILwKQYnCJ1igIKwKQYpCKmY6DWluwNKMVhBKMWABWEUJ74l2nmzT9C3Qhe2KQY9RM/YpdgDQbsUJ30QtErxr+9jV4SbCm58H7kypjfJH30fuDIHQ0Pfx62B2bM4DO6w84bZE8u1b5L0iNm5pk8Zmr1nNvAV6Q2GL2PZ+z5udcwEB0vfx62M8Z20/Vi0DYd7U8FB5vvQ1fhp8eCmXozTH1bvluyBop0gnOKPw/7529uaR/x1/f15/xvoY+shav12UGvFw9soix9myizJlmulh7tgC1op/n7qev5lvFwffAsaKx5Vn36ZLI1/psEIGikeC71nJxZPPgW1FffNzylrYaU9K+EE9RTXxk+G3EXeBDUUud2DIZfq5x3b6+BDaRd+guLFj6CS4treT1B0P+MNeoie6VI8wr0NfORFsEPxHeStrhemHRcPHMFWxVfoWou2lSuWYIsi4PujP2l8YiaiYJPiEeYMc0/T72/4s+g1MkW0x43NpM8lxBWUKWKM0AuSRQ624IPiAbfgw0jFF7xT/ItdLf7lXPBGEaMJ8o7Ji3PBK0Xpk1XB2TsX/FQ03lzW5I9zwXpxLAraN+uosj4JPjsUJAiCIAiCIAiCIAiCIAiCIAiCIIj/H/8BWauPqyGPgAMAAAAASUVORK5CYII=',
//     name: 'XM Cloud',
//   },
//   {
//     img: 'data:image/png;base64,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',
//     name: 'OrderCloud',
//   },
//   {
//     img: 'data:image/png;base64,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',
//     name: 'Agile CMS',
//   },
//   {
//     img: 'data:image/png;base64,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',
//     name: 'Digital Experience Platform',
//   },
//   {
//     img: 'data:image/png;base64,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',
//     name: 'Enterprise CMS',
//   },
// ];

const GroupList = (props: GroupListProps): JSX.Element => {
  const router = useRouter();
  console.log(props);
  const [createGroupVisibel, setCreateGroupVisibel] = useState(false);
  const [groupListData, setGroupListData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [skeletonVisible, setSkeletonVisible] = useState(true);

  // const [reachedEnd, setReachedEnd] = useState(false);
  const counter = useRef(0);

  const { darkMode } = { ...useContext(WebContext) };

  const handleExploreOnClick = (name: string) => {
    router.push({ pathname: `/group`, query: { groupId: name } });
  };

  const getGroupList = async () => {
    try {
      setSkeletonVisible(true);
      const res: any = await AxiosRequest({
        url: getFirstTenGroupListUrl,
        method: 'GET',
      });
      setGroupListData(res.data);
      // setGroupListData([]);
      setSkeletonVisible(false);

      if (res.hasMorePage) {
        setShowSeeMoreButton(true);
      } else {
        setShowSeeMoreButton(false);
      }
      console.log('groupListData', res.data);
    } catch (error) {
      console.log('groupListData', error);
    }
  };
  useEffect(() => {
    getGroupList();
  }, []);
  const getMoreGroups = async (e: any) => {
    counter.current = 1;
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setLoadingMore(true);
      try {
        const res: any = await AxiosRequest({
          url: `${getGroupListUrl}page=${pageNumber}&size=10`,
          method: 'GET',
        });
        setLoadingMore(false);
        setGroupListData([...groupListData, ...res.data]);
        setPageNumber((page) => page + 1);
        if (!res.hasMorePage) {
          setShowSeeMoreButton(false);
          setLoadingMore(false);
        }
        console.log('groupListData', res.data);
      } catch (error) {
        console.log('groupListData', error);
        setLoadingMore(false);
      }
    }
  };

  return (
    <>
      <div className={`${style.groupListContainer} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={style.groupList}>
          <h3 className={`${style.groupListTitle} ${darkMode ? darkModeCss.text_green : ''}`}>
            Group List
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
                          <div className={style.groupListHeadingLeft} style={{ cursor: 'pointer' }}>
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
                          <div className={style.groupListDropdown}>
                            <Dropdown className={style.dropdown}>
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
                            </Dropdown>
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
              {loadingMore && (
                <div style={{ margin: '18px 0' }}>
                  <DotLoader />
                </div>
              )}
              {showSeeMoreButton && !loadingMore && counter.current < 1 && (
                <div onClick={getMoreGroups} className={style.seeMore}>
                  more+
                </div>
              )}
            </div>
            <div className={style.createGroupHeading}>
              <button className={style.createGroupBtn} onClick={() => setCreateGroupVisibel(true)}>
                {' '}
                + Create a Group
              </button>
            </div>
          </div>

          {
            <CreateGroup
              createGroupVisibel={createGroupVisibel}
              setCreateGroupVisibel={setCreateGroupVisibel}
            />
          }
        </div>
      </div>
    </>
  );
};

export default GroupList;
