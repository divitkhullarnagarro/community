import { Field, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useContext, useEffect, useState } from 'react';
import getAllBookmarkCall from 'src/API/getAllBookmarks';
import WebContext from 'src/Context/WebContext';
import bookmarkCss from '../assets/bookmarkList.module.css';
import ActiveBookmark from '../assets/images/BookmarActive.svg';
import calender from '../assets/images/calendar.svg';
import { getBookmarkItem } from './Queries';
import { sitecoreApiHost } from 'temp/config';
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost';
import SideBar from './SideBar';
import darkModeCss from '../assets/darkTheme.module.css';
import BlogListingSkeleton from './skeletons/BlogListingSkeleton';


type BookmarkListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  contentType: jsonValue[];
};

type jsonValue = {
  data: {
    datasource: DataSource;
  };
  url: {
    jsonValue: Field<string>;
  };
  name: {
    jsonValue: Field<string>;
  };
  displayName: {
    jsonValue: Field<string>;
  };
  fields: {
    Name: {
      jsonValue: Field<string>;
    };
  };
};

type bookmarkFields = {
  objectId: Field<string>;
  contentId: Field<string>;
  url: Field<string>;
  title: Field<string>;
  comment: Field<string>;
  image: ImageField;
  id: Field<number>;
};

//Graphql code for fetching data
const ServerLink = `${sitecoreApiHost}/sitecore/api/graph/edge?sc_apikey={79FEE958-BF31-4206-84E8-0A66D488B470}`;
// const GraphQLEndpoint = '/graphql';
const store = 'default';

const httpLink = new HttpLink({
  uri: ServerLink,
});
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      store: store,
    },
  });
  return forward(operation);
});

const client1 = new ApolloClient({
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});

