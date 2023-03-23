import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import searchImage from '../assets/images/searchImage.png';

type SearchProps = ComponentProps & {
  fields: {
    title: Field<string>;
  };
};

const Search = (props: SearchProps): JSX.Element => {
  console.log('Search', props);
  return (
    <div className="">
      <NextImage className="" field={searchImage} editable={true} height={20} width={20} />
      <input type="text" className="" placeholder="Search" />
    </div>
  );
};

export default withDatasourceCheck()<SearchProps>(Search);
