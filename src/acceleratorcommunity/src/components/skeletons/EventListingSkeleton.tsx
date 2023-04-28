import style from './../../assets/eventListing.module.css';
import Skeleton from 'react-loading-skeleton';
const tablist = ['My Events', 'Upcoming Events', 'Bookmarked Events'];

function EventListingSkeleton() {
  const eventList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <>
      <div className={style.eventListingPage}>
        <div className={style.eventListNavbar}>
          <div className={style.eventTabList}>
            {tablist.map((ele, index) => (
              <div
                key={index}
                className={style.eventTab}
                style={index === 0 ? { background: '#47d7ac', color: 'white' } : {}}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
        <div className={style.eventListcontent}>
          <div className={style.eventList}>
            {eventList.map(() => (
              <div className={style.eventCard}>
                <Skeleton style={{ cursor: 'pointer' }} height={180} width={280} />
                <div className={style.eventCardContent}>
                  <div>
                    <Skeleton className={style.eventTime} />
                    <Skeleton className={style.eventName} />
                    <Skeleton className={style.eventLocation} />
                    <Skeleton className={style.eventInterested} />
                    <Skeleton className={style.interestedButton} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventListingSkeleton;
