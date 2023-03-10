import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import styles from '../assets/sidenav.module.css';
import Home from '../assets/images/Home.png';
import Connect from '../assets/images/connect.png';
import Knowledge from '../assets/images/knowledge.jpg';
import News from '../assets/images/news.png';

type SideNavProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const SideNav = (props: SideNavProps): JSX.Element => {
  console.log('SideNav', props);
  const navItems = [
    { label: ' Home', path: '/', targetSegment: null, imgSrc: Home },
    { label: ' News', path: '/news', targetSegment: 'news', imgSrc: News },
    {
      label: ' Knowledge',
      path: '/knowledge',
      targetSegment: 'contact',
      imgSrc: Knowledge,
    },
    {
      label: ' Connect',
      path: '/connect',
      targetSegment: 'connect',
      imgSrc: Connect,
    },
  ];

  return (
    <>
      <div className={styles.navwrapper}>
        {navItems.map((l, i) => {
          return (
            <div key={i} className={styles.sidebar}>
              <NextImage
                className={styles.img}
                field={l.imgSrc}
                editable={true}
                height={20}
                width={20}
              />
              <Link key={i} href={l.path}>
                {l.label}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SideNav;
