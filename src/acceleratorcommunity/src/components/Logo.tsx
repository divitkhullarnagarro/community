import {
  withDatasourceCheck,
  NextImage,
  LinkField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type LogoProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  image: {
    jsonValue: ImageField;
  };
  logoURL: {
    jsonValue: LinkField;
  };
};

const Logo = (props: LogoProps): JSX.Element => {
  const { datasource } = props?.fields?.data;
  console.log('logo', props);
  return (
    <div className="logo">
      <a href={datasource?.logoURL?.jsonValue?.value?.href || '/#'} title="Nagarro">
        <NextImage field={datasource?.image?.jsonValue?.value} editable={true} />
      </a>
    </div>
  );
};

export default withDatasourceCheck()<LogoProps>(Logo);
