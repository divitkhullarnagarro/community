import { withSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { useState, useContext, useEffect } from 'react';
import WebContext from '../Context/WebContext';
import { useRouter } from 'next/router';
import getUserCall from 'src/API/getUserCall';
import updateUuserCall from 'src/API/updateUser';
import ToastNotification from './ToastNotification';
import CameraImg from '../assets/images/camera1.png';
import Banner from './Banner';
import UploadProfilePictureCall from 'src/API/uploadProfilePictureCall';
import PersaonalDetailsOfUser from './PersaonalDetailsOfUser';
import ContactDetails from './ContactDetails';
import EductionDetails from './EductionDetails';
import UserWorkExperience from './UserWorkExperience';
import Link from 'next/link';
import React from 'react';

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
  joiningYear: number | undefined;
  latitude: string | undefined | null;
  leavingDate: string | undefined;
  orgName: string | undefined;
  pincode: number | undefined;
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

const Profile = (props: any): JSX.Element => {
  const { isLoggedIn, userToken, setIsLoggedIn, setUserToken, objectId, setObjectId } = {
    ...useContext(WebContext),
  };
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

  // ===================================================================================Location=======================================================================================

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

  const [openLocationModalState, setOpenLocationModalState] = useState(false);
  const checkboxRef = React.useRef<any>(null);
  useEffect(() => {
    console.log('===========+++++++++++++++++++++', locationObj);
    if (
      errorState?.city === false &&
      errorState?.address === false &&
      errorState?.state === false &&
      errorState?.country === false &&
      errorState?.residingFrom === false
    ) {
      updateUuserCall(userToken, objectId, locationObj).then((response) => {
        if (response) {
          if (response?.data?.success) {
            // setTempUserData(tempArray);
            getUser();
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
    }
  }, [locationObj]);
  const openLocationMoadl = () => {
    setOpenLocationModalState(true);
  };
  const closeLocationMoadl = () => {
    setOpenLocationModalState(false);
  };
  const setCountry = (val: any) => {
    if (val === '') {
      setErrorState({ ...errorState, country: true });
      setUserLocationState({ ...userLocationState, country: val });
    } else {
      setErrorState({ ...errorState, country: false });
      setUserLocationState({ ...userLocationState, country: val });
    }
  };
  const setAddress = (val: any) => {
    if (val === '') {
      setErrorState({ ...errorState, address: true });
      setUserLocationState({ ...userLocationState, address: val });
    } else {
      setErrorState({ ...errorState, address: false });
      setUserLocationState({ ...userLocationState, address: val });
    }
  };
  const setState = (val: any) => {
    if (val === '') {
      setErrorState({ ...errorState, state: true });
      setUserLocationState({ ...userLocationState, state: val });
    } else {
      setErrorState({ ...errorState, state: false });
      setUserLocationState({ ...userLocationState, state: val });
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
    if (val === '') {
      setErrorState({ ...errorState, city: true });
      setUserLocationState({ ...userLocationState, city: val });
    } else {
      setErrorState({ ...errorState, city: false });
      setUserLocationState({ ...userLocationState, city: val });
    }
  };
  const handleSubmtLocation = (e: any) => {
    e.preventDefault();
    setLocationObj({ userResidenceInfo: userLocationState });
  };

  useEffect(() => {
    if (userToken === '' && objectId === '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('ObjectId') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        let userId = localStorage.getItem('ObjectId');

        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
        if (userId != null && setObjectId != undefined) {
          setObjectId(userId);
        }
      } else router.push('/login');
    }
  }, []);

  isLoggedIn;
  setIsLoggedIn;
  setUserToken;
  props;
  userToken;
  const submitPersonalInfoDetails = () => {
    if (
      errorState?.firstName === false &&
      errorState?.lastName === false &&
      errorState.gender === false &&
      personalInfo?.gender !== undefined &&
      errorState?.speciality === false &&
      errorState?.role === false
    ) {
      updateUuserCall(userToken, objectId, personalInfoDetails).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
    }
  };
  useEffect(() => {
    submitPersonalInfoDetails();
  }, [personalInfoDetails]);
  const submitPersonalDetails = () => {
    setPersonalInfoDetails({ ...personalInfo });
  };

  const [showEducationModal, setEducationModal] = useState(false);

  const handleOpenForEducation = () => {
    setEducationModal(true);
  };
  const handleCloseForEducation = () => {
    setEducationModal(false);
  };
  const editWorkFormData = (val: any) => {
    console.log('editWorkFormData', val);
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
    joiningYear: 0,
    latitude: null,
    leavingDate: '',
    orgName: '',
    pincode: 0,
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
    console.log('placeOfPracticeDetails', placeOfPracticeDetails);
    submitWork();
  }, [placeOfPracticeDetails]);

  const submitWork = () => {
    console.log('placeOfPracticeDetails', placeOfPracticeDetails);

    if (
      errorState?.orgName === false &&
      errorState?.empId === false &&
      placeOfPracticeDetails?.userWorkDetails[0].orgName !== '' &&
      placeOfPracticeDetails?.userWorkDetails[0].employeeId !== ''
    ) {
      updateUuserCall(userToken, objectId, placeOfPracticeDetails).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            // setTempUserData(tempArray);
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
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
    if (val === '') {
      setErrorState({ ...errorState, orgName: true });
      setPlaceOfPractice({ ...placeOfPractice, orgName: val });
    } else {
      setErrorState({ ...errorState, orgName: false });
      setPlaceOfPractice({ ...placeOfPractice, orgName: val });
    }
  };

  const setCityOfWork = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, city: val });
  };

  const setCountryOfWork = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, country: val });
  };

  const setDesignation = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, designation: val });
  };

  const setStateForWork = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, state: val });
  };
  const setPincodeForWork = (val: number) => {
    setPlaceOfPractice({ ...placeOfPractice, pincode: val });
  };
  const setSocialUrl = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, socialUrl: val });
  };
  const setLeavingDate = (val: string) => {
    setPlaceOfPractice({ ...placeOfPractice, leavingDate: val });
  };
  const setJoiningYear = (val: number) => {
    setPlaceOfPractice({ ...placeOfPractice, joiningYear: val });
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
    if (val === '') {
      setErrorState({ ...errorState, empId: true });
      setPlaceOfPractice({ ...placeOfPractice, employeeId: val });
    } else {
      setErrorState({ ...errorState, empId: false });

      setPlaceOfPractice({ ...placeOfPractice, employeeId: val });
    }
  };

  const addNewWorkDetail = () => {
    setPlaceOfPractice({
      city: '',
      country: '',
      designation: '',
      employeeId: '',
      joiningDate: '',
      joiningYear: 0,
      latitude: null,
      leavingDate: '',
      orgName: '',
      pincode: 0,
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
  //Education

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
    submitEducation();
  }, [educationDetails]);

  const submitEducation = () => {
    if (
      errorState.instituteName === false &&
      errorState.standard === false &&
      errorState.grade === false &&
      educationDetails?.usersQualification[0].grade !== '' &&
      educationDetails?.usersQualification[0].standard !== ' ' &&
      educationDetails?.usersQualification[0].instituteName !== ''
    ) {
      updateUuserCall(userToken, objectId, educationDetails).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            // setTempUserData(tempArray);
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
    }
  };
  const handleSaveEduaction = () => {
    setEducationDetails({ usersQualification: [education] });

    setShowForm2(false);
  };

  const setInstituteName = (val: string) => {
    if (val === '') {
      setErrorState({ ...errorState, instituteName: true });
      setEducation({ ...education, instituteName: val });
    } else {
      setErrorState({ ...errorState, instituteName: false });

      setEducation({ ...education, instituteName: val });
    }
  };

  const setCityOfEducation = (val: string) => {
    setEducation({ ...education, city: val });
  };

  const setCountryOfEducation = (val: string) => {
    setEducation({ ...education, country: val });
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
    setEducation({ ...education, percentage: val });
  };
  const setPincode = (val: string) => {
    setEducation({ ...education, pincode: val });
  };
  const setRemarks = (val: string) => {
    setEducation({ ...education, remarks: val });
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
    setEducation({ ...education, state: val });
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
    // firstName: 'FirstName',
    // lastName: 'LastName',
    // profession: 'Profession',
    // yearsOfExperience: 10,
    // designation: 'Designation',
    // domain: 'Domain',
    // summary:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum. Sed varius tortor et ultricies congue. Nam dapibus id orci ut ultrices. In hac habitasse platea dictumst. Vestibulum nibh lacus, porttitor ut semper in, aliquam vel nulla. Praesent fermentum laoreet molestie. Aliquam egestas volutpat quam, quis dictum enim commodo elementum. Cras a purus nec magna porta mattis. Phasellus maximus, dui at posuere consectetur, elit odio porta magna, ut faucibus ligula magna id felis',
    // role: 'Role',
    // email: 'email@internet.com',
    // phoneNumber: '1234567890',
    // alternateEmail: 'internet@email.com',
    // dob: '11/11/11',
    // speciality: 'Speciality',
    // middleName: 'MiddleName',
    // country: 'Country',
    // cityt: 'City',
    // websiteOptions: 'WebsiteOptions',
    // interests: ['Interest 1', 'Interest 2', 'Interest 3', 'Interest 4'],
    // hobby: ['Hobby 1', 'Hobby 2', 'Hobby 3', 'Hobby 4'],
    // language: ['Language 1', 'Language 2', 'Language 3', 'Language 4'],
    // skills:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum. Sed varius tortor et ultricies congue.',
    // workDetails:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum. Sed varius tortor et ultricies congue.',
    // school: 'School Name, City, State - 000000',
    // degree: 'Degree',
    // fieldOfStudy: 'Field of study',
    // bannerImgUrl:
    //   'https://images.pexels.com/photos/1133502/pexels-photo-1133502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    // qualifications: ['Qualification 1', 'Qualification 2', 'Qualification 3', 'Qualification 4'],
    // gender: 'Male',
    // age: 30,
    // profilePictureUrl: 'http://localhost:3000/_next/static/media/user.aa566b82.png?mw=64',
    // Address:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum.',
    // State: 'State',
    // ResidingFrom:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum.',
    // LeftAt:
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus neque a nisl venenatis rutrum.',
    // placeOfPractice: [
    //   {
    //     city: 'City 1',
    //     address: 'Address 1',
    //     state: 'State 1',
    //     country: 'Country 1',
    //     residingFrom: 'Residing From 1',
    //     leftAt: null,
    //     designation: 'Designation 1',
    //     employeeId: 'Emp001',
    //     joiningDate: '11/11/11',
    //     joiningYear: 2023,
    //     latitude: '0000000000000000',
    //     leavingDate: '11/11/11',
    //     orgName: 'Organisation 1',
    //     pincode: 110001,
    //     presentlyWorkingHere: false,
    //     socialUrl: 'sjkahdsdkjslkajdlkjalksjdlkajskldjalkjsdlk',
    //     wid: 'jsahdkhsjkhdkjahsd',
    //   },
    //   {
    //     city: 'City 2',
    //     address: 'Address 2',
    //     state: 'State 2',
    //     country: 'Country 2',
    //     residingFrom: 'Residing From 2',
    //     leftAt: null,
    //     designation: 'Designation 2',
    //     employeeId: 'Emp002',
    //     joiningDate: '11/11/11',
    //     joiningYear: 2023,
    //     latitude: '0000000000000000',
    //     leavingDate: '11/11/11',
    //     orgName: 'Organisation 2',
    //     pincode: 110001,
    //     presentlyWorkingHere: true,
    //     socialUrl: 'sjkahdsdkjslkajdlkjalksjdlkajskldjalkjsdlk',
    //     wid: 'jsahdkhsjkhdkjahsd',
    //   },
    // ],
    // areaOfExpertise: 'Area of Expertise',
    // websiteUrl: 'aksdjkaljsdlkajsldkjalskdjkalsjdl',
    // userResidenceInfo: {},
  });

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
    // setEducationDetails({ ...data[0] });
    // setPlaceOfPracticeDetails({...placeOfPracticeDetails,data})
  };

  //Modal Variables
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [languageForm, setLanguageForm] = useState(false);
  const [hobbyForm, setHobbyForm] = useState(false);

  const [intrestForm, setIntrestForm] = useState(false);

  const [showForm3, setShowForm3] = useState(false);
  const [showStateValue, setStateValue] = useState(true);
  const [showNotification, setShowNofitication] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [details, setDetails] = useState<any>('personal');
  const [language, setLanguage] = useState<any>([]);
  const [hobby, setHobby] = useState<any>([]);

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
      // setEditUserData({...editUserData,hobby:''})
    }
  };
  const addInterest = (e: any) => {
    e.preventDefault();
    console.log('editUserData.interests', editUserData.interests);
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
      console.log('editUserData', editUserData);
      let tempArray = { ...editUserData };
      console.log('tempArray', tempArray);
      updateUuserCall(userToken, objectId, tempArray).then((response) => {
        if (response) {
          if (response?.data?.success) {
            setTempUserData(tempArray);
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
      setShowForm1(false);
    }
  };

  const submitForm2 = () => {
    if (errorState.summary === false) {
      let tempArray = { ...editUserData };
      updateUuserCall(userToken, objectId, { summary: tempArray?.summary }).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            // setTempUserData(tempArray);
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
      setShowForm2(false);
    }
  };

  const languageFormData = () => {
    let tempArray = {
      // ...tempUserData,
      language: language,
    };

    console.log('languages', tempArray);
    updateUuserCall(userToken, objectId, tempArray).then((response) => {
      if (response) {
        if (response?.data?.success) {
          getUser();
          // setTempUserData(tempArray);
          setStateValue(true);
          setToastSuccess(true);
          setToastMessage('Data updated successfully');
        } else {
          setToastError(true);
          setToastMessage('Something went wrong');
        }
        setShowNofitication(true);
      }
    });
    // setShowForm2(false);
  };

  const hobbyFormData = () => {
    let tempArray = {
      // ...tempUserData,
      hobby: hobby,
    };
    updateUuserCall(userToken, objectId, tempArray).then((response) => {
      if (response) {
        if (response?.data?.success) {
          getUser();
          // setTempUserData(tempArray);
          setStateValue(true);
          setToastSuccess(true);
          setToastMessage('Data updated successfully');
        } else {
          setToastError(true);
          setToastMessage('Something went wrong');
        }
        setShowNofitication(true);
      }
    });
    // setShowForm2(false);
  };

  const IntrestFormData = () => {
    let tempArray = {
      // ...tempUserData,
      interests: userInterests,
    };

    console.log('languages', tempArray);
    updateUuserCall(userToken, objectId, tempArray).then((response) => {
      if (response) {
        if (response?.data?.success) {
          // setTempUserData(tempArray);
          getUser();
          setStateValue(true);
          setToastSuccess(true);
          setToastMessage('Data updated successfully');
        } else {
          setToastError(true);
          setToastMessage('Something went wrong');
        }
        setShowNofitication(true);
      }
    });
    setIntrestForm(false);
    // setShowForm2(false);
  };

  const submitForm3 = () => {
    if (!errorState.phoneNumber && !errorState.dob && !errorState.email) {
      const obj = {
        email: editUserData?.email,
        alternateEmail: editUserData?.alternateEmail,
        phoneNumber: editUserData?.phoneNumber,
      };
      let tempArray = { ...editUserData };
      console.log('editvalues', tempArray);
      updateUuserCall(userToken, objectId, obj).then((response) => {
        if (response) {
          if (response?.data?.success) {
            getUser();
            // setTempUserData(tempArray);
            setStateValue(true);
            setToastSuccess(true);
            setToastMessage('Data updated successfully');
          } else {
            setToastError(true);
            setToastMessage('Something went wrong');
          }
          setShowNofitication(true);
        }
      });
      setShowForm3(false);
    }
  };
  const handleShow1 = () => setShowForm1(true);

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

  const setAgeValue = (val: any) => {
    if (val === '') {
      // setErrorState({ ...errorState, dob: true });
      setPersonalInfo({ ...personalInfo, age: val });
    } else {
      // setErrorState({ ...errorState, dob: false });
      setPersonalInfo({ ...personalInfo, age: val });
    }
  };

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
    if (val === '') {
      setErrorState({ ...errorState, alternateEmail: true });
      setEditUserData({ ...editUserData, alternateEmail: val });
    } else {
      setErrorState({ ...errorState, alternateEmail: false });
      setEditUserData({ ...editUserData, alternateEmail: val });
    }
  }

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
    setPersonalInfo({ ...personalInfo, areaOfExpertise: val });
  }
  function setExperienceValue(val: any) {
    setPersonalInfo({ ...personalInfo, yearsOfExperience: val });
  }
  function setDesignationValue(val: any) {
    setPersonalInfo({ ...personalInfo, designation: val });
  }
  function setRoleValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, role: true });
      setPersonalInfo({ ...personalInfo, role: val });
    } else {
      setErrorState({ ...errorState, role: false });
      setPersonalInfo({ ...personalInfo, role: val });
    }
  }
  function setDomainValue(val: any) {
    setPersonalInfo({ ...personalInfo, domain: val });
  }

  function setSummaryValue(val: any) {
    if (val?.length > 200) {
      setErrorState({ ...errorState, summary: true });
      setEditUserData({ ...editUserData, summary: val });
    } else {
      setErrorState({ ...errorState, summary: false });
      setEditUserData({ ...editUserData, summary: val });
    }
  }

  function setFirstName(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, firstName: true });
      setPersonalInfo({ ...personalInfo, firstName: val });
    } else {
      setErrorState({ ...errorState, firstName: false });
      setPersonalInfo({ ...personalInfo, firstName: val });
    }
  }
  function setMiddleName(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, middleName: true });
      setPersonalInfo({ ...personalInfo, middleName: val });
    } else {
      setErrorState({ ...errorState, middleName: false });
      setPersonalInfo({ ...personalInfo, middleName: val });
    }
  }

  function setLastName(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, lastName: true });
      setPersonalInfo({ ...personalInfo, lastName: val });
    } else {
      setErrorState({ ...errorState, lastName: false });
      setPersonalInfo({ ...personalInfo, lastName: val });
    }
  }

  function setEmailValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, email: true });
      setEditUserData({ ...editUserData, email: val });
    } else {
      setErrorState({ ...errorState, email: false });
      setEditUserData({ ...editUserData, email: val });
    }
  }
  function setSpecialityValue(val: any) {
    if (val === '') {
      setErrorState({ ...errorState, speciality: true });
      setPersonalInfo({ ...personalInfo, speciality: val });
    } else {
      setErrorState({ ...errorState, speciality: false });
      setPersonalInfo({ ...personalInfo, speciality: val });
    }
  }

  function setWebSiteUrl(val: any) {
    setPersonalInfo({ ...personalInfo, websiteUrl: val });
  }

  const handleAddLanguage = (val: string) => {
    setEditUserData({ ...editUserData, language: val });
  };
  const handleAddHobby = (val: string) => {
    setEditUserData({ ...editUserData, hobby: val });
  };
  const handleIntrest = (val: string) => {
    setEditUserData({ ...editUserData, interests: val });
  };
  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };
  useEffect(() => {
    getUser();
  }, [userToken, objectId]);

  const getUser = () => {
    getUserCall(userToken, objectId).then((response: any) => {
      console.log('response', response);
      setTempUserData({
        firstName: response?.data?.data?.firstName,
        lastName: response?.data?.data?.lastName,
        profession: response?.data?.data?.profession,
        yearsOfExperience: response?.data?.data?.yearsOfExperience,
        designation: response?.data?.data?.designation,
        domain: response?.data?.data?.domain,
        summary: response?.data?.data?.summary,
        role: response?.data?.data?.role,
        email: response?.data?.data?.email,
        phoneNumber: response?.data?.data?.phoneNo,
        alternateEmail: response?.data?.data?.alternateEmail,
        dob: response?.data?.data?.dob,
        speciality: response?.data?.data?.speciality,
        middleName: response?.data?.data?.middleName,
        country: response?.data?.data?.userResidenceInfo?.country,
        cityt: response?.data?.data?.userResidenceInfo?.city,
        websiteOptions: response?.data?.data?.websiteOptions,
        interests: response?.data?.data?.interests,
        hobby: response?.data?.data?.hobby,
        language: response?.data?.data?.language,
        skills: response?.data?.data?.skills,
        workDetails: response?.data?.data?.workDetails,
        school: response?.data?.data?.school,
        degree: response?.data?.data?.degree,
        fieldOfStudy: response?.data?.data?.fieldOfStudy,
        bannerImgUrl: response?.data?.data?.bannerImgUrl,
        qualifications: response?.data?.data?.qualifications,
        gender: response?.data?.data?.gender,
        age: response?.data?.data?.age,
        profilePictureUrl: response?.data?.data?.profilePictureUrl,
        userResidenceInfo: response?.data?.data?.userResidenceInfo,
        placeOfPractice: response?.data?.data?.placeOfPractice,
        areaOfExpertise: response?.data?.data?.areaOfExpertise,
        websiteUrl: response?.data?.data?.websiteUrl,
        Address: response?.data?.data?.userResidenceInfo?.address,
        State: response?.data?.data?.userResidenceInfo?.state,
        ResidingFrom: response?.data?.data?.userResidenceInfo?.residingFrom,
        LeftAt: response?.data?.data?.userResidenceInfo?.leftAt,
      });
      setPersonalInfo({
        firstName: response?.data?.data?.firstName,
        lastName: response?.data?.data?.lastName,
        middleName: response?.data?.data?.middleName,
        areaOfExpertise: response?.data?.data?.areaOfExpertise,
        yearsOfExperience: response?.data?.data?.yearsOfExperience,
        designation: response?.data?.data?.designation,
        role: response?.data?.data?.role,
        speciality: response?.data?.data?.speciality,
        domain: response?.data?.data?.domain,
        age: response?.data?.data?.age,
        gender: response?.data?.data?.gender,
        websiteUrl: response?.data?.data?.websiteUrl,
        dob: response?.data?.data?.dob,
      });
      setUserLocationState(response?.data?.data?.userResidenceInfo);
      if (response?.data?.data?.hobby === undefined) {
        setHobby([]);
      } else {
        setHobby(response?.data?.data?.hobby);
      }
      if (response?.data?.data?.language === undefined) {
        setLanguage([]);
      } else {
        setLanguage(response?.data?.data?.language);
      }
      if (response?.data?.data?.interests === undefined) {
        setUserInterests([]);
      } else {
        setUserInterests(response?.data?.data?.interests);
      }
      setEditUserData({
        firstName: response?.data?.data?.firstName,
        lastName: response?.data?.data?.lastName,
        profession: response?.data?.data?.profession,
        yearsOfExperience: response?.data?.data?.yearsOfExperience,
        designation: response?.data?.data?.designation,
        domain: response?.data?.data?.domain,
        summary: response?.data?.data?.summary,
        role: response?.data?.data?.role,
        email: response?.data?.data?.email,
        phoneNumber: response?.data?.data?.phoneNo,
        alternateEmail: response?.data?.data?.alternateEmail,
        dob: response?.data?.data?.dob,
        speciality: response?.data?.data?.speciality,
        middleName: response?.data?.data?.middleName,
        country: response?.data?.data?.userResidenceInfo?.country,
        cityt: response?.data?.data?.userResidenceInfo?.city,
        Address: response?.data?.data?.userResidenceInfo?.address,
        State: response?.data?.data?.userResidenceInfo?.state,
        ResidingFrom: response?.data?.data?.userResidenceInfo?.residingFrom,
        LeftAt: response?.data?.data?.userResidenceInfo?.leftAt,
        websiteOptions: response?.data?.data?.websiteOptions,
        skills: response?.data?.data?.skills,
        workDetails: response?.data?.data?.workDetails,
        school: response?.data?.data?.school,
        degree: response?.data?.data?.degree,
        fieldOfStudy: response?.data?.data?.fieldOfStudy,
        bannerImgUrl: response?.data?.data?.bannerImgUrl,
        qualifications: response?.data?.data?.qualifications,
        gender: response?.data?.data?.gender,
        age: response?.data?.data?.age,
        profilePictureUrl: response?.data?.data?.profilePictureUrl,
        userResidenceInfo: response?.data?.data?.userResidenceInfo,
        placeOfPractice: response?.data?.data?.placeOfPractice,
        areaOfExpertise: response?.data?.data?.areaOfExpertise,
        websiteUrl: response?.data?.data?.websiteUrl,
      });
    });
  };

  const handlePersonalDetails = (val: string) => {
    setDetails(val);
  };

  const handleChange = (e: any) => {
    const files = e?.target?.files;
    if (files?.length > 0) {
      UploadProfilePictureCall(files[0], userToken).then((response: any) => {
        setImage({
          preview: response?.data?.data,
        });
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

    console.log('valueofe', image?.preview);
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
      <div className="parentContainerForProfile">
        <div className="rightContainerForProfile">
          <div className="imageContainer">
            <img
              className="profilePic"
              src={
                !!tempUserData?.profilePictureUrl
                  ? tempUserData?.profilePictureUrl
                  : 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
              }
            ></img>
            <label className="imageUpload" htmlFor="uploadbutton">
              <div className="cameraContainer">
                <img className="camera" src={CameraImg?.src} />
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
            <div className="nameContainer">
              <h3> {name}</h3>
            </div>
            <div className="profrssionContainer">
              <span> {showStateValue && tempUserData?.role}</span>
            </div>
          </div>
          {/* <div className="postStatsContainerForProfile">
            <div className="postContainerForProfile">
              <div>205</div>
              <div className="postText">Posts</div>
            </div>
            <div className="postContainerForProfile">
              <div>10</div>
              <div className="postText">Messages</div>
            </div>{' '}
            <div className="postContainerForProfileLast">
              <div>97</div>
              <div className="postText">Followers</div>
            </div>
          </div> */}
          <div className="detailsContainer">
            <div
              className={
                details === 'personal' ? 'personalDetails personalDetailsActive' : 'personalDetails'
              }
              onClick={() => handlePersonalDetails('personal')}
            >
              Personal Information
            </div>
            <div
              className={
                details === 'contactDetails'
                  ? 'personalDetails personalDetailsActive'
                  : 'personalDetails'
              }
              onClick={() => handlePersonalDetails('contactDetails')}
            >
              Contact Details
            </div>
            <div
              className={
                details === 'educationDetails'
                  ? 'personalDetails personalDetailsActive'
                  : 'personalDetails'
              }
              onClick={() => handlePersonalDetails('educationDetails')}
            >
              Education Details
            </div>
            <div
              className={
                details === 'work' ? 'personalDetails personalDetailsActive' : 'personalDetails'
              }
              onClick={() => handlePersonalDetails('work')}
            >
              Work Details
            </div>
            {/* <div
              className={
                details === 'banner' ? 'personalDetails personalDetailsActive' : 'personalDetails'
              }
              onClick={() => handlePersonalDetails('banner')}
            >
              Banner
            </div> */}
          </div>
        </div>
        <div className="leftContainerForProfile">
          <div className="leftContainerForProfileHeadng">Edit Profile</div>
          <div className="infoContainerForProfile">
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
                    setAgeValue={setAgeValue}
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
                  setJoiningYear={setJoiningYear}
                  setLeavingDate={setLeavingDate}
                  editWorkFormData={editWorkFormData}
                  checkboxRef={checkboxRef}
                  userLocationState={userLocationState}
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
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </>
  );
};

export default withSitecoreContext()(Profile);
