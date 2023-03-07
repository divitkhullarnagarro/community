import { withDatasourceCheck, RichText, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type RteProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        // className: {
        //   jss: { value: string };
        //   value: string;
        // };
        // content: {
        //   jss: { value: string };
        //   value: string;
        // };
        richText: {
          jsonValue: RichTextField;
        };
      };
    };
  };
};

const Rte = (props: RteProps): JSX.Element => {
  console.log('Rte', props);
  const { datasource } = props.fields.data;
  return (
    <div>
      <RichText
        // className={datasource.className.jss.value === '' ? 'rte' : datasource.className.jss.value}
        field={datasource.richText.jsonValue}
      />
    </div>
  );
};

export default withDatasourceCheck()<RteProps>(Rte);
