// import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';
import groupLogo from '../assets/images/ProfilePic.jpeg';
import style from '../assets/groupMemberList.module.css';
import { useRouter } from 'next/router';
import { viewProfileLinkUrl } from 'assets/helpers/constants';
import darkTheme from '../assets/darkTheme.module.css';
import WebContext from '../Context/WebContext';
import { useContext } from 'react';
// import Link from 'next/link';

type GroupMembersListProps = ComponentProps & {
  fields: {
    heading: string;
  };
};
const list = [
  { img: groupLogo, name: 'John', objectId: 'john@nagarro.com' },
  { img: groupLogo, name: 'Peter', objectId: 'peter@nagarro.com' },
  { img: groupLogo, name: 'Rocky', objectId: 'rocky@nagarro.com' },
];

const GroupMemberList = (props: GroupMembersListProps): JSX.Element => {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  console.log(props);
  const router = useRouter();
  const onMemberClick = (email: string) => {
    router.push(`${viewProfileLinkUrl}${email}`);
  };
  return (
    <>
      <div className={`${style.groupMemberListBox} ${darkMode && darkTheme.grey_3}`}>
        <h3 className={`${style.groupMemberTitle} ${darkMode && darkTheme.text_green}`}>
          Members List
        </h3>
        <div className={`${style.groupMemberList} ${darkMode && darkTheme.grey_1}`}>
          {list.map((ele) => (
            <>
              <div
                key={ele.objectId}
                className={`${style.groupMemberListHeading} ${darkMode && darkTheme.grey_1}`}
                onClick={() => {
                  onMemberClick(ele.objectId);
                }}
              >
                <div
                  className={`${style.groupMemberListHeadingLeft} ${
                    darkMode && style.groupMemberListHeadingDarkTheme
                  } ${darkMode && darkTheme.grey_2}`}
                >
                  <Image
                    src={ele.img}
                    alt={ele.name}
                    className={style.groupMemberListLogo}
                    height={50}
                    width={50}
                  />
                  <div
                    className={`d-flex flex-column ${style.groupMemberNameAndEmail}  ${
                      darkMode && darkTheme.text_light
                    }`}
                  >
                    <h5 className={`${style.groupMemberListName} `}>{ele.name}</h5>
                    <h6 className={`${style.groupMemberListEmail}`}>{ele.objectId}</h6>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

// export default withDatasourceCheck()<GroupMembersListProps>(GroupMemberList);
export default GroupMemberList;
