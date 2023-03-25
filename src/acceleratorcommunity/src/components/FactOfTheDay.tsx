import { Field, ImageField, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import factOfTheDayCss from '../assets/factOfTheDay.module.css';

type FactOfTheDayProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};
type DataSource = {
  children: {
    results: Array<FactOfTheDay>;
  };
  params?: {
    automatic?: {
      jsonValue: Boolean;
    };
  };
};

type FactOfTheDay = {
  automatic: {
    jsonValue: Field<boolean>;
  };
  description: {
    jsonValue: Field<string>;
  };
  title: {
    jsonValue: Field<string>;
  };
  image: {
    jsonValue: ImageField;
  };
};

const FactOfTheDay = (props: FactOfTheDayProps): JSX.Element => {
  const targetItems = props?.fields?.data?.datasource?.children?.results;
  console.log(targetItems);
  var data: any;

  if (props['params'] !== undefined) {
    console.log(targetItems);
    targetItems.forEach((element) => {
      if (element?.automatic?.jsonValue?.value === true) {
        data = element;
      }
      console.log(data);
    });
  } else {
    targetItems.forEach((element) => {
      if (element?.automatic?.jsonValue?.value === false) {
        data = element;
      }
    });
  }
  return (
    <>
      <div className={factOfTheDayCss.cardContainer}>
        <div className={factOfTheDayCss.cardbody}>
          <NextImage objectFit="cover" field={data?.image?.jsonValue?.value} />
          <div className={factOfTheDayCss.cardTitle}>{data?.title?.jsonValue?.value}</div>
          <div className={factOfTheDayCss.cardDescription}>
            {data?.description?.jsonValue?.value}
          </div>
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<FactOfTheDayProps>(FactOfTheDay);

export default FactOfTheDay;
