import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import searchCss from '../assets/search.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WebContext from 'src/Context/WebContext';
// import { getValueFromCookie } from 'assets/helpers/helperFunctions';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
import SuggestiveSearchCall from 'src/API/SuggestiveApi';
import { htmlToText } from 'html-to-text';
import ToastNotification from './ToastNotification';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import parser from 'html-react-parser';
type SearchProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        title: {
          jsonValue: Field<string>;
        };
        image: {
          jsonValue: ImageField;
        };
      };
    };
  };
};

const Search = (props: SearchProps): JSX.Element => {
  // console.log('Search', props);
  const router = useRouter();
  const [searchText, setSearchText] = useState<any>('');
  const [Text, setText] = useState<any>('');

  const { query, type } = router?.query;

  useEffect(() => {
    setSearchText(query);
    // handleClick(type, query);
    // setSearch(query);
  }, [query, type]);

  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();

  function removeCharacter(string: any, char: any) {
    return string.replaceAll(char, '');
  }

  const handleForPost = (html: any) => {
    let data = convertHtmlToText(html);
    handleSuggestiveSearch(data);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (Text?.includes('<script')) {
      setShowNofitication(true);
      setToastError(true);
      setToastMessage('cannot use script tags in search');
    }
    if (containsHtml(Text)) {
      setShowNofitication(true);
      setToastError(true);
      setToastMessage('cannot use html in search');
    }
    if (
      containsOnlySpaces(Text) &&
      Text !== '' &&
      !Text?.includes('<script') &&
      !containsHtml(Text)
    ) {
      let data = removeCharacter(Text, '#');
      router.push(`/search?query=${data}&type=ALL`);
      setList(false);
    }
  };

  const { userToken } = {
    ...useContext(WebContext),
  };

  // useEffect(() => {
  //   if (userToken == '') {
  //     let token = getValueFromCookie('UserToken');
  //     if (typeof document !== 'undefined' && token != '' && token != null) {
  //       if (setUserToken != undefined) {
  //         setUserToken(token);
  //       }
  //     } else {
  //       router.push('/login');
  //     }
  //   }
  // }, []);

  function convertHtmlToText(html: any) {
    const text = htmlToText(html, {
      wordwrap: false, // Prevents line breaks in the output
    });
    return text;
  }

  const [searchedData, setSearchedData] = useState<any>([]);

  const [List, setList] = useState(false);

  const containsOnlySpaces = (string: any) => {
    return string?.trim()?.length < 0 || string?.trim()?.length > 0;
  };

  const containsHtml = (string: any) => {
    var sanitizedQuery = string.replace(/<[^>]+>/g, '');
    if (sanitizedQuery !== string) {
      // console.log('contains html');
      return true;
    }
    return false;
  };

  const handleSuggestiveSearch = (data: any) => {
    if (data !== '' && data !== undefined && data !== null) {
      let dataum = removeCharacter(data, '#');
      router.push(`/search?query=${dataum}&type=ALL`);
      setSearchText(dataum);
      setList(false);
    }
  };

  const handleSearchValue = (val: any) => {
    let data = removeCharacter(val, '#');
    setText(data);
    setSearchText(val);
    if (List !== true) {
      setList(true);
    }
  };

  useEffect(() => {
    if (
      containsOnlySpaces(Text) &&
      Text !== '' &&
      Text !== undefined &&
      Text !== null &&
      Text?.length > 3 &&
      !Text?.includes('<script') &&
      !containsHtml(Text)
    ) {
      SuggestiveSearchCall(`*${Text}*`, 'ALL', userToken, [
        'description',
        'blog.heading',
        'blog.description',
        'firstName',
        'lastName',
        'objectId',
        'createdBy.firstName',
        'createdBy.lastName',
        'createdBy.objectId',
        'ShortDescription',
        'Title',
      ]).then((response: any) => {
        if (response?.data?.success === true) {
          if (response?.data?.data !== null && response?.data?.data !== undefined) {
            if (
              response?.data?.data?.totalHits !== null &&
              response?.data?.data?.totalHits !== undefined &&
              response?.data?.data?.totalHits?.value > 0
            ) {
              setSearchedData(response?.data?.data?.hits);
            } else {
              setSearchedData([]);
            }
          }
        }
      });
    }
    if (Text === undefined || Text === null) {
      setSearchText('');
    }
  }, [Text]);

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastError(false);
  };

  // console.log('searchedData', searchedData);
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <>
      <div className={searchCss.container}>
        <div className={searchCss.searchBox}>
          <form className={searchCss.searchForm}>
            <button
              type="submit"
              className={searchCss.searchBtn}
              onClick={handleSearch}
              aria-label="search"
            >
              <NextImage
                className={searchCss.img}
                field={props?.fields?.data?.datasource?.image?.jsonValue?.value}
                editable={true}
                height={10}
                width={15}
              />
            </button>
            {/* {console.log('searchText', searchText)} */}
            <input
              type="text"
              value={searchText === undefined ? '' : searchText}
              className={`${searchCss.searchBoxText} ${darkMode ? 'darkMode_textColor' : ''}`}
              placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
              onChange={(e: any) => handleSearchValue(e?.target?.value)}
            />
            {List && Text !== '' && searchedData?.length > 0 ? (
              <div
                className={`${searchCss.suggestionBox} ${
                  darkMode ? searchCss.darkBackground : searchCss.lightBackground
                }`}
              >
                {searchedData?.map((data: any) => {
                  return data?.index === 'accelerator-blog' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => {
                        handleSuggestiveSearch(data?.sourceAsMap?.blog?.heading);
                      }}
                    >
                      {data?.sourceAsMap?.blog?.heading}
                    </li>
                  ) : data?.index === 'accelerator-user' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => {
                        handleSuggestiveSearch(
                          data?.sourceAsMap?.firstName + ' ' + data?.sourceAsMap?.lastName
                        );
                      }}
                    >
                      {data?.sourceAsMap?.firstName + '  ' + data?.sourceAsMap?.lastName}
                    </li>
                  ) : data?.index === 'accelerator-event' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.event?.title)}
                    >
                      {data?.sourceAsMap?.event?.title}
                    </li>
                  ) : data?.index === 'accelerator-sitecore-cs' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.Title)}
                    >
                      {data?.sourceAsMap?.Title}
                    </li>
                  ) : data?.index === 'accelerator-sitecore-event' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.Title)}
                    >
                      {data?.sourceAsMap?.Title}
                    </li>
                  ) : data?.index === 'accelerator-sitecore-journal' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.Title)}
                    >
                      {data?.sourceAsMap?.Title}
                    </li>
                  ) : data?.index === 'accelerator-sitecore-news' ? (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.Title)}
                    >
                      {data?.sourceAsMap?.Title}
                    </li>
                  ) : (
                    <li
                      className={`${searchCss.suggestionList} ${
                        darkMode ? searchCss.darkText : searchCss.lightText
                      }`}
                      onClick={() => handleForPost(data?.sourceAsMap?.description)}
                    >
                      {convertHtmlToText(data?.sourceAsMap?.description)}
                    </li>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
        {showNotification && (
          <ToastNotification
            showNotification={showNotification}
            error={toastError}
            message={toastMessage}
            handleCallback={resetToastState}
          />
        )}
      </div>
    </>
  );
};

export default Search;
