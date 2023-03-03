import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type RegisterProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Register = (props: RegisterProps): JSX.Element => (
  <div>
    <p>Register Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<RegisterProps>(Register);
