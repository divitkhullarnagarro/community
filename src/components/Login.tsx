import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type LoginProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const Login = (props: LoginProps): JSX.Element => (
  <div>
    <p>Login Component</p>
    <Text field={props.fields.heading} />
  </div>
);

export default withDatasourceCheck()<LoginProps>(Login);
