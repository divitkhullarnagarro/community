import { NextImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ImageProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  image: {
    jsonValue: ImageField;
  };
};

const Image = (props: ImageProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  // console.log('Image', props);
  return (
    <div className="image">
      <NextImage field={datasource?.image?.jsonValue?.value} editable={true} />
    </div>
  );
};

export default Image;
