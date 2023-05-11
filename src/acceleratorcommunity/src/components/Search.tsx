import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import searchCss from '../assets/search.module.css';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import WebContext from 'src/Context/WebContext';

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
      router.push(`/search?query=${searchText}&type=ALL`);
    }
  };
  const { darkMode } = { ...useContext(WebContext) };
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
            className={`${searchCss.searchBoxText} ${darkMode ? 'darkMode_textColor' : ''}`}
            placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
            onChange={(e: any) => setSearchText(e?.target?.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Search;
