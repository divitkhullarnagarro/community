import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import logo from '../assets/images/CommunityLogo.svg';
import LogoStyles from '../assets/logo.module.css';

const Logo = (): JSX.Element => {
  return (
    <div className={LogoStyles.container}>
      <a href="/">
        <NextImage field={logo} editable={true} height={45} width={45} />
      </a>
    </div>
  );
};

export default Logo;
