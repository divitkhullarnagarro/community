import { ComponentProps } from 'lib/component-props';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import recentActivityLogo from '../assets/images/recentActivityLogo.svg';
import style from '../assets/recentActivities.module.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// import { useRouter } from 'next/router';
// import Link from 'next/link';

type RecentActivitiesProps = ComponentProps & {
  fields: {
    heading: string;
  };
};
const list = [
  {
    img: recentActivityLogo,
    activityName:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    date: '13 Feb 2023',
  },
  { img: recentActivityLogo, activityName: 'Created a Article fg gj g', date: '18 Dec 2021' },
  { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
  { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
  { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
  { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
];

const RecentActivities = (props: RecentActivitiesProps): JSX.Element => {
  console.log(props);
  console.log(
    'asdfghjklqwertyuiop',
    process.env.NEXT_PUBLIC_TEST_VAR,
    process.env.NODE_ENV,
    process.env.NEXT_PUBLIC_DB_HOST
  );
  // const router = useRouter();
  // const onMemberClick = (email: string) => {
  //   router.push(`/profile/${email}`);
  // };
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(()=>{const Interval= setTimeout(()=>{setIsDataLoaded(true)},2000)
  return()=> clearInterval(Interval)},[])

  const RecentActivitiesSkeleton = () => {
    return (
      <>
        <div className={style.recentActivityListBox}>
          <div className={style.recentActivityContainer}>
            <div className={style.recentActivityHeaderLoader}>
              <Skeleton className='mb-2' height={30}/>
              <Skeleton className='mb-2' height={30}/>
            </div>
          </div>
          <div className={style.recentActivityList}>
            {list.map((_ele, index: number) => (
              <>
                <div
                  key={index}
                  className={style.recentActivityListHeading}
                >
                  <div className={style.recentActivityListHeadingLeftLoader}>
                    <Skeleton height={50} width={50} circle={true}/>
                    <div className={`d-flex ${style.recentActivityNameAndDate}`}>
                      <div className={style.recentActivityListHeadingLoader}>
                        <Skeleton height={20}/>
                        <Skeleton height={10}/>

                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
  const RecentActivities = () => {
    return (
      <>
        <div className={style.recentActivityListBox}>
          <div className={style.recentActivityContainer}>
            <h3 className={style.recentActivityTitle}>Your Recent Activities</h3>
            <h6 className={style.viewAllButton}>See All</h6>
          </div>
          <div className={style.recentActivityList}>
            {list.map((ele, index: number) => (
              <>
                <div
                  key={index}
                  className={style.recentActivityListHeading}
                  // onClick={() => {
                  //   onMemberClick(ele.objectId);
                  // }}
                >
                  <div className={style.recentActivityListHeadingLeft}>
                    <Image
                      src={ele.img}
                      alt={ele.activityName}
                      className={style.recentActivityListLogo}
                      height={50}
                      width={50}
                    />
                    <div className={`d-flex flex-column ${style.recentActivityNameAndDate}`}>
                      <h5 className={style.recentActivityName} title={ele.activityName}>
                        {ele.activityName}
                      </h5>
                      <h6 className={style.recentActivityDate}>{ele.date}</h6>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  }
  return(<>{isDataLoaded?<RecentActivities/>:<RecentActivitiesSkeleton/>}</>)
};

// export default withDatasourceCheck()<RecentActivitiesProps>(RecentActivities);

export default RecentActivities;
