import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/users.module.css';
import { Button, Modal, Table } from 'react-bootstrap';
import Flag from '../assets/images/flag-icon.svg';
import { Dropdown } from 'react-bootstrap';
import { getAllReportPostCall, getReportedPostReportersDetailsCall } from 'src/API/reportPostCall';
import { useRouter } from 'next/router';
import parser from 'html-react-parser';
import Spinner from 'react-bootstrap/Spinner';
import DownArrow from '../assets/images/DownArrow.png';
import WarningImage from '../assets/images/warning.jpg';
import ReportedUsers from '../assets/images/ReportedUsers.png';
import { openDoc, calculateTimeDifference } from 'assets/helpers/helperFunctions';

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
    field: 'reason',
    headerName: 'Reason',
  },
  {
    field: 'action',
    headerName: 'Action',
  },
];

const userRows = [
  {
    id: 1,
    name: 'Shivam Gupta',
    gender: 'Male',
    email: 'Shivam@yopmail.com',
    phone: 9129739273,
    reason: 'Fake',
  },
  {
    id: 2,
    name: 'Rohit Kumar',
    gender: 'Male',
    email: 'rohit.kumar@gmail.com',
    phone: 9893902930,
    reason: 'Spam',
  },
  {
    id: 3,
    name: 'Rajan midha',
    gender: 'Male',
    email: 'mohit@yopmail.com',
    phone: 9689489384,
    reason: 'Infringement of content',
  },
  {
    id: 4,
    name: 'Shubham verma',
    gender: 'Male',
    email: 'shubham@yahoo.com',
    phone: 9703840380,
    reason: 'Suspicious',
  },
  {
    id: 5,
    name: 'Pankaj saxena',
    gender: 'Male',
    email: 'gupta@nishant.com',
    phone: 9947937493,
    reason: 'Fake',
  },
  {
    id: 6,
    name: 'Akshay sharma',
    gender: 'Male',
    email: 'akshay@sharma.com',
    phone: 9828038203,
    reason: 'Inappropriate behaviour',
  },
];

type reportPostFields = {
  id: string;
  description: string;
  postType: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  createdOn: string;
  mediaList: mediaType[];
};

type reportedPostReporterFields = {
  id: string;
  postId: string;
  reason: string;
  reportedBy: {
    objectId: string;
    firstName: string;
    lastName: string;
  };
  reportedAt: string;
};

type mediaType = {
  id: string;
  mediaType: string;
  url: string;
};

