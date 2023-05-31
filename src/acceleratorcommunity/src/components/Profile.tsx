import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import updateUuserCall from 'src/API/updateUser';
import CameraImg from '../assets/images/camera1.png';
import PersonalImg from '../assets/images/personalInformation.png';
import ContactImg from '../assets/images/contactDetails.png';
import EducationImg from '../assets/images/educationDetails.png';
import WorkImg from '../assets/images/workDetails.png';
import EventsImg from '../assets/images/events.png';
import BlogsImg from '../assets/images/blogs.png';
import PeersImg from '../assets/images/peers.png';
import UserImg from '../assets/images/blockedUser.png';
import ChangePasswordIcon from '../assets/images/ChangePasswordIcon.png';
import Image from 'next/image';

import Banner from './Banner';
import UploadProfilePictureCall from 'src/API/uploadProfilePictureCall';
import PersaonalDetailsOfUser from './PersaonalDetailsOfUser';
import ContactDetails from './ContactDetails';
import EductionDetails from './EductionDetails';
import UserWorkExperience from './UserWorkExperience';
import React from 'react';
import DotLoader from './DotLoader';
import EventListing from './helperComponents/EventListing';
import BlogListing from './helperComponents/BlogListing';
import PeerFriendList from './PeerFriendList';
import BlockedUser from './BlockedUser';
import ChangePassword from './ChangePassword';
import { ComponentProps } from 'lib/component-props';
import AxiosRequest from 'src/API/AxiosRequest';
import { getUserUrl, updateUser } from '../assets/helpers/constants';
import { containsHtml } from '../assets/helpers/helperFunctions';
import GenericNotificationContext from 'src/Context/GenericNotificationContext';

// import { decryptString } from 'assets/helpers/EncryptDecrypt';

type User = {
  firstName: string | undefined;
  areaOfExpertise: string | undefined;
  lastName: string | undefined;
  profession: string | undefined;
  yearsOfExperience: number | undefined;
  designation: string | undefined;
  domain: string | undefined;
  summary: string | undefined;
  role: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  alternateEmail: string | undefined;
  dob: string | undefined;
  speciality: string | undefined;
  middleName: string | undefined;
  country: string | undefined;
  cityt: string | undefined;
  Address: string | undefined;
  State: string | undefined;
  ResidingFrom: string | undefined;
  LeftAt: string | undefined;
  websiteOptions: string | undefined;
  interests: string[];
  hobby: string[];
  skills: string | undefined;
  workDetails: string | undefined;
  school: string | undefined;
  degree: string | undefined;
  fieldOfStudy: string | undefined;
  bannerImgUrl: string | undefined;
  qualifications: any[];
  language: string[];
  gender: string | undefined;
  age: number | undefined;
  placeOfPractice: PlaceOfPractice[];
  profilePictureUrl: string | undefined;
  websiteUrl: string | undefined;
  userResidenceInfo: any;
};

type PlaceOfPractice = {
  city: string | undefined;
  country: string | undefined;
  designation: string | undefined;
  employeeId: string | undefined;
  joiningDate: string | undefined;
  joiningYear: string | undefined;
  latitude: string | undefined | null;
  leavingDate: string | undefined;
  orgName: string | undefined;
  pincode: string | undefined;
  presentlyWorkingHere: boolean | undefined;
  socialUrl: string | undefined;
  state: string | undefined;
  wid: string | undefined;
};

type educationDetails = {
  city: string | undefined;
  country: string | undefined;
  endDate: string | undefined;
  grade: string | undefined;
  instituteName: string | undefined;
  percentage: number | undefined;
  pincode: string | undefined;
  remarks: string | undefined;
  standard: string | undefined;
  startDate: string | undefined;
  state: string | undefined;
  qid: string | undefined;
};

type personalDetails = {
  firstName: string | undefined;
  lastName: string | undefined;
  middleName: string | undefined;
  areaOfExpertise: string | undefined;
  yearsOfExperience: number | undefined;
  designation: string | undefined;
  role: string | undefined;
  speciality: string | undefined;
  domain: string | undefined;
  age: number | undefined;
  gender: string | undefined;
  websiteUrl: string | undefined;
  dob: string | undefined;
};

type ProfileProps = ComponentProps & {
  fields: {
    data: {
      datasource: {
        heading: {
          jsonValue: Field<string>;
        };
        blockedUsers: {
          jsonValue: Field<string>;
        };
        blogs: {
          jsonValue: Field<string>;
        };
        contactDetails: {
          jsonValue: Field<string>;
        };
        educationDetails: {
          jsonValue: Field<string>;
        };
        events: {
          jsonValue: Field<string>;
        };
        peers: {
          jsonValue: Field<string>;
        };
        workDetails: {
          jsonValue: Field<string>;
        };
        personalInfo: {
          jsonValue: Field<string>;
        };
        age: {
          jsonValue: Field<string>;
        };
        gender: {
          jsonValue: Field<string>;
        };
        dateOfBirth: {
          jsonValue: Field<string>;
        };
        experience: {
          jsonValue: Field<string>;
        };
        designation: {
          jsonValue: Field<string>;
        };
        profession: {
          jsonValue: Field<string>;
        };
        domain: {
          jsonValue: Field<string>;
        };
        speciality: {
          jsonValue: Field<string>;
        };
        website: {
          jsonValue: Field<string>;
        };
        summary: {
          jsonValue: Field<string>;
        };
        hobby: {
          jsonValue: Field<string>;
        };
        languagesLabel: {
          jsonValue: Field<string>;
        };
        interest: {
          jsonValue: Field<string>;
        };
        email: {
          jsonValue: Field<string>;
        };
        altEmail: {
          jsonValue: Field<string>;
        };
        phoneNumber: {
          jsonValue: Field<string>;
        };
        address: {
          jsonValue: Field<string>;
        };
        blockedUsersList: {
          jsonValue: Field<string>;
        };
        componentHeading: {
          jsonValue: Field<string>;
        };
        changePassword: {
          jsonValue: Field<string>;
        };
        formHeading: {
          jsonValue: Field<string>;
        };
        currentPassword: {
          jsonValue: Field<string>;
        };
        newPassword: {
          jsonValue: Field<string>;
        };
        confirmPassword: {
          jsonValue: Field<string>;
        };
        changePasswordBtn: {
          jsonValue: Field<string>;
        };
      };
    };
  };
};

