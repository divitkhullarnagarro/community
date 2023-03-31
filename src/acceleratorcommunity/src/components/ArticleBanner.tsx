import { NextImage, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ArticleBannerProps = ComponentProps & {
  fields: {
    data: {
      contextItem: ContextItem;
    };
  };
};
type ContextItem = {
  banner: {
    jsonValue:{
      value: ImageField;
    };
  };
};
const ArticleBanner = (props: ArticleBannerProps): JSX.Element => {
  console.log("banner", props)
  const { contextItem } = props?.fields?.data;
  return (
    <div className='stories-banner'>
      <NextImage
        field={contextItem?.banner?.jsonValue?.value}
        editable={true}
        height="500px"
      />
    </div>
  )

};

export default ArticleBanner;