const ListLabel = 'Lists';

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
  const router = useRouter();

  const [showReportedPosts, setShowReportedPosts] = useState(false);
  const [reportPostList, setReportedPostList] = useState<reportPostFields[]>([]);
  const [reportedPostReporterDetails, setReportedPostReporterDetails] = useState<
    reportedPostReporterFields[]
  >([]);
  const [showSpinner, setShowSpinner] = useState(false);

  const [numberOfReportedItemsToShow, setNumberOfReportedItemsToShow] = useState(5);
  const { userToken, setUserToken } = {
    ...useContext(WebContext),
  };

  const [showReportedUserList, setShowReportedUserList] = useState(false);

  const getReportedUserList = async () => {
    setShowReportedPosts(false);
    setShowReportedUserList(true);
  };

  const ReportedUserListTable = () => {
    return (
      <div>
        <h3 className={styles.userListHeader}>{'Reported User List'}</h3>
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
                  <td className={styles.item}>{item?.reason}</td>
                  <Button
                    className={styles.actionWarningButton}
                    onClick={() => setShowWarnUserPopup(true)}
                  >
                    Warning
                  </Button>
                  <Button
                    className={styles.actionButton}
                    onClick={() => setShowSuspendUserPopup(true)}
                  >
                    Suspension
                  </Button>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const [showWarnUserPopup, setShowWarnUserPopup] = useState(false);
  const WarnUserPopUp = () => {
    return (
      <Modal
        className={styles.reportPostModalContent}
        show={showWarnUserPopup}
        backdrop="static"
        keyboard={false}
        onHide={() => setShowWarnUserPopup(false)}
        centered
        scrollable={true}
      >
        <div style={{ height: '30vh', display: 'flex', flexDirection: 'column' }}>
          <Modal.Header closeButton className={styles.reportPostModalHeader}>
            <Modal.Title>{'Warn user'}</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => setShowWarnUserPopup(false)}
            >
              Cancel
            </Button>
            <Button className={styles.footerBtn} variant="secondary">
              Send warning
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  const [showSuspendUserPopup, setShowSuspendUserPopup] = useState(false);
  const SuspendUserPopup = () => {
    return (
      <Modal
        className={styles.reportPostModalContent}
        show={showSuspendUserPopup}
        backdrop="static"
        keyboard={false}
        onHide={() => setShowSuspendUserPopup(false)}
        centered
        scrollable={true}
      >
        <div style={{ height: '30vh', display: 'flex', flexDirection: 'column' }}>
          <Modal.Header closeButton className={styles.reportPostModalHeader}>
            <Modal.Title>{'Suspend user account'}</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => setShowSuspendUserPopup(false)}
            >
              Cancel
            </Button>
            <Button className={styles.footerBtn} variant="secondary">
              Suspend account
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    if (userToken == '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      } else router.push('/login');
    }
  }, []);

  const getReportedPosts = async () => {
    setReportedPostList([]);
    setShowReportedPosts(true);
    setShowReportedUserList(false);
    let response = await getAllReportPostCall(userToken);
    if (response?.success) {
      setReportedPostList(response?.data);
    }
  };

  const getReportedPostReportersDetails = async (postId: string) => {
    setShowSpinner(true);
    setShowReportPopUp(true);
    let response = await getReportedPostReportersDetailsCall(userToken, postId);
    if (response?.success) {
      setShowReportPopUp(true);
      setReportedPostReporterDetails(response?.data);
    }
    setShowSpinner(false);
  };

  const [showReportPopUp, setShowReportPopUp] = useState(false);
  const [reportedPostItem, setReportedPostItem] = useState<reportPostFields>();
  const handleClose = () => {
    setShowReportPopUp(false);
  };

  const ReportPostPopup = () => {
    return (
      <>
        <Modal
          className={styles.reportPostModalContent}
          show={showReportPopUp}
          backdrop="static"
          keyboard={false}
          onHide={handleClose}
          centered
          scrollable={true}
        >
          <div style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
            <Modal.Header closeButton className={styles.reportPostModalHeader}>
              <Modal.Title>{'Reported Post'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={styles.reportPostModal}>
                <div className={styles.reportPostHeading}>
                  <div className={styles.reportPostHeaderLeft}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                      alt="User-Pic"
                      width="30px"
                    ></img>
                    <div className={styles.reportPostDetailContainer}>
                      <h4 className={styles.postOwner}>
                        <span>{reportedPostItem?.createdBy?.firstName}</span>
                        &nbsp;
                        <span>{reportedPostItem?.createdBy?.lastName}</span>
                      </h4>
                      <h6 className={styles.postCreateDate}>
                        <span style={{ fontWeight: '100' }}>
                          {reportedPostItem?.createdOn
                            ? calculateTimeDifference(reportedPostItem?.createdOn)
                            : 'Recently'}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className={styles.postContent}>
                  {reportedPostItem?.description
                    ? parser(reportedPostItem?.description)
                    : reportedPostItem?.description}
                </div>
                <div className="postMedia">
                  {reportedPostItem?.mediaList?.map((media: mediaType, num: any) => {
                    if (media?.mediaType === 'VIDEO') {
                      return (
                        <div key={num}>
                          <video width="100%" src={media?.url} controls></video>
                        </div>
                      );
                    } else if (media?.mediaType === 'DOCUMENT') {
                      return (
                        <div className="docPreviewContainer" key={num}>
                          <span className="openPrevButton">
                            <button
                              onClick={() => openDoc(media?.url)}
                              style={{
                                padding: '5px',
                                borderRadius: '20px',
                                borderColor: 'white',
                              }}
                            >
                              <img
                                width="50px"
                                src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                                alt={num}
                                style={{ margin: '10px' }}
                              ></img>
                              {'DocFile'}
                            </button>
                          </span>
                        </div>
                      );
                    } else if (media?.mediaType === 'IMAGE') {
                      return (
                        <div
                          key={num}
                          style={{
                            borderRadius: '30px',
                            margin: '0px 15px 15px 0px',
                          }}
                        >
                          <img width="100%" src={media?.url} alt={media?.id}></img>
                        </div>
                      );
                    }
                    return '';
                  })}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className={styles.reportPostModalFooter}>
              {showSpinner ? (
                <>
                  {'Fetching users who reported the post...'}
                  <Spinner animation="border" style={{ marginLeft: '5px', height: '30px' }} />
                </>
              ) : (
                reportedPostReporterDetails.map((reportDetails) => {
                  return (
                    <>
                      <div className={styles.footerContainer}>
                        <div className={styles.footerFirstRow}>
                          <div className={styles.footerRowHeader}>Reported By :</div>
                          <div className={styles.footerRowContent}>
                            <div>{`${reportDetails?.reportedBy?.firstName} ${reportDetails?.reportedBy?.lastName}`}</div>
                            <div className={styles.reportedDate}>
                              {reportDetails?.reportedAt
                                ? calculateTimeDifference(reportDetails?.reportedAt)
                                : 'Recently'}
                            </div>
                          </div>
                        </div>
                        <div className={styles.footerSecondRow}>
                          <div className={styles.footerRowHeader}>Report Reason :</div>
                          <div>{reportDetails?.reason ?? 'Spam'}</div>
                        </div>
                      </div>
                      <hr />
                    </>
                  );
                })
              )}
            </Modal.Footer>
          </div>
        </Modal>
      </>
    );
  };

  const ReportedPostList = () => {
    return (
      <div className={styles.reportPostWrapper}>
        <h3>{reportPostList?.length > 0 ? ' Reported Posts' : ''}</h3>
        {reportPostList.slice(0, numberOfReportedItemsToShow).map((item) => {
          return (
            <div key={item?.id} className={styles.reportPostContainer}>
              <div className={styles.reportPostHeading}>
                <div className={styles.reportPostHeaderLeft}>
                  <img
                    className="postUserImage"
                    src="https://cdn-icons-png.flaticon.com/512/1144/1144811.png"
                    alt="User-Pic"
                  ></img>
                  <div className={styles.reportPostDetailContainer}>
                    <h5 className={styles.postOwner}>
                      <span>{item?.createdBy?.firstName}</span>
                      &nbsp;
                      <span>{item?.createdBy?.lastName}</span>
                    </h5>
                    <h6 className={styles.postCreateDate}>
                      <span style={{ fontWeight: '100' }}>
                        {item?.createdOn ? calculateTimeDifference(item?.createdOn) : 'Recently'}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className={styles.reportPostHeaderRight}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline"
                      id="dropdown-basic"
                      className={styles.dropdownBtn}
                      style={{ backgroundColor: 'white', border: 'none', width: '50px' }}
                    >
                      <button
                        style={{
                          border: 'none',
                          backgroundColor: 'white',
                          padding: '0',
                        }}
                      >
                        <img
                          className="postMoreOptionsImage"
                          src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
                          alt="pan"
                        />
                      </button>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        href={`/post/${item.id}`}
                        target="_blank"
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage
                              field={WarningImage}
                              editable={true}
                              height={30}
                              width={30}
                            />
                          </div>
                          <div className={styles.reportContainerHeader}>View Original Post</div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className={styles.dropdownItem}>
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage
                              field={WarningImage}
                              editable={true}
                              height={30}
                              width={30}
                            />
                          </div>
                          <div className={styles.reportContainerHeader}>
                            Send Warning to {item?.createdBy?.firstName}
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => {
                          getReportedPostReportersDetails(item?.id);
                          setReportedPostItem(item);
                        }}
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage field={Flag} editable={true} />
                          </div>
                          <div className={styles.reportContainerHeader}>Reported Post Details</div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className={styles.reportPostContent}>{parser(item?.description)}</div>
              <div className="postMedia">
                {item?.mediaList?.map((media: mediaType, num: any) => {
                  if (media?.mediaType === 'VIDEO') {
                    return (
                      <div key={num}>
                        <video width="100%" src={media?.url} controls></video>
                      </div>
                    );
                  } else if (media?.mediaType === 'DOCUMENT') {
                    return (
                      <div className="docPreviewContainer" key={num}>
                        <span className="openPrevButton">
                          <button
                            onClick={() => openDoc(media?.url)}
                            style={{
                              padding: '5px',
                              borderRadius: '20px',
                              borderColor: 'white',
                            }}
                          >
                            <img
                              width="50px"
                              src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
                              alt={num}
                              style={{ margin: '10px' }}
                            ></img>
                            {'DocFile'}
                          </button>
                        </span>
                      </div>
                    );
                  } else if (media?.mediaType === 'IMAGE') {
                    return (
                      <div
                        key={num}
                        style={{
                          borderRadius: '30px',
                          margin: '0px 15px 15px 0px',
                        }}
                      >
                        <img width="300px" src={media?.url} alt={media?.id}></img>
                      </div>
                    );
                  }
                  return '';
                })}
              </div>
            </div>
          );
        })}
        <Button
          className={styles.seeMoreReportedPostBtn}
          style={{
            color: 'black',
            width: '100%',
            fontSize: '1.5rem',
            height: '50px',
            backgroundColor: 'white',
            border: 'none',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setNumberOfReportedItemsToShow(numberOfReportedItemsToShow + 5)}
        >
          See more
          <NextImage height={30} width={30} field={DownArrow} />
        </Button>
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <>
        <div className={styles.dashboardWrapper}>
          <h2>
            {props?.fields?.data?.datasource?.mainHeaderLabel?.jsonValue?.value ??
              'Welcome to the Dashboard'}
          </h2>
        </div>
        <hr style={{ fontWeight: 'bold' }} />
      </>
    );
  };

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.top}>
          <span className={styles.logo}>{'Admin Dashboard'}</span>
        </div>
        <hr />
        <div className={styles.center}>
          <ul>
            <p className={styles.title}>{ListLabel}</p>
            <button
              onClick={() => {
                getReportedPosts();
              }}
            >
              <li className={styles.row}>
                <NextImage contentEditable={true} field={Flag} height={15} width={20}></NextImage>
                <span>{'Reported Posts'}</span>
              </li>
            </button>
            <button
              onClick={() => {
                getReportedUserList();
              }}
            >
              <li className={styles.row}>
                <NextImage
                  contentEditable={true}
                  field={ReportedUsers}
                  height={20}
                  width={20}
                ></NextImage>
                <span>{'Reported Users'}</span>
              </li>
            </button>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Button className={styles.backBtn} onClick={() => router.push('/')}>
        Back
      </Button>
      <div className={styles.left_column}>
        <SideNavbar />
      </div>
      <div className={styles.right_column}>
        <div className={styles.right_upper_section}>{<Dashboard />}</div>
        <div
          className={
            reportPostList?.length > 0 ? styles.right_lower_section : styles.right_lower_section
          }
        >
          {showReportedPosts ? (
            reportPostList?.length > 0 ? (
              <div>
                <ReportedPostList />
                <ReportPostPopup />
              </div>
            ) : (
              <span className={styles.reportedPostContainer}>
                <span className={styles.reportPostContainerHeader}>Getting Reported Posts ...</span>
                <Spinner animation="border" />
              </span>
            )
          ) : (
            <></>
          )}
          {showReportedUserList ? (
            <>
              <ReportedUserListTable />
              <WarnUserPopUp />
              <SuspendUserPopup />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
