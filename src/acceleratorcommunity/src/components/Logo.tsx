import { Field, withDatasourceCheck, Image, LinkField, ImageField} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type LogoProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    navUrl: LinkField;
    logoImg: ImageField;
  };
};

const Logo = (props: LogoProps): JSX.Element => {
  const { fields } = props;
    console.log("logo",props);
    return (
      <div className="logo">
        <a href={fields.navUrl.value.href || "/#"} title="Nagarro">
          <Image
            field={fields.logoImg.value}
            editable={true}
            alt={fields.logoImg.value}
          />
        </a>
      </div>
    );

    };

export default withDatasourceCheck()<LogoProps>(Logo);
