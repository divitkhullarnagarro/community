import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from 'react-bootstrap/Accordion';
import styles from '../assets/about.module.css';
import Skeleton from 'react-loading-skeleton';
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import AxiosRequest from 'src/API/AxiosRequest';
import { getUserUrl } from 'assets/helpers/constants';

type AboutProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const aboutContentList = [
  {
    Header: 'Overview',
    Body: 'My name is John Doe. I have 10 years of experience and currently working as a Software developer at ABC Pvt Ltd. I have expertise in both the frontend and the backend technologies.',
  },
  {
    Header: 'Contact Information',
    Body: 'Mobile No: 90102034050, Email:John@Doe.com',
  },
  {
    Header: 'Work and Education',
    Body: 'SoftWare Engineer at ABC Pvt Ltd., B.Tech In Computer Science',
  },
  {
    Header: 'About You',
    Body: 'My name is John Doe. I have 10 years of experience and currently working as a Software developer at ABC Pvt Ltd. I have expertise in both the frontend and the backend technologies.',
  },
  {
    Header: 'Life Events',
    Body: 'Graduated in 2012, Gold medal in Academics, ',
  },
];

const About = (props: AboutProps): JSX.Element => {
  props;
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fetchUser, setfetchUser] = useState<any>({});

  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams('');
  let objectEmail = params.get('id');

  useEffect(() => {
    if (objectEmail && objectEmail != '')
      AxiosRequest({ url: `${getUserUrl}${objectEmail}`, method: 'GET' }).then((response: any) => {
        setfetchUser(response?.data);
      });
  }, [objectEmail]);

  useEffect(() => {
    const Interval = setTimeout(() => {
      setIsDataLoaded(true);
    }, 2000);
    return () => clearInterval(Interval);
  }, []);

  console.log('FETCHUSER', fetchUser);
  const AboutSkeleton = () => {
    return (
      <div className={styles.aboutContainer}>
        <Skeleton className="mb-2" height={30} />
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {aboutContentList.map((index) => {
            return (
              <Accordion.Item className={styles.accordionItem} eventKey={index.toString()}>
                <div className="p-3 pb-0">
                  <Skeleton height={30} />
                </div>
                <div className="p-3">
                  <Skeleton height={80} />
                </div>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    );
  };

  const About = () => {
    return (
      <>
        <div className={styles.aboutContainer}>
          <h3 className={styles.aboutHeader}>About</h3>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item className={styles.accordionItem} eventKey={'0'}>
              <Accordion.Header className={styles.accordionHeader}>Summary</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {fetchUser?.summary ? fetchUser?.summary : 'Nothing to Show.'}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey={'1'}>
              <Accordion.Header className={styles.accordionHeader}>
                Contact Information
              </Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {fetchUser?.phoneNo ? (
                  <div>
                    <div>Email : {fetchUser?.email}</div>
                    <div>Mobile No. : {fetchUser?.phoneNo}</div>
                  </div>
                ) : (
                  'Nothing to Show.'
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey={'2'}>
              <Accordion.Header className={styles.accordionHeader}>Work</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {fetchUser?.placeOfPractice && fetchUser?.placeOfPractice.length > 0 ? (
                  <div>
                    <div>Company : {fetchUser?.placeOfPractice[0]?.orgName}</div>
                    <div>Designation : {fetchUser?.placeOfPractice[0]?.designation}</div>
                  </div>
                ) : (
                  'Nothing to Show.'
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey={'3'}>
              <Accordion.Header className={styles.accordionHeader}>Hoobies</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {fetchUser?.hobby && fetchUser?.hobby?.length > 0 ? (
                  <div>
                    {fetchUser?.hobby.map((hobby: any) => {
                      return <div>{hobby}</div>;
                    })}
                  </div>
                ) : (
                  'Nothing to Show.'
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={styles.accordionItem} eventKey={'4'}>
              <Accordion.Header className={styles.accordionHeader}>Interests</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>
                {fetchUser?.interests && fetchUser?.interests?.length > 0 ? (
                  <div>
                    {fetchUser?.interests.map((interest: any) => {
                      return <div>{interest}</div>;
                    })}
                  </div>
                ) : (
                  'Nothing to Show.'
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    );
  };

  return <>{isDataLoaded ? <About /> : <AboutSkeleton />}</>;
};

export default About;
