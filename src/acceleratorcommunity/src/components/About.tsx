import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from 'react-bootstrap/Accordion';
import styles from '../assets/about.module.css';
import Skeleton from 'react-loading-skeleton';
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import 'react-loading-skeleton/dist/skeleton.css';
import AxiosRequest from 'src/API/AxiosRequest';
import { getUserUrl } from 'assets/helpers/constants';
import darkModeCss from '../assets/darkTheme.module.css';

type AboutProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        heading: {
          jsonValue: Field<string>;
        };
        hobbiesLabel: {
          jsonValue: Field<string>;
        };
        interestsLabel: {
          jsonValue: Field<string>;
        };
        summaryLabel: {
          jsonValue: Field<string>;
        };
        workLabel: {
          jsonValue: Field<string>;
        };
        contactInfoLabel: {
          jsonValue: Field<string>;
        };
      };
    };
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fetchUser, setfetchUser] = useState<any>({});
  const { darkMode } = { ...useContext(WebContext) };

  const params =
    typeof window !== 'undefined'
      ? new URLSearchParams(window?.location?.search)
      : new URLSearchParams('');
  let objectEmail = params.get('id');

  useEffect(() => {
    if (objectEmail && objectEmail != '')
      AxiosRequest({ url: `${getUserUrl}${objectEmail}`, method: 'GET' }).then((response: any) => {
        setfetchUser(response?.data);
        setIsDataLoaded(true);
      });
  }, [objectEmail]);

  console.log('FETCHUSER', fetchUser);
  const AboutSkeleton = () => {
    return (
      <div className={styles.aboutContainer}>
        <Skeleton type="circle" className="mb-2" height={30} />
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
        <div className={`${styles.aboutContainer} ${darkMode ? darkModeCss.grey_3 : ''}`}>
          <h3 className={`${styles.aboutHeader} ${darkMode ? darkModeCss.text_green : ''}`}>
            <Text
              field={
                props?.fields?.data?.datasource?.heading?.jsonValue
                  ? props?.fields?.data?.datasource?.heading?.jsonValue
                  : {
                      value: 'About',
                    }
              }
            />
          </h3>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item
              className={`${styles.accordionItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
              eventKey={'0'}
            >
              <Accordion.Header
                className={`${styles.accordionHeader} ${
                  darkMode ? styles.accordionHeaderTheme : ''
                }`}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.summaryLabel?.jsonValue
                      ? props?.fields?.data?.datasource?.summaryLabel?.jsonValue
                      : {
                          value: 'Summary',
                        }
                  }
                />
              </Accordion.Header>
              <Accordion.Body
                className={`${styles.accordionBody} ${darkMode ? darkModeCss.test_grey_4 : ''}`}
              >
                {fetchUser?.summary ? fetchUser?.summary : 'Nothing to Show.'}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
              className={`${styles.accordionItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
              eventKey={'1'}
            >
              <Accordion.Header
                className={`${styles.accordionHeader} ${
                  darkMode ? styles.accordionHeaderTheme : ''
                }`}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.contactInfoLabel?.jsonValue
                      ? props?.fields?.data?.datasource?.contactInfoLabel?.jsonValue
                      : {
                          value: 'Contact Information',
                        }
                  }
                />
              </Accordion.Header>
              <Accordion.Body
                className={`${styles.accordionBody} ${darkMode ? darkModeCss.test_grey_4 : ''}`}
              >
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
            <Accordion.Item
              className={`${styles.accordionItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
              eventKey={'2'}
            >
              <Accordion.Header
                className={`${styles.accordionHeader} ${
                  darkMode ? styles.accordionHeaderTheme : ''
                }`}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.workLabel?.jsonValue
                      ? props?.fields?.data?.datasource?.workLabel?.jsonValue
                      : {
                          value: 'Work',
                        }
                  }
                />
              </Accordion.Header>
              <Accordion.Body
                className={`${styles.accordionBody} ${darkMode ? darkModeCss.test_grey_4 : ''}`}
              >
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
            <Accordion.Item
              className={`${styles.accordionItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
              eventKey={'3'}
            >
              <Accordion.Header
                className={`${styles.accordionHeader} ${
                  darkMode ? styles.accordionHeaderTheme : ''
                }`}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.hobbiesLabel?.jsonValue
                      ? props?.fields?.data?.datasource?.hobbiesLabel?.jsonValue
                      : {
                          value: 'Hobbies',
                        }
                  }
                />
              </Accordion.Header>
              <Accordion.Body
                className={`${styles.accordionBody} ${darkMode ? darkModeCss.test_grey_4 : ''}`}
              >
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
            <Accordion.Item
              className={`${styles.accordionItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
              eventKey={'4'}
            >
              <Accordion.Header
                className={`${styles.accordionHeader} ${
                  darkMode ? styles.accordionHeaderTheme : ''
                }`}
              >
                <Text
                  field={
                    props?.fields?.data?.datasource?.interestsLabel?.jsonValue
                      ? props?.fields?.data?.datasource?.interestsLabel?.jsonValue
                      : {
                          value: 'Interests',
                        }
                  }
                />
              </Accordion.Header>
              <Accordion.Body
                className={`${styles.accordionBody} ${darkMode ? darkModeCss.test_grey_4 : ''}`}
              >
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
