import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Profile from '../assets/images/ProfilePic.jpeg';
import styles from '../assets/peopleyoumayknow.module.css';
import FollowUnfollowButton from './FollowUnfollowButton';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import peopleYouMayKnowCall from 'src/API/peopleYouMayKnowCall';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { Title, LinkLabel, IsFullList } = props?.params;
  const [peopleYouMayKnowList, setPeopleYouMayKnowList] = useState<peopleYouMayKnowFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };

  const [isFullPage] = useState(IsFullList === '1');
  const getPeopleYouMayKnowList = async (userToken: string | undefined) => {
    let response = await peopleYouMayKnowCall(userToken);
    setPeopleYouMayKnowList(response?.data?.data);
  };

  const sliderSettings = {
    rows: 1,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const HalfPagePeopleYouMayKnow = () => {
    return (
      <div
        className={styles.wrapper}
        style={{
          maxHeight: '590px',
          height: 'max-content',
        }}
      >
        <div className={styles.header}>
          <div className={styles.heading}>{Title}</div>
          <Link href={'/peopleyoumayknow'}>{LinkLabel}</Link>
        </div>
        <div className={styles.listWrapper}>
          <Slider className="slider" {...sliderSettings}>
            {peopleYouMayKnowList.slice(0, 9).map((item) => {
              return <PeopleYouMayKnowHalfPageItem {...item} />;
            })}
          </Slider>
        </div>
      </div>
    );
  };

  const PeopleYouMayKnowHalfPageItem = (item: peopleYouMayKnowFields) => {
    return (
      <div key={item?.objectId} className={styles.itemHalfPage}>
        <NextImage
          contentEditable={true}
          field={Profile ?? item?.imageData?.value}
          height={200}
          width={100}
        ></NextImage>
        <div className={styles.detailsContainer}>
          <div className={styles.firstRow}>
            <div className={styles.name}>{item?.firstName + ' ' + item?.lastName}</div>
            <div className={styles.button}>
              <FollowUnfollowButton userName={item?.objectId} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PeopleYouMayKnowFullPageItem = (item: peopleYouMayKnowFields) => {
    return (
      <div key={item?.objectId} className={styles.item}>
        <NextImage
          contentEditable={true}
          className={styles.img}
          field={Profile ?? item?.imageData?.value}
          height={50}
          width={50}
        ></NextImage>
        <div className={styles.detailsContainer}>
          <div className={styles.name}>{item?.firstName + ' ' + item?.lastName}</div>
          <div className={styles.details}>
            <div className={styles.speciality}>{item?.speciality}.</div>
            <div>{item?.city}</div>
          </div>
        </div>
        <div className={styles.button}>
          <FollowUnfollowButton userName={item?.objectId} />
        </div>
      </div>
    );
  };

  const FullPagePeopleYouMayKnow = () => {
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.backbtn}>
          <Button onClick={() => router.push('/')}>Back</Button>
        </div>
        <div className={styles.flexx}>
          <div
            className={styles.wrapper}
            style={{
              maxHeight: '100%',
              height: '75vh',
              width: '35%',
              backgroundColor: 'lightgrey',
            }}
          >
            <div className={styles.header}>
              <div className={styles.heading}>{Title}</div>
            </div>
            <div className={styles.listWrapper}>
              {peopleYouMayKnowList.map((item) => {
                return <PeopleYouMayKnowFullPageItem {...item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getPeopleYouMayKnowList(userToken);
  }, []);

  return (
    <>
      {peopleYouMayKnowList?.length > 0 ? (
        isFullPage ? (
          <FullPagePeopleYouMayKnow />
        ) : (
          <>
            <HalfPagePeopleYouMayKnow />
          </>
        )
      ) : (
        <>
          <div
            className={styles.wrapper}
            style={{
              maxHeight: isFullPage ? '100%' : '590px',
              height: isFullPage ? '75vh' : 'max-content',
              backgroundColor: 'lightgrey',
            }}
          >
            <div className={styles.header}>
              <div className={styles.heading}>{Title}</div>
              <Link href={'/peopleyoumayknow'}>{LinkLabel}</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PeopleYouMayKnow;
