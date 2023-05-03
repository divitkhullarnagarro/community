import React, { useState } from 'react';
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
// import JournalContainer from 'components/JournalContainer';

const Search = () => {
  const filter = [
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

  const [activeState, setActiveState] = useState('Groups');

  const handleClick = (type: string) => {
    setActiveState(type);
  };

  const router = useRouter();
  const { params = [] } = router?.query;
  console.log(params);
  return (
    <div className={styles.container}>
      <div className={styles.pageHeadingContainer}>
        <div className={styles.pageHeading}>Search Results</div>
      </div>
      <SearchFlters activeState={activeState} filter={filter} handleClick={handleClick} />
      {activeState === 'Groups' ? (
        <SearchGroupContainer />
      ) : activeState === 'User' ? (
        <SearchUserContainer />
      ) : activeState === 'Events' ? (
        <EventSearchContainer />
      ) : activeState === 'News' ? (
        <NewSearchContainer />
      ) : activeState === 'Journals' ? (
        <NewSearchContainer />
      ) : activeState === 'Articles' ? (
        <NewSearchContainer />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
