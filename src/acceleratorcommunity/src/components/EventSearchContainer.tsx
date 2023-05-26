import React, { useEffect, useState, useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import Event from './Event';
import SideSearchFilter from './sideSearchFilter';
import { SearchSkeletonForEvents } from './skeletons/SearchSkeleton';

const EventSearchContainer = (props: any) => {
  // console.log('llqlalalalalalalaa', props);
  useEffect(() => {
    setEvents(props?.searchedData);
  }, [props?.searchedData]);

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

  const [Events, setEvents] = useState<any>(props?.searchedData);
  const [filterState, setFilterState] = useState<any>([]);

  const [filteredArray, setFilteredArray] = useState<any>(['Upcoming', 'Current', 'Past']);
  const [searchedfilterState, setSearchedFilterState] = useState<string>('');

  const handleFilters = (filter: any) => {
    setFilterState([filter]);
  };

  const searchedFilter = (e: string) => {
    setSearchedFilterState(e);
  };

  // console.log('EventsEventsEventsEventsEventsEventsEventsEventsEvents', Events);

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

  const convetSitecoreDateToMicroservicesType = (data: any, event: any) => {
    var dateString = data;
    var parts = dateString.split(/[- :]/);

    // Note: JavaScript months are zero-based
    var date = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]);

    var isoDateString = date.toISOString();
    var dateToCompare = new Date(isoDateString);

    dateToCompare.setHours(0, 0, 0, 0);

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (event === 'Upcoming') {
      return currentDate < dateToCompare;
    } else if (event === 'Current') {
      return currentDate === dateToCompare;
    }
    return currentDate > dateToCompare;
  };
  const filtration = (event: any) => {
    setFilterState([event]);
    if (event === 'Upcoming') {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      let upcomingDateEvents = props?.searchedData?.filter((item: any) => {
        // console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', item?.sourceAsMap?.event?.eventDate);
        return item?.index === 'accelerator-event' || item?.index === 'accelerator-sitecore-event'
          ? new Date(item?.sourceAsMap?.event?.eventDate) > today
          : convetSitecoreDateToMicroservicesType(item?.sourceAsMap?.Date, event);
      });
      setEvents(upcomingDateEvents);
    } else if (event === 'Current') {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      let currentDateEvents = props?.searchedData?.filter((item: any) => {
        return item?.index === 'accelerator-event' || item?.index === 'accelerator-sitecore-event'
          ? new Date(item?.sourceAsMap?.event?.eventDate) === today
          : convetSitecoreDateToMicroservicesType(item?.sourceAsMap?.Date, event);
      });
      setEvents(currentDateEvents);
    } else if (event === 'Past') {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      let pastDateEvents = props?.searchedData?.filter((item: any) => {
        return item?.index === 'accelerator-event'
          ? new Date(item?.sourceAsMap?.event?.eventDate) < today
          : convetSitecoreDateToMicroservicesType(item?.sourceAsMap?.Date, event);
      });
      setEvents(pastDateEvents);
    } else {
      setEvents(props?.searchedData);
    }
  };

  const clearFilter = () => {
    setFilterState([]);
    setEvents(props?.searchedData);
  };
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
      <div
        className={`${styles.filterContainer} ${darkMode && darkModeCss.grey_3} ${
          darkMode && darkModeCss.text_light
        }`}
      >
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
      <div
        className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3} ${
          darkMode && darkModeCss.text_light
        }`}
      >
        {props?.success ? (
          <SearchSkeletonForEvents count={5} />
        ) : (
          <>
            {Events.length > 0 ? (
              Events.map((event: any) => {
                return event?.sourceAsMap?.postType === 'EVENT' ? (
                  <Event events={event?.sourceAsMap} getFormatedDate={getFormatedDate} />
                ) : event?.index === 'accelerator-sitecore-event' ? (
                  <Event events={event?.sourceAsMap} getFormatedDate={getFormatedDate} />
                ) : (
                  ''
                );
              })
            ) : (
              <div className={styles.forNoData}>No Events Found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventSearchContainer;
