import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import adminUserListingCall from 'src/API/adminUserListingCall';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/users.module.css';
import { Table } from 'react-bootstrap';
import Profile from '../assets/images/ProfilePic.jpeg';

type userFields = {
  objectId: Field<string>;
  firstName: Field<string>;
  lastName: Field<string>;
  gender: Field<string>;
  email: Field<string>;
  phoneNo: Field<string>;
  role: Field<string>;
};

const userColumns = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'gender',
    headerName: 'Gender',
  },
  {
    field: 'email',
    headerName: 'Email',
  },

  {
    field: 'phone',
    headerName: 'Phone',
  },
  {
    field: 'role',
    headerName: 'Role',
  },
];

const userRows = [
  {
    id: 1,
    name: 'Shivam Gupta',
    gender: 'Male',
    email: 'Shivam@yopmail.com',
    phone: 9129739273,
    role: 'admin user',
  },
  {
    id: 2,
    name: 'Rohit Kumar',
    gender: 'Male',
    email: 'rohit.kumar@gmail.com',
    phone: 9893902930,
    role: 'admin user',
  },
  {
    id: 3,
    name: 'Rajan midha',
    gender: 'Male',
    email: 'mohit@yopmail.com',
    phone: 9689489384,
    role: 'admin user',
  },
  {
    id: 4,
    name: 'Shubham verma',
    gender: 'Male',
    email: 'shubham@yahoo.com',
    phone: 9703840380,
    role: 'admin user',
  },
  {
    id: 5,
    name: 'Pankaj saxena',
    gender: 'Male',
    email: 'gupta@nishant.com',
    phone: 9947937493,
    role: 'admin user',
  },
  {
    id: 6,
    name: 'Akshay sharma',
    gender: 'Male',
    email: 'akshay@sharma.com',
    phone: 9828038203,
    role: 'admin user',
  },
];

const ListLabel = 'Lists';
const UsersLabel = 'Users';

type UserProps = ComponentProps & {
  fields: {
    data: {
      datasource: DataSource;
    };
  };
};

type DataSource = {
  mainHeaderLabel: {
    jsonValue: Field<string>;
  };
  sideNavHeaderLabel: {
    jsonValue: Field<string>;
  };
  userListLabel: {
    jsonValue: Field<string>;
  };
};

const Users = (props: UserProps): JSX.Element => {
  const { data } = props?.fields;
  const [adminUserList, setAdminUserList] = useState<userFields[]>([]);
  const [showAdminList, setShowAdminList] = useState(false);

  console.log(adminUserList);
  const { userToken } = { ...useContext(WebContext) };

  const getAdminUserList = async () => {
    setShowAdminList(true);
    let response = await adminUserListingCall(userToken);
    if (response?.data?.success) {
      setAdminUserList(response?.data?.data);
    }
  };

  const UserListTable = () => {
    return (
      <div>
        <h3 className={styles.userListHeader}>
          {data?.datasource?.userListLabel?.jsonValue?.value ?? 'Admin List'}
        </h3>
        <Table striped hover className={styles.userListTable}>
          <thead>
            <tr className={styles.header}>
              {userColumns.map((item, index) => {
                return (
                  <td key={index} className={styles.item}>
                    {item.headerName}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {userRows.map((item) => {
              return (
                <tr key={item?.id} className={styles.row}>
                  <td className={styles.item}>{item?.name}</td>
                  <td className={styles.item}>{item?.gender}</td>
                  <td className={styles.item}>{item?.email}</td>
                  <td className={styles.item}>{item?.phone}</td>
                  <td className={styles.item}>{item?.role}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <div className={styles.dashboardWrapper}>
        <h2 className={styles.mainHeader}>
          {data?.datasource?.mainHeaderLabel?.jsonValue?.value ?? 'Welcome to the Dashboard'}
        </h2>
      </div>
    );
  };

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.top}>
          <span className={styles.logo}>
            {data?.datasource?.sideNavHeaderLabel?.jsonValue?.value ?? 'Professtional Dashboard'}
          </span>
        </div>
        <hr />
        <div className={styles.center}>
          <ul>
            <p className={styles.title}>{ListLabel}</p>
            <button
              onClick={() => {
                getAdminUserList();
              }}
            >
              <li className={styles.row}>
                <NextImage
                  contentEditable={true}
                  field={Profile}
                  height={20}
                  width={20}
                ></NextImage>
                <span>{UsersLabel}</span>
              </li>
            </button>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_column}>
        <SideNavbar />
      </div>
      <div className={styles.right_column}>
        <div className={styles.right_upper_section}>{<Dashboard />}</div>
        <div className={styles.right_lower_section}>
          {showAdminList ? <UserListTable /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Users;
