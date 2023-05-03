import React, { useState } from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import eventImg from '../assets/images/event.png';
import Event from './Event';
import SideSearchFilter from './sideSearchFilter';
import { SearchSkeletonForEvents } from './skeletons/SearchSkeleton';

const EventSearchContainer = (props: any) => {
  const eventArray = [
    {
      eventImg: eventImg,
      title: 'Event1',
      description: 'This is an event1',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-05-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event2',
      description: 'This is an event2',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event3',
      description: 'This is an event3',
      startDate: '2023-05-02T00:00:00Z',
      endDate: '2023-05-02T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event4',
      description: 'This is an event4',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event5',
      description: 'This is an event5',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event6',
      description: 'This is an event6',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event7',
      description: 'This is an event7',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event8',
      description: 'This is an event8',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event9',
      description: 'This is an event9',
      startDate: '2023-04-07T00:00:00Z',
      endDate: '2023-04-07T00:00:00Z',
    },
    {
      eventImg: eventImg,
      title: 'Event10',
      description: 'This is an event10',
      startDate: '2023-05-07T00:00:00Z',
      endDate: '2023-05-07T00:00:00Z',
    },
  ];

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

  const [Events, setEvents] = useState<any>(eventArray);
  const [filterState, setFilterState] = useState<any>([]);

  const [filteredArray, setFilteredArray] = useState<any>(['Upcoming', 'Current', 'Past']);
  const [searchedfilterState, setSearchedFilterState] = useState<string>('');

  const handleFilters = (filter: any) => {
    setFilterState([filter]);
  };

  const searchedFilter = (e: string) => {
    setSearchedFilterState(e);
  };

  const filterdData = (e: any) => {
    e.preventDefault();
    if (searchedfilterState === '') {
      setFilteredArray(['Upcoming', 'Current', 'Past']);
    } else {
      const filterArray = filteredArray?.filter((filter: any) => {
        return filter === searchedfilterState;
      });
      setFilteredArray(filterArray);
    }
  };

  const resetFilter = () => {
    setSearchedFilterState('');
    setFilteredArray(['Upcoming', 'Current', 'Past']);
  };

  const timeToDateParsing = (date: any) => {
    const isoString = date; // An ISO 8601 string representing August 1, 2022
    const dateOnlyString = isoString.substring(0, 10); // Extract the date component as a string
    return dateOnlyString;
  };

  const filtration = (event: any) => {
    setFilterState([event]);
    if (event === 'Upcoming') {
      let upcomingDateEvents = eventArray?.filter((item: any) => {
        let date: any = timeToDateParsing(item?.startDate);
        let datee: any = timeToDateParsing(new Date().toISOString());
        return Date.parse(date) > Date.parse(datee);
      });
      setEvents(upcomingDateEvents);
    } else if (event === 'Current') {
      let currentDateEvents = eventArray?.filter((item: any) => {
        let date: any = timeToDateParsing(item?.startDate);
        let datee: any = timeToDateParsing(new Date().toISOString());
        return Date.parse(date) === Date.parse(datee);
      });
      setEvents(currentDateEvents);
    } else if (event === 'Past') {
      let pastDateEvents = eventArray?.filter((item: any) => {
        let date: any = timeToDateParsing(item?.startDate);
        let datee: any = timeToDateParsing(new Date().toISOString());
        return Date.parse(date) < Date.parse(datee);
      });
      setEvents(pastDateEvents);
    } else {
      setEvents(eventArray);
    }
  };

  const clearFilter = () => {
    setFilterState([]);
    setEvents(eventArray);
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.filterContainer}>
        <SideSearchFilter
          filtration={filtration}
          filterState={filterState}
          clearFilter={clearFilter}
          searchedFilter={searchedFilter}
          resetFilter={resetFilter}
          searchedfilterState={searchedfilterState}
          filterdData={filterdData}
          filteredArray={filteredArray}
          handleFilters={handleFilters}
        />
      </div>
      <div className={styles.generalcontainer}>
        {props?.success ? (
          <SearchSkeletonForEvents count={5} />
        ) : (
          <Event events={Events} getFormatedDate={getFormatedDate} />
        )}
      </div>
    </div>
  );
};

export default EventSearchContainer;
