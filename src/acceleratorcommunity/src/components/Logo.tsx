// import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { LogoInterface } from 'assets/helpers/interfaces/logo';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/images/CommunityLogo.svg';
import LogoStyles from '../assets/logo.module.css';

const Logo = (props: LogoInterface): JSX.Element => {
  console.log('logoProps', props.fields.data.datasource);
  const { image, logoURL } = props?.fields?.data?.datasource;
  return (
    <div className={LogoStyles.container}>
      <Link href={`${logoURL?.jsonValue?.value?.href}`} passHref={true}>
        <Image
          style={{ cursor: 'pointer' }}
          src={image?.jsonValue?.value?.src ? image?.jsonValue?.value?.src : logo}
          // editable={true}
          height={80}
          width={80}
        />
      </Link>
    </div>
  );
};

export default Logo;
