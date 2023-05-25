import React from 'react';
import styles from '../assets/SearchGroupResult.module.css';
import { Dropdown } from 'react-bootstrap';

const SearchGroupResult = () => {
  return (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <img src="https://i.pinimg.com/736x/d4/8c/2d/d48c2de0debd3bef102256f979862bbd--group-photography-photography-tricks.jpg" />
        </div>
        <div className={styles.textContainer}>
          <div
            className={styles.groupDescription}
            title=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus impedit vero
            temporibus error! Ab minima, ex corporis at quae commodi."
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus impedit vero
            temporibus error! Ab minima, ex corporis at quae commodi.
          </div>
          <div className={styles.memberCount}>2000 members </div>
        </div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className={styles.dropdownBtn}>
            <button className={styles.btn}>
              <img
                className="postMoreOptionsImage"
                src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                alt="pan"
              />
            </button>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default SearchGroupResult;
