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
import { useContext, useEffect, useState } from 'react';
import WebContext from 'src/Context/WebContext';
// import { useRouter } from 'next/router';
import facebook from '../assets/images/facebook.svg';
import SideBar from './SideBar';
import SuggestiveSearchCall from 'src/API/SuggestiveApi';
import darkModeCss from '../assets/darkTheme.module.css';

type ArticlesListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  url: {
    url: string;
  };
  title: {
    jsonValue: Field<string>;
  };
  shortDescription: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  date: {
    jsonValue: Field<string>;
  };
  authorName: {
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
type Content = {
  name_f18b1a9ad1ff4c13ad6080a2f710e438: {
    jsonValue: Field<string>;
  };
};
type DataSource = {
  articlesList: {
    targetItems: Item[];
  };
  articleContentType: {
    targetItems: Content[];
  };
  whatsApp: {
    jsonValue: Field<string>;
  };
  twitter: {
    jsonValue: Field<string>;
  };
  linkedIn: {
    jsonValue: Field<string>;
  };
  facebook: {
    jsonValue: Field<string>;
  };
};

// const getFormatedDate = (stringDate: string) => {
//   // const date = new Date(stringDate);
//   // // Get month abbreviation
//   // const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
//   // // Get day with leading zero if necessary
//   // const day = String(date.getDate()).padStart(2, '0');
//   // // Get full year
//   // const year = date.getFullYear();
//   // // Combine into formatted string
//   // const formattedDate = `${month} ${day} ${year}`;
//   // return formattedDate;
// };

const ArticlesList = (props: ArticlesListProps): JSX.Element => {

  const { userToken, objectId, darkMode} = { ...useContext(WebContext) };




  useEffect(() => {
    if (userToken !== null && userToken !== undefined && userToken !== '') {
      SuggestiveSearchCall('*', 'ALL', userToken, ['ShortDescription', 'Title']).then(
        (response: any) => {
          if (response?.data?.success === true) {
            if (response?.data?.data !== null && response?.data?.data !== undefined) {
              if (
                response?.data?.data?.totalHits !== null &&
                response?.data?.data?.totalHits !== undefined &&
                response?.data?.data?.totalHits?.value > 0
              ) {
                Buttons(response?.data?.data?.hits)
                setBookmarkLists(response?.data?.data?.hits);
                setCompleted(response?.data?.data?.hits);
              } else {
              }
            }
          }
        }
      );
    }
  }, [userToken]);

  const [bookmarkTYpeClicked, setbookmarkTYpeClicked] = useState<any>(['all']);
  const [buttons, setButtons] = useState<any>([]);


  // const timeToDateParsing = (date: any) => {
  //   const isoString = date; // An ISO 8601 string representing August 1, 2022
  //   const dateOnlyString = isoString.substring(0, 10); // Extract the date component as a string
  //   return dateOnlyString;
  // };

  const Buttons = (Button:any) => {
    console.log("buttonsbuttonsbuttonsbuttonsbuttonsbuttons",Button)
    let button : any = []
    Button.forEach((element:any) => {
      if(!button.includes(element?.sourceAsMap?.ContentType)){
        button.push(element?.sourceAsMap?.ContentType)
      }
    });
    console.log("=========",button)
    setButtons(button)

  }

  const [bookmarkLists, setBookmarkLists] = useState<any>([]);
  const [completeList, setCompleted] = useState<any>([]);

  const [selectedArticle, setSelectedArticle] = useState<any>([]);
  const [shareArticle, setShareArticle] = useState<any>([]);

  // Change the bookmark image with active bookmark image
  const handleSelectedArticle = (id: any) => {
    if (selectedArticle.includes(id)) {
      const index = selectedArticle.indexOf(id);

      if (index > -1) {
        selectedArticle.splice(index, 1);
      }
    } else {
      setSelectedArticle([...selectedArticle, id]);
    }
  };

  const handleShareClick = (id: any) => {
    if (shareArticle.includes(id)) {
      setShareArticle([]);
    } else {
      setShareArticle(id);
    }
  };

  const TodaysDate = () => {
    var currentDate = new Date();

    // Step 2: Extract the individual components
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);

    // Step 3: Format the components into the desired format
    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
  };

  const splitDate = (date: string) => {
    var parts = date.split(' ');
    return parts[0];
  };

  const twoFilters = (nowDateArticle: any) => {
    let doubleFilter = nowDateArticle?.filter((item: any) => {
      return item?.sourceAsMap?.ContentType === bookmarkTYpeClicked;
    });
    setBookmarkLists(doubleFilter);
  };

  const pastArticle = () => {
    const upComing = completeList?.filter((item: any) => {
      const date = splitDate(item?.sourceAsMap?.Date);
      const TodayDate = TodaysDate();
      return (
        new Date(date.split('-').reverse().join('-')) <
        new Date(TodayDate.split('-').reverse().join('-'))
      );
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(upComing);
    } else {
      setBookmarkLists(upComing);
      twoFilters(upComing);
    }
  };
  const nowArticles = () => {
    const upComing = completeList?.filter((item: any) => {
      const date = splitDate(item?.sourceAsMap?.Date);
      const TodayDate = TodaysDate();
      return (
        new Date(date.split('-').reverse().join('-')) ===
        new Date(TodayDate.split('-').reverse().join('-'))
      );
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(upComing);
    } else {
      setBookmarkLists(upComing);
      twoFilters(upComing);
    }
  };

  const upComingArticle = () => {
    const upComing = completeList?.filter((item: any) => {
      const date = splitDate(item?.sourceAsMap?.Date);
      const TodayDate = TodaysDate();
      return (
        new Date(date.split('-').reverse().join('-')) >
        new Date(TodayDate.split('-').reverse().join('-'))
      );
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(upComing);
    } else {
      setBookmarkLists(upComing);
      twoFilters(upComing);
    }
  };
  const bookmarkApi = async (
    userIdTemp: string | undefined,
    contentId: string,
    title: string,
    comment: string | undefined,
    userToken: string | undefined
  ) => {
    let response = await bookmark(userIdTemp, contentId, title, comment, userToken);
    console.log(response);
    // url,
  };
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window !== undefined) {
        setScroll(window.scrollY > 45);
      }
    });
  }, []);

  const handleClick = (name: any) => {
    let data: any[] = [];
    setbookmarkTYpeClicked(name);
    if (completeList.length > 0) {
      data = completeList?.filter((item: any) => {
        return item?.sourceAsMap?.ContentType === name;
      });
    }
    setBookmarkLists(data);
  };
  const handleAllClick = () => {
    setbookmarkTYpeClicked(['all']);

    setBookmarkLists(completeList);
  };
  const submitBookmark = (
    userIdTemp: string | undefined,
    contentId: string,
    // url: string,
    title: string,
    comment: string | undefined
  ) => {
    // setTokenFromLocalStorage();
    bookmarkApi(userIdTemp, contentId, title, comment, userToken);
    // , url:string
    // handleClick();
    handleSelectedArticle(contentId);
  };
  return (
    <div className={ArticlesListCss.bodyContainer}>
      <SideBar
        buttonTypes={buttons}
        handleAllClick={handleAllClick}
        handleClick={handleClick}
        scroll={scroll}
        bookmarkTYpeClicked={bookmarkTYpeClicked}
        nowArticles={nowArticles}
        pastArticle={pastArticle}
        upComingArticle={upComingArticle}
        flag={false}
      />
      <div className={ArticlesListCss.mainwrapper}>
        {/* <SideBar
        buttonTypes={dataum}
        handleAllClick={handleAllClick}
        handleClick={handleClick}
        scroll={scroll}
        bookmarkTYpeClicked={bookmarkTYpeClicked}
      /> */}
        <div className={ArticlesListCss.contentwrapper}>
          {bookmarkLists?.length > 0 ? (
            bookmarkLists?.map((l: any, i: any) => {
              return (
                <div key={i} className={`${ArticlesListCss.wrapper} ${darkMode ? darkModeCss.grey_3 : ''}`}>
                  <div className={ArticlesListCss.leftSection}>
                    <NextImage
                      className={ArticlesListCss.leftSectionImage}
                      field={l?.sourceAsMap?.Image}
                      editable={true}
                    />
                  </div>
                  <div className={ArticlesListCss.rightSection}>
                    <div className={`${ArticlesListCss.title} ${darkMode ? darkModeCss.text_green : ''}`}>{l?.sourceAsMap?.Title}</div>
                    <div className={`${ArticlesListCss.cardDescription} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>
                      <p>
                        {l?.sourceAsMap?.ShortDescription}
                        {/* <Link href="/readMorePage">Read More </Link> */}
                      </p>
                    </div>
                    {/* <div className={ArticlesListCss.cardTags}>
                      {l?.tags?.targetItems?.map((m: any, j: any) => {
                        return (
                          <div key={j} className={ArticlesListCss.cardTag}>
                            <Link key={j} href={'/#'}>
                              {m?.name}
                            </Link>
                          </div>
                        );
                      })}
                    </div> */}
                    <div className={ArticlesListCss.infoWrapper}>
                      <div className={`${ArticlesListCss.infoWrapperTag} ${darkMode ? darkModeCss.text_light : ''}`}>
                        <NextImage
                          className={ArticlesListCss.infowrapperImage}
                          field={sourceImage}
                          editable={true}
                        />
                        <div className={ArticlesListCss.infoWrapperTagData}>
                          {l?.sourceAsMap?.AuthorName}{' '}
                        </div>
                      </div>
                      <div className={`${ArticlesListCss.infoWrapperTag} ${darkMode ? darkModeCss.text_light : ''}`}>
                        <NextImage
                          className={ArticlesListCss.infowrapperImage}
                          field={calendarImage}
                          editable={true}
                        />
                        <div className={ArticlesListCss.infoWrapperTagData}>
                          {splitDate(l?.sourceAsMap?.Date)}
                        </div>
                      </div>
                    </div>

                    <div className={ArticlesListCss.buttons}>
                      <button
                        className={ArticlesListCss.button}
                        onClick={() =>
                          submitBookmark(
                            objectId,
                            l?.sourceAsMap?.Id,
                            l?.sourceAsMap?.Title,
                            l?.sourceAsMap?.ShortDescription
                          )
                        }
                      >
                        <NextImage
                          field={
                            selectedArticle?.includes(l?.id) ? activeBookmarkImage : bookmarkImage
                          }
                          id="bookamrksImage"
                          editable={true}
                          width={100}
                          height={100}
                          title="Add To My Collection"
                        />
                      </button>
                      <button
                        className={ArticlesListCss.button}
                        onClick={() => handleShareClick(l?.sourceAsMap?.Id)}
                      >
                        <NextImage field={shareImage} editable={true} width={100}
                          height={100} title="Share" />
                      </button>
                    </div>

                    {shareArticle.includes(l?.id) && (
                      <div className={ArticlesListCss.sharePopups}>
                        <div className={ArticlesListCss.sharePopup}>
                          <NextImage
                            className={ArticlesListCss.whatsappImage}
                            field={whatsapp}
                            editable={true}
                            width={25}
                            height={25}
                          />
                          <Link
                            href={`${props?.fields?.data?.datasource?.whatsApp?.jsonValue?.value}${process.env.PUBLIC_URL}/news/${l?.sourceAsMap?.Id}&utm_source=whatsapp&utm_medium=social&utm_term=${l?.sourceAsMap?.Id}`}
                          >
                            <a className={ArticlesListCss.targetIcon} target="_blank">
                              WhatsApp
                            </a>
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
                          <Link
                            href={`${props?.fields?.data?.datasource?.twitter?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/news/${l?.sourceAsMap?.Id}&utm_source=twitter&utm_medium=social&utm_term=${l?.sourceAsMap?.Id}`}
                          >
                            <a className={ArticlesListCss.targetIcon} target="_blank">
                              Twitter
                            </a>
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
                          <Link
                            href={`${props?.fields?.data?.datasource?.linkedIn?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/news/${l?.sourceAsMap?.Id}&utm_source=linkedIn&utm_medium=social&utm_term=${l?.sourceAsMap?.Id}`}
                          >
                            <a className={ArticlesListCss.targetIcon} target="_blank">
                              LinkedIn
                            </a>
                          </Link>
                        </div>
                        <div className={ArticlesListCss.sharePopup}>
                          <NextImage
                            className={ArticlesListCss.whatsappImage}
                            field={facebook}
                            editable={true}
                            width={25}
                            height={25}
                          />
                          <Link
                            href={`${props?.fields?.data?.datasource?.facebook?.jsonValue?.value}?u=${process.env.PUBLIC_URL}/news/${l?.sourceAsMap?.Id}&utm_source=facebook&utm_medium=social&utm_term=${l?.sourceAsMap?.Id}`}
                          >
                            <a className={ArticlesListCss.targetIcon} target="_blank">
                              Facebook
                            </a>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={`${ArticlesListCss.emptyBox} ${darkMode ? darkModeCss.text_light : ''}`}>
              <h2>Oops there is no content available for this filter !</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
