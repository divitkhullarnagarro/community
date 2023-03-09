import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SideNavigationProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const SideNavigation = (props: SideNavigationProps): JSX.Element => (
  <div>
    <p>SideNavigation Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<SideNavigationProps>(SideNavigation);
