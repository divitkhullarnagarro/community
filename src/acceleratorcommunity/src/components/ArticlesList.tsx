import { Field, ImageField, NextImage, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Link from 'next/link';
import ArticlesListCss from '../assets/ArticlesList.module.css';
import sourceImage from '../assets/images/source.svg';
import calendarImage from '../assets/images/calendar.svg';
import bookmarkImage from '../assets/images/bookmark.svg';
import shareImage from '../assets/images/share.svg';

type ArticlesListProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  title: {
    jsonValue: Field<string>;
  };
  description: {
    jsonValue: RichTextField;
  };
  image: {
    jsonValue: ImageField;
  };
  date: {
    jsonValue: Field<string>;
  };
  author: {
    jsonValue: Field<string>;
  };
  tags: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
  contentType: {
    targetItems: [
      {
        name: Field<string>;
      }
    ];
  };
};
type DataSource = {
  articlesList: {
    targetItems: Item[];
  };
};

const getFormatedDate = (stringDate: string) => {
  const date = new Date(stringDate);

  // Get month abbreviation
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);

  // Get day with leading zero if necessary
  const day = String(date.getDate()).padStart(2, '0');

  // Get full year
  const year = date.getFullYear();

  // Combine into formatted string
  const formattedDate = `${month} ${day} ${year}`;

  return formattedDate;
};

const ArticlesList = (props: ArticlesListProps): JSX.Element => {
  const { targetItems } = props?.fields?.data?.datasource.articlesList;
  console.log('props', props);

  return (
    <div>
      {targetItems.map((l, i) => {
        return (
          <div key={i} className={ArticlesListCss.wrapper}>
            <div className={ArticlesListCss.leftSection}>
              <NextImage
                className={ArticlesListCss.leftSectionImage}
                field={l.image.jsonValue.value}
                editable={true}
              />
            </div>
            <div className={ArticlesListCss.rightSection}>
              <div className={ArticlesListCss.title}>{l.title.jsonValue.value}</div>
              <div className={ArticlesListCss.cardDescription}>
                <p>
                  {l.description.jsonValue.value}
                  <Link href="/readMorePage">Read More </Link>
                </p>
              </div>
              <div className={ArticlesListCss.cardTags}>
                {l.tags.targetItems.map((m, j) => {
                  return (
                    <div key={j} className={ArticlesListCss.cardTag}>
                      <Link key={j} href={'/#'}>
                        {m.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className={ArticlesListCss.infoWrapper}>
                <div className={ArticlesListCss.infoWrapperTag}>
                  <NextImage
                    className={ArticlesListCss.infowrapperImage}
                    field={sourceImage}
                    editable={true}
                  />
                  <div className={ArticlesListCss.infoWrapperTagData}>
                    {l.author.jsonValue.value}{' '}
                  </div>
                </div>

                <NextImage
                  className={ArticlesListCss.infowrapperImage}
                  field={calendarImage}
                  editable={true}
                />
                <div className={ArticlesListCss.infoWrapperTagData}>
                  {getFormatedDate(l.date.jsonValue.value)}
                </div>
              </div>
            </div>
            <div className={ArticlesListCss.buttons}>
              <button className={ArticlesListCss.button}>
                <NextImage field={bookmarkImage} editable={true} title="Add To My Collection" />
              </button>
              <button className={ArticlesListCss.button}>
                <NextImage field={shareImage} editable={true} title="Share" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticlesList;
