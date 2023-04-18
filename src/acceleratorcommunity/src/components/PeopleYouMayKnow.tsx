import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Profile from '../assets/images/ProfilePic.jpeg';
import PeopleProfile from '../assets/images/PeopleYouMayKnowProfileImage.png';
import people from '../assets/images/people.png';
import styles from '../assets/peopleyoumayknow.module.css';
import FollowUnfollowButton from './FollowUnfollowButton';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import peopleYouMayKnowCall from 'src/API/peopleYouMayKnowCall';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';

type PeopleYouMayKnowProps = ComponentProps & {
  fields: {
    data: {};
  };
};

type peopleYouMayKnowFields = {
  objectId: string;
  firstName: Field<string>;
  lastName: Field<string>;
  imageData: Field<string>;
  speciality: Field<string>;
  city: Field<string>;
};

const PeopleYouMayKnow = (props: PeopleYouMayKnowProps): JSX.Element => {
  console.log('people you may know', props);
  const router = useRouter();
  const { Title, LinkLabel, IsFullList } = props?.params;
  const [peopleYouMayKnowList, setPeopleYouMayKnowList] = useState<peopleYouMayKnowFields[]>([]);
  const { userToken, setUserToken } = { ...useContext(WebContext) };

  const [isFullPage] = useState(IsFullList === '1');
  const getPeopleYouMayKnowList = async (userToken: string | undefined) => {
    let response = await peopleYouMayKnowCall(userToken);
    setPeopleYouMayKnowList(response?.data?.data);
  };

  const HalfPagePeopleYouMayKnow = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.heading}>{Title}</div>
          {LinkLabel ? (
            <Link href={'/peopleyoumayknow'} className={styles.linkHeader}>
              <span className={styles.link}> {LinkLabel}</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.listContainer}>
          {peopleYouMayKnowList?.length > 0 ? (
            peopleYouMayKnowList?.slice(0, 5).map((item) => {
              return (
                <div key={item?.objectId} className={styles.item}>
                  <NextImage
                    className={styles.img}
                    field={Profile ?? item?.imageData?.value}
                    editable={true}
                    height={40}
                    width={40}
                  />
                  <div>
                    <div className={styles.name}>{item?.firstName + ' ' + item?.lastName}</div>
                  </div>
                  <div className={styles.button}>
                    <FollowUnfollowButton userName={item?.objectId} />
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
  // const PeopleYouMayKnowHalfPageItem = (item: peopleYouMayKnowFields) => {
  //   return (
  //     <div key={item?.objectId} className={styles.itemHalfPage}>
  //       <NextImage
  //         contentEditable={true}
  //         field={Profile ?? item?.imageData?.value}
  //         height={200}
  //         width={100}
  //       ></NextImage>
  //       <div className={styles.detailsContainer}>
  //         <div className={styles.firstRow}>
  //           <div className={styles.name}>{item?.firstName + ' ' + item?.lastName}</div>
  //           <div className={styles.button}>
  //             <FollowUnfollowButton userName={item?.objectId} />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const PeopleYouMayKnowFullPageItem = (item: peopleYouMayKnowFields) => {
    return (
      <Card className={styles.cardItem}>
        <div className={styles.imageContainer}>
          <img className={styles.imgProfile} contentEditable={true} src={PeopleProfile.src} />
        </div>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            {item?.firstName + ' ' + item?.lastName}
          </Card.Title>
          <Card.Text className={styles.cardText}>{`${item?.speciality ?? ''} ${
            item?.speciality ? ' | ' : ''
          }  ${item?.city ?? ''}`}</Card.Text>
          <FollowUnfollowButton userName={item?.objectId} />
        </Card.Body>
      </Card>
    );
  };

  const [numItems, setNumItems] = useState(12);

  const PeopleYouMayKnowList = () => {
    return (
      <div className={styles.mainFullPageItemWrapper}>
        <h2 className={styles.listHeaderLabel}>{Title ?? 'People You May Know'}</h2>
        <div className={styles.newgrid}>
          {peopleYouMayKnowList?.length > 0 ? (
            peopleYouMayKnowList.slice(0, numItems).map((item) => {
              return <PeopleYouMayKnowFullPageItem {...item} />;
            })
          ) : (
            <></>
          )}
        </div>
        {peopleYouMayKnowList === undefined || numItems >= peopleYouMayKnowList?.length ? null : (
          <Button
            className={styles.seeMoreBtn}
            style={{
              width: '100%',
              fontSize: '20px',
              height: '50px',
              backgroundColor: 'white',
              color: 'blue',
              border: 'none',
              fontWeight: '500',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => setNumItems(numItems + 6)}
          >
            See more...
          </Button>
        )}
      </div>
    );
  };

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.top}>
          <h2 className={styles.logo}>Suggestions</h2>
        </div>
        <hr />
        <div className={styles.center}>
          <ul>
            <button>
              <li className={styles.rowItem}>
                <NextImage contentEditable={true} field={people} height={18} width={18}></NextImage>
                <span>{Title ?? 'People You May Know'}</span>
              </li>
            </button>
          </ul>
        </div>
      </div>
    );
  };

  const FullPagePeopleYouMayKnow = () => {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.backbtn}>
          <Button onClick={() => router.push('/')}>Back</Button>
        </div>
        <div className={styles.container}>
          <div className={styles.left_column}>
            <SideNavbar />
          </div>
          <div className={styles.right_column}>
            <PeopleYouMayKnowList />
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getPeopleYouMayKnowList(userToken);
    }
  }, [userToken]);

  return (
    <>
      {isFullPage ? (
        <FullPagePeopleYouMayKnow />
      ) : (
        <>
          <HalfPagePeopleYouMayKnow />
        </>
      )}
    </>
  );
};

export default PeopleYouMayKnow;
