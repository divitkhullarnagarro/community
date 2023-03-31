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
  const { setUserToken, userToken } = { ...useContext(WebContext) };

  console.log('propssssssssssssssssssssssssssssss', props);

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
  // const [bookmarkList, setBookmarkList] = useState<bookmarkFields[]>([]);
  const [completeList, setcompleteList] = useState<any>([]);
  const [bookmarkLists, setBookmarkLists] = useState<any>([]);
  const [bookmarkTYpeClicked, setbookmarkTYpeClicked] = useState<any>([]);
  const [buttonTypes, setbuttonTypes] = useState<any>([]);

  useEffect(() => {
    setbuttonTypes(data?.jsonValue);
  }, []);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window !== undefined) {
        setScroll(window.scrollY > 45);
      }
    });
  }, []);

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
      data = completeList.filter((item: any) => {
        return item?.contentType?.targetItem?.name === name;
      });
    }
    setBookmarkLists(data);
  };

  const handleAllClick = () => {
    setbookmarkTYpeClicked('all');

    setBookmarkLists(completeList);
  };

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getBookmarkList(userToken);
    }
  }, [userToken]);

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
          // alert(result?.data?.datasource);
          arrayList.push(result?.data?.datasource);
          // setBookmarkLists([...bookmarkLists,result?.data?.datasource])}
        });
      });
      setcompleteList(arrayList);
      setBookmarkLists(arrayList);
      // setBookmarkList(response?.data?.data);
    }
    // setBookmarkList(response?.data?.data);
    // console.log("javaApi",bookmarkLists);
    // Data(bookmarkLists)
  };

  return (
    <div className={bookmarkCss.container}>
      <div className={bookmarkCss.heading}>
        <h3>My collection</h3>
      </div>
      <div className={bookmarkCss.bodyContainer}>
        <div className={scroll ? bookmarkCss.sideNavTop : bookmarkCss.sideNav}>
          {buttonTypes?.length > 0 ? (
            <button
              onClick={handleAllClick}
              className={
                bookmarkTYpeClicked.includes('all') ? bookmarkCss.activeBtn : bookmarkCss.actionBtn
              }
            >
              ALL
            </button>
          ) : (
            ''
          )}
          {buttonTypes?.length > 0
            ? buttonTypes.map((item: any) => {
                return (
                  <button
                    onClick={() => handleClick(item?.fields?.Name?.value)}
                    className={
                      bookmarkTYpeClicked.includes(item?.fields?.Name?.value)
                        ? bookmarkCss.activeBtn
                        : bookmarkCss.actionBtn
                    }
                  >
                    {item?.fields?.Name?.value}
                  </button>
                );
              })
            : ''}
        </div>
        <div>
          {' '}
          <div className={bookmarkCss.listContainers}>
            {bookmarkLists?.length > 0 ? (
              bookmarkLists.map((l: any, i: any) => {
                return (
                  <div key={i} className={bookmarkCss.contentTypeContainers}>
                    {/* <div className={bookmarkCss.contentTypeContainer}> */}
                    <div className={bookmarkCss.leftContainer}>
                      <h4>{l?.contentType?.targetItem?.name}</h4>
                      <NextImage
                        className={bookmarkCss.leftContainerImage}
                        field={l?.image?.jsonValue?.value}
                        editable={true}
                        width={20}
                        height={300}
                      />
                    </div>
                    <div className={bookmarkCss.rightContainer}>
                      <div className={bookmarkCss.rightContainerHeading}>
                        <h4>{l?.title?.jsonValue?.value}</h4>
                        <div>
                          <p>{l?.description?.jsonValue?.value}</p>
                        </div>
                        <div>
                          <p>{l?.id?.jsonValue?.value}</p>
                        </div>
                        <div>{l?.author?.jsonValue?.value}</div>
                        <div className={bookmarkCss.dates}>
                          <NextImage field={calender} editable={true} />

                          {getFormatedDate(l?.date?.jsonValue?.value)}
                        </div>

                        <div className={bookmarkCss.button}>
                          <button>
                            <NextImage
                              className={bookmarkCss.leftContainerImage}
                              field={ActiveBookmark}
                              editable={true}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  // </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* 
      {bookmarkItem } */}
    </div>
  );
};

export default BookmarkList;
