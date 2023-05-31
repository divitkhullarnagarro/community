import {
  // getMyBlogsUrl,
  // getSuggestedBlogsUrl,
  // getBookmarkedMyBlogsUrl,
  // demoBookmarkedEventList,
  // demoMyEventList,
  // demoSuggestedEventList,
  getMyEventsUrl,
  EventImage,
  getUpcomingEventsUrl,
} from 'assets/helpers/constants';
import WebContext from '../../Context/WebContext';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import AxiosRequest from 'src/API/AxiosRequest';
// import { AxiosResponse } from 'axios';
import style from './../../assets/eventListing.module.css';
import darkTheme from './../../assets/darkTheme.module.css';
import event from './../../assets/images/event.svg';
// import interestedLogo from './../../assets/images/interestedLogo.svg';
// import placeholderImg from './../../assets/images/placeholderImg.png';
import { Event } from './../../assets/helpers/types';
import EventListingSkeleton from 'components/skeletons/EventListingSkeleton';
import {
  getDateAndtimeForEvent,
  getFilteredEvents,
  getUpcommingEventsFilter,
} from 'assets/helpers/helperFunctions';
import GenericNotificationContext from 'src/Context/GenericNotificationContext';
const tablist = ['My Events', 'Upcoming Events', 'Bookmarked Events'];

const EventListing = (): JSX.Element => {
  const { setError, setMessage, setShowNotification } = {
    ...useContext(GenericNotificationContext),
  };
  const [activeTab, setActiveTab] = useState('My Events');
  const [eventList, setEventList] = useState<Event>([] as Event);
  const { darkMode, userObject } = { ...useContext(WebContext) };
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const getMyEvent = async () => {
    try {
      const res: any = await AxiosRequest({
        method: 'POST',
        url: getMyEventsUrl,
        data: {
          filters: ['createdBy.objectId'],
          text: userObject.objectId,
          type: 'EVENT',
        },
      });

      // console.log('my event list', data.data.hits);

      if (res?.success) {
        setEventList(res.data.hits);
        setSkeletonVisible(false);
      } else {
        setError(true);
        setMessage(res?.errorMessages?.[0] ? res?.errorMessages?.[0] : 'Something Went Wrong');
        setShowNotification(true);
        setSkeletonVisible(false);
      }
    } catch (error) {
      console.log(error);
      setSkeletonVisible(false);
    }
  };
  const getUpcomingEvents = async () => {
    try {
      const res: any = await AxiosRequest({
        method: 'POST',
        url: getUpcomingEventsUrl,
        data: {
          filters: ['createdBy.objectId', 'description', 'Title'],
          text: '*',
          type: 'EVENT',
        },
      });

      if (res?.success) {
        const filtered = getFilteredEvents(res.data.hits);
        // console.log('upcoming events filtered', filtered);
        const upcoming = getUpcommingEventsFilter(filtered);
        // console.log('upcoming events upcoming', upcoming);

        setEventList(upcoming);
        setSkeletonVisible(false);
      } else {
        setError(true);
        setMessage(res?.errorMessages?.[0] ? res?.errorMessages?.[0] : 'Something Went Wrong');
        setShowNotification(true);
        setSkeletonVisible(false);
      }
    } catch (error) {
      console.log(error);
      setSkeletonVisible(false);
    }
  };
  const getBookmarkedEvents = async () => {
    try {
      const res: any = await AxiosRequest({
        method: 'POST',
        url: getMyEventsUrl,
        data: {
          filters: ['createdBy.objectId'],
          text: userObject.objectId,
          type: 'EVENT',
        },
      });

      if (res?.success) {
        setEventList(res.data.hits);
        setSkeletonVisible(false);
      } else {
        setError(true);
        setMessage(res?.errorMessages?.[0] ? res?.errorMessages?.[0] : 'Something Went Wrong');
        setShowNotification(true);
        setSkeletonVisible(false);
      }
    } catch (error) {
      console.log(error);
      setSkeletonVisible(false);
    }
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

  // const onInterestedButtonClick = () => {
  //   alert('Subscribe button clicked');
  // };
  const router = useRouter();
  const navigateToEventPage = (id: string, isSitecoreEvent: any) => {
    if (!isSitecoreEvent) {
      router.push(`/post?postId=${id}`);
    }
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
        <div className={`${style.eventListcontent} ${darkMode && darkTheme.darkMode_bgChild}`}>
          {eventList?.length > 0 ? (
            <div className={style.eventList}>
              {eventList.map((ele: any, i) => (
                <div
                  key={i}
                  className={`${style.eventCard} ${darkMode && darkTheme.darkMode_textBg}`}
                >
                  <img
                    style={{ cursor: 'pointer' }}
                    src={
                      EventImage[ele?.sourceAsMap?.event?.eventType]
                        ? EventImage[ele?.sourceAsMap?.event?.eventType]
                        : ele?.sourceAsMap?.event?.imageUrl
                        ? ele?.sourceAsMap?.event?.imageUrl
                        : event.src
                    }
                    alt={ele?.sourceAsMap?.event?.title}
                    height={180}
                    width={280}
                    // placeholder="blur"
                    //   blurDataURL={placeholderImg.src}
                    // blurDataURL={'placeholderImg.src'}
                    onClick={() => navigateToEventPage(ele?.id, ele?.isSitecoreEvent)}
                  />
                  <div className={style.eventCardContent}>
                    <div
                    // style={{ cursor: 'pointer' }}
                    //   onClick={() => navigateToEventPage(ele.name)}
                    >
                      <div className={`${style.eventTime} ${darkMode && darkTheme.text_green}`}>
                        {getDateAndtimeForEvent(ele?.sourceAsMap?.event?.eventDate)}
                      </div>
                      <div
                        className={`${style.eventName} ${darkMode && darkTheme.text_green}`}
                        title={ele?.sourceAsMap?.event?.title}
                      >
                        {ele?.sourceAsMap?.event?.title?.length < 22
                          ? ele?.sourceAsMap?.event?.title
                          : ele?.sourceAsMap?.event?.title?.substring(0, 22) + '...'}
                      </div>
                      <div className={`${style.eventLocation} ${darkMode && darkTheme.text_light}`}>
                        {ele?.sourceAsMap?.event?.eventType
                          ? ele?.sourceAsMap?.event?.eventType
                          : 'Sitecore Event'}
                      </div>
                      <div
                        className={`${style.eventInterested} ${darkMode && darkTheme.text_light}`}
                        title={ele?.sourceAsMap?.event?.description}
                      >
                        {ele?.sourceAsMap?.event?.description?.length < 35
                          ? ele?.sourceAsMap?.event?.description
                          : ele?.sourceAsMap?.event?.description?.substring(0, 35) + '...'}
                      </div>
                    </div>
                    {/* <button className={style.interestedButton} onClick={onInterestedButtonClick}>
                      <Image src={interestedLogo} /> Subscribe
                    </button> */}
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
