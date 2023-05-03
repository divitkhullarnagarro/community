import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from 'react-bootstrap/Accordion';
import styles from '../assets/about.module.css';
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'

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
  console.log('EditProfile', props);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(()=>{const Interval= setTimeout(()=>{setIsDataLoaded(true)},2000)
  return()=> clearInterval(Interval)},[])
  const AboutSkeleton= () => {
    return (
      <div className={styles.aboutContainer}>
        <Skeleton className='mb-2' height={30}/>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          {aboutContentList.map((index) => {
            return (
              <Accordion.Item className={styles.accordionItem} eventKey={index.toString()}>
                <div className='p-3 pb-0'>
                  <Skeleton height={30}/>
                </div>
                <div className='p-3'>
                  <Skeleton height={80}/>
                </div>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
    );
  }
const About= () => {
  return (
    <div className={styles.aboutContainer}>
      <h3 className={styles.aboutHeader}>About</h3>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {aboutContentList.map((item, index) => {
          return (
            <Accordion.Item className={styles.accordionItem} eventKey={index.toString()}>
              <Accordion.Header className={styles.accordionHeader}>{item.Header}</Accordion.Header>
              <Accordion.Body className={styles.accordionBody}>{item.Body}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}

return(<>{isDataLoaded?<About/>:<AboutSkeleton/>}</>)
};

export default About;
