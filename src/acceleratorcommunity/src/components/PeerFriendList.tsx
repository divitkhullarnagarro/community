import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import { ComponentProps } from 'lib/component-props';
import styles from '../assets/peerfriendlist.module.css';
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import Skeleton from 'react-loading-skeleton';
import Profile from '../assets/images/ProfilePic.jpeg';
import allPeersCall from 'src/API/getPeers';

type PeerFriendListProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

type peerFriendFields = {
  objectId: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
};

const PeerFriendList = (props: PeerFriendListProps): JSX.Element => {
  console.log('PeerFriendList', props);
  const [peerFriendList, setPeerFriendList] = useState<peerFriendFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isWidgetView] = useState(props?.params?.IsWidgetView === '1');
  const skeletonDummyArr = [1, 2, 3, 4, 5, 6];
  console.log('isWidgetView', isWidgetView);

  const getAllPears = async () => {
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

  const WidgetViewPeerFriendList = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.heading}>{'Peers'}</div>
          <Link href={{ pathname: '/profile' }} className={styles.linkHeader}>
            <span className={styles.link}> {'See All'}</span>
          </Link>
        </div>
        <div className={styles.listContainer}>
          {peerFriendList?.length > 0 ? (
            peerFriendList?.slice(0, 5).map((item) => {
              return (
                <div key={item?.objectId} className={styles.item}>
                  <NextImage
                    className={styles.img}
                    field={Profile}
                    editable={true}
                    height={40}
                    width={40}
                  />
                  <div>
                    <div className={styles.name}>{item?.firstName + ' ' + item?.lastName}</div>
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

  const WidgetViewPeerFriendListSkeleton = () => {
    return (
      <div className={styles.wrapper}>
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

  return (
    <>
      {isWidgetView ? (
        isDataLoaded ? (
          <WidgetViewPeerFriendList />
        ) : (
          <WidgetViewPeerFriendListSkeleton />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default PeerFriendList;
