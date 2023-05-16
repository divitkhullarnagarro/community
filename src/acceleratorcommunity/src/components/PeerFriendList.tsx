import { Button, Card } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import allPeersCall from 'src/API/getPeers';
import WebContext from 'src/Context/WebContext';
import Skeleton from 'react-loading-skeleton';
import { ComponentProps } from 'lib/component-props';
import DropArrow from '../assets/images/droparrow.png';
import Profile from '../assets/images/ProfilePic.jpeg';
import FollowUnfollowButton from './FollowUnfollowButton';
import styles from '../assets/peerfriendlist.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { viewProfileLinkUrl } from 'assets/helpers/constants';

type PeerFriendListProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

type peerFriendFields = {
  objectId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | undefined;
};

const PeerFriendList = (props: PeerFriendListProps): JSX.Element => {
  console.log('PeerFriendList', props);
  const [peerFriendList, setPeerFriendList] = useState<peerFriendFields[]>([]);
  const { userToken, darkMode } = { ...useContext(WebContext) };
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isWidgetView] = useState(props?.params?.IsWidgetView === '1');
  const skeletonDummyArr = [1, 2, 3, 4, 5, 6];
  console.log('isWidgetView', peerFriendList);

  const getAllPears = async () => {
    setIsDataLoaded(false);
    const response = await allPeersCall(userToken);
    if (response?.data) {
      setIsDataLoaded(true);
      setPeerFriendList(response?.data?.data);
    }
  };

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getAllPears();
    }
  }, [userToken]);

  const NoPeersLabel = () => {
    return (
      <>
        <div>You do not have any peers yet.</div>
        <div>Explore the community to add peers.</div>
      </>
    );
  };

  function returnUserImage(e: any) {
    e.target.src = Profile.src;
  }

  const WidgetViewPeerFriendList = () => {
    return (
      <div className={`${styles.wrapper} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={styles.header}>
          <div className={`${styles.heading} ${darkMode ? darkModeCss.text_green : ''}`}>
            {'Peers'}
          </div>
          <Link
            href={{ pathname: '/profile', query: 'showTab=peers' }}
            passHref={true}
            className={styles.linkHeader}
          >
            <span className={styles.link}> {'See All'}</span>
          </Link>
        </div>
        <div className={styles.listContainer}>
          {peerFriendList?.length > 0 ? (
            peerFriendList?.slice(0, 5).map((item) => {
              return (
                <div key={item?.objectId} className={styles.item}>
                  <Link href={`${viewProfileLinkUrl}${item?.objectId}`} passHref={true}>
                    <img
                      className={styles.peerFriendUserImage}
                      src={item.profilePictureUrl ? item.profilePictureUrl : Profile.src}
                      alt="User-Pic"
                      onError={(e) => {
                        returnUserImage(e);
                      }}
                    ></img>
                  </Link>

                  <div>
                    <div className={`${styles.name} ${darkMode ? darkModeCss.text_light : ''}`}>
                      {item?.firstName + ' ' + item?.lastName}
                    </div>
                  </div>
                  <div className={styles.button}>
                    <FollowUnfollowButton userName={item?.objectId} buttonText={'Unfollow'} />
                  </div>
                </div>
              );
            })
          ) : (
            <div
              className={`${styles.widgetViewNoPeerListHeader} ${
                darkMode ? darkModeCss.text_light : ''
              }`}
            >
              <NoPeersLabel />
            </div>
          )}
        </div>
      </div>
    );
  };

  const WidgetViewPeerFriendListSkeleton = () => {
    return (
      <div className={`${styles.wrapper} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={styles.header}>
          <div className={styles.cardloaderHeader}>
            <Skeleton height={30} />
          </div>
        </div>
        <div className={styles.listContainer}>
          {skeletonDummyArr?.length > 0 ? (
            skeletonDummyArr?.slice(0, 5).map((item: any) => {
              return (
                <div key={item} className={styles.item}>
                  <Skeleton height={40} width={40} circle={true} />
                  <div className={styles.cardloaderDetails}>
                    <Skeleton className={styles.name} height={30} />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const FullPagePeerFriendList = () => {
    return (
      <div className={`${styles.mainContainer} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={styles.container}>
          <div
            className={`${styles.mainFullPageItemWrapper} ${darkMode ? darkModeCss.grey_3 : ''}`}
          >
            <div className={styles.newgrid}>
              {isDataLoaded ? (
                peerFriendList?.length > 0 ? (
                  peerFriendList.map((item) => {
                    return <FullPagePeerFriendListItem {...item} />;
                  })
                ) : (
                  <div
                    className={`${styles.fullPageNoPeerListHeader} ${
                      darkMode ? darkModeCss.text_light : ''
                    }`}
                  >
                    <NoPeersLabel />
                  </div>
                )
              ) : (
                skeletonDummyArr.concat(skeletonDummyArr).map((item: any) => {
                  return <FullPagePeerFriendListSkeletonItem {...item} />;
                })
              )}
            </div>
            {peerFriendList === undefined || numItems >= peerFriendList?.length ? null : (
              <Button className={styles.seeMoreBtn} onClick={() => setNumItems(numItems + 6)}>
                <div>
                  <span className={styles.seeMoreBtn}>See more</span>
                </div>
                <NextImage field={DropArrow} editable={true} />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
  const [numItems, setNumItems] = useState(12);

  const FullPagePeerFriendListItem = (item: peerFriendFields) => {
    return (
      <Card className={`${styles.cardItem} ${darkMode ? darkModeCss.grey_3 : ''}`}>
        <div className={styles.imageContainer}>
          <Link href={`${viewProfileLinkUrl}${item?.objectId}`} passHref={true}>
            <img
              className={styles.imgProfile}
              contentEditable={true}
              src={item.profilePictureUrl ? item.profilePictureUrl : Profile.src}
              alt="Profile Image"
              onError={(e) => {
                returnUserImage(e);
              }}
            />
          </Link>
        </div>
        <Card.Body>
          <Card.Title className={`${styles.cardTitle} ${darkMode ? darkModeCss.text_light : ''}`}>
            {item?.firstName + ' ' + item?.lastName}
          </Card.Title>
          <FollowUnfollowButton userName={item?.objectId} buttonText={'Unfollow'} />
        </Card.Body>
      </Card>
    );
  };

  const FullPagePeerFriendListSkeletonItem = (index: any) => {
    return (
      <Card key={index} className={styles.cardItem}>
        <div className={styles.imageContainer}>
          <Skeleton height={260} />
        </div>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            <Skeleton height={40} />
          </Card.Title>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      {isWidgetView ? (
        isDataLoaded ? (
          <WidgetViewPeerFriendList />
        ) : (
          <WidgetViewPeerFriendListSkeleton />
        )
      ) : (
        <>{<FullPagePeerFriendList />}</>
      )}
    </>
  );
};

export default PeerFriendList;
