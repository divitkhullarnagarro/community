import React from 'react';
import style from '../assets/searchFilterBtn.module.css';
import { useRouter } from 'next/router';

const SearchFlters = (props: any) => {

  const router = useRouter()
  const {query} = router?.query



  return (
    <div className={style.container}>
      {/* {
        <button
          onClick={props.handleClick("ALL")}
          className={props?.activeState === 'ALL' ? style.btnActive : style.btn}
        >
          ALL
        </button>
      } */}
      {props?.filter?.map((fil: any) => {
        return (
          <button
            className={props?.activeState === fil?.type ? style.btnActive : style.btn}
            onClick={() => props.handleClick(fil?.type,query)}
          >
            {fil?.value}
          </button>
        );
      })}
    </div>
  );
};

export default SearchFlters;
