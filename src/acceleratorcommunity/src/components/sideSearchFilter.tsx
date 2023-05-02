import React, { useState } from 'react';
import styles from '../assets/searchsidefilter.module.css';
import { Collapse } from 'react-bootstrap';
const   SideSearchFilter = (props: any) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <div className={styles.filterHeading}>Filters</div>
        <button className={styles.headingBtn} onClick={() => setOpen(!open)}>
          {open ? '-' : '+'}
        </button>
      </div>
      <Collapse in={open}>
        <div>
          <div className={styles.btnContainer}>
            <button className={styles.clearBtn} onClick={() => props?.resetFilter()}>
              Reset filter Search
            </button>
            <button className={styles.clearBtn} onClick={() => props?.clearFilter()}>
              Clear filter
            </button>
          </div>
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
              <div className={styles.filterAction}>
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
                        <div>{filter}</div>
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
