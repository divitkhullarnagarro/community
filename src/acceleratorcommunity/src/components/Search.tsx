import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import searchCss from '../assets/search.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

type SearchProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        title: {
          jsonValue: Field<string>;
        };
        image: {
          jsonValue: ImageField;
        };
      };
    };
  };
};

const Search = (props: SearchProps): JSX.Element => {
  console.log('Search', props);
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchText !== '') {
      router.push(`/search/${searchText}`);
    }
  };
  return (
    <div className={searchCss.container}>
      <div className={searchCss.searchBox}>
        <form>
          <button type="submit" className={searchCss.searchBtn} onClick={handleSearch}>
            <NextImage
              className={searchCss.img}
              field={props?.fields?.data?.datasource?.image?.jsonValue?.value}
              editable={true}
              height={10}
              width={15}
            />
          </button>
          <input
            type="text"
            className={searchCss.searchBoxText}
            placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
            onChange={(e: any) => setSearchText(e?.target?.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