const BookmarkList = (props: BookmarkListProps): JSX.Element => {
  const data = props?.fields?.data?.datasource?.contentType as any;
  const { setUserToken, userToken, darkMode } = { ...useContext(WebContext) };

  const getFormatedDate = (stringDate: string) => {
    console.log('stringDate', stringDate);
    let formattedDate = Date.now().toString();

    if (stringDate !== undefined) {
      const date = new Date(stringDate);

      // Get month abbreviation
      const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

      // Get day with leading zero if necessary
      const day = String(date.getDate()).padStart(2, '0');

      // Get full year
      const year = date.getFullYear();

      // Combine into formatted string
      formattedDate = `${month} ${day} ${year}`;

      return formattedDate;
    }
    return formattedDate;
  };
  // const [bookmarkList, setBookmarkList] = useState<bookmarkFields[]>([]);
  const [completeList, setcompleteList] = useState<any>([]);
  const [bookmarkLists, setBookmarkLists] = useState<any>([]);
  const [bookmarkTYpeClicked, setbookmarkTYpeClicked] = useState<any>(['all']);
  const [showContent, setShowContent] = useState<boolean>(false);

  const [buttonTypes, setbuttonTypes] = useState<any>([]);

  useEffect(() => {
    setbuttonTypes(data?.jsonValue);
  }, []);

  // const [scroll, setScroll] = useState(false);
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (window !== undefined) {
  //       setScroll(window.scrollY > 260);
  //     }
  //   });
  // }, []);

  // setbuttonTypes(data.jsonValue)

  // For storing token in local storage
  useEffect(() => {
    if (userToken === undefined || userToken === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');

        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      }
    }
  }, []);

  const handleClick = (name: any) => {
    let data: any[] = [];
    setbookmarkTYpeClicked(name);
    if (completeList.length > 0) {
      data = completeList?.filter((item: any) => {
        return item?.contentType?.targetItem?.name === name;
      });
    }
    setBookmarkLists(data);
  };

  const handleAllClick = () => {
    setbookmarkTYpeClicked(['all']);

    setBookmarkLists(completeList);
  };

  // const timeToDateParsing = (date: any) => {
  //   const isoString = date; // An ISO 8601 string representing August 1, 2022
  //   const dateOnlyString = isoString.substring(0, 10); // Extract the date component as a string
  //   return dateOnlyString;
  // };

  // const splitDate = (date: string) => {
  //   console.log('date', date);
  //   var parts = date.split(' ');
  //   return parts[0];
  // };

  // const TodaysDate = () => {
  //   var currentDate = new Date();

  //   // Step 2: Extract the individual components
  //   // var year = currentDate.getFullYear();
  //   // var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  //   // var day = ('0' + currentDate.getDate()).slice(-2);

  //   // Step 3: Format the components into the desired format
  //   // var formattedDate = day + '-' + month + '-' + year;
  //   currentDate.setHours(0, 0, 0, 0);
  //   return currentDate;
  // };

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getBookmarkList(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (bookmarkLists.length > 0) {
      setShowContent(true);
    }
    console.log('ran useeffect', bookmarkLists);
  }, [bookmarkLists]);

  const nowArticles = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      const TodayDate = new Date();

      return new Date(item?.date?.jsonValue?.value).toDateString() === TodayDate.toDateString();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      console.log('bookmarkTYpeClicked', bookmarkTYpeClicked);

      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }
  };

  const upComingArticle = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      const TodayDate = new Date();

      return new Date(item?.date?.jsonValue?.value).toDateString() > TodayDate.toDateString();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }
  };

  const pastArticle = () => {
    let nowDateArticle = completeList?.filter((item: any) => {
      const TodayDate = new Date();

      return new Date(item?.date?.jsonValue?.value).toDateString() < TodayDate.toDateString();
    });
    if (bookmarkTYpeClicked[0] === 'all') {
      setBookmarkLists(nowDateArticle);
    } else {
      setBookmarkLists(nowDateArticle);
      twoFilters(nowDateArticle);
    }
  };

  const twoFilters = (nowDateArticle: any) => {
    let doubleFilter = nowDateArticle?.filter((item: any) => {
      return item?.contentType?.targetItem?.name === bookmarkTYpeClicked;
    });
    console.log(doubleFilter);
    setBookmarkLists(doubleFilter);
  };

  let arrayList: bookmarkFields[] = [];
  const getBookmarkList = async (userToken: string | undefined) => {
    let response = await getAllBookmarkCall(userToken);

    if (response?.data?.success) {
      var query = getBookmarkItem();
      response?.data?.data?.map((l: bookmarkFields) => {
        const variables = {
          datasource: l?.contentId,
          language: 'en',
        };
        client1.query({ query, variables }).then((result: any) => {
          if (result?.data?.datasource !== null) {
            console.log('result?.data?.datasource', result?.data?.datasource);
            arrayList.push(result?.data?.datasource);
          }
        });
      });
      // arrayList.push(obj)
      setcompleteList(arrayList);
      setBookmarkLists(arrayList);
    } else if (response?.data?.success === false) {
    }
  };
  return (
    <div className={bookmarkCss.container}>
      <SideBar
        handleAllClick={handleAllClick}
        bookmarkTYpeClicked={bookmarkTYpeClicked}
        handleClick={handleClick}
        buttonTypes={buttonTypes}
        nowArticles={nowArticles}
        pastArticle={pastArticle}
        upComingArticle={upComingArticle}
        flag={true}
      />

      <div className={`${bookmarkCss.heading} ${darkMode ? darkModeCss.text_light : ''}`}>
        <div className={`${bookmarkCss.leftContainerImage} ${bookmarkCss.head}`}>
          <NextImage field={ActiveBookmark} editable={true} width={35} height={30} />
        </div>

        <h5>Saved Bookmarks</h5>
      </div>
      <div className={bookmarkCss.bodyContainer}>
        <div>
          {' '}
          {console.log('bookmarkListsbookmarkLists', bookmarkLists)}
          <div className={bookmarkCss.listContainers}>
            {showContent?bookmarkLists?.length > 0 ? (
              bookmarkLists.map((l: any, i: any) => {
                return (
                  <div key={i} className={`${bookmarkCss.contentTypeContainers} ${darkMode ? darkModeCss.grey_3 : ''}`}>
                    {/* <div className={bookmarkCss.contentTypeContainer}> */}
                    <div className={bookmarkCss.leftContainer}>
                      {/* <h4>{l?.contentType?.targetItem?.name}</h4> */}
                      <NextImage
                        className={bookmarkCss.leftContainerImage}
                        field={l?.image?.jsonValue?.value}
                        editable={true}
                        width={100}
                        height={400}
                      />
                    </div>
                    <div className={bookmarkCss.rightContainer}>
                    <div className={`${bookmarkCss.rightContainerHeading} ${darkMode ? darkModeCss.text_green : ''}`}>

                        <h5>{l?.title?.jsonValue?.value}</h5>
                      </div>
                      <div className={`${bookmarkCss.rightContainerDescription} ${darkMode ? darkModeCss.test_grey_4 : ''}`}>

                        {l?.shortDescription?.jsonValue?.value}
                      </div>
                      <div>
                        <p>{l?.id?.jsonValue?.value}</p>
                      </div>
                      <div>{l?.author?.jsonValue?.value}</div>
                      <div className={`${bookmarkCss.dates} ${darkMode ? darkModeCss.text_light : ''}`}>

                        <NextImage field={calender} editable={true} />
                        {getFormatedDate(l?.date?.jsonValue?.value)}
                      </div>
                      <div className={bookmarkCss.tags}>
                        <div className={bookmarkCss.leftContainerImage}>
                          <NextImage
                            field={ActiveBookmark}
                            editable={true}
                            width={35}
                            height={30}
                          />
                        </div>
                        <h5>{l?.contentType?.targetItem?.name}</h5>
                      </div>
                      {/* <div className={bookmarkCss.button}>
                          <button>
                            <NextImage
                              className={bookmarkCss.leftContainerImage}
                              field={ActiveBookmark}
                              editable={true}
                            />
                          </button>
                        </div> */}
                      </div>
                    </div>

                  // </div>
                );
              })
            ) : (
              <div className={`${bookmarkCss.emptyBox} ${darkMode ? darkModeCss.text_light : ''}`}>
                <h2>Oops there is no content available for this filter !</h2>
              </div>
            ): (
              <BlogListingSkeleton />
            )}
          </div>
        </div>
        {/* <div className={scroll ? bookmarkCss.filterContainerTop : bookmarkCss.filterConatiner}> */}
      </div>
    </div>
  );
};

export default BookmarkList;
