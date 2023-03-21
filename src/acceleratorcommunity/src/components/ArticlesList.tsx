import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import ArticlesListCss from '../assets/ArticlesList.module.css';
import sourceImage from '../assets/images/source.svg';
import calendarImage from '../assets/images/calendar.svg';
import bookmarkImage from '../assets/images/bookmark.svg';
import activeBookmarkImage from '../assets/images/BookmarActive.svg';
import shareImage from '../assets/images/share.svg';
import linkedin from '../assets/images/linkedin.png';
import twitter from '../assets/images/twitter.png';
import whatsapp from '../assets/images/whatsapp.png';
import bookmark from '../../src/API/bookmarks';
import { useContext, useState } from 'react';
import WebContext from 'src/Context/WebContext';
import ghj from '../assets/images/Notification.jpg'

type ArticlesListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  title: {
    jsonValue: Field<string>;
  };
  description: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  date: {
    jsonValue: Field<string>;
  };
  author: {
    jsonValue: Field<string>;
  };
  tags: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
  contentType: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
};
type DataSource = {
  articlesList: {
    targetItems: Item[];
  };
};

const getFormatedDate = (stringDate: string) => {
  const date = new Date(stringDate);

  // Get month abbreviation
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Get day with leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0');

  // Get full year
  const year = date.getFullYear();

  // Combine into formatted string
  const formattedDate = `${month} ${day} ${year}`;

  return formattedDate;
};

const ArticlesList = (props: ArticlesListProps): JSX.Element => {
  const userIdTemp = 'test1@test1.com';

  const { userToken } = { ...useContext(WebContext) };

  const { targetItems } = props?.fields?.data?.datasource.articlesList;

  // Change the bookmark image with active bookmark image
  const [withoutClicked, setField] = useState(bookmarkImage);
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    if (clicked) {
      setField(bookmarkImage);
    } else {
      // update field to a new value when button is clicked for the first time
      setField(activeBookmarkImage);
    }
    // toggle the clicked state
    setClicked(!clicked);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleShareClick = () => {
    if (clicked) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
    setClicked(!clicked);
  };

  const submitBookmark = (
    contentId: string,
    // url: string,
    title: string,
    comment: string | undefined
  ) => {
    bookmarkApi(userIdTemp, contentId,  title, comment, userToken);
    // , url:string
    handleClick();
  };

  const bookmarkApi = async (
    userIdTemp: string,
    contentId: string,
    // url: string,
    title: string,
    comment: string | undefined,
    userToken: string | undefined
  ) => {
    let response = await bookmark(userIdTemp, contentId,  title, comment, userToken);
    // url,
    console.log(response);
  };

  console.log("===================================", targetItems);
  return (
    <div className={ArticlesListCss.mainwrapper}>

      {targetItems.map((l, i) => {
        console.log("-------------------------------------",l);
        return (
         
          
          <div key={i} className={ArticlesListCss.wrapper}>
            <div className={ArticlesListCss.leftSection}>
              <NextImage
                className={ArticlesListCss.leftSectionImage}
                field={l.image.jsonValue.value}
                editable={true}
              />
            </div>
            <div className={ArticlesListCss.rightSection}>
              <div className={ArticlesListCss.title}>{l.title.jsonValue.value}</div>
              <div className={ArticlesListCss.cardDescription}>
                <p>
                  {l.description.jsonValue.value}
                  <Link href="/readMorePage">Read More </Link>
                </p>
              </div>
              <div className={ArticlesListCss.cardTags}>
                {l.tags.targetItems.map((m, j) => {
                  return (
                    <div key={j} className={ArticlesListCss.cardTag}>
                      <Link key={j} href={'/#'}>
                        {m.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className={ArticlesListCss.infoWrapper}>
                <div className={ArticlesListCss.infoWrapperTag}>
                  <NextImage
                    className={ArticlesListCss.infowrapperImage}
                    field={sourceImage}
                    editable={true}
                  />
                  <div className={ArticlesListCss.infoWrapperTagData}>
                    {l.author.jsonValue.value}{' '}
                  </div>
                </div>
                <div className={ArticlesListCss.infoWrapperTag}>
                  <NextImage
                    className={ArticlesListCss.infowrapperImage}
                    field={calendarImage}
                    editable={true}
                  />
                  <div className={ArticlesListCss.infoWrapperTagData}>
                    {getFormatedDate(l.date.jsonValue.value)}
                  </div>
                </div>
              </div>

              <div className={ArticlesListCss.buttons}>
                <button
                  className={ArticlesListCss.button}
                  onClick={() =>
                    submitBookmark(
                      l.id,
                      // l.title?.jsonValue.value, //This is for URL or Image value
                      l.title?.jsonValue?.value,
                      l.description?.jsonValue?.value
                    )
                  }
                >
                  <NextImage
                    field={withoutClicked}
                    id="bookamrksImage"
                    editable={true}
                    title="Add To My Collection"
                  />
                </button>
                <button className={ArticlesListCss.button} onClick={handleShareClick}>
                  <NextImage field={shareImage} editable={true} title="Share" />
                </button>
              </div>
              {showPopup && (
                <div className={ArticlesListCss.sharePopups}>
                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={whatsapp}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link href="https://wa.me/?text=Check%20out%20this%20article%20I%20found%3A%20[ARTICLE_LINK]">
                      WhatsApp
                    </Link>
                  </div>

                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={twitter}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link href="https://twitter.com/intent/tweet?url=[ARTICLE_LINK]&text=[ARTICLE_TITLE]">
                      Twitter
                    </Link>
                  </div>

                  <div className={ArticlesListCss.sharePopup}>
                    <NextImage
                      className={ArticlesListCss.whatsappImage}
                      field={linkedin}
                      editable={true}
                      width={25}
                      height={25}
                    />
                    <Link href="https://www.linkedin.com/sharing/share-offsite/?url=[ARTICLE_LINK">
                    LinkedIn
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          
        );
      })}
    </div>
  );
};

export default ArticlesList;
