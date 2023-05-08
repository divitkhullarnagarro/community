import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
import logo from '../assets/images/CommunityLogo.svg';
import LogoStyles from '../assets/logo.module.css';

const Logo = (): JSX.Element => {
  return (
    <div className={LogoStyles.container}>
      <Link href="/" passHref={true}>
        <NextImage field={logo} editable={true} height={45} width={45} />
      </Link>
    </div>
  );
};

export default Logo;
