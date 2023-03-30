import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
// import searchImage from '../assets/images/searchImage.png';
import logo from '../assets/images/CommunityLogo.svg';
import searchCss from '../assets/search.module.css';
import router from 'next/router';

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
  return (
    <div className={searchCss.container}>
      <div className={searchCss.image}>
        <a href="/">
        <NextImage field={logo} editable={true} height={30} width={30}/>
        </a>
      </div>
      <div className={searchCss.searchBox}>
        <NextImage
          className={searchCss.img}
          // field={searchImage}
          field={props?.fields?.data?.datasource?.image?.jsonValue?.value}
          editable={true}
          height={10}
          width={15}
        />
        <input
          type="text"
          className={searchCss.searchBoxText}
          placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
          // placeholder="search"
        />
      </div>
    </div>
  );
};

export default Search;