const Profile = (props: ProfileProps): JSX.Element => {
  const { userToken, objectId, darkMode, setUserObject, userObject } = {
    ...useContext(WebContext),
  };

  const { setMessage, setShowNotification, setError, setSuccess } = {
    ...useContext(GenericNotificationContext),
  };

  const containsOnlySpaces = (string: any) => {
    if (string.trim() !== '' || string === '') {
      setPlaceOfPractice({ ...placeOfPractice, orgName: string });
    }
    if (string.length > 0) {
      const value = string.replace(/\s/g, ''); // Remove whitespace using regex
      console.log('string.length', value);
      setPlaceOfPractice({ ...placeOfPractice, orgName: value });
    }
    return string?.trim()?.length < 0 || string?.trim()?.length > 0;
  };

  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const regexForCheckingSpecialCharacter = /^[a-zA-Z0-9 ]*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [errorState, setErrorState] = useState<any>({
    firstName: false,
    lastName: false,
    profession: false,
    yearsOfExperience: false,
    designation: false,
    domain: false,
    summary: false,
    role: false,
    email: false,
    phoneNumber: false,
    alternateEmail: false,
    dob: false,
    speciality: false,
    middleName: false,
    gender: false,
    instituteName: false,
    instituteNameNumber: false,
    orgName: false,
    residingFrom: false,
    phoneNoLength: false,
    city: false,
    address: false,
    state: false,
    country: false,
    grade: false,
    standard: false,
    empId: false,
    eduCity: false,
    eduState: false,
    eduCountry: false,
    eduPincode: false,
    eduPincodeLength: false,
    urlError: false,
    websiteUrlError: false,
  });

  // =================================================================================== Personal Information =======================================================================================

  const [personalInfoDetails, setPersonalInfoDetails] = useState<any>();
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState<personalDetails>({
    firstName: '',
    lastName: '',
    middleName: '',
    areaOfExpertise: '',
    yearsOfExperience: 0,
    designation: '',
    role: '',
    speciality: '',
    domain: '',
    age: 0,
    gender: '',
    websiteUrl: '',
    dob: '',
  });

  const handleShow1 = () => {
    setShowForm1(true);
  };

  const submitPersonalInfoDetails = () => {
    if (
      errorState?.firstName === false &&
      errorState?.lastName === false &&
      errorState.gender === false &&
      personalInfo?.gender !== undefined &&
      errorState?.speciality === false &&
      errorState?.role === false
    ) {
      AxiosRequest({
        data: personalInfoDetails,
        url: `${updateUser}${objectId}`,
        method: 'PUT',
      }).then((response: any) => {
        if (response?.success === true) {
          getUser();
          setStateValue(true);
          setMessage('Data updated successfully');
          setSuccess(true);
          handleClose1();
        } else if (response?.data?.success === false) {
          setError(true);
          if (
            response?.data?.errorMessages[0] === null ||
            response?.data?.errorMessages[0] === ' ' ||
            response?.data?.errorMessages[0] === undefined
          ) {
            setMessage('Something went wrong');
          } else {
            setMessage(response?.data?.errorMessages[0]);
          }
        }

        setShowNotification(true);
      });
    }
  };
  useEffect(() => {
    if (personalInfoDetails !== undefined) {
      submitPersonalInfoDetails();
    }
  }, [personalInfoDetails]);
  const submitPersonalDetails = () => {
    setPersonalInfoDetails({ ...personalInfo });
  };

  function setDobValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, dob: true });
      setPersonalInfo({ ...personalInfo, dob: val });
    } else {
      setErrorState({ ...errorState, dob: false });
      setPersonalInfo({ ...personalInfo, dob: val });
    }
  }

  function setGender(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, gender: true });
      setPersonalInfo({ ...personalInfo, gender: val });
    } else if (val === undefined) {
      setErrorState({ ...errorState, gender: true });
      setPersonalInfo({ ...personalInfo, gender: val });
    } else {
      setErrorState({ ...errorState, gender: false });
      setPersonalInfo({ ...personalInfo, gender: val });
    }
  }

  function setProfessionValue(val: any) {
    if (val?.length <= 30) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              const finalValue = val.trimStart();
              setPersonalInfo({ ...personalInfo, areaOfExpertise: finalValue });
            }
          }
        }
      }
    }
  }
  function setExperienceValue(val: any) {
    setPersonalInfo({ ...personalInfo, yearsOfExperience: val });
  }
  function setDesignationValue(val: any) {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              const finalValue = val.trimStart();
              setPersonalInfo({ ...personalInfo, designation: finalValue });
            }
          }
        }
      }
    }
  }
  function setRoleValue(val: any) {
    if (val?.length <= 30) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, role: true });
                setPersonalInfo({ ...personalInfo, role: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, role: false });
                setPersonalInfo({ ...personalInfo, role: finalValue });
              }
            }
          }
        }
      }
    }
  }
  function setDomainValue(val: any) {
    if (val?.length <= 30) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                // setErrorState({ ...errorState, firstName: true });
                setPersonalInfo({ ...personalInfo, domain: val });
              } else {
                const finalValue = val.trimStart();
                // setErrorState({ ...errorState, finalValue: false });
                setPersonalInfo({ ...personalInfo, domain: finalValue });
              }
            }
          }
        }
      }
    }
  }

  function setSummaryValue(val: any) {
    if (val.trim() !== '' || val === '') {
      if (val?.length > 200) {
        setErrorState({ ...errorState, summary: true });
        setEditUserData({ ...editUserData, summary: val });
      } else {
        const finalValue = val.trimStart();

        setErrorState({ ...errorState, summary: false });
        setEditUserData({ ...editUserData, summary: finalValue });
      }
    }
  }

  function setFirstName(val: any) {
    if (val?.length <= 10) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, firstName: true });
                setPersonalInfo({ ...personalInfo, firstName: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, firstName: false });
                setPersonalInfo({ ...personalInfo, firstName: finalValue });
              }
            }
          }
        }
      }
    }
  }
  function setMiddleName(val: any) {
    if (val?.length <= 10) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, middleName: true });
                setPersonalInfo({ ...personalInfo, middleName: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, middleName: false });
                setPersonalInfo({ ...personalInfo, middleName: finalValue });
              }
            }
          }
        }
      }
    }
  }

  function setLastName(val: any) {
    if (val?.length <= 10) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, lastName: true });
                setPersonalInfo({ ...personalInfo, lastName: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, lastName: false });
                setPersonalInfo({ ...personalInfo, lastName: finalValue });
              }
            }
          }
        }
      }
    }
  }

  function setSpecialityValue(val: any) {
    if (val?.length <= 30) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, speciality: true });
                setPersonalInfo({ ...personalInfo, speciality: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, speciality: false });
                setPersonalInfo({ ...personalInfo, speciality: finalValue });
              }
            }
          }
        }
      }
    }
  }

  function setWebSiteUrl(val: any) {
    if (urlRegex.test(val)) {
      setPersonalInfo({ ...personalInfo, websiteUrl: val });
      setErrorState({ ...errorState, websiteUrlError: false });
    } else {
      setPersonalInfo({ ...personalInfo, websiteUrl: val });
      setErrorState({ ...errorState, websiteUrlError: true });
    }
  }

  const handleAddLanguage = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            const finalValue = val.trimStart();
            setEditUserData({ ...editUserData, language: finalValue });
          }
        }
      }
    }
  };
  const handleAddHobby = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            const finalValue = val.trimStart();
            setEditUserData({ ...editUserData, hobby: finalValue });
          }
        }
      }
    }
  };
  const handleIntrest = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            const finalValue = val.trimStart();
            setEditUserData({ ...editUserData, interests: finalValue });
          }
        }
      }
    }
  };

  // =================================================================================== Location =======================================================================================

  type userLocationType = {
    city: string | undefined;
    address: string | undefined;
    state: string | undefined;
    country: string | undefined;
    residingFrom: string | undefined;
    leftAt: string | undefined | null;
  };

  type userLocationObj = {
    userResidenceInfo: userLocationType;
  };

  const [userLocationState, setUserLocationState] = useState<userLocationType>({
    city: '',
    address: '',
    state: '',
    country: '',
    residingFrom: '',
    leftAt: null,
  });
  const [locationObj, setLocationObj] = useState<userLocationObj>();
  const [showImage, setShowImage] = useState(true);

  const [openLocationModalState, setOpenLocationModalState] = useState(false);
  const checkboxRef = React.useRef<any>(null);
  useEffect(() => {
    if (locationObj !== undefined) {
      if (
        errorState?.city === false &&
        errorState?.address === false &&
        errorState?.state === false &&
        errorState?.country === false &&
        errorState?.residingFrom === false
      ) {
        AxiosRequest({
          data: locationObj,
          url: `${updateUser}${objectId}`,
          method: 'PUT',
        }).then((response: any) => {
          if (response) {
            if (response?.success === true) {
              // setTempUserData(tempArray);
              getUser();
              setStateValue(true);
              setSuccess(true);
              setMessage('Data updated successfully');
            } else if (response?.success === false) {
              setError(true);
              if (
                response?.data?.errorMessages[0] === null ||
                response?.data?.errorMessages[0] === ' ' ||
                response?.data?.errorMessages[0] === undefined
              ) {
                setMessage('Something went wrong');
              } else {
                setMessage(response?.data?.errorMessages[0]);
              }
            }
            setShowNotification(true);
          }
        });
      }
    }
  }, [locationObj]);
  useEffect(() => {
    if (
      userLocationState?.residingFrom !== null &&
      userLocationState?.residingFrom !== undefined &&
      userLocationState?.residingFrom !== '' &&
      userLocationState?.leftAt !== null &&
      userLocationState?.leftAt !== undefined &&
      userLocationState?.leftAt != ''
    ) {
      if (new Date(userLocationState?.leftAt) < new Date(userLocationState?.residingFrom)) {
        setUserLocationState({ ...userLocationState, leftAt: userLocationState?.residingFrom });
      }
    }
  }, [userLocationState?.residingFrom]);
  const openLocationMoadl = () => {
    setOpenLocationModalState(true);
  };
  const closeLocationMoadl = () => {
    setOpenLocationModalState(false);
  };
  const setCountry = (val: any) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, country: true });
                setUserLocationState({ ...userLocationState, country: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, country: false });
                setUserLocationState({ ...userLocationState, country: finalValue });
              }
            }
          }
        }
      }
    }
  };
  const setAddress = (val: any) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, address: true });
                setUserLocationState({ ...userLocationState, address: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, address: false });
                setUserLocationState({ ...userLocationState, address: finalValue });
              }
            }
          }
        }
      }
    }
  };
  const setState = (val: any) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, state: true });
                setUserLocationState({ ...userLocationState, state: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, state: false });
                setUserLocationState({ ...userLocationState, state: finalValue });
              }
            }
          }
        }
      }
    }
  };
  const setResidingFrom = (val: any) => {
    if (val === '') {
      setErrorState({ ...errorState, residingFrom: true });
      setUserLocationState({ ...userLocationState, residingFrom: val });
    } else {
      setErrorState({ ...errorState, residingFrom: false });
      setUserLocationState({ ...userLocationState, residingFrom: val });
    }
  };
  const setLeftAt = (val: any) => {
    setUserLocationState({ ...userLocationState, leftAt: val });
  };
  const setCity = (val: any) => {
    if (val?.length <= 30) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, city: true });
                setUserLocationState({ ...userLocationState, city: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, city: false });
                setUserLocationState({ ...userLocationState, city: finalValue });
              }
            }
          }
        }
      }
    }
  };
  function setEmailValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, email: true });
      setEditUserData({ ...editUserData, email: val });
    } else {
      const finalValue = val.trimStart();
      setErrorState({ ...errorState, email: false });
      setEditUserData({ ...editUserData, email: finalValue });
    }
  }
  function setPhoneNoValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, phoneNumber: true, phoneNoLength: false });
      setEditUserData({ ...editUserData, phoneNumber: val });
    } else if (val?.length > 10) {
      setErrorState({ ...errorState, phoneNumber: false, phoneNoLength: true });
      setEditUserData({ ...editUserData, phoneNumber: val });
    } else {
      setErrorState({ ...errorState, phoneNumber: false, phoneNoLength: false });
      setEditUserData({ ...editUserData, phoneNumber: val });
    }
  }
  function setAltEmailValue(val: any) {
    if (emailRegex.test(val)) {
      setErrorState({ ...errorState, validAltEmail: true });
    } else {
      setErrorState({ ...errorState, validAltEmail: false });
    }
    if (val === editUserData?.email) {
      setErrorState({ ...errorState, alternateEmail: true });
      setEditUserData({ ...editUserData, alternateEmail: val });
    } else {
      setErrorState({ ...errorState, alternateEmail: false });
      setEditUserData({ ...editUserData, alternateEmail: val });
    }
  }
  const handleSubmtLocation = (e: any) => {
    e.preventDefault();
    setLocationObj({ userResidenceInfo: userLocationState });
  };

  const [showEducationModal, setEducationModal] = useState(false);

  const handleOpenForEducation = () => {
    setEducationModal(true);
  };
  const handleCloseForEducation = () => {
    setEducationModal(false);
  };
  const editWorkFormData = (val: any) => {
    // console.log('editWorkFormData', val);
    const data = tempUserData.placeOfPractice?.filter((data: any) => {
      return data?.wid === val;
    });
    setPlaceOfPractice({ ...data[0] });
    handleOpenWorkModal();
  };
  // Place of Practice

  const [placeOfPractice, setPlaceOfPractice] = useState<PlaceOfPractice>({
    city: '',
    country: '',
    designation: '',
    employeeId: '',
    joiningDate: '',
    joiningYear: '',
    latitude: null,
    leavingDate: '',
    orgName: '',
    pincode: '',
    presentlyWorkingHere: false,
    socialUrl: '',
    state: '',
    wid: '',
  });

  type arrayOfPlaceOfPratice = {
    userWorkDetails: PlaceOfPractice[];
  };

  type arrayofEducation = {
    usersQualification: educationDetails[];
  };

  const [openWorkModal, setOpenWorkModal] = useState(false);
  const [placeOfPracticeDetails, setPlaceOfPracticeDetails] = useState<arrayOfPlaceOfPratice>();
  useEffect(() => {
    if (placeOfPracticeDetails !== undefined) {
      submitWork();
    }
  }, [placeOfPracticeDetails]);

  useEffect(() => {
    if (
      placeOfPractice?.joiningDate !== undefined &&
      placeOfPractice?.joiningDate !== '' &&
      placeOfPractice?.joiningDate !== null
    ) {
      setPlaceOfPractice({ ...placeOfPractice, leavingDate: placeOfPractice?.joiningDate });
      const year = placeOfPractice?.joiningDate?.split('-')[0];
      setPlaceOfPractice({ ...placeOfPractice, joiningYear: year });
    }
  }, [placeOfPractice?.joiningDate]);

  useEffect(() => {
    if (
      checkboxRef?.current?.checked !== undefined &&
      checkboxRef?.current?.checked !== null &&
      checkboxRef?.current?.checked === true
    ) {
      setPlaceOfPractice({ ...placeOfPractice, leavingDate: '' });
    }
  }, [checkboxRef?.current?.checked]);

  const submitWork = () => {
    if (
      errorState?.orgName === false &&
      errorState?.empId === false &&
      placeOfPracticeDetails?.userWorkDetails[0].orgName !== '' &&
      placeOfPracticeDetails?.userWorkDetails[0].employeeId !== '' &&
      placeOfPracticeDetails !== undefined
    ) {
      updateUuserCall(userToken, objectId, placeOfPracticeDetails).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            // setTempUserData(tempArray);
            setStateValue(true);
            setSuccess(true);
            setMessage('Data updated successfully');
          } else {
            setError(true);
            setMessage('Something went wrong');
          }
          setShowNotification(true);
        }
      });
    } else if (
      placeOfPracticeDetails?.userWorkDetails[0].orgName === '' &&
      placeOfPracticeDetails?.userWorkDetails[0].employeeId === ''
    ) {
      setErrorState({ ...errorState, orgName: true });
      setErrorState({ ...errorState, empId: true });
    } else if (placeOfPracticeDetails?.userWorkDetails[0].orgName === '') {
      setErrorState({ ...errorState, orgName: true });
    } else if (placeOfPracticeDetails?.userWorkDetails[0].employeeId === '') {
      setErrorState({ ...errorState, empId: true });
    } else {
      setErrorState({ ...errorState, orgName: false });
      setErrorState({ ...errorState, empId: false });
    }
  };

  const setOrgName = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            if (val === '') {
              setErrorState({ ...errorState, orgName: true });
              setPlaceOfPractice({ ...placeOfPractice, orgName: val });
            } else {
              const finalValue = val.trimStart();
              setErrorState({ ...errorState, orgName: false });
              setPlaceOfPractice({ ...placeOfPractice, orgName: finalValue });
            }
          }
        }
      }
    }
  };

  const setCityOfWork = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            if (val === '') {
              setErrorState({ ...errorState, city: true });
              setPlaceOfPractice({ ...placeOfPractice, city: val });
            } else {
              const finalValue = val.trimStart();
              setErrorState({ ...errorState, city: false });
              setPlaceOfPractice({ ...placeOfPractice, city: finalValue });
            }
          }
        }
      }
    }
  };

  const setCountryOfWork = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            if (val === '') {
              setErrorState({ ...errorState, country: true });
              setPlaceOfPractice({ ...placeOfPractice, country: val });
            } else {
              const finalValue = val.trimStart();
              setErrorState({ ...errorState, country: false });
              setPlaceOfPractice({ ...placeOfPractice, country: finalValue });
            }
          }
        }
      }
    }
  };

  const setDesignation = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            if (val === '') {
              setErrorState({ ...errorState, designation: true });
              setPlaceOfPractice({ ...placeOfPractice, designation: val });
            } else {
              const finalValue = val.trimStart();
              setErrorState({ ...errorState, designation: false });
              setPlaceOfPractice({ ...placeOfPractice, designation: finalValue });
            }
          }
        }
      }
    }
  };

  const setStateForWork = (val: string) => {
    const regex = /\d/;
    if (!containsHtml(val)) {
      if (val.trim() !== '' || val === '') {
        if (regexForCheckingSpecialCharacter.test(val)) {
          if (!regex.test(val)) {
            if (val === '') {
              // setErrorState({ ...errorState, designation: true });
              setPlaceOfPractice({ ...placeOfPractice, state: val });
            } else {
              const finalValue = val.trimStart();
              // setErrorState({ ...errorState, designation: false });
              setPlaceOfPractice({ ...placeOfPractice, state: finalValue });
            }
          }
        }
      }
    }
  };
  const setPincodeForWork = (val: string) => {
    if (regexForCheckingSpecialCharacter.test(val)) {
      if (val?.length <= 6) {
        setPlaceOfPractice({ ...placeOfPractice, pincode: val });
      }
    }
  };
  const setSocialUrl = (val: string) => {
    if (urlRegex.test(val)) {
      setPlaceOfPractice({ ...placeOfPractice, socialUrl: val });
      setErrorState({ ...errorState, urlError: false });
    } else {
      setPlaceOfPractice({ ...placeOfPractice, socialUrl: val });
      setErrorState({ ...errorState, urlError: true });
    }
  };
  const setLeavingDate = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, leavingDate: val });
  };
  const setJoiningDate = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, joiningDate: val });
  };
  const setLatitude = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, latitude: val });
  };
  const setStillWorkingHere = () => {
    setPlaceOfPractice({ ...placeOfPractice, presentlyWorkingHere: checkboxRef?.current?.checked });
  };
  const setEmployeeId = (val: string) => {
    if (regexForCheckingSpecialCharacter.test(val)) {
      if (val === '') {
        setErrorState({ ...errorState, empId: true });
        setPlaceOfPractice({ ...placeOfPractice, employeeId: val });
      } else {
        setErrorState({ ...errorState, empId: false });

        setPlaceOfPractice({ ...placeOfPractice, employeeId: val });
      }
    }
  };

  const addNewWorkDetail = () => {
    setPlaceOfPractice({
      city: '',
      country: '',
      designation: '',
      employeeId: '',
      joiningDate: '',
      joiningYear: '',
      latitude: null,
      leavingDate: '',
      orgName: '',
      pincode: '',
      presentlyWorkingHere: false,
      socialUrl: '',
      state: '',
      wid: '',
    });
    handleOpenWorkModal();
  };
  const handleOpenWorkModal = () => {
    setOpenWorkModal(true);
  };
  const handleCloseWorkModal = () => {
    setOpenWorkModal(false);
  };
  const submitWorkModal = () => {
    setPlaceOfPracticeDetails({ userWorkDetails: [placeOfPractice] });
  };

  // =====================================================================================Education==================================================================================
  const [education, setEducation] = useState<educationDetails>({
    city: '',
    country: '',
    endDate: '',
    grade: '',
    instituteName: '',
    percentage: 0,
    pincode: '',
    remarks: '',
    standard: '',
    startDate: '',
    state: '',
    qid: '',
  });

  const [educationDetails, setEducationDetails] = useState<arrayofEducation>();
  useEffect(() => {
    if (educationDetails !== undefined) {
      submitEducation();
    }
  }, [educationDetails]);

  useEffect(() => {
    if (
      education?.startDate !== '' &&
      education?.startDate !== null &&
      education?.startDate !== undefined &&
      education?.endDate !== '' &&
      education?.endDate !== null &&
      education?.endDate !== undefined
    ) {
      if (new Date(education?.startDate) > new Date(education?.endDate)) {
        setEducation({ ...education, endDate: education?.startDate });
      }
    }
  }, [education?.startDate]);

  const submitEducation = () => {
    if (
      errorState.instituteName === false &&
      errorState.standard === false &&
      errorState.grade === false &&
      errorState.eduCity === false &&
      errorState.eduState === false &&
      errorState.eduCountry === false &&
      errorState.eduPincode === false &&
      errorState.eduPincodeLength === false &&
      educationDetails?.usersQualification[0].grade !== '' &&
      educationDetails?.usersQualification[0].standard !== ' ' &&
      educationDetails?.usersQualification[0].instituteName !== ''
    ) {
      updateUuserCall(userToken, objectId, educationDetails).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            setStateValue(true);
            setSuccess(true);
            setMessage('Data updated successfully');
          } else {
            setError(true);
            setMessage('Something went wrong');
          }
          setShowNotification(true);
        }
      });
    }
  };
  const handleSaveEduaction = () => {
    setEducationDetails({ usersQualification: [education] });

    setShowForm2(false);
  };

  const setInstituteName = (val: string) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, instituteName: true });
                setEducation({ ...education, instituteName: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, instituteName: false });
                setEducation({ ...education, instituteName: finalValue });
              }
            }
          }
        }
      }
    }
  };

  const setCityOfEducation = (val: string) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, eduCity: true });
                setEducation({ ...education, city: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, eduCity: false });
                setEducation({ ...education, city: finalValue });
              }
            }
          }
        }
      }
    }
  };

  const setCountryOfEducation = (val: any) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, eduCountry: true });
                setEducation({ ...education, country: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, eduCountry: false });
                setEducation({ ...education, country: finalValue });
              }
            }
          }
        }
      }
    }
  };

  const setEndDate = (val: string) => {
    setEducation({ ...education, endDate: val });
  };
  const Grade = (val: string) => {
    if (val === '') {
      setErrorState({ ...errorState, grade: true });
      setEducation({ ...education, grade: val });
    } else {
      setErrorState({ ...errorState, grade: false });

      setEducation({ ...education, grade: val });
    }
  };
  const setPercentage = (val: number) => {
    const numberString = val.toString();
    if (numberString?.length <= 3) {
      setEducation({ ...education, percentage: val });
    }
  };
  const setPincode = (val: string) => {
    if (val?.length <= 6) {
      if (val === '') {
        setErrorState({ ...errorState, eduPincode: true, eduPincodeLength: false });
        setEducation({ ...education, pincode: val });
      } else if (!containsOnlySpaces(val)) {
        setErrorState({ ...errorState, eduPincodeLength: false, eduPincode: true });
        setEducation({ ...education, pincode: val });
      } else if (val?.length < 6) {
        setErrorState({ ...errorState, eduPincodeLength: true, eduPincode: false });
        setEducation({ ...education, pincode: val });
      } else {
        setErrorState({ ...errorState, eduPincodeLength: false, eduPincode: false });
        setEducation({ ...education, pincode: val });
      }
    }
  };
  const setRemarks = (val: string) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              setEducation({ ...education, remarks: val });
            }
          }
        }
      }
    }
  };
  const setStandard = (val: string) => {
    if (val === '') {
      setErrorState({ ...errorState, standard: true });
      setEducation({ ...education, standard: val });
    } else {
      setErrorState({ ...errorState, standard: false });

      setEducation({ ...education, standard: val });
    }
  };
  const setStartDate = (val: string) => {
    setEducation({ ...education, startDate: val });
  };
  const setStateOfEducation = (val: string) => {
    if (val?.length <= 50) {
      const regex = /\d/;
      if (!containsHtml(val)) {
        if (val.trim() !== '' || val === '') {
          if (regexForCheckingSpecialCharacter.test(val)) {
            if (!regex.test(val)) {
              if (val === '') {
                setErrorState({ ...errorState, eduState: true });
                setEducation({ ...education, state: val });
              } else {
                const finalValue = val.trimStart();
                setErrorState({ ...errorState, eduState: false });
                setEducation({ ...education, state: finalValue });
              }
            }
          }
        }
      }
    }
  };

  const [editUserData, setEditUserData] = useState<any>({
    firstName: '',
    lastName: '',
    profession: '',
    yearsOfExperience: 0,
    designation: '',
    domain: '',
    summary: '',
    role: '',
    email: '',
    phoneNumber: '',
    alternateEmail: '',
    dob: '',
    speciality: '',
    middleName: '',
    country: '',
    cityt: '',
    websiteOptions: '',
    interests: '',
    hobby: '',
    language: '',
    skills: '',
    workDetails: '',
    school: '',
    Address: '',
    degree: '',
    fieldOfStudy: '',
    bannerImgUrl: '',
    qualifications: [],
    gender: '',
    age: 0,
    profilePictureUrl: '',
    State: '',
    ResidingFrom: '',
    userResidenceInfo: locationObj,
    websiteUrl: '',
    LeftAt: '',
  });

  const [tempUserData, setTempUserData] = useState<User>({
    firstName: '',
    lastName: '',
    profession: '',
    yearsOfExperience: 0,
    designation: '',
    domain: '',
    summary: '',
    role: '',
    email: '',
    phoneNumber: '',
    alternateEmail: '',
    dob: '',
    speciality: '',
    middleName: '',
    country: '',
    cityt: '',
    websiteOptions: '',
    interests: [],
    hobby: [],
    language: [],
    skills: '',
    workDetails: '',
    school: '',
    degree: '',
    fieldOfStudy: '',
    bannerImgUrl: '',
    qualifications: [],
    gender: '',
    age: 0,
    profilePictureUrl: '',
    Address: '',
    State: '',
    ResidingFrom: '',
    LeftAt: '',
    placeOfPractice: [],
    areaOfExpertise: '',
    websiteUrl: '',
    userResidenceInfo: {},
  });

  const addEducationDetails = () => {
    setEducation({
      city: '',
      country: '',
      endDate: '',
      grade: '',
      instituteName: '',
      percentage: 0,
      pincode: '',
      remarks: '',
      standard: '',
      startDate: '',
      state: '',
      qid: '',
    });

    handleOpenForEducation();
  };

  const editEducationmData = (id: any) => {
    const data = tempUserData.qualifications?.filter((data: any) => {
      return data?.qid === id;
    });
    setEducation({ ...data[0] });
    handleOpenForEducation();
    setErrorState({
      ...errorState,
      eduCity: false,
      eduState: false,
      eduCountry: false,
      eduCountryNumber: false,
      eduPincode: false,
    });
  };

  const locationData = () => {
    const data = tempUserData.userResidenceInfo?.filter((data: any) => {
      return data?.leftAt === null;
    });
    setUserLocationState({ ...data[0] });
    openLocationMoadl();
  };

  const queryParamShowTab = router.query?.showTab?.toString();

  //Modal Variables
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [languageForm, setLanguageForm] = useState(false);
  const [hobbyForm, setHobbyForm] = useState(false);

  const [intrestForm, setIntrestForm] = useState(false);

  const [showForm3, setShowForm3] = useState(false);
  const [showStateValue, setStateValue] = useState(true);
  const [details, setDetails] = useState<any>(queryParamShowTab ?? 'personal');
  const [language, setLanguage] = useState<any>([]);
  const [hobby, setHobby] = useState<any>([]);

  const calculateAge = (dateOfBirth: string): number => {
    const dob: Date = new Date(dateOfBirth);
    const now: Date = new Date();

    // Calculate the difference in years
    let age: number = now.getFullYear() - dob.getFullYear();

    // Check if the current month and day are before the birth month and day
    if (
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };

  // const genericRequest = () => {

  // }

  const [userInterests, setUserInterests] = useState<any>([]);

  const addLanguage = (e: any) => {
    e.preventDefault();
    if (
      !language?.includes(editUserData.language) &&
      editUserData.language !== undefined &&
      editUserData.language !== ''
    ) {
      setLanguage([...language, editUserData.language]);
    }
  };
  const addHobby = (e: any) => {
    e.preventDefault();
    if (
      !hobby?.includes(editUserData.hobby) &&
      editUserData.hobby !== undefined &&
      editUserData.hobby !== ''
    ) {
      setHobby([...hobby, editUserData.hobby]);
    }
  };
  const addInterest = (e: any) => {
    e.preventDefault();
    if (
      !userInterests?.includes(editUserData.interests) &&
      editUserData.interests !== undefined &&
      editUserData.interests !== ''
    ) {
      setUserInterests([...userInterests, editUserData.interests]);
    }
  };
  const [image, setImage] = useState<any>({ preview: '', raw: '' });
  const [imageBanner, setImageBanner] = useState<any>({ preview: '', raw: '' });

  const handleClose1 = () => setShowForm1(false);

  const submitForm1 = (e: any) => {
    e.preventDefault();
    if (!errorState.firstName && !errorState.lastName) {
      let tempArray = { ...editUserData };
      updateUuserCall(userToken, objectId, tempArray).then((response) => {
        if (response) {
          if (response?.data?.success) {
            setTempUserData(tempArray);
            setStateValue(true);
            setSuccess(true);
            setMessage('Data updated successfully');
          } else {
            setError(true);
            setMessage('Something went wrong');
          }
          setShowNotification(true);
        }
      });
      setShowForm1(false);
    }
  };

  const submitForm2 = () => {
    if (errorState.summary === false) {
      let tempArray = { ...editUserData };
      AxiosRequest({
        data: { summary: tempArray?.summary },
        url: `${updateUser}${objectId}`,
        method: 'PUT',
      }).then((response: any) => {
        if (response) {
          if (response?.success === true) {
            getUser();
            setStateValue(true);
            setSuccess(true);
          } else if (response?.data?.success === false) {
            if (
              response?.data?.errorMessages !== null &&
              response?.data?.errorMessages !== undefined
            ) {
              setMessage(response?.data?.errorMessages[0]);
            } else {
              setMessage('Something went wrong');
            }
            setError(true);
          }
          setShowNotification(true);
        }
      });
      setShowForm2(false);
    }
  };

  const languageFormData = () => {
    let tempArray = {
      language: language,
    };

    AxiosRequest({
      data: tempArray,
      url: `${updateUser}${objectId}`,
      method: 'PUT',
    }).then((response: any) => {
      if (response) {
        if (response?.success) {
          getUser();
          setStateValue(true);
          setSuccess(true);
          setMessage('Data updated successfully');
          handleCloseLanguageForm();
        } else if (response?.data?.success === false) {
          if (
            response?.data?.errorMessages !== null &&
            response?.data?.errorMessages !== undefined
          ) {
            setMessage(response?.data?.errorMessages[0]);
          } else {
            setMessage('Something went wrong');
          }
          setError(true);
        }
        setShowNotification(true);
      }
    });
  };

  const hobbyFormData = () => {
    let tempArray = {
      hobby: hobby,
    };
    AxiosRequest({
      data: tempArray,
      url: `${updateUser}${objectId}`,
      method: 'PUT',
    }).then((response: any) => {
      if (response) {
        if (response?.success) {
          getUser();
          setStateValue(true);
          setSuccess(true);
          setMessage('Data updated successfully');
          handleCloseFormForHobby();
        } else if (response?.data?.success === false) {
          if (
            response?.data?.errorMessages !== null &&
            response?.data?.errorMessages !== undefined
          ) {
            setMessage(response?.data?.errorMessages[0]);
          } else {
            setMessage('Something went wrong');
          }
          setError(true);
        }
        setShowNotification(true);
      }
    });
  };

  const IntrestFormData = () => {
    let tempArray = {
      interests: userInterests,
    };

    AxiosRequest({
      data: tempArray,
      url: `${updateUser}${objectId}`,
      method: 'PUT',
    }).then((response: any) => {
      if (response) {
        if (response?.success) {
          getUser();
          setStateValue(true);
          setSuccess(true);
          setMessage('Data updated successfully');
        } else if (response?.data?.success === false) {
          if (
            response?.data?.errorMessages !== null &&
            response?.data?.errorMessages !== undefined
          ) {
            setMessage(response?.data?.errorMessages[0]);
          } else {
            setMessage('Something went wrong');
          }
          setError(true);
        }
        setShowNotification(true);
      }
    });
    setIntrestForm(false);
  };

  const submitForm3 = () => {
    if (editUserData?.email === editUserData?.alternateEmail) {
      setErrorState({ ...errorState, alternateEmail: true });
    }
    if (
      !errorState.phoneNumber &&
      !errorState.dob &&
      !errorState.email &&
      editUserData?.email !== editUserData?.alternateEmail
    ) {
      const obj = {
        email: editUserData?.email,
        alternateEmail: editUserData?.alternateEmail,
        phoneNumber: editUserData?.phoneNumber,
      };
      AxiosRequest({
        data: obj,
        url: `${updateUser}${objectId}`,
        method: 'PUT',
      }).then((response: any) => {
        if (response) {
          if (response?.success) {
            getUser();
            setStateValue(true);
            setSuccess(true);
            setMessage('Data updated successfully');
          } else if (response?.data?.success === false) {
            if (
              response?.data?.errorMessages !== null &&
              response?.data?.errorMessages !== undefined
            ) {
              setMessage(response?.data?.errorMessages[0]);
            } else {
              setMessage('Something went wrong');
            }
            setError(true);
          }
          setShowNotification(true);
        }
      });
      setShowForm3(false);
    }
  };

  const handleCloseForm2 = () => {
    setShowForm2(false);
  };
  const handleCloseLanguageForm = () => {
    setLanguageForm(false);
  };
  const handleShowForm2 = () => setShowForm2(true);
  const handleShowFormForLanguage = () => setLanguageForm(true);
  const handleShowFormForHobby = () => setHobbyForm(true);
  const handleCloseFormForHobby = () => setHobbyForm(false);

  const handleShowFormForIntrest = () => setIntrestForm(true);
  const handleCloseFormForIntrest = () => setIntrestForm(false);

  const handleCloseForm3 = () => {
    setShowForm3(false);
  };
  const handleShowForm3 = () => setShowForm3(true);
  const filterHobby = (hob: string) => {
    const data = hobby?.filter((hobb: any) => {
      return hobb !== hob;
    });
    setHobby(data);
  };

  const filterLanguage = (lag: string) => {
    const data = language?.filter((lang: any) => {
      return lang !== lag;
    });
    setLanguage(data);
  };
  const filterInterest = (intrest: any) => {
    const data = userInterests?.filter((data: any) => {
      return intrest !== data;
    });
    setUserInterests(data);
  };

  useEffect(() => {
    if (personalInfo?.dob !== null && personalInfo?.dob !== '' && personalInfo?.dob !== undefined) {
      setPersonalInfo({ ...personalInfo, age: calculateAge(personalInfo?.dob) });
    }
  }, [personalInfo?.dob]);

  useEffect(() => {
    if (
      userToken !== undefined &&
      objectId !== undefined &&
      userToken !== null &&
      objectId !== null &&
      userToken !== '' &&
      objectId !== ''
    ) {
      getUser();
    }
  }, [userToken, objectId]);

  const getUser = () => {
    AxiosRequest({
      url: `${getUserUrl}${objectId}`,
      method: 'GET',
    }).then((response: any) => {
      if (response?.success) {
        setTempUserData({
          firstName: response?.data?.firstName,
          lastName: response?.data?.lastName,
          profession: response?.data?.profession,
          yearsOfExperience: response?.data?.yearsOfExperience,
          designation: response?.data?.designation,
          domain: response?.data?.domain,
          summary: response?.data?.summary,
          role: response?.data?.role,
          email: response?.data?.email,
          phoneNumber: response?.data?.phoneNo,
          alternateEmail: response?.data?.alternateEmail,
          dob: response?.data?.dob,
          speciality: response?.data?.speciality,
          middleName: response?.data?.middleName,
          country: response?.data?.userResidenceInfo?.country,
          cityt: response?.data?.userResidenceInfo?.city,
          websiteOptions: response?.data?.websiteOptions,
          interests: response?.data?.interests,
          hobby: response?.data?.hobby,
          language: response?.data?.language,
          skills: response?.data?.skills,
          workDetails: response?.data?.workDetails,
          school: response?.data?.school,
          degree: response?.data?.degree,
          fieldOfStudy: response?.data?.fieldOfStudy,
          bannerImgUrl: response?.data?.bannerImgUrl,
          qualifications: response?.data?.qualifications,
          gender: response?.data?.gender,
          age: response?.data?.age,
          profilePictureUrl: response?.data?.profilePictureUrl,
          userResidenceInfo: response?.data?.userResidenceInfo,
          placeOfPractice: response?.data?.placeOfPractice,
          areaOfExpertise: response?.data?.areaOfExpertise,
          websiteUrl: response?.data?.websiteUrl,
          Address: response?.data?.userResidenceInfo?.address,
          State: response?.data?.userResidenceInfo?.state,
          ResidingFrom: response?.data?.userResidenceInfo?.residingFrom,
          LeftAt: response?.data?.userResidenceInfo?.leftAt,
        });
        setPersonalInfo({
          firstName: response?.data?.firstName,
          lastName: response?.data?.lastName,
          middleName: response?.data?.middleName,
          areaOfExpertise: response?.data?.areaOfExpertise,
          yearsOfExperience: response?.data?.yearsOfExperience,
          designation: response?.data?.designation,
          role: response?.data?.role,
          speciality: response?.data?.speciality,
          domain: response?.data?.domain,
          age: response?.data?.age,
          gender: response?.data?.gender,
          websiteUrl: response?.data?.websiteUrl,
          dob: response?.data?.dob,
        });
        setUserLocationState(response?.data?.userResidenceInfo);
        if (response?.data?.hobby === undefined) {
          setHobby([]);
        } else {
          setHobby(response?.data?.hobby);
        }
        if (response?.data?.language === undefined) {
          setLanguage([]);
        } else {
          setLanguage(response?.data?.language);
        }
        if (response?.data?.interests === undefined) {
          setUserInterests([]);
        } else {
          setUserInterests(response?.data?.interests);
        }
        setEditUserData({
          firstName: response?.data?.firstName,
          lastName: response?.data?.lastName,
          profession: response?.data?.profession,
          yearsOfExperience: response?.data?.yearsOfExperience,
          designation: response?.data?.designation,
          domain: response?.data?.domain,
          summary: response?.data?.summary,
          role: response?.data?.role,
          email: response?.data?.email,
          phoneNumber: response?.data?.phoneNo,
          alternateEmail: response?.data?.alternateEmail,
          dob: response?.data?.dob,
          speciality: response?.data?.speciality,
          middleName: response?.data?.middleName,
          country: response?.data?.userResidenceInfo?.country,
          cityt: response?.data?.userResidenceInfo?.city,
          Address: response?.data?.userResidenceInfo?.address,
          State: response?.data?.userResidenceInfo?.state,
          ResidingFrom: response?.data?.userResidenceInfo?.residingFrom,
          LeftAt: response?.data?.userResidenceInfo?.leftAt,
          websiteOptions: response?.data?.websiteOptions,
          skills: response?.data?.skills,
          workDetails: response?.data?.workDetails,
          school: response?.data?.school,
          degree: response?.data?.degree,
          fieldOfStudy: response?.data?.fieldOfStudy,
          bannerImgUrl: response?.data?.bannerImgUrl,
          qualifications: response?.data?.qualifications,
          gender: response?.data?.gender,
          age: response?.data?.age,
          profilePictureUrl: response?.profilePictureUrl,
          userResidenceInfo: response?.data?.userResidenceInfo,
          placeOfPractice: response?.data?.placeOfPractice,
          areaOfExpertise: response?.data?.areaOfExpertise,
          websiteUrl: response?.data?.websiteUrl,
        });
      } else if (response?.data?.success === false) {
        if (response?.data?.errorMessages !== null && response?.data?.errorMessages !== undefined) {
          setMessage(response?.data?.errorMessages[0]);
        } else {
          setMessage('Something went wrong');
        }
        setError(true);
        setShowNotification(true);
      }
    });
  };

  const handlePersonalDetails = (val: string) => {
    setDetails(val);
  };

  const handleChange = (e: any) => {
    const files = e?.target?.files;
    setShowImage(false);
    if (files?.length > 0) {
      UploadProfilePictureCall(files[0], userToken).then((response: any) => {
        if (response?.status === 200) {
          setImage({
            preview: URL?.createObjectURL(files[0]),
          });
          if (setUserObject !== undefined) {
            setUserObject({ ...userObject, profilePictureUrl: URL?.createObjectURL(files[0]) });
          }
          setMessage('Image Updated successfully');
          setSuccess(true);
          setShowImage(true);
        } else {
          setMessage('Something Went Wrong');
          setError(true);
          setShowImage(false);
        }
        setShowNotification(true);
      });
    }
  };

  const handleChangeForBanner = (e: any) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      setImageBanner({
        preview: URL?.createObjectURL(files[0]),
      });
    }
  };

  if (tempUserData?.middleName !== undefined) {
    var name = tempUserData.firstName?.concat(
      ' ' + tempUserData?.middleName + ' ' + tempUserData?.lastName
    );
  } else {
    var name = tempUserData.firstName?.concat(' ' + tempUserData?.lastName);
  }
  return (
    <>
      <div className={`parentContainerForProfile ${darkMode && 'darkMode_bg'}`}>
        <div className={`rightContainerForProfile ${darkMode && 'darkMode_bgChild'}`}>
          <div className="imageContainer">
            {showImage ? (
              <img
                className="profilePic"
                src={image?.preview !== '' ? image?.preview : tempUserData?.profilePictureUrl}
              />
            ) : (
              <DotLoader />
            )}
            <label className="imageUpload" htmlFor="uploadbutton">
              <div className="cameraContainer">
                <img className="camera" src={CameraImg?.src} alt="camera_icon" />
              </div>
              <input
                id="uploadbutton"
                className="fileUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
          <div className="nameContainerForProfile">
            <div className={`nameContainer ${darkMode && 'darkMode_greenColor'}`}>
              <h3> {name}</h3>
            </div>
            <div className="profrssionContainer">
              <span className={`${darkMode && 'darkMode_textColor'}`}>
                {showStateValue && tempUserData?.role}
              </span>
            </div>
          </div>
          <div className="detailsContainer">
            <div
              className={
                details === 'personal'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('personal')}
            >
              <Image src={PersonalImg} height={15} width={15} alt="Personal Information" />
              <Text
                field={
                  props?.fields?.data?.datasource?.personalInfo?.jsonValue
                    ? props?.fields?.data?.datasource?.personalInfo?.jsonValue
                    : {
                        value: 'Personal Information',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'contactDetails'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('contactDetails')}
            >
              <Image src={ContactImg} height={15} width={15} alt="Contact Details" />
              <Text
                field={
                  props?.fields?.data?.datasource?.contactDetails?.jsonValue
                    ? props?.fields?.data?.datasource?.contactDetails?.jsonValue
                    : {
                        value: 'Contact Details',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'educationDetails'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('educationDetails')}
            >
              <Image src={EducationImg} height={15} width={15} alt="Education Details" />
              <Text
                field={
                  props?.fields?.data?.datasource?.educationDetails?.jsonValue
                    ? props?.fields?.data?.datasource?.educationDetails?.jsonValue
                    : {
                        value: 'Education Details',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'work'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('work')}
            >
              <Image src={WorkImg} height={15} width={15} alt="Work Details" />
              <Text
                field={
                  props?.fields?.data?.datasource?.workDetails?.jsonValue
                    ? props?.fields?.data?.datasource?.workDetails?.jsonValue
                    : {
                        value: 'Work Details',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'events'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('events')}
            >
              <Image src={EventsImg} height={15} width={15} alt="Events" />
              <Text
                field={
                  props?.fields?.data?.datasource?.events?.jsonValue
                    ? props?.fields?.data?.datasource?.events?.jsonValue
                    : {
                        value: 'Events',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'blogs'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('blogs')}
            >
              <Image src={BlogsImg} height={15} width={15} alt="Blogs" />
              <Text
                field={
                  props?.fields?.data?.datasource?.blogs?.jsonValue
                    ? props?.fields?.data?.datasource?.blogs?.jsonValue
                    : {
                        value: 'Blogs',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'peers'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('peers')}
            >
              <Image src={PeersImg} height={15} width={15} alt="Peers" />
              <Text
                field={
                  props?.fields?.data?.datasource?.peers?.jsonValue
                    ? props?.fields?.data?.datasource?.peers?.jsonValue
                    : {
                        value: 'Peers',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'blockedusers'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('blockedusers')}
            >
              <Image src={UserImg} height={15} width={15} alt="Blocked Users" />
              <Text
                field={
                  props?.fields?.data?.datasource?.blockedUsers?.jsonValue
                    ? props?.fields?.data?.datasource?.blockedUsers?.jsonValue
                    : {
                        value: 'Blocked Users',
                      }
                }
              />
            </div>
            <div
              className={
                details === 'changepassword'
                  ? `personalDetails personalDetailsActive ${darkMode && 'darkMode_textBgActive'} ${
                      darkMode && 'personalDetailsActiveImage'
                    }`
                  : `personalDetails ${darkMode && 'darkMode_textBg'} ${
                      darkMode && 'personalDetailsImage'
                    }`
              }
              onClick={() => handlePersonalDetails('changepassword')}
            >
              <Image src={ChangePasswordIcon} height={15} width={15} alt="Blocked Users" />
              <Text
                field={
                  props?.fields?.data?.datasource?.changePassword?.jsonValue
                    ? props?.fields?.data?.datasource?.changePassword?.jsonValue
                    : {
                        value: 'Change Password',
                      }
                }
              />
            </div>
          </div>
        </div>
        <div className={`leftContainerForProfile ${darkMode && 'darkMode_bgChild'}`}>
          {!(details == 'events' || details == 'blogs') && (
            <div className={`leftContainerForProfileHeadng ${darkMode && 'darkMode_textColor'}`}>
              <Text
                field={
                  props?.fields?.data?.datasource?.componentHeading?.jsonValue
                    ? props?.fields?.data?.datasource?.componentHeading?.jsonValue
                    : {
                        value: ' Edit Profile',
                      }
                }
              />
            </div>
          )}
          <div className={`infoContainerForProfile ${darkMode && 'darkMode_textBg'}`}>
            {details === 'personal' ? (
              <div className="profileInfo">
                {' '}
                {tempUserData && (
                  <PersaonalDetailsOfUser
                    setWebSiteUrl={setWebSiteUrl}
                    setDobValue={setDobValue}
                    personalInfo={personalInfo}
                    filterHobby={filterHobby}
                    setSpecialityValue={setSpecialityValue}
                    setLastName={setLastName}
                    setProfessionValue={setProfessionValue}
                    setDesignationValue={setDesignationValue}
                    setRoleValue={setRoleValue}
                    setDomainValue={setDomainValue}
                    handleClose1={handleClose1}
                    submitForm1={submitForm1}
                    setExperienceValue={setExperienceValue}
                    setMiddleName={setMiddleName}
                    setFirstName={setFirstName}
                    tempUserData={tempUserData}
                    editUserData={editUserData}
                    showForm1={showForm1}
                    errorState={errorState}
                    setGender={setGender}
                    handleShow1={handleShow1}
                    handleCloseForm2={handleCloseForm2}
                    handleShowForm2={handleShowForm2}
                    handleShowFormForLanguage={handleShowFormForLanguage}
                    submitForm2={submitForm2}
                    languageFormData={languageFormData}
                    setSummaryValue={setSummaryValue}
                    showForm2={showForm2}
                    languageForm={languageForm}
                    handleCloseLanguageForm={handleCloseLanguageForm}
                    handleAddLanguage={handleAddLanguage}
                    handleAddHobby={handleAddHobby}
                    IntrestFormData={IntrestFormData}
                    intrestForm={intrestForm}
                    handleShowFormForIntrest={handleShowFormForIntrest}
                    handleIntrest={handleIntrest}
                    addLanguage={addLanguage}
                    language={language}
                    addHobby={addHobby}
                    hobby={hobby}
                    addInterest={addInterest}
                    userInterests={userInterests}
                    hobbyFormData={hobbyFormData}
                    submitPersonalDetails={submitPersonalDetails}
                    handleShowFormForHobby={handleShowFormForHobby}
                    handleCloseFormForHobby={handleCloseFormForHobby}
                    hobbyForm={hobbyForm}
                    filterLanguage={filterLanguage}
                    handleCloseFormForIntrest={handleCloseFormForIntrest}
                    filterInterest={filterInterest}
                    labels={props?.fields?.data?.datasource}
                  />
                )}
              </div>
            ) : details === 'contactDetails' ? (
              <div className="profileInfo">
                {' '}
                <ContactDetails
                  setAltEmailValue={setAltEmailValue}
                  handleCloseForm3={handleCloseForm3}
                  setEmailValue={setEmailValue}
                  setPhoneNoValue={setPhoneNoValue}
                  submitForm3={submitForm3}
                  showStateValue={showStateValue}
                  tempUserData={tempUserData}
                  editUserData={editUserData}
                  handleShowForm3={handleShowForm3}
                  showForm3={showForm3}
                  errorState={errorState}
                  setCity={setCity}
                  setCountry={setCountry}
                  setAddress={setAddress}
                  setState={setState}
                  setResidingFrom={setResidingFrom}
                  setLeftAt={setLeftAt}
                  closeLocationMoadl={closeLocationMoadl}
                  openLocationMoadl={openLocationMoadl}
                  handleSubmtLocation={handleSubmtLocation}
                  openLocationModalState={openLocationModalState}
                  userResidenceInfo={tempUserData.userResidenceInfo}
                  labels={props?.fields?.data?.datasource}
                  locationData={locationData}
                  userLocationState={userLocationState}
                />
              </div>
            ) : details === 'educationDetails' ? (
              <div className="profileInfo">
                <EductionDetails
                  handleClose1={handleClose1}
                  qualifications={tempUserData.qualifications}
                  specificPlaceOfWork={education}
                  submitForm1={submitForm1}
                  showStateValue={showStateValue}
                  tempUserData={tempUserData}
                  editUserData={editUserData}
                  showForm1={showForm1}
                  errorState={errorState}
                  setInstituteName={setInstituteName}
                  setCityOfEducation={setCityOfEducation}
                  setPercentage={setPercentage}
                  Grade={Grade}
                  setEndDate={setEndDate}
                  setCountryOfEducation={setCountryOfEducation}
                  addEducationDetails={addEducationDetails}
                  setStateOfEducation={setStateOfEducation}
                  setStartDate={setStartDate}
                  setStandard={setStandard}
                  setRemarks={setRemarks}
                  setPincode={setPincode}
                  handleSaveEduaction={handleSaveEduaction}
                  educationDetails={educationDetails}
                  handleShow1={handleShow1}
                  editEducationmData={editEducationmData}
                  showEducationModal={showEducationModal}
                  handleOpenForEducation={handleOpenForEducation}
                  handleCloseForEducation={handleCloseForEducation}
                  labels={props?.fields?.data?.datasource}
                  date={education}
                />
              </div>
            ) : details === 'work' ? (
              <div className="profileInfo">
                <UserWorkExperience
                  placeOfPractice={tempUserData.placeOfPractice}
                  specificPlaceOfWork={placeOfPractice}
                  handleOpenWorkModal={handleOpenWorkModal}
                  addNewWorkDetail={addNewWorkDetail}
                  openWorkModal={openWorkModal}
                  handleCloseWorkModal={handleCloseWorkModal}
                  submitWorkModal={submitWorkModal}
                  errorState={errorState}
                  setSocialUrl={setSocialUrl}
                  setPincodeForWork={setPincodeForWork}
                  setStateForWork={setStateForWork}
                  setDesignation={setDesignation}
                  setCountryOfWork={setCountryOfWork}
                  setCityOfWork={setCityOfWork}
                  setOrgName={setOrgName}
                  setEmployeeId={setEmployeeId}
                  setStillWorkingHere={setStillWorkingHere}
                  setLatitude={setLatitude}
                  setJoiningDate={setJoiningDate}
                  // setJoiningYear={setJoiningYear}
                  setLeavingDate={setLeavingDate}
                  editWorkFormData={editWorkFormData}
                  checkboxRef={checkboxRef}
                  userLocationState={userLocationState}
                  labels={props?.fields?.data?.datasource}
                  placeOfPracticeState={placeOfPractice}
                />
              </div>
            ) : details === 'events' ? (
              <div className="profileInfo">
                <EventListing />
              </div>
            ) : details === 'blogs' ? (
              <div className="profileInfo">
                <BlogListing />
              </div>
            ) : details === 'peers' ? (
              <div className="profileInfo">
                <PeerFriendList {...props} />
              </div>
            ) : details === 'blockedusers' ? (
              <div className="profileInfo">
                <BlockedUser
                  showInProfilePage={true}
                  heading={props?.fields?.data?.datasource?.blockedUsersList}
                />
              </div>
            ) : details === 'changepassword' ? (
              <div className="profileInfo">
                <ChangePassword
                  formHeading={props?.fields?.data?.datasource?.formHeading}
                  currentPasswordLabel={props?.fields?.data?.datasource?.currentPassword}
                  newPasswordLabel={props?.fields?.data?.datasource?.newPassword}
                  confirmPasswordLabel={props?.fields?.data?.datasource?.confirmPassword}
                  changePasswordBtn={props?.fields?.data?.datasource?.changePasswordBtn}
                />
              </div>
            ) : (
              <div className="bannerContainerForProfile">
                <Banner imageBanner={imageBanner} />
                <label className="updateBannerImage" htmlFor="uploadbuttonForBanner">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                    alt="edit"
                    width="30px"
                  />
                  <input
                    id="uploadbuttonForBanner"
                    className="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChangeForBanner(e)}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
