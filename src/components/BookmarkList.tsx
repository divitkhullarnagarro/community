import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useContext, useEffect, useState } from 'react';
import getAllBookmarkCall from 'src/API/getAllBookmarks';
import WebContext from 'src/Context/WebContext';
import bookmarkCss from '../assets/bookmarkList.module.css';
import img1 from '../assets/images/knowledge.jpg';
import ActiveBookmark from '../assets/images/BookmarActive.svg';

type BookmarkListProps = ComponentProps & {
  fields: {
    // data: {
    //   datasource: DataSource;
    // };
  };
};

// type Item = {
//   id: string;
//   title: {
//     jsonValue: Field<string>;
//   };
//   description: {
//     jsonValue: RichTextField;
//   };
//   image: {
//     jsonValue: ImageField;
//   };
//   date: {
//     jsonValue: Field<string>;
//   };
//   author: {
//     jsonValue: Field<string>;
//   };
//   tags: {
//     targetItems: [
//       {
//         name: Field<string>;
//       }
//     ];
//   };
//   contentType: {
//     targetItems: [
//       {
//         name: Field<string>;
//       }
//     ];
//   };
// };
// type DataSource = {
//   articlesList: {
//     targetItems: Item[];
//   };
// };

// const getFormatedDate = (stringDate: string) => {
//   const date = new Date(stringDate);

//   // Get month abbreviation
//   const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

//   // Get day with leading zero if necessary
//   const day = String(date.getDate()).padStart(2, '0');

//   // Get full year
//   const year = date.getFullYear();

//   // Combine into formatted string
//   const formattedDate = `${month} ${day} ${year}`;

//   return formattedDate;
// };

// const cardTagItems = [
//   { label: ' Cardiology', path: '/cardioPage', targetSegment: 'cardioPage' },
//   { label: ' Atrial Fibrillation (A-Fib)', path: '/atrialPage', targetSegment: 'atrialPage' },
// ];
// const items = [
//   {
//     contentId: 'News',
//     title: 'Lorem1',
//     comment:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo totam repudiandae eum praesentium delectus!',
//   },
//   {
//     contentId: 'News',
//     title: 'Lorem2',
//     comment:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo totam repudiandae eum praesentium delectus!',
//   },
//   {
//     contentId: 'Cricket',
//     title: 'Lorem13',
//     comment:
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo totam repudiandae eum praesentium delectus!',
//   },
// ];

type bookmarkFields = {
  objectId: Field<string>;
  contentId: Field<string>;
  url: Field<string>;
  title: Field<string>;
  comment: Field<string>;
  id: Field<number>;
};

const BookmarkList = (props: BookmarkListProps): JSX.Element => {
  console.log("props", props)
  const [bookmarkList, setBookmarkList] = useState<bookmarkFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };

  useEffect(() => {
    getBookmarkList(userToken);
  }, []);

  const getBookmarkList = async (userToken: string | undefined) => {
    let response = await getAllBookmarkCall(userToken);
    console.log('aaaaaaaaaaa', response);
    if(response?.data?.success){
      setBookmarkList(response?.data?.data);
    }
    setBookmarkList(response?.data?.data);
    console.log(response?.data?.data)
  };

  // console.log(props);

  
  return (
    <div className={bookmarkCss.container}>
      <div className={bookmarkCss.heading}>
        <h3>My collection</h3>
      </div>
      {bookmarkList.map((l, i) => {
        return (
          <div key={i} className={bookmarkCss.contentTypeContainers}>
            {/* <div className={bookmarkCss.contentTypeContainer}> */}
            <div className={bookmarkCss.leftContainer}>
              {/* <h2>{l.contentId}</h2> */}
              <NextImage
                className={bookmarkCss.leftContainerImage}
                field={img1}
                editable={true}
                width={20}
                height={300}
              />
            </div>
            <div className={bookmarkCss.rightContainer}>
              <div className={bookmarkCss.rightContainerHeading}>
                <h2>{l.title}</h2>

                <p>{l.comment}</p>
                {/* {l.cardTag.map((j,k)=>{
                    return(
                      <div key={k} className={bookmarkCss.cardTags}>
                          {j.name1}
                      </div>
                      
                    );
                  })} */}
                {/* <div className={bookmarkCss.infowrapperTags}>
                    {l.Author}
                  </div> */}

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
      })}
      {/* 
      {bookmarkItem } */}
    </div>
  );
};

export default BookmarkList;
