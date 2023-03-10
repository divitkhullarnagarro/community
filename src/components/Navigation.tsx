import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Navigationcss from '../assets/Navigation.module.css';
import searchImage from '../assets/images/searchImage.png';
import myNetwork from '../assets/images/myNetwork.png';
import compass from '../assets/images/Compass.png';
import About from '../assets/images/myCollection.png';
import support from '../assets/images/Signout.png';
import signout from '../assets/images/Support.png';
import collection from '../assets/images/myCollection.png';
import notification from '../assets/images/Notification.jpg';
import dropdown from '../assets/images/DownArrowImage.png';

type NavigationProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const name = 'FrontEndTeam';

const Navigation = (props: NavigationProps): JSX.Element => {
  console.log('Navigation', props);
  return (
    <nav className={Navigationcss.navbar}>
      <div className={Navigationcss.search_form}>
        <NextImage
          className={Navigationcss.searchImage}
          field={searchImage}
          editable={true}
          height={20}
          width={20}
        />
        <input
          type="text"
          className={Navigationcss.search_input}
          placeholder="Search peers, feed, news, knowldege"
        />
      </div>
      <div className={Navigationcss.notificationIcon}>
        <NextImage
          className={Navigationcss.img}
          field={notification}
          editable={true}
          height={30}
          width={30}
        />
      </div>
      <div className={Navigationcss.dropdown}>
        <a href="#" className={Navigationcss.dropdown_value}>
          {name}
          <NextImage field={dropdown} editable={true} height={14} width={20} />
        </a>
        <div className={Navigationcss.dropdown_content}>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={myNetwork}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp; My Network
          </a>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={collection}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp;My Collection
          </a>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={compass}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp;App at a Glance
          </a>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={About}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp;About Us
          </a>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={support}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp;Support
          </a>
          <a href="#">
            <NextImage
              className={Navigationcss.dropdownImage}
              field={signout}
              editable={true}
              height={10}
              width={16}
            />
            &nbsp;&nbsp;Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
