import { Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import logo from '../assets/images/CommunityLogo.svg';
import searchCss from '../assets/search.module.css';

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
          <NextImage field={logo} editable={true} height={45} width={45} />
        </a>
      </div>
      <div className={searchCss.searchBox}>
        <NextImage
          className={searchCss.img}
          field={props?.fields?.data?.datasource?.image?.jsonValue?.value}
          editable={true}
          height={10}
          width={15}
        />
        <input
          type="text"
          className={searchCss.searchBoxText}
          placeholder={props?.fields?.data?.datasource?.title?.jsonValue?.value}
        />
      </div>
    </div>
  );
};

export default Search;
