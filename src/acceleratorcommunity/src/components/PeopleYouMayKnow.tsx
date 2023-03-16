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
  console.log('PeopleYouMayKnow', props);
  const [peopleYouMayKnowList, setPeopleYouMayKnowList] = useState<peopleYouMayKnowFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };

  const getPeopleYouMayKnowList = async (userToken: string | undefined) => {
    let response = await peopleYouMayKnowCall('test1@test1.com', userToken);
    setPeopleYouMayKnowList(response?.data?.data);
  };

  useEffect(() => {
    getPeopleYouMayKnowList(userToken);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>People You May Know</div>
        <Link href="">See All</Link>
      </div>
      {peopleYouMayKnowList.slice(0, 9).map((l) => {
        return (
          <div key={l.objectId?.value} className={styles.item}>
            <Image
              contentEditable={true}
              className={styles.img}
              src={Profile ?? l.imageData?.value}
              height={50}
              width={50}
            ></Image>
            <div className={styles.detailsContainer}>
              <div className={styles.name}>{l.firstName + ' ' + l.lastName}</div>
              <div className={styles.details}>
                <div className={styles.speciality}>{l.speciality}.</div>
                <div>{l.city}</div>
              </div>
            </div>
            <div className={styles.button}>
              <FollowUnfollowButton userName={l.objectId} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PeopleYouMayKnow;
