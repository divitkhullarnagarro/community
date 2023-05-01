import React from 'react';
import style from '../assets/searchFilterBtn.module.css';

const SearchFlters = (props: any) => {
  return (
    <div className={style.container}>
      {
        <button
          onClick={props.handleAllClick}
          className={props?.activeState === 'ALL' ? style.btnActive : style.btn}
        >
          ALL
        </button>
      }
      {props?.filter?.map((fil: any) => {
        return (
          <button
            className={props?.activeState === fil?.type ? style.btnActive : style.btn}
            onClick={() => props.handleClick(fil?.type)}
          >
            {fil?.value}
          </button>
        );
      })}
    </div>
  );
};

export default SearchFlters;
