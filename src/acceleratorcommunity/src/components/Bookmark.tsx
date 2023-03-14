import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import bookmarkCss from '../assets/bookmark.module.css';
import demoImage from '../assets/images/BookmarDemoImage.jpg';
import sourceImage from '../assets/images/source.svg';
import calendarImage from '../assets/images/calendar.svg';
import bookmarkImage from '../assets/images/bookmark.svg';
import shareImage from '../assets/images/share.svg';

type BookmarkProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Bookmark = (props: BookmarkProps): JSX.Element => {
  console.log('props', props);

  const cardTagItems = [
    { label: ' Cardiology', path: '/cardioPage', targetSegment: 'cardioPage' },
    { label: ' Atrial Fibrillation (A-Fib)', path: '/atrialPage', targetSegment: 'atrialPage' },
  ];

  const infoWrapperItems = [
    { label: ' Jama', imgSrc: sourceImage },
    { label: ' 12-02-2000', imgSrc: calendarImage },
  ];

  return (
    <div className={bookmarkCss.wrapper}>
      <div className={bookmarkCss.leftSection}>
        <NextImage className={bookmarkCss.leftSectionImage} field={demoImage} editable={true} />
      </div>
      <div className={bookmarkCss.rightSection}>
        <div className={bookmarkCss.title}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod cumque sapiente sequi?
        </div>
        <div className={bookmarkCss.cardDescription}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum sapiente distinctio
            libero facilis iure eum nisi Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            architecto....
            <Link href="/readMorePage">Read More </Link>
          </p>
        </div>
        <div className={bookmarkCss.cardTags}>
          {cardTagItems.map((l, i) => {
            return (
              <div key={i} className={bookmarkCss.cardTag}>
                <Link key={i} href={l.path}>
                  {l.label}
                </Link>
              </div>
            );
          })}
        </div>
        <div className={bookmarkCss.infoWrapper}>
          {infoWrapperItems.map((l, i) => {
            return (
              <div key={i} className={bookmarkCss.infoWrapperTag}>
                <NextImage
                  className={bookmarkCss.infowrapperImage}
                  field={l.imgSrc}
                  editable={true}
                />
                <div key={i} className={bookmarkCss.infoWrapperTagData}>
                  {l.label}{' '}
                </div>
              </div>
            );
          })}
        </div>
        <div className={bookmarkCss.buttons}>
          <button className={bookmarkCss.button}>
          <NextImage field={bookmarkImage} editable={true} title="Add To My Collection"/>
            {/* <div className={bookmarkCss.hide}>Hide data</div> */}
          </button>
          <button className={bookmarkCss.button}>
            <NextImage field={shareImage} editable={true} title="Share"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
