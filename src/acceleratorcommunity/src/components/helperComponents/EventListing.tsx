import {
  getMyBlogsUrl,
  getSuggestedBlogsUrl,
  getBookmarkedMyBlogsUrl,
  demoBookmarkedEventList,
  demoMyEventList,
  demoSuggestedEventList,
} from 'assets/helpers/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AxiosRequest from 'src/API/AxiosRequest';
import { AxiosResponse } from 'axios';
import style from './../../assets/eventListing.module.css';
import event from './../../assets/images/event.svg';
import interestedLogo from './../../assets/images/interestedLogo.svg';
// import placeholderImg from './../../assets/images/placeholderImg.png';
import { Event } from './../../assets/helpers/types';
import EventListingSkeleton from 'components/skeletons/EventListingSkeleton';
const tablist = ['My Events', 'Upcoming Events', 'Bookmarked Events'];

const EventListing = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('My Events');
  const [eventList, setEventList] = useState<Event>([] as Event);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const getMyEvent = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getMyBlogsUrl,
    });

    const myblogData = data.data.map((ele: any) => ele.blog);
    console.log(myblogData);
    setEventList(demoMyEventList);
    setSkeletonVisible(false);
  };
  const getUpcomingEvents = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getSuggestedBlogsUrl,
    });
    const suggesteBblogData = data.data.map((ele: any) => ele.blog);
    console.log(suggesteBblogData);
    setEventList(demoSuggestedEventList);
    setSkeletonVisible(false);
  };
  const getBookmarkedEvents = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getBookmarkedMyBlogsUrl,
    });
    const bookmarkedBlogData = data.data.map((ele: any) => ele.blog);
    console.log(bookmarkedBlogData);
    setEventList(demoBookmarkedEventList);
    setSkeletonVisible(false);
  };
  useEffect(() => {
    if (activeTab == 'My Events') {
      setSkeletonVisible(true);
      setEventList([]);
      getMyEvent();
    } else if (activeTab == 'Upcoming Events') {
      setSkeletonVisible(true);
      setEventList([]);
      getUpcomingEvents();
    } else {
      setSkeletonVisible(true);
      setEventList([]);
      getBookmarkedEvents();
    }
  }, [activeTab]);

  const onInterestedButtonClick = () => {
    alert('Subscribe button clicked');
  };
  const router = useRouter();
  const navigateToEventPage = (event: string) => {
    router.push(`/event/${event}`);
  };
  return (
    <>
      <div className={style.eventListingPage}>
        <div className={style.eventListNavbar}>
          <div className={style.eventTabList}>
            {tablist.map((ele, index) => (
              <div
                key={index}
                className={style.eventTab}
                onClick={() => setActiveTab(ele)}
                style={activeTab === ele ? { background: '#47d7ac', color: 'white' } : {}}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
        <div className={style.eventListcontent}>
          {eventList.length > 0 ? (
            <div className={style.eventList}>
              {eventList.map((ele, i) => (
                <div key={i} className={style.eventCard}>
                  <Image
                    style={{ cursor: 'pointer' }}
                    src={ele.img ? ele.img : event.src}
                    alt={ele.name}
                    height={180}
                    width={280}
                    placeholder="blur"
                    //   blurDataURL={placeholderImg.src}
                    blurDataURL={'placeholderImg.src'}
                    onClick={() => navigateToEventPage(ele.name)}
                  />
                  <div className={style.eventCardContent}>
                    <div
                    // style={{ cursor: 'pointer' }}
                    //   onClick={() => navigateToEventPage(ele.name)}
                    >
                      <div className={style.eventTime}>
                        {ele.date} BY {ele.time}
                      </div>
                      <div className={style.eventName} title={ele.name}>
                        {ele?.name?.length < 22 ? ele?.name : ele?.name?.substring(0, 22) + '...'}
                      </div>
                      <div className={style.eventLocation}>{ele.location}</div>
                      <div className={style.eventInterested} title={ele.description}>
                        {ele?.description?.length < 35
                          ? ele?.description
                          : ele?.description?.substring(0, 35) + '...'}
                      </div>
                    </div>
                    <button className={style.interestedButton} onClick={onInterestedButtonClick}>
                      <Image src={interestedLogo} /> Subscribe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : !skeletonVisible ? (
            <div className={style.eventList}>No Event Found</div>
          ) : (
            <EventListingSkeleton />
          )}
        </div>
      </div>
    </>
  );
};

export default EventListing;
