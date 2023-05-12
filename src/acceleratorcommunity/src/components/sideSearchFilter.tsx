import React, { useState, useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/searchsidefilter.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import { Collapse } from 'react-bootstrap';
import minimize from '../assets/images/minimize.png';
const SideSearchFilter = (props: any) => {
  const [open, setOpen] = useState(true);
  const { darkMode } = {
    ...useContext(WebContext),
  };
  
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <div className={styles.filterHeading}>Filters</div>
        <button className={styles.clearBtn} onClick={() => props?.clearFilter()}>
          Clear filter
        </button>
      </div>
      <div className={styles.btnContainer}>
        {/* <button className={styles.clearBtn} onClick={() => props?.resetFilter()}>
              Reset filter Search
            </button> */}
        <div className={styles.filterHeading}>Filter by Time</div>
        <button onClick={() => setOpen(!open)}>
          <img src={minimize.src} />{' '}
        </button>
      </div>
      <Collapse in={open}>
        <div>
          <div className={styles.filterBody}>
            <div className={styles.filterBodyInput}>
              <form>
                <input
                  type="text"
                  placeholder="Search with filters"
                  value={props?.searchedfilterState}
                  onChange={(e) => props?.searchedFilter(e.target.value)}
                />
                <button
                  className={styles.searchBtn}
                  type="submit"
                  onClick={(e: any) => props?.filterdData(e)}
                />
              </form>
              <div className={`${styles.filterAction} ${darkMode && darkModeCss.text_green}`}>
                {props?.filteredArray?.map((filter: string) => {
                  return (
                    <>
                      <div className={styles.filters}>
                        <input
                          className={styles.checkboxChecked}
                          onClick={() => props?.filtration(filter)}
                          checked={props?.filterState.includes(filter) ? true : false}
                          type="checkbox"
                        />
                        <div className={styles.filterName}>{filter}</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SideSearchFilter;
