import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import searchCss from '../assets/search.module.css';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WebContext from 'src/Context/WebContext';
// import { getValueFromCookie } from 'assets/helpers/helperFunctions';
import SuggestiveSearchCall from 'src/API/SuggestiveApi';
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
  console.log('Search', props);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchText !== '') {
      router.push(`/search?query=${searchText}&type=ALL`);
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
  const [searchedData, setSearchedData] = useState<any>([]);

  const handleSuggestiveSearch = (data: any) => {
    if (data !== '') {
      setSearchText(data);
      router.push(`/search?query=${data}&type=ALL`);
    }
  };

  useEffect(() => {
    SuggestiveSearchCall(`*${searchText}*`, 'ALL', userToken, [
      'description',
      'blog.heading',
      'blog.description',
      'firstName',
      'lastName',
      'objectId',
      'createdBy.firstName',
      'createdBy.lastName',
      'createdBy.objectId',
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
        // setSuccess(false);
      }
    });
  }, [searchText]);

  console.log('searchedData', searchedData);
  const { darkMode } = { ...useContext(WebContext) };
  return (
    <>
      <div className={searchCss.container}>
        <div className={searchCss.searchBox}>
          <form>
            <button type="submit" className={searchCss.searchBtn} onClick={handleSearch}>
              <NextImage
                className={searchCss.img}
                field={props?.fields?.data?.datasource?.image?.jsonValue?.value}
                editable={true}
                height={10}
                width={15}
              />
            </button>
            <input
              type="text"
              value={searchText}
              className={`${searchCss.searchBoxText} ${darkMode ? 'darkMode_textColor' : ''}`}
              placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
              onChange={(e: any) => setSearchText(e?.target?.value)}
            />
            {searchText !== '' && searchedData?.length > 0 ? (
              <div
                className={darkMode ? searchCss.darkSuggesetionBox : searchCss.whiteSuggesetionBox}
              >
                {searchedData?.map((data: any) => {
                  return data?.index === 'accelerator-blog' ? (
                    <li
                      className={
                        darkMode ? searchCss.darkSuggestionList : searchCss.whiteSuggesetionList
                      }
                      onClick={() => handleSuggestiveSearch(data?.sourceAsMap?.blog?.heading)}
                    >
                      {data?.sourceAsMap?.blog?.heading}
                    </li>
                  ) : data?.index === 'accelerator-user' ? (
                    // console.log("data?.sourceAsMap?.firstName + data?.sourceAsMap?.lastName",data?.sourceAsMap?.firstName + data?.sourceAsMap?.lastName)
                    <li
                      className={
                        darkMode ? searchCss.darkSuggestionList : searchCss.whiteSuggesetionList
                      }
                      onClick={() =>
                        handleSuggestiveSearch(
                          data?.sourceAsMap?.firstName + '  ' + data?.sourceAsMap?.lastName
                        )
                      }
                    >
                      {data?.sourceAsMap?.firstName + '  ' + data?.sourceAsMap?.lastName}
                    </li>
                  ) : data?.index === 'accelerator-event' ? (
                    <li
                      className={
                        darkMode ? searchCss.darkSuggestionList : searchCss.whiteSuggesetionList
                      }
                    >
                      {data?.sourceAsMap?.event?.title}
                    </li>
                  ) : (
                    // ) : data?.index === 'accelerator-media' ? (
                    //   <li
                    //     onClick={() =>
                    //       handleSuggestiveSearch(parser(modifyHtml(data?.sourceAsMap?.description)))
                    //     }
                    //     className={searchCss.suggestionList}
                    //   >
                    //     {parser(modifyHtml(data?.sourceAsMap?.description))}
                    //   </li>
                    ''
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
