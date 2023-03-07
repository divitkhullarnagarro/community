import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type GridProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type Item = {
  id: string;
  url: {
    path: string;
  };
  removePadding: {
    jsonValue: {
      boolValue: boolean;
    };
    boolValue: boolean;
  };
  heading: Field<string>;
  colLG: Field<string>;
  offSetLG: Field<string>;
  colMD: Field<string>;
  offSetMD: Field<string>;
  colSM: Field<string>;
  offSetSM: Field<string>;
  colXL: Field<string>;
  offSetXL: Field<string>;
  colXS: Field<string>;
  offSetXS: Field<string>;
  colExtraCss: Field<string>;
};

type DataSource = {
  name: string;
  id: string;
  heading: {
    jsonValue: {
      value: string;
    };
    value: string;
  };
  rowExtraCss: {
    jsonValue: {
      value: string;
    };
    value: string;
  };
  removePadding: {
    jsonValue: {
      boolValue: boolean;
    };
    boolValue: boolean;
  };
  children: { results: Item[] };
};

const Grid = (props: GridProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  console.log('grid', props);
  return (
    <div className="gridcontainer">
      <div
        className={`row  ${
          datasource?.rowExtraCss?.jsonValue?.value !== ''
            ? datasource?.rowExtraCss?.jsonValue?.value
            : ''
        } ${
          datasource?.removePadding?.boolValue === true ? 'removePadding' : String.prototype.trim()
        } `}
      >
        {datasource &&
          datasource.children &&
          datasource.children.results.map((item: Item, index) => (
            <div
              key={index}
              className={`${item?.removePadding?.boolValue === true ? 'px-1 py-1' : ''}${
                item?.offSetMD?.value === '' ? '' : 'offset-md-' + item?.offSetMD?.value
              } ${item?.colMD?.value === '' ? '' : 'col-md-' + item?.colMD?.value} ${
                item?.offSetLG?.value === '' ? '' : 'offset-lg-' + item?.offSetLG?.value
              } ${item?.colLG?.value === '' ? '' : 'col-lg-' + item?.colLG?.value} ${
                item?.offSetSM?.value === '' ? '' : 'offset-sm-' + item?.offSetSM?.value
              } ${item?.colSM?.value === '' ? '' : 'col-sm-' + item?.colSM?.value} ${
                item?.offSetXL?.value === '' ? '' : 'offset-xl-' + item?.offSetXL?.value
              } ${item?.colXL?.value === '' ? '' : 'col-xl-' + item?.colXL?.value} ${
                item?.offSetXS?.value === '' ? '' : 'offset-' + item?.offSetXS?.value
              } ${item?.colXS?.value === '' ? '' : 'col-' + item?.colXS?.value} ${
                item?.colExtraCss?.value !== '' ? item?.colExtraCss?.value : ''
              } `}
            >
              <Placeholder name={`col${index + 1}`} rendering={props.rendering} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<GridProps>(Grid);
