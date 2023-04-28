import { Field, NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { useContext, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/users.module.css';
import { Accordion, Button, Modal } from 'react-bootstrap';
import Flag from '../assets/images/flag-icon.svg';
import { Dropdown } from 'react-bootstrap';
import { getAllReportPostCall, getReportedPostReportersDetailsCall } from 'src/API/reportPostCall';
import { useRouter } from 'next/router';
import parser from 'html-react-parser';
import Spinner from 'react-bootstrap/Spinner';
import ViewPost from '../assets/images/View_icon.svg';
import WarningImage from '../assets/images/Send_warning.svg';
import ReportPost from '../assets/images/report_post.svg';
// import HeadBanner from '../assets/images/HeadBanner.png';
import DropArrow from '../assets/images/droparrow.png';
import ReportedUsers from '../assets/images/ReportedUsers.png';
import {
  openDoc,
  calculateTimeDifference,
  graphqlQueryWrapper,
} from 'assets/helpers/helperFunctions';
import { getEmailTemplatesGraphqlQuery } from './Queries';
import { getAllReportUserCall, getReportedUserReportersDetailsCall } from 'src/API/reportUserCall';

const EmailTemplateFolder = '02989F59-CFEB-4CC9-90FB-C0DA8A7FE7B5';
const WarnUserEmailTemplate = '16937DB73C124028877AAA49C0BE30CA';
const WarnUserEmailTemplateBody = 'DD033BE99AD5406699A18F9956ED029F';
const SuspendUserEmailTemplate = '71C5EDC72EB3474191904768EED4C591';
const SuspendUserEmailTemplateBody = 'DD033BE99AD5406699A18F9956ED029F';
const WarnUserForPostEmailTemplate = 'A5A0180DB2824B4694FBDCC305157ED7';
const WarnUserForPostEmailTemplateBody = 'DD033BE99AD5406699A18F9956ED029F';

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

const ListLabel = 'Insights';

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

type data = {
  datasource: {
    children: {
      results: emailTemplate[];
    };
  };
};

type emailTemplate = {
  id: string;
  name: string;
  fields: emailTemplateFields[];
};

type emailTemplateFields = {
  id: string;
  name: string;
  value: string;
};

type reportUserFields = {
  reason: string;
  reportedUser: {
    objectId: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
  };
};

type reportedByUserFields = {
  reportedBy: {
    objectId: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
  };
  reason: string;
};

const Users = (props: UserProps): JSX.Element => {
  const { userToken, setUserToken } = {
    ...useContext(WebContext),
  };
  const router = useRouter();
  const [showSpinner, setShowSpinner] = useState(false);

  // Reported Post State variable
  const [showReportedPosts, setShowReportedPosts] = useState(false);
  const [reportPostList, setReportedPostList] = useState<reportPostFields[]>([]);
  const [reportedPostReporterDetails, setReportedPostReporterDetails] = useState<
    reportedPostReporterFields[]
  >([]);
  const [numberOfReportedItemsToShow, setNumberOfReportedItemsToShow] = useState(5);

  // Reported User State variable
  const [showReportedUserList, setShowReportedUserList] = useState(false);
  const [reportUserList, setReportedUserList] = useState<reportUserFields[]>([]);
  const [reportedUserReporterDetails, setReportedUserReporterDetails] = useState<
    reportedByUserFields[]
  >([]);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<string>();

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

  const getReportedUserList = async () => {
    setShowReportedPosts(false);
    setShowReportedUserList(true);
    setReportedUserList([]);
    let response = await getAllReportUserCall(userToken);
    if (response?.success) {
      setReportedUserList(response?.data);
    }
  };

  const getReportedUserReporterDetails = async (event: any, userId: string, index: string) => {
    if (event?.target?.parentNode?.parentNode?.getAttribute('aria-expanded') === 'false') {
      setActiveAccordionIndex(index);
      setReportedUserReporterDetails([]);
      let response = await getReportedUserReportersDetailsCall(userToken, userId);
      if (response?.success) {
        console.log('reportUserReportersDetailsResponse', response?.data);
        setReportedUserReporterDetails(response?.data);
      }
    } else {
      setActiveAccordionIndex(undefined);
    }
  };

  const ReportedUserListTable = () => {
    return (
      <div className={styles.reportedUserListContainer}>
        <h3 className={styles.userListHeader}>{'Reported User List'}</h3>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h6 className={`${styles.tableField} ${styles.nameColumn}`}>Name</h6>
            <h6 className={`${styles.tableField} ${styles.genderColumn}`}>Gender</h6>
            <h6 className={`${styles.tableField} ${styles.emailColumn}`}>Email</h6>
            <h6 className={`${styles.tableField} ${styles.phoneNumberColumn}`}>Phone Number</h6>
            <h6 className={`${styles.tableField} ${styles.reasonsColumn}`}>Reason</h6>
            <h6 className={styles.tableField}>Action</h6>
          </div>
          <div className={styles.tableBody}>
            {reportUserList?.map((item, index) => {
              return (
                <Accordion
                  key={index}
                  className={styles.reportedUserAccordion}
                  activeKey={activeAccordionIndex}
                >
                  <Accordion.Item
                    className={styles.accordionItem}
                    eventKey={index.toString()}
                    onClick={(e) =>
                      getReportedUserReporterDetails(
                        e,
                        item?.reportedUser?.objectId,
                        index.toString()
                      )
                    }
                  >
                    <Accordion.Header className={styles.accordionHeader}>
                      <div key={index.toString()} className={styles.tableContentRow}>
                        <span className={`${styles.tableField} ${styles.nameColumn}`}>
                          {item?.reportedUser?.firstName + ' ' + item?.reportedUser?.lastName}
                        </span>
                        <span className={`${styles.tableField} ${styles.genderColumn}`}>
                          {item?.reportedUser?.gender || 'NA'}
                        </span>
                        <span className={`${styles.tableField} ${styles.emailColumn}`}>
                          {item?.reportedUser?.objectId}
                        </span>
                        <span className={`${styles.tableField} ${styles.phoneNumberColumn}`}>
                          {item?.reportedUser?.phoneNumber || 'NA'}
                        </span>
                        <span className={`${styles.tableField} ${styles.reasonsColumn}`}>
                          {item?.reason || 'NA'}
                        </span>
                        <span className={`${styles.tableField} ${styles.actionButtonsContainer}`}>
                          <button
                            className={styles.actionButton}
                            onClick={() => setShowWarnUserPopup(true)}
                          >
                            Warning
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={() => setShowSuspendUserPopup(true)}
                          >
                            Suspension
                          </button>
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className={styles.accordionBody}>
                      <div className={styles.accordionBodyHeader}>
                        <span className={styles.accordionBodyName}>Name</span>
                        <span className={styles.accordionBodyGender}>Gender</span>
                        <span className={styles.accordionBodyEmail}>Email</span>
                        <span className={styles.accordionBodyPhone}>Phone Number</span>
                        <span className={styles.accordionBodyReason}>Reason</span>
                      </div>
                      {reportedUserReporterDetails.map((reportedByItem, index) => {
                        return (
                          <div key={index} className={styles.accordionBodyItem}>
                            <span className={styles.accordionBodyName}>
                              {reportedByItem?.reportedBy.firstName +
                                ' ' +
                                reportedByItem?.reportedBy?.lastName}
                            </span>
                            <span className={styles.accordionBodyGender}>
                              {reportedByItem?.reportedBy?.gender || 'NA'}
                            </span>
                            <span className={styles.accordionBodyEmail}>
                              {reportedByItem?.reportedBy?.objectId || 'NA'}
                            </span>
                            <span className={styles.accordionBodyPhone}>
                              {reportedByItem?.reportedBy?.phoneNumber || 'NA'}
                            </span>
                            <span className={styles.accordionBodyReason}>
                              {reportedByItem?.reason || 'NA'}
                            </span>
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const [emailTemplates, setEmailTemplates] = useState<emailTemplate[]>([]);

  const getEmailTemplates = async () => {
    if (emailTemplates === undefined || emailTemplates.length === 0) {
      const emailTemplateQuery = getEmailTemplatesGraphqlQuery();
      const dataSource = EmailTemplateFolder;
      const result = await graphqlQueryWrapper<data>(emailTemplateQuery, dataSource);
      const emailTemplatesForAdminAction = result?.data?.datasource?.children?.results;
      setEmailTemplates(emailTemplatesForAdminAction);
      return emailTemplatesForAdminAction;
    }
    return emailTemplates;
  };

  const getEmailTemplateBodyHtml = (
    emailTemplates: Promise<emailTemplate[]>,
    emailTemplate: string,
    emailTemplateBody: string
  ) => {
    return emailTemplates.then((response: emailTemplate[]) => {
      const result = response
        .filter((item: emailTemplate) => {
          return item.id === emailTemplate;
        })
        .find((item) => item)
        ?.fields?.filter((item: emailTemplateFields) => {
          return item.id === emailTemplateBody;
        })
        .find((item) => item);
      return result?.value;
    });
  };

  const onSendWarningToUser = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(emailTemplates, WarnUserEmailTemplate, WarnUserEmailTemplateBody).then(
      (result) => {
        console.log('warn', result);
      }
    );

    setShowWarnUserPopup(false);
  };

  const onUserAccountSuspension = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(
      emailTemplates,
      SuspendUserEmailTemplate,
      SuspendUserEmailTemplateBody
    ).then((result) => {
      console.log('suspend', result);
    });

    setShowSuspendUserPopup(false);
  };

  const onReportedPostSendWarning = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(
      emailTemplates,
      WarnUserForPostEmailTemplate,
      WarnUserForPostEmailTemplateBody
    ).then((result) => {
      console.log('warnforpost', result);
    });
    setShowWarnUserForPostReportPopUp(false);
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
        <div className={styles.popupContent}>
          <Modal.Header closeButton className={styles.reportPostModalHeader}>
            <Modal.Title>{'Warn user'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={styles.reportPostModalBody}
            >{`Do you want to send email warning to the user ?`}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => setShowWarnUserPopup(false)}
            >
              Cancel
            </Button>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => onSendWarningToUser()}
            >
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
        <div className={styles.popupContent}>
          <Modal.Header closeButton className={styles.reportPostModalHeader}>
            <Modal.Title>{'Suspend user account'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={styles.reportPostModalBody}
            >{`Do you want to suspend user's account ?`}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => setShowSuspendUserPopup(false)}
            >
              Cancel
            </Button>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => onUserAccountSuspension()}
            >
              Suspend account
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

  const [showWarnUserForPostReportPopUp, setShowWarnUserForPostReportPopUp] = useState(false);
  const WarnUserForPostReportPopUp = () => {
    return (
      <Modal
        className={styles.reportPostModalContent}
        show={showWarnUserForPostReportPopUp}
        backdrop="static"
        keyboard={false}
        onHide={() => setShowWarnUserForPostReportPopUp(false)}
        centered
        scrollable={true}
      >
        <div className={styles.popupContent}>
          <Modal.Header closeButton className={styles.reportPostModalHeader}>
            <Modal.Title>{'Warn user'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              className={styles.reportPostModalBody}
            >{`Do you want to send email warning to the user ?`}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => setShowWarnUserForPostReportPopUp(false)}
            >
              Cancel
            </Button>
            <Button
              className={styles.footerBtn}
              variant="secondary"
              onClick={() => onReportedPostSendWarning()}
            >
              Send warning
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  };

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
    console.log(reportedPostItem?.postType === 'TEXT_POST');
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
          {reportedPostItem?.postType === 'TEXT_POST' ? (
            <div>
              <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                <Modal.Header closeButton className={styles.reportPostModalHeader}>
                  <Modal.Title className={styles.reportTitle}>{'Reported Post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.reportBody}>
                  <div className={styles.reportPostModal}>
                    <div className={styles.reportPostHeading}>
                      <div className={styles.reportPostHeaderLeft}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
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
                                // margin: '0px 15px 15px 0px',
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
                              <div className={styles.footerRowHeader}>Reason :</div>
                              <div className={styles.footerRowContent}>
                                {reportDetails?.reason ?? 'Spam'}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })
                  )}
                </Modal.Footer>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ height: '660px', display: 'flex', flexDirection: 'column' }}>
                <Modal.Header closeButton className={styles.reportPostModalHeader}>
                  <Modal.Title className={styles.reportTitle}>{'Reported Post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.reportBody}>
                  <div className={styles.reportPostModal}>
                    <div className={styles.reportPostHeading}>
                      <div className={styles.reportPostHeaderLeft}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
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
                                // margin: '0px 15px 15px 0px',
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
                              <div className={styles.footerRowHeader}>Reason :</div>
                              <div className={styles.footerRowContent}>
                                {reportDetails?.reason ?? 'Spam'}
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })
                  )}
                </Modal.Footer>
              </div>
            </div>
          )}
        </Modal>
      </>
    );
  };

  const ReportedPostList = () => {
    return (
      <div className={styles.reportPostWrapper}>
        <div className={styles.reportPostHeader}>
          <h3 className={styles.reportPostTitle}>
            {reportPostList?.length > 0 ? 'Reported Posts' : ''}
          </h3>
        </div>
        {reportPostList.slice(0, numberOfReportedItemsToShow).map((item) => {
          return (
            <div key={item?.id} className={styles.reportPostContainer}>
              <div className={styles.reportPostHeading}>
                <div className={styles.reportPostHeaderLeft}>
                  <img
                    className={styles.postUserImage}
                    src="https://cdn-icons-png.flaticon.com/32/3177/3177440.png"
                    alt="User-Pic"
                  ></img>
                  <div className={styles.reportPostDetailContainer}>
                    <h5 className={styles.postOwner}>
                      <span>{item?.createdBy?.firstName}</span>
                      &nbsp;
                      <span>{item?.createdBy?.lastName}</span>
                    </h5>
                    <h6 className={styles.postCreateDate}>
                      <img
                        width="9px"
                        src="https://cdn-icons-png.flaticon.com/32/2088/2088617.png"
                        alt="post time"
                        style={{ opacity: '0.4', marginRight: '4px' }}
                      ></img>
                      <span style={{ fontWeight: '100' }}>
                        {item?.createdOn ? calculateTimeDifference(item?.createdOn) : 'Recently'}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className={styles.reportPostHeaderRight}>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
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

                    <Dropdown.Menu className={styles.dropdownMenu}>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        href={`/post/${item.id}`}
                        target="_blank"
                      >
                        <div className={styles.overlayItem}>
                          <div className={styles.dropdownImage}>
                            <NextImage
                              field={ViewPost}
                              editable={true}
                              // height={30}
                              // width={30}
                            />
                          </div>
                          <div className={styles.reportContainerHeader}>View Original Post</div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => setShowWarnUserForPostReportPopUp(true)}
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
                            <NextImage field={ReportPost} editable={true} />
                          </div>
                          <div className={styles.reportContainerHeader}>Reported Post Details</div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className={styles.reportPostContent}>
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
                        <div className={styles.docPreviewContainer} key={num}>
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
                          <img
                            className={styles.reportPostImage}
                            height="438px"
                            width="100%"
                            src={media?.url}
                            alt={media?.id}
                          ></img>
                        </div>
                      );
                    }
                    return '';
                  })}
                </div>
                <div className="postDescription">{parser(item?.description)}</div>
              </div>
            </div>
          );
        })}
        {reportPostList === undefined ||
        numberOfReportedItemsToShow >= reportPostList?.length ? null : (
          <button
            className={styles.seeMoreReportedPostBtn}
            onClick={() => setNumberOfReportedItemsToShow(numberOfReportedItemsToShow + 5)}
          >
            <div>
              <span className={styles.seeMoreBtn}>See more</span>
            </div>
            <NextImage field={DropArrow} editable={true} />
          </button>
        )}
      </div>
    );
  };

  /* const Dashboard = () => {
    return (
      <>
        <div className={styles.dashboardWrapper}>
          <div className={styles.imgContainer}>
            <img src={HeadBanner.src} width="100%" />
          </div>
        </div>
      </>
    );
  }; */

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.blockContainer}>
          <div className={styles.top}>
            <span className={styles.logo}>
              {props?.fields?.data?.datasource?.sideNavHeaderLabel?.jsonValue?.value ??
                'Professional Dashboard'}
            </span>
          </div>
          <p className={styles.title}>{ListLabel}</p>
          <div className={styles.center}>
            <ul>
              <li className={styles.row}>
                <button
                  onClick={() => {
                    getReportedPosts();
                  }}
                >
                  <NextImage contentEditable={true} field={Flag} height={18} width={18}></NextImage>
                  <span>{'Reported Posts'}</span>
                </button>
              </li>
              <li className={styles.row}>
                <button
                  onClick={() => {
                    getReportedUserList();
                  }}
                >
                  <NextImage
                    contentEditable={true}
                    field={ReportedUsers}
                    height={20}
                    width={20}
                  ></NextImage>
                  <span>{'Reported Users'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <Button className={styles.backBtn} onClick={() => router.push('/')}>
        Back
      </Button> */}
      <div className={styles.left_column}>
        <SideNavbar />
      </div>
      <div className={styles.right_column}>
        {/* <div className={styles.right_upper_section}>{<Dashboard />}</div> */}
        <div
          className={
            reportPostList?.length > 0 ? styles.right_lower_section : styles.right_lower_section
          }
        >
          {showReportedPosts ? (
            reportPostList?.length > 0 ? (
              <div className={styles.reportedPostsContainer}>
                <ReportedPostList />
                <ReportPostPopup />
                <WarnUserForPostReportPopUp />
              </div>
            ) : (
              <span className={styles.reportedPostContainer}>
                <span className={styles.reportPostContainerHeader}>Getting Reported Posts ...</span>
                <Spinner animation="border" className={styles.spinner} />
              </span>
            )
          ) : (
            <></>
          )}
          {showReportedUserList ? (
            reportUserList?.length > 0 ? (
              <div className={styles.tableWrapper}>
                <ReportedUserListTable />
                <WarnUserPopUp />
                <SuspendUserPopup />
              </div>
            ) : (
              <span className={styles.reportedPostContainer}>
                <span className={styles.reportPostContainerHeader}>Getting Reported Users...</span>
                <Spinner animation="border" className={styles.spinner} />
              </span>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
