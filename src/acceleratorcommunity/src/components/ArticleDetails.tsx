import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import articleDetail from '../assets/ArticlesList.module.css';

type ArticleDetailsProps = ComponentProps & {
  fields: {
    data: {
      contextItem: ContextItem;
    };
  };
};
type ContextItem = {
  title: {
    jsonValue:{
      value:  Field<string>;
    };
  };
  longDescription: {
    jsonValue:{
      value:  string;
    };
  };
  authorName: {
    jsonValue:{
      value:  Field<string>;
    };
  };
};

const ArticleDetails = (props: ArticleDetailsProps): JSX.Element => {
  console.log("detail", props)
  const { contextItem } = props?.fields?.data;
  let rteData = contextItem?.longDescription?.jsonValue?.value;
  return (
    <div>
      <div className={articleDetail.storyCard}>
        <h3>{contextItem?.title?.jsonValue?.value}</h3>
        <div dangerouslySetInnerHTML={{ __html: rteData }}>
        </div>
      </div>
    </div>
  )
};

export default ArticleDetails;
