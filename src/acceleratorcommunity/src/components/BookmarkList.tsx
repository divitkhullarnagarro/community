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
  fields: {};
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
  const { setUserToken, userToken } = { ...useContext(WebContext) };

  console.log('props', props);

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
  const [bookmarkLists, setBookmarkLists] = useState<any>([]);

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

  useEffect(() => {
    if (userToken != '' && userToken != undefined) {
      getBookmarkList(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    // console.log("realValue",bookmarkLists)
    // Data(bookmarkLists)
  }, [bookmarkLists]);

  let arrayList: bookmarkFields[] = [];
  const getBookmarkList = async (userToken: string | undefined) => {
    let response = await getAllBookmarkCall(userToken);

    if (response?.data?.success) {
      var query = getBookmarkItem();
      response.data.data.map((l: bookmarkFields) => {
        const variables = {
          datasource: l.contentId,
          language: 'en',
        };
         client1.query({ query, variables }).then((result: any) => {
          // alert(result?.data?.datasource);
          // console.log('bookmark', result?.data?.datasource);
          arrayList.push(result?.data?.datasource);
          // setBookmarkLists([...bookmarkLists,result?.data?.datasource])}
        });
        
      });
      setBookmarkLists(arrayList);
      // setBookmarkList(response?.data?.data);
    }
    // setBookmarkList(response?.data?.data);
    console.log('arrayList', arrayList);
    // console.log("javaApi",bookmarkLists);
    // Data(bookmarkLists)
  };

  return (
    <div className={bookmarkCss.container}>
      <div className={bookmarkCss.heading}>
        <h3>My collection</h3>
      </div>
      {bookmarkLists?.length > 0 ? (
        bookmarkLists.map((l: any, i: any) => {
          return (
            <div key={i} className={bookmarkCss.contentTypeContainers}>
              {/* <div className={bookmarkCss.contentTypeContainer}> */}
              <div className={bookmarkCss.leftContainer}>
                <h4>{l.contentType.targetItem.name}</h4>
                <NextImage
                  className={bookmarkCss.leftContainerImage}
                  field={l.image.jsonValue.value}
                  editable={true}
                  width={20}
                  height={300}
                />
              </div>
              <div className={bookmarkCss.rightContainer}>
                <div className={bookmarkCss.rightContainerHeading}>
                  <h4>{l?.title?.jsonValue?.value}</h4>
                  <div>
                    <p>{l.description.jsonValue.value}</p>
                  </div>
                  <div>
                    <p>{l?.id?.jsonValue?.value}</p>
                  </div>
                  <div>{l.author.jsonValue.value}</div>
                  <div className={bookmarkCss.dates}>
                    <NextImage field={calender} editable={true} />

                    {getFormatedDate(l.date.jsonValue.value)}
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
      {/* 
      {bookmarkItem } */}
    </div>
  );
};

export default BookmarkList;
