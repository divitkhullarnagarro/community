import { Field, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Profile from '../assets/images/profile.png';
import styles from '../assets/peopleyoumayknow.module.css';
import FollowUnfollowButton from './FollowUnfollowButton';
import Link from 'next/link';

type PeopleYouMayKnowProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  name: {
    jsonValue: Field<string>;
  };
  profileImage: {
    jsonValue: ImageField;
  };
  speciality: {
    jsonValue: Field<string>;
  };
  location: {
    jsonValue: Field<string>;
  };
};

const PeopleYouMayKnow = (props: PeopleYouMayKnowProps): JSX.Element => {
  console.log('PeopleYouMayKnow', props);
  const peopleYouMayKnowList = [
    {
      name: ' Dr. Mayank Thakur',
      speciality: 'Cardiology',
      profileImage: Profile,
      location: 'Kolkata',
    },
    { name: ' Dr. John Doe', speciality: 'Nephrology', profileImage: Profile, location: 'Lucknow' },
    {
      name: ' Dr. Samuel Lazar',
      speciality: 'Endocrinology',
      profileImage: Profile,
      location: 'Kolkata',
    },
    {
      name: ' Dr. Ashok Singh',
      speciality: 'Nephrology',
      profileImage: Profile,
      location: 'Gujrat',
    },
    {
      name: ' Dr. H Singh',
      speciality: 'Endocrinology',
      profileImage: Profile,
      location: 'Punjab',
    },
    {
      name: ' Dr. H Singh',
      speciality: 'Endocrinology',
      profileImage: Profile,
      location: 'Punjab',
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>People You May Know</div>
        <Link href="">See All</Link>
      </div>
      {peopleYouMayKnowList.map((l, i) => {
        return (
          <div key={i} className={styles.item}>
            <NextImage
              className={styles.img}
              field={l.profileImage}
              editable={true}
              height={50}
              width={50}
            />
            <div>
              <div className={styles.name}>{l.name}</div>
              <div className={styles.details}>
                <div>{l.speciality}.</div>
                <div>{l.location}</div>
              </div>
            </div>
            <div className={styles.button}>
              <FollowUnfollowButton />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PeopleYouMayKnow;
