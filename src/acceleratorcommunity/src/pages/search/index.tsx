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
import HashtagContainer from 'components/HashtagContainer';
import BlogContainer from 'components/BlogContainer';
import PollConatiner from 'components/PollConatiner';
// import JournalContainer from 'components/JournalContainer';

const Search = () => {
  const router = useRouter();

  console.log(router?.query?.query);

  const { query, type } = router?.query;

  // const [query, setQuery] = useState(router?.query?.query);
  // const [type, setType] = useState(router?.query?.type);

  console.log('qhhhhhhhhhhhhhhhhhhhqqqqqqqqqqqqhqhhqq', query, type);

  const filter = [
    {
      type: 'ALL',
      value: 'ALL',
    },
    {
      type: 'GROUP',
      value: 'Groups',
    },
    {
      type: 'USER',
      value: 'User',
    },
    {
      type: 'EVENT',
      value: 'Events',
    },
    {
      type: 'HASHTAG',
      value: 'Hashtags',
    },
    {
      type: 'NEWS',
      value: 'News',
    },
    {
      type: 'JOURNAL',
      value: 'Journals',
    },
    {
      type: 'ARTICLE',
      value: 'Articles',
    },
    {
      type: 'BLOG',
      value: 'BLOG',
    },
    {
      type: 'POLL',
      value: 'POLL',
    },
  ];

  const [activeState, setActiveState] = useState(type);

  const handleClick = (type: any, query: any) => {
    if (type === 'ALL' && query != undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(
        [
          'description',
          'blog.heading',
          'blog.description',
          'firstName',
          'lastName',
          'objectId',
          'createdBy.firstName',
          'createdBy.lastName',
          'createdBy.objectId',
        ],
        type
      );
    }
    if (type === 'USER' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['firstName', 'lastName', 'objectId'], type);
    }
    if (
      type === 'EVENT' &&
      query !== undefined &&
      type !== undefined &&
      query !== null &&
      type !== null
    ) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'HASHTAG' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'NEWS' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'JOURNAL' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'ARTICLE' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'GROUP' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);

      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'BLOG' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'BLOG' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
    if (type === 'POLL' && query !== undefined) {
      setSuccess(true);
      router.push(`/search?query=${query}&type=${type}`);
      searchCallFunction(['description', 'blog.heading', 'blog.description'], type);
    }
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

  const searchCallFunction = (filter: any, type: string) => {
    searchCall(query, type, userToken, filter).then((response: any) => {
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
  };

  useEffect(() => {
    setActiveState(type);
    handleClick(type, query);
  }, [query, type]);
  useEffect(() => {
    if (query !== undefined && query !== null && userToken !== undefined && userToken !== null) {
      searchCallFunction(
        [
          'description',
          'blog.heading',
          'blog.description',
          'firstName',
          'lastName',
          'objectId',
          'createdBy.firstName',
          'createdBy.lastName',
          'createdBy.objectId',
        ],
        'ALL'
      );
    }
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeadingContainer}>
        <div className={styles.pageHeading}>Search Results</div>
      </div>
      <SearchFlters activeState={activeState} filter={filter} handleClick={handleClick} />
      {activeState === 'ALL' ? (
        <SearchALLConatiner success={success} searchedData={searchedData} />
      ) : activeState === 'GROUP' ? (
        <SearchGroupContainer success={success} />
      ) : activeState === 'USER' ? (
        <SearchUserContainer searchedData={searchedData} success={success} />
      ) : activeState === 'EVENT' ? (
        <EventSearchContainer searchedData={searchedData} success={success} />
      ) : activeState === 'NEWS' ? (
        <NewSearchContainer success={success} />
      ) : activeState === 'JOURNAL' ? (
        <JournalSearchContainer success={success} />
      ) : activeState === 'ARTICLE' ? (
        <ArticleSearchContainer success={success} />
      ) : activeState === 'HASHTAG' ? (
        <HashtagContainer success={success} searchedData={searchedData} />
      ) : activeState === 'BLOG' ? (
        <BlogContainer success={success} searchedData={searchedData} />
      ) : activeState === 'POLL' ? (
        <PollConatiner success={success} searchedData={searchedData} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
