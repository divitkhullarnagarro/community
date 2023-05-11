import { ComponentProps } from 'lib/component-props';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
// import recentActivityLogo from '../assets/images/recentActivityLogo.svg';
import style from '../assets/recentActivities.module.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import darkModeCss from '../assets/darkTheme.module.css';
import WebContext from 'src/Context/WebContext';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

type RecentActivitiesProps = ComponentProps & {
  fields: {
    heading: string;
  };
};
const list = [
  {
    img: 'data:image/jpeg;base64,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',
    activityName: 'You have added to the Agile CMS group',
    date: '01 Apr 2023',
  },
  {
    img: 'https://www.macaw.net/app/uploads/sites/10/sitecore-acquisities.jpg',
    activityName: 'Created an Article for Sitecore Digital Experience Platform',
    date: '18 Mar 2023',
  },
  {
    img: 'https://www.aceinfoway.com/images/tech-sitecore.png',
    activityName: 'Subcribed the Agile CMS Global Event',
    date: '15 Fab 2023',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/products/xp/v2/gettyimage-1303398550-og.png?md=20220307T065403Z',
    activityName: 'Liked a Post Solutions for your digital experiences',
    date: '13 Feb 2023',
  },
  {
    img: 'https://nkdramblog.files.wordpress.com/2022/11/xmcloudthumbnail.jpg?w=1084',
    activityName: 'Created a Blog on XM-Cloud Benefits',
    date: '20 Jan 2023',
  },
  {
    img: 'https://horizontal.blog/wp-content/uploads/2021/06/Content-Hub-Capabilities.png',
    activityName: 'Commented on post Content Hub DAM event',
    date: '10 Jan 2023',
  },
  {
    img: 'https://www.teleinfotoday.com/wp-content/uploads/DigitalCommunications/sitecore-10065.jpg',
    activityName: 'Subcribed the Expertise CMS Global Event',
    date: '20 Dec 2022',
  },
  // { img: recentActivityLogo, activityName: 'Created an Article on Saas DXP', date: '18 Dec 2022' },
  // { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  // { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  // { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
  // { img: recentActivityLogo, activityName: 'Created a Post', date: '10 Jan 2022' },
  // { img: recentActivityLogo, activityName: 'Liked a Post', date: '13 Feb 2023' },
  // { img: recentActivityLogo, activityName: 'Created a Article', date: '18 Dec 2021' },
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
  const { darkMode } = { ...useContext(WebContext) };
  useEffect(() => {
    const Interval = setTimeout(() => {
      setIsDataLoaded(true);
    }, 2000);
    return () => clearInterval(Interval);
  }, []);

  const RecentActivitiesSkeleton = () => {
    return (
      <>
        <div className={`${style.recentActivityListBox} ${darkMode ? darkModeCss.grey_2 : ''}`}>
          <div className={style.recentActivityContainer}>
            <div className={style.recentActivityHeaderLoader}>
              <Skeleton className="mb-2" height={30} />
              <Skeleton className="mb-2" height={30} />
            </div>
          </div>
          <div className={style.recentActivityList}>
            {list.map(() => (
              <>
                <div
                  className={`${style.recentActivityListHeading} ${
                    darkMode ? darkModeCss.grey_3 : ''
                  }`}
                >
                  <div className={style.recentActivityListHeadingLeftLoader}>
                    <Skeleton height={50} width={50} circle={true} />
                    <div className={`d-flex ${style.recentActivityNameAndDate}`}>
                      <div className={style.recentActivityListHeadingLoader}>
                        <Skeleton height={20} />
                        <Skeleton height={10} />
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
  };
  const RecentActivities = () => {
    return (
      <>
        <div className={`${style.recentActivityListBox} ${darkMode ? darkModeCss.grey_2 : ''}`}>
          <div className={style.recentActivityContainer}>
            <h3
              className={`${style.recentActivityTitle} ${darkMode ? darkModeCss.text_green : ''}`}
            >
              Your Recent Activities
            </h3>
            <h6 className={style.viewAllButton}>See All</h6>
          </div>
          <div className={`${style.recentActivityList} ${darkMode ? darkModeCss.grey_3 : ''}`}>
            {list.map((ele, index: number) => (
              <>
                <div
                  key={index}
                  className={`${style.recentActivityListHeading} ${
                    darkMode ? darkModeCss.grey_3 : ''
                  }`}
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
                      <h5
                        className={`${style.recentActivityName} ${
                          darkMode ? darkModeCss.text_light : ''
                        }`}
                        title={ele.activityName}
                      >
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
  };
  return <>{isDataLoaded ? <RecentActivities /> : <RecentActivitiesSkeleton />}</>;
};

// export default withDatasourceCheck()<RecentActivitiesProps>(RecentActivities);

export default RecentActivities;
