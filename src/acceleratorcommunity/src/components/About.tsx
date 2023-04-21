import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Accordion from 'react-bootstrap/Accordion';
import styles from '../assets/about.module.css';

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
};

export default About;
