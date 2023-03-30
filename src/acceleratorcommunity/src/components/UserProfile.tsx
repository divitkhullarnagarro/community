import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import userProfileCss from '../assets/userProfile.module.css';
import WebContext from '../Context/WebContext';
import React, { useContext } from 'react';
import Axios, { AxiosResponse } from 'axios';
import { LogoutUrl } from 'assets/helpers/constants';

// import profile from '../assets/images/profile.png';
import Link from 'next/link';
import { Url } from 'url';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

type UserProfileProps = ComponentProps & {
  fields: {
    Image: ImageField;
    LogoURL: Url;
  };
};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const { setIsLoggedIn, setUserToken } = { ...useContext(WebContext) };
  console.log('profile', props);
  const router = useRouter();
  const handleLogoutClick = async () => {
    const confirmValue = confirm('Do you want to Logout?');

    var config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await Axios.post<
      any,
      AxiosResponse<{ success: boolean; data: string; code: number; errors: any }>
    >(LogoutUrl, { accessToken: '', refreshToken: '' }, config);
    console.log('api res', res);
    if (
      res?.data?.code == 200 &&
      res?.data?.success == true &&
      setUserToken != undefined &&
      setIsLoggedIn != undefined
    ) {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') &&
        confirmValue
      ) {
        localStorage.clear();
        setUserToken('');
        setIsLoggedIn(false);
        router.push('/login');
      }
    } else {
      alert('logout failed');
    }

    console.log('confirm value', confirmValue);
  };
  return (
    <div className={userProfileCss.container}>
      <Button onClick={() => router.push('/')}>Back</Button>
      <Link href={props.fields.LogoURL}>
        {/* <Link href="/#"> */}

        <NextImage
          field={props.fields.Image.value}
          // field={profile}
          editable={true}
          width={30}
          height={30}
          title="Profile page"
        />
      </Link>
      <Button onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};

export default UserProfile;
