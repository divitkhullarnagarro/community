import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext, useEffect, useState } from 'react';
import adminUserListingCall from 'src/API/adminUserListingCall';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/users.module.css';

type userFields = {
  objectId: Field<string>;
  firstName: Field<string>;
  lastName: Field<string>;
  gender: Field<string>;
  email: Field<string>;
  phoneNo: Field<string>;
  role: Field<string>;
};

const headers = ['Name', 'Gender', 'Email', 'Phone Number', 'Role'];

const Users = (): JSX.Element => {
  const [adminUserList, setAdminUserList] = useState<userFields[]>([]);
  const { userToken } = { ...useContext(WebContext) };
  const getAdminUserList = async (userToken: string | undefined) => {
    let response = await adminUserListingCall(userToken);
    if (response?.data?.success) {
      setAdminUserList(response?.data?.data);
    }
  };

  useEffect(() => {
    getAdminUserList(userToken);
  }, []);

  return (
    <div className={styles.usersContainer}>
      {adminUserList.length > 0 ? (
        <table>
          <thead>
            <tr className={styles.header}>
              {headers.map((item, index) => {
                return (
                  <td key={index} className={styles.item}>
                    {item}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {adminUserList.map((item) => {
              return (
                <tr key={item?.objectId?.value} className={styles.row}>
                  <td className={styles.item}>{item?.firstName + ' ' + item?.lastName}</td>
                  <td className={styles.item}>{item?.gender}</td>
                  <td className={styles.item}>{item?.email}</td>
                  <td className={styles.item}>{item?.phoneNo}</td>
                  <td className={styles.item}>{item?.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Users;
