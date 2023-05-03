import React from 'react';
import styles from '../assets/events.module.css';

const Event = (props: any) => {
  return (
    <>
      {props?.events?.length > 0 &&
        props?.events?.map((event: any) => {
          return (
            <div className={styles.parentContainer}>
              <div className={styles.imgAndContentContainer}>
                <img src={event?.eventImg?.src} alt="eventImg" />
                <div className={styles.content}>
                  <div className={styles.eventHeading}>Understading Accounts Level Attribution</div>
                  <div className={styles.timeContainer}>
                    <div className={styles.eventTime}>
                      {props?.getFormatedDate(event?.startDate)}
                    </div>
                    <div className={styles.eventTime}>to</div>
                    <div className={styles.eventTime}>{props?.getFormatedDate(event?.endDate)}</div>
                  </div>
                  <div className={styles.eventDescription}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium quibusdam
                    excepturi hic dolorum a quas similique, nisi veniam illo ad.
                  </div>
                  <div className={styles.statsConatiner}>155 intrested | 40 going</div>
                </div>
              </div>
              {/* <div className="actonContainer">anmol</div> */}
            </div>
          );
        })}
    </>
  );
};

export default Event;

// <div className={styles.parentContainer}>
//   {props?.events?.length > 0
//     ? props?.events?.map((data: any) => {
//         return (
//           <div className={styles.container}>
//             <div className={styles.eventContainerHeader}>
//               <div className={styles.eventHeaderInfo}>
//                 <img src={data?.eventImg?.src} />
//                 <div>Anmol Chawla</div>
//                 <div></div>
//               </div>
//               <div></div>
//             </div>
//             <div className={styles.eventContainerBody}>
//               <div className={styles.imageContainer}>
//                 <img src={data?.eventImg?.src} />
//               </div>
//               <div className={styles.eventContainerFooter}>
//                 {data?.title}
//                 {data?.description}
//                 {data?.startDate}
//                 {data?.endDate}
//               </div>
//             </div>
//           </div>
//         );
//       })
//     : ''}
// </div>
