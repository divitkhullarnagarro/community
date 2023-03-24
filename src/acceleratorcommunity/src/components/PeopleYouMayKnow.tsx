import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Profile from '../assets/images/profile.png';
import styles from '../assets/peopleyoumayknow.module.css';
import FollowUnfollowButton from './FollowUnfollowButton';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import peopleYouMayKnowCall from 'src/API/peopleYouMayKnowCall';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type PeopleYouMayKnowProps = ComponentProps & {
  fields: {
    data: {};
  };
};

type peopleYouMayKnowFields = {
  objectId: Field<string>;
  firstName: Field<string>;
  lastName: Field<string>;
  imageData: Field<string>;
  speciality: Field<string>;
  city: Field<string>;
};

const PeopleYouMayKnow = (props: PeopleYouMayKnowProps): JSX.Element => {
  const { Title, LinkLabel, IsFullList } = props?.params;
  const [peopleYouMayKnowList, setPeopleYouMayKnowList] = useState<peopleYouMayKnowFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };

  const getPeopleYouMayKnowList = async (userToken: string | undefined) => {
    let response = await peopleYouMayKnowCall('test1@test1.com', userToken);
    setPeopleYouMayKnowList(response?.data?.data);
  };

  const [isFullPage] = useState(IsFullList === '1');

  const sliderSettings = {
    rows: isFullPage ? 2 : 1,
    infinite: false,
    slidesToShow: isFullPage ? 5 : 3,
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

  const PeopleYouMayKnowItem = (item: peopleYouMayKnowFields) => {
    return (
      <div key={item?.objectId?.value} className={styles.item}>
        <Image
          contentEditable={true}
          className={styles.img}
          src={Profile ?? item?.imageData?.value}
          height={isFullPage ? 400 : 350}
          width={isFullPage ? 350 : 200}
        ></Image>
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

  useEffect(() => {
    getPeopleYouMayKnowList(userToken);
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{
        maxHeight: isFullPage ? '100%' : '590px',
        height: isFullPage ? '100%' : 'max-content',
      }}
    >
      <div className={styles.header}>
        <div className={styles.heading}>{Title}</div>
        {isFullPage ? <></> : <Link href={'/peopleyoumayknow'}>{LinkLabel}</Link>}
      </div>
      <div className={styles.listWrapper}>
        {isFullPage ? (
          <Slider className="slider" {...sliderSettings}>
            {peopleYouMayKnowList.map((item) => {
              return <PeopleYouMayKnowItem {...item} />;
            })}
            {peopleYouMayKnowList.map((item) => {
              return <PeopleYouMayKnowItem {...item} />;
            })}
            {peopleYouMayKnowList.map((item) => {
              return <PeopleYouMayKnowItem {...item} />;
            })}
          </Slider>
        ) : (
          <Slider className="slider" {...sliderSettings}>
            {peopleYouMayKnowList.slice(0, 9).map((item) => {
              return <PeopleYouMayKnowItem {...item} />;
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
