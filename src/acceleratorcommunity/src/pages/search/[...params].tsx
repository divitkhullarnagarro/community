import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Event from 'components/Event';
import SearchFlters from 'components/SearchFlters';
// import User from 'components/User';
// import SearchGroupResult from 'components/SearchGroupResult';
import styles from '../../assets/seacrhPage.module.css';
// import SideSearchFilter from 'components/sideSearchFilter';
import SearchGroupContainer from 'components/SearchGroupContainer';
import SearchUserContainer from 'components/SearchUserContainer';
import EventSearchContainer from 'components/EventSearchContainer';
import NewSearchContainer from 'components/NewSearchContainer';
import searchCall from 'src/API/searchCall';
import { getValueFromCookie } from 'assets/helpers/helperFunctions';
import WebContext from 'src/Context/WebContext';
import JournalSearchContainer from 'components/JournalSearchContainer';
import ArticleSearchContainer from 'components/ArticleSearchContainer';
import SearchALLConatiner from 'components/SearchALLConatiner';
// import JournalContainer from 'components/JournalContainer';

const Search = () => {
  const filter = [
    {
      type: 'ALL',
      value: 'ALL',
    },
    {
      type: 'Groups',
      value: 'Groups',
    },
    {
      type: 'User',
      value: 'User',
    },
    {
      type: 'Events',
      value: 'Events',
    },
    {
      type: 'Hashtags',
      value: 'Hashtags',
    },
    {
      type: 'News',
      value: 'News',
    },
    {
      type: 'Journals',
      value: 'Journals',
    },
    {
      type: 'Articles',
      value: 'Articles',
    },
  ];

  const [activeState, setActiveState] = useState('ALL');

  const handleClick = (type: string) => {
    setActiveState(type);
  };
  const { userToken, setUserToken } = {
    ...useContext(WebContext),
  };

  useEffect(() => {
    if (userToken == '') {
      let token = getValueFromCookie('UserToken');
      if (typeof document !== 'undefined' && token != '' && token != null) {
        if (setUserToken != undefined) {
          setUserToken(token);
        }
      } else {
        router.push('/login');
      }
    }
  }, []);

  const [success, setSuccess] = useState(true);
  const [searchedData, setSearchedData] = useState<any>([]);

  const router = useRouter();
  const { params = [] } = router?.query;
  useEffect(() => {
    searchCall(params[0], 'ALL', userToken).then((response: any) => {
      if (response?.data?.success === true) {
        if (response?.data?.data !== null && response?.data?.data !== undefined) {
          if (
            response?.data?.data?.totalHits !== null &&
            response?.data?.data?.totalHits !== undefined &&
            response?.data?.data?.totalHits?.value > 0
          ) {
            setSearchedData(response?.data?.data?.hits);
          }
        }
        setSuccess(false);
      }
    });
  }, [params]);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeadingContainer}>
        <div className={styles.pageHeading}>Search Results</div>
      </div>
      <SearchFlters activeState={activeState} filter={filter} handleClick={handleClick} />
      {activeState === 'ALL' ? (
        <SearchALLConatiner success={success} searchedData={searchedData}/>
      ) : activeState === 'Groups' ? (
        <SearchGroupContainer success={success} />
      ) : activeState === 'User' ? (
        <SearchUserContainer success={success} />
      ) : activeState === 'Events' ? (
        <EventSearchContainer success={success} />
      ) : activeState === 'News' ? (
        <NewSearchContainer success={success} />
      ) : activeState === 'Journals' ? (
        <JournalSearchContainer success={success} />
      ) : activeState === 'Articles' ? (
        <ArticleSearchContainer success={success} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
