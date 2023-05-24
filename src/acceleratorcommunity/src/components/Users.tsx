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
  modifyHtml,
} from 'assets/helpers/helperFunctions';
import { getEmailTemplatesGraphqlQuery } from './Queries';
import { getAllReportUserCall, getReportedUserReportersDetailsCall } from 'src/API/reportUserCall';
import Skeleton from 'react-loading-skeleton';
import darkModeCss from '../assets/darkTheme.module.css';
import EventCard from './EventCard';
import PollCard from './PollCard';
import ViewPostDescription from './helperComponents/ViewPostDescription';
import { EventImage } from 'assets/helpers/constants';
import AxiosRequest from 'src/API/AxiosRequest';
import ToastNotification from './ToastNotification';

const EmailTemplateFolder = '02989F59-CFEB-4CC9-90FB-C0DA8A7FE7B5';
const WarnUserEmailTemplate = '16937DB73C124028877AAA49C0BE30CA';
const SuspendUserEmailTemplate = '71C5EDC72EB3474191904768EED4C591';
const WarnUserForPostEmailTemplate = 'A5A0180DB2824B4694FBDCC305157ED7';

type reportPostFields = {
  id: string;
  description: string;
  postType: string;
  createdBy: {
    objectId: string;
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
  };
  event: {
    title: string;
    description: string;
    eventDate: string;
    eventType: string;
  };
  poll: any;
  blog: {
    heading: string;
    imageUrl: string;
    description: string;
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
  const ReportedPostEmailSubject = 'Community Solutions | Reported Post Warning';
  const WarnUserEmailSubject = 'Community Solutions | Reported User';
  const SuspendUserAccountEmailSubject = 'Community Solutions | Account Suspension';
  const { userToken, setUserToken, darkMode } = {
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [reportedUserItem, setReportedUserItem] = useState<reportUserFields>();

  const [showNotification, setShowNofitication] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);

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

  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };

  const getReportedUserList = async () => {
    setIsDataLoaded(false);
    setShowReportedPosts(false);
    setShowReportedUserList(true);
    setReportedUserList([]);
    let response = await getAllReportUserCall(userToken);
    if (response?.success) {
      setIsDataLoaded(true);
      setReportedUserList(response?.data);
    }
  };

  const getReportedUserReporterDetails = async (event: any, userId: string, index: string) => {
    if (event?.target?.parentNode?.parentNode?.getAttribute('aria-expanded') === 'false') {
      setActiveAccordionIndex(index);
      setReportedUserReporterDetails([]);
      let response = await getReportedUserReportersDetailsCall(userToken, userId);
      if (response?.success) {
        setReportedUserReporterDetails(response?.data);
      }
    } else {
      setActiveAccordionIndex(undefined);
    }
  };

  const ReportedUserListTable = () => {
    return (
      <div className={styles.reportedUserListContainer}>
        <h3 className={`${styles.userListHeader} ${darkMode ? darkModeCss.text_green : ''}`}>
          {'Reported User List'}
        </h3>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <h6
              className={`${styles.tableField} ${styles.nameColumn} ${
                darkMode ? darkModeCss.text_green : ''
              }`}
            >
              Name
            </h6>
            <h6
              className={`${styles.tableField} ${styles.genderColumn} ${
                darkMode ? darkModeCss.text_green : ''
              }`}
            >
              Gender
            </h6>
            <h6
              className={`${styles.tableField} ${styles.emailColumn} ${
                darkMode ? darkModeCss.text_green : ''
              }`}
            >
              Email
            </h6>
            <h6
              className={`${styles.tableField} ${styles.phoneNumberColumn} ${
                darkMode ? darkModeCss.text_green : ''
              }`}
            >
              Phone Number
            </h6>
            <h6
              className={`${styles.tableField} ${styles.reasonsColumn} ${
                darkMode ? darkModeCss.text_green : ''
              }`}
            >
              Reason
            </h6>
            <h6 className={`${styles.tableField} ${darkMode ? darkModeCss.text_green : ''}`}>
              Action
            </h6>
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
                        <span
                          className={`${styles.tableField} ${styles.nameColumn} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          {item?.reportedUser?.firstName + ' ' + item?.reportedUser?.lastName}
                        </span>
                        <span
                          className={`${styles.tableField} ${styles.genderColumn} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          {item?.reportedUser?.gender || 'NA'}
                        </span>
                        <span
                          className={`${styles.tableField} ${styles.emailColumn} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          {item?.reportedUser?.objectId}
                        </span>
                        <span
                          className={`${styles.tableField} ${styles.phoneNumberColumn} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          {item?.reportedUser?.phoneNumber || 'NA'}
                        </span>
                        <span
                          className={`${styles.tableField} ${styles.reasonsColumn} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          {item?.reason || 'NA'}
                        </span>
                        <span
                          className={`${styles.tableField} ${styles.actionButtonsContainer} ${
                            darkMode ? darkModeCss.text_light : ''
                          }`}
                        >
                          <button
                            className={styles.actionButton}
                            onClick={() => {
                              setShowWarnUserPopup(true);
                              setReportedUserItem(item);
                            }}
                          >
                            Warning
                          </button>
                          <button
                            className={styles.actionButton}
                            onClick={() => {
                              setShowSuspendUserPopup(true);
                              setReportedUserItem(item);
                            }}
                          >
                            Suspension
                          </button>
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body
                      className={`${styles.accordionBody} ${darkMode ? darkModeCss.grey_3 : ''}`}
                    >
                      <div
                        className={`${styles.accordionBodyHeader} ${
                          darkMode ? darkModeCss.grey_3 : ''
                        }`}
                      >
                        <span
                          className={`${styles.accordionBodyName} ${
                            darkMode ? darkModeCss.text_green : ''
                          }`}
                        >
                          Name
                        </span>
                        <span
                          className={`${styles.accordionBodyGender} ${
                            darkMode ? darkModeCss.text_green : ''
                          }`}
                        >
                          Gender
                        </span>
                        <span
                          className={`${styles.accordionBodyEmail} ${
                            darkMode ? darkModeCss.text_green : ''
                          }`}
                        >
                          Email
                        </span>
                        <span
                          className={`${styles.accordionBodyPhone} ${
                            darkMode ? darkModeCss.text_green : ''
                          }`}
                        >
                          Phone Number
                        </span>
                        <span
                          className={`${styles.accordionBodyReason} ${
                            darkMode ? darkModeCss.text_green : ''
                          }`}
                        >
                          Reason
                        </span>
                      </div>
                      {reportedUserReporterDetails.map((reportedByItem, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.accordionBodyItem} ${
                              darkMode ? darkModeCss.grey_3 : ''
                            }`}
                          >
                            <span
                              className={`${styles.accordionBodyName} ${
                                darkMode ? darkModeCss.text_light : ''
                              }`}
                            >
                              {reportedByItem?.reportedBy.firstName +
                                ' ' +
                                reportedByItem?.reportedBy?.lastName}
                            </span>
                            <span
                              className={`${styles.accordionBodyGender} ${
                                darkMode ? darkModeCss.text_light : ''
                              }`}
                            >
                              {reportedByItem?.reportedBy?.gender || 'NA'}
                            </span>
                            <span
                              className={`${styles.accordionBodyEmail} ${
                                darkMode ? darkModeCss.text_light : ''
                              }`}
                            >
                              {reportedByItem?.reportedBy?.objectId || 'NA'}
                            </span>
                            <span
                              className={`${styles.accordionBodyPhone} ${
                                darkMode ? darkModeCss.text_light : ''
                              }`}
                            >
                              {reportedByItem?.reportedBy?.phoneNumber || 'NA'}
                            </span>
                            <span
                              className={`${styles.accordionBodyReason} ${
                                darkMode ? darkModeCss.text_light : ''
                              }`}
                            >
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

  const sendEmailToUser = (
    subject: string,
    userObjectId: string | undefined,
    emailBody: string | undefined
  ) => {
    const data = {
      subject: subject,
      toUsers: userObjectId,
      msgBody: emailBody,
      html: true,
    };

    AxiosRequest({
      method: 'POST',
      url: `https://accelerator-api-management.azure-api.net/notification-service/api/v1/send-email`,
      data: data,
    })
      .then((response: any) => {
        if (response?.success) {
          setShowNofitication(true);
          setToastSuccess(true);
          setToastMessage('email sent successfully');
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const getEmailTemplateBodyHtml = (
    emailTemplates: Promise<emailTemplate[]>,
    emailTemplate: string
  ) => {
    return emailTemplates.then((response: emailTemplate[]) => {
      const result = response
        .filter((item: emailTemplate) => {
          return item.id === emailTemplate;
        })
        .find((item) => item)?.fields[0];
      return result?.value;
    });
  };

  const replaceUserNamePlaceHolder = (emailBody: string) => {
    emailBody = emailBody.replace(
      '$username',
      `${reportedPostItem?.createdBy?.firstName + ' ' + reportedPostItem?.createdBy?.lastName}`
    );

    return emailBody;
  };

  const onSendWarningToUser = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(emailTemplates, WarnUserEmailTemplate).then((result: string) => {
      result = replaceUserNamePlaceHolder(result);
      sendEmailToUser(WarnUserEmailSubject, reportedUserItem?.reportedUser?.objectId, result);
    });

    setShowWarnUserPopup(false);
  };

  const onUserAccountSuspension = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(emailTemplates, SuspendUserEmailTemplate).then((result: string) => {
      result = replaceUserNamePlaceHolder(result);
      sendEmailToUser(
        SuspendUserAccountEmailSubject,
        reportedUserItem?.reportedUser?.objectId,
        result
      );
    });

    setShowSuspendUserPopup(false);
  };

  const onReportedPostSendWarning = () => {
    const emailTemplates = getEmailTemplates();
    getEmailTemplateBodyHtml(emailTemplates, WarnUserForPostEmailTemplate).then(
      (result: string) => {
        result = replaceUserNamePlaceHolder(result);
        const postUrl = window.location.origin + '/post?postId=' + reportedPostItem?.id;
        result = result?.replace('$postid', `<a href=${postUrl}>Reported Post</a>`);
        sendEmailToUser(ReportedPostEmailSubject, reportedPostItem?.createdBy?.objectId, result);
      }
    );
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
              className={styles.footerBtnCancel}
              variant="default"
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
              className={styles.footerBtnCancel}
              variant="default"
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
              className={styles.footerBtnCancel}
              variant="default"
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
    setIsDataLoaded(false);
    setReportedPostList([]);
    setShowReportedPosts(true);
    setShowReportedUserList(false);
    let response = await getAllReportPostCall(userToken);
    if (response?.success) {
      setIsDataLoaded(true);
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
          {reportedPostItem?.postType === 'TEXT_POST' ? (
            <div>
              <div
                style={
                  darkMode
                    ? {
                        background: '#323436',
                        height: '550px',
                        display: 'flex',
                        flexDirection: 'column',
                      }
                    : { height: '550px', display: 'flex', flexDirection: 'column' }
                }
              >
                <Modal.Header closeButton className={styles.reportPostModalHeader}>
                  <Modal.Title
                    className={`${styles.reportTitle} ${darkMode ? darkModeCss.text_green : ''}`}
                  >
                    {'Reported Post'}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.reportBody}>
                  <div className={styles.reportPostModal}>
                    <div className={styles.reportPostHeading}>
                      <div className={styles.reportPostHeaderLeft}>
                        <img
                          src={
                            reportedPostItem?.createdBy?.profilePictureUrl
                              ? reportedPostItem?.createdBy?.profilePictureUrl
                              : 'https://cdn-icons-png.flaticon.com/32/3177/3177440.png'
                          }
                          alt="User-Pic"
                          width="30px"
                        ></img>
                        <div className={styles.reportPostDetailContainer}>
                          <h4
                            className={`${styles.postOwner} ${
                              darkMode ? darkModeCss.text_green : ''
                            }`}
                          >
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
                    <div
                      className={`${styles.postContent} ${
                        darkMode ? styles.darkModeDescriptionReportedPost : ''
                      }`}
                    >
                      {reportedPostItem?.description
                        ? parser(modifyHtml(reportedPostItem?.description))
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
                      <div className={`${darkMode ? darkModeCss.text_light : ''}`}>
                        {'Fetching users who reported the post...'}
                      </div>
                      <Spinner
                        animation="border"
                        style={
                          darkMode
                            ? { marginLeft: '5px', height: '30px', filter: 'invert(1)' }
                            : { marginLeft: '5px', height: '30px' }
                        }
                      />
                    </>
                  ) : (
                    reportedPostReporterDetails.map((reportDetails) => {
                      return (
                        <>
                          <div className={styles.footerContainer}>
                            <div className={styles.footerFirstRow}>
                              <div
                                className={`${styles.footerRowHeader} ${
                                  darkMode ? darkModeCss.text_green : ''
                                }`}
                              >
                                Reported By :
                              </div>
                              <div className={styles.footerRowContent}>
                                <div
                                  className={`${darkMode ? darkModeCss.text_light : ''}`}
                                >{`${reportDetails?.reportedBy?.firstName} ${reportDetails?.reportedBy?.lastName}`}</div>
                                <div
                                  className={`${styles.reportedDate} ${
                                    darkMode ? darkModeCss.text_light : ''
                                  }`}
                                >
                                  {reportDetails?.reportedAt
                                    ? calculateTimeDifference(reportDetails?.reportedAt)
                                    : 'Recently'}
                                </div>
                              </div>
                            </div>
                            <div className={styles.footerSecondRow}>
                              <div
                                className={`${styles.footerRowHeader} ${
                                  darkMode ? darkModeCss.text_green : ''
                                }`}
                              >
                                Reason :
                              </div>
                              <div
                                className={`${styles.footerRowContent} ${
                                  darkMode ? darkModeCss.text_light : ''
                                }`}
                              >
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
              <div
                style={
                  darkMode
                    ? {
                        background: '#323436',
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                      }
                    : { height: '600px', display: 'flex', flexDirection: 'column' }
                }
              >
                <Modal.Header closeButton className={styles.reportPostModalHeader}>
                  <Modal.Title
                    className={`${styles.reportTitle} ${darkMode ? darkModeCss.text_green : ''}`}
                  >
                    {'Reported Post'}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.reportBody}>
                  <div className={styles.reportPostModal}>
                    <div className={styles.reportPostHeading}>
                      <div className={styles.reportPostHeaderLeft}>
                        <img
                          src={
                            reportedPostItem?.createdBy?.profilePictureUrl
                              ? reportedPostItem?.createdBy?.profilePictureUrl
                              : 'https://cdn-icons-png.flaticon.com/32/3177/3177440.png'
                          }
                          alt="User-Pic"
                          width="30px"
                        ></img>
                        <div className={styles.reportPostDetailContainer}>
                          <h4
                            className={`${styles.postOwner} ${
                              darkMode ? darkModeCss.text_green : ''
                            }`}
                          >
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
                    {/* <div
                      className={`${styles.postContent} ${
                        darkMode ? styles.darkModeDescriptionReportedPost : ''
                      }`}
                    >
                      {reportedPostItem?.description
                        ? parser(modifyHtml(reportedPostItem?.description))
                        : reportedPostItem?.description}
                    </div> */}
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
                    {reportedPostItem?.postType === 'EVENT' ? (
                      <>
                        <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
                          {parser(modifyHtml(reportedPostItem?.description))}
                        </div>
                        <EventCard
                          heading={reportedPostItem?.event?.title}
                          description={reportedPostItem?.event?.description}
                          date={reportedPostItem?.event?.eventDate}
                          eventType={reportedPostItem?.event?.eventType}
                          url={EventImage[reportedPostItem?.event?.eventType]}
                        />
                      </>
                    ) : reportedPostItem?.postType === 'POLL' ? (
                      <>
                        <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
                          {parser(modifyHtml(reportedPostItem?.description))}
                        </div>
                        {/* <PollCard pollPost={{ poll: item?.poll }} voteInAPoll={voteInAPoll} /> */}
                        <PollCard pollPost={{ poll: reportedPostItem?.poll }} />
                      </>
                    ) : reportedPostItem?.postType === 'BLOG_POST' ? (
                      <>
                        <div className={`blogHeading ${darkMode ? darkModeCss.text_green : ''}`}>
                          {reportedPostItem?.blog?.heading}
                        </div>
                        {reportedPostItem?.blog?.imageUrl && (
                          <img
                            style={{ width: '100%' }}
                            src={reportedPostItem?.blog?.imageUrl}
                            alt="Post Image"
                          />
                        )}
                        <ViewPostDescription description={reportedPostItem?.blog?.description} />
                      </>
                    ) : (
                      <ViewPostDescription description={reportedPostItem?.description} />
                    )}
                  </div>
                </Modal.Body>
                <Modal.Footer className={styles.reportPostModalFooter}>
                  {showSpinner ? (
                    <>
                      <div className={`${darkMode ? darkModeCss.text_light : ''}`}>
                        {'Fetching users who reported the post...'}
                      </div>
                      <Spinner
                        animation="border"
                        style={
                          darkMode
                            ? { marginLeft: '5px', height: '30px', filter: 'invert(1)' }
                            : { marginLeft: '5px', height: '30px' }
                        }
                      />
                    </>
                  ) : (
                    reportedPostReporterDetails.map((reportDetails) => {
                      return (
                        <>
                          <div className={styles.footerContainer}>
                            <div className={styles.footerFirstRow}>
                              <div
                                className={`${styles.footerRowHeader} ${
                                  darkMode ? darkModeCss.text_green : ''
                                }`}
                              >
                                Reported By :
                              </div>
                              <div className={styles.footerRowContent}>
                                <div
                                  className={`${darkMode ? darkModeCss.text_light : ''}`}
                                >{`${reportDetails?.reportedBy?.firstName} ${reportDetails?.reportedBy?.lastName}`}</div>
                                <div
                                  className={`${styles.reportedDate} ${
                                    darkMode ? darkModeCss.text_light : ''
                                  }`}
                                >
                                  {reportDetails?.reportedAt
                                    ? calculateTimeDifference(reportDetails?.reportedAt)
                                    : 'Recently'}
                                </div>
                              </div>
                            </div>
                            <div className={styles.footerSecondRow}>
                              <div
                                className={`${styles.footerRowHeader} ${
                                  darkMode ? darkModeCss.text_green : ''
                                }`}
                              >
                                Reason :
                              </div>
                              <div
                                className={`${styles.footerRowContent} ${
                                  darkMode ? darkModeCss.text_light : ''
                                }`}
                              >
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
          <h3 className={`${styles.reportPostTitle} ${darkMode ? darkModeCss.text_green : ''}`}>
            {reportPostList?.length > 0 ? 'Reported Posts' : ''}
          </h3>
        </div>
        {reportPostList.slice(0, numberOfReportedItemsToShow).map((item) => {
          return (
            <div
              key={item?.id}
              className={`${styles.reportPostContainer} ${darkMode ? darkModeCss.grey_1 : ''}`}
            >
              <div className={styles.reportPostHeading}>
                <div className={styles.reportPostHeaderLeft}>
                  <img
                    className={styles.postUserImage}
                    src={
                      item?.createdBy?.profilePictureUrl
                        ? item?.createdBy?.profilePictureUrl
                        : 'https://cdn-icons-png.flaticon.com/32/3177/3177440.png'
                    }
                    alt="User-Pic"
                  ></img>
                  <div className={styles.reportPostDetailContainer}>
                    <h5 className={`${styles.postOwner} ${darkMode ? darkModeCss.text_green : ''}`}>
                      <span>{item?.createdBy?.firstName}</span>
                      &nbsp;
                      <span>{item?.createdBy?.lastName}</span>
                    </h5>
                    <h6
                      className={`${styles.postCreateDate} ${
                        darkMode ? darkModeCss.text_light : ''
                      }`}
                    >
                      <img
                        width="9px"
                        src="https://cdn-icons-png.flaticon.com/32/2088/2088617.png"
                        alt="post time"
                        style={
                          darkMode
                            ? { filter: 'invert(1)', marginRight: '4px' }
                            : { opacity: '0.4', marginRight: '4px' }
                        }
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
                      style={{ backgroundColor: 'transparent', border: 'none', width: '50px' }}
                    >
                      <button
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
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

                    <Dropdown.Menu
                      className={`${styles.dropdownMenu} ${darkMode ? darkModeCss.grey_3 : ''}`}
                    >
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        href={`/post?postId=${item.id}`}
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
                          <div
                            className={`${styles.reportContainerHeader} ${
                              darkMode ? darkModeCss.text_light : ''
                            }`}
                          >
                            View Original Post
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item
                        className={styles.dropdownItem}
                        onClick={() => {
                          setReportedPostItem(item);
                          setShowWarnUserForPostReportPopUp(true);
                        }}
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
                          <div
                            className={`${styles.reportContainerHeader} ${
                              darkMode ? darkModeCss.text_light : ''
                            }`}
                          >
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
                          <div
                            className={`${styles.reportContainerHeader} ${
                              darkMode ? darkModeCss.text_light : ''
                            }`}
                          >
                            Reported Post Details
                          </div>
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
                {item?.postType === 'EVENT' ? (
                  <>
                    <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
                      {parser(modifyHtml(item?.description))}
                    </div>
                    <EventCard
                      heading={item?.event?.title}
                      description={item?.event?.description}
                      date={item?.event?.eventDate}
                      eventType={item?.event?.eventType}
                      url={EventImage[item?.event?.eventType]}
                    />
                  </>
                ) : item?.postType === 'POLL' ? (
                  <>
                    <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
                      {parser(modifyHtml(item?.description))}
                    </div>
                    {/* <PollCard pollPost={{ poll: item?.poll }} voteInAPoll={voteInAPoll} /> */}
                    <PollCard pollPost={{ poll: item?.poll }} />
                  </>
                ) : item?.postType === 'BLOG_POST' ? (
                  <>
                    <div className={`blogHeading ${darkMode ? darkModeCss.text_green : ''}`}>
                      {item?.blog?.heading}
                    </div>
                    {item?.blog?.imageUrl && (
                      <img style={{ width: '100%' }} src={item?.blog?.imageUrl} alt="Post Image" />
                    )}
                    <ViewPostDescription description={item?.blog?.description} />
                  </>
                ) : (
                  <ViewPostDescription description={item?.description} />
                )}
                {/* <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
                  {parser(modifyHtml(item?.description))}
                </div> */}
              </div>
            </div>
          );
        })}
        {reportPostList === undefined ||
        numberOfReportedItemsToShow >= reportPostList?.length ? null : (
          <button
            className={`${styles.seeMoreReportedPostBtn} ${darkMode ? darkModeCss.grey_3 : ''}`}
            onClick={() => setNumberOfReportedItemsToShow(numberOfReportedItemsToShow + 5)}
          >
            <div>
              <span className={`${darkMode ? darkModeCss.text_light : ''}`}>See more</span>
            </div>
            <NextImage field={DropArrow} editable={true} />
          </button>
        )}
      </div>
    );
  };

  const SideNavbar = () => {
    return (
      <div className={styles.sidenavbar}>
        <div className={styles.blockContainer}>
          <div className={styles.top}>
            <span className={`${styles.logo} ${darkMode ? darkModeCss.text_green : ''}`}>
              {props?.fields?.data?.datasource?.sideNavHeaderLabel?.jsonValue?.value ??
                'Professional Dashboard'}
            </span>
          </div>
          <p className={`${styles.title} ${darkMode ? darkModeCss.text_light : ''}`}>{ListLabel}</p>
          <div className={styles.center}>
            <ul>
              <li className={styles.row}>
                <button
                  style={darkMode ? { background: 'transparent' } : {}}
                  onClick={() => {
                    getReportedPosts();
                  }}
                >
                  <NextImage
                    className={`${darkMode ? darkModeCss.invertFilter : ''}`}
                    contentEditable={true}
                    field={Flag}
                    height={18}
                    width={18}
                  ></NextImage>
                  <span className={`${darkMode ? darkModeCss.text_light : ''}`}>
                    {'Reported Posts'}
                  </span>
                </button>
              </li>
              <li className={styles.row}>
                <button
                  style={darkMode ? { background: 'transparent' } : {}}
                  onClick={() => {
                    getReportedUserList();
                  }}
                >
                  <NextImage
                    className={`${darkMode ? darkModeCss.invertFilter : ''}`}
                    contentEditable={true}
                    field={ReportedUsers}
                    height={20}
                    width={20}
                  ></NextImage>
                  <span className={`${darkMode ? darkModeCss.text_light : ''}`}>
                    {'Reported Users'}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const skeletonDummyArr = [1, 2, 3, 4, 5, 6, 7];
  const ReportedPostSkeleton = () => {
    return (
      <div>
        <div className={styles.reportPostHeader}>
          <h3 className={`${styles.reportPostTitle} ${darkMode ? darkModeCss.text_green : ''}`}>
            {'Reported Posts'}
          </h3>
        </div>
        <div className={styles.reportedPostSkeletonItemContainer}>
          {/* {skeletonDummyArr.map((_item) => {
            return <Skeleton width={100 + '%'} height={90} />;
          })} */}

          {skeletonDummyArr.map((_item) => {
            return (
              <>
                <div className={styles.reportPostHeading}>
                  <div className={styles.reportPostHeaderLeftSkeleton}>
                    <Skeleton height={60} width={50} circle={true} />
                    <div className={styles.reportPostDetailContainerSkeleton}>
                      <Skeleton width={95 + '%'} height={90} />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  };

  const ReportedUserSkeleton = () => {
    return (
      <div>
        <h3 className={`${styles.userListHeader} ${darkMode ? darkModeCss.text_green : ''}`}>
          {'Reported User List'}
        </h3>
        <div className={styles.tableContainer}>
          <div className={styles.reportedPostSkeletonItemContainer}>
            {skeletonDummyArr.map((_item) => {
              return <Skeleton width={100 + '%'} height={50} />;
            })}
          </div>
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
        <div className={`${styles.right_lower_section} ${darkMode ? darkModeCss.grey_3 : ''}`}>
          {showReportedPosts ? (
            isDataLoaded ? (
              <div
                className={`${styles.reportedPostsContainer} ${darkMode ? darkModeCss.grey_3 : ''}`}
              >
                <ReportedPostList />
                <ReportPostPopup />
                <WarnUserForPostReportPopUp />
              </div>
            ) : (
              <span className={styles.reportedPostSkeletonContainer}>
                <ReportedPostSkeleton />
              </span>
            )
          ) : (
            <></>
          )}
          {showReportedUserList ? (
            isDataLoaded ? (
              <div className={styles.tableWrapper}>
                <ReportedUserListTable />
                <WarnUserPopUp />
                <SuspendUserPopup />
              </div>
            ) : (
              <span className={styles.reportedPostSkeletonContainer}>
                <ReportedUserSkeleton />
              </span>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </div>
  );
};

export default Users;
