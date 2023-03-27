import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext, useState } from 'react';
import adminUserListingCall from 'src/API/adminUserListingCall';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/users.module.css';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { DataGrid } from '@mui/x-data-grid';

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
  { field: 'id', headerName: 'Row', width: 70 },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 200,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },

  {
    field: 'phone',
    headerName: 'Phone',
    width: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 200,
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

const Users = (): JSX.Element => {
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

  const DataGridTable = () => {
    const [data] = useState(userRows);
    return (
      <div className={styles.datatable}>
        <h3>Admin User List</h3>
        <DataGrid
          className={styles.datagrid}
          rows={data}
          columns={userColumns}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <div className={styles.dashboardWrapper}>
        <h2>Welcome to the Dashboard</h2>
      </div>
    );
  };

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.top}>
          <span className={styles.logo}>Professional Dashboard</span>
        </div>
        <hr />
        <div className={styles.center}>
          <ul>
            <p className={styles.title}>LISTS</p>
            <button
              onClick={() => {
                getAdminUserList();
              }}
            >
              <li className={styles.row}>
                <PersonOutlineIcon className={styles.icon} />
                <span>Users</span>
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
          {showAdminList ? <DataGridTable /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Users;
