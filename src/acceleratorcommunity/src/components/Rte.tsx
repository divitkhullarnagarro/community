import { Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import styleMarginPadding from './MarginPadding';

type RteProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    data: {
      datasource: {
        className: {
          jss: { value: string };
          value: string;
        };
        content: {
          jss: { value: string };
          value: string;
        };
      };
    };
  };
};

const Rte = (props: RteProps): JSX.Element => {
  console.log(props);
  const { datasource } = props.fields.data;
  return (
    <div>
      <RichText
        className={datasource.className.jss.value === '' ? 'rte' : datasource.className.jss.value}
        field={datasource.content.jss}
        style={styleMarginPadding(props)}
      />
    </div>
  );
};

export default withDatasourceCheck()<RteProps>(Rte);
