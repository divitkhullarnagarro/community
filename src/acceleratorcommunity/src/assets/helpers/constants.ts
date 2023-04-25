export const javaHost = `https://accelerator-api-management.azure-api.net`;
export const LogoutUrl = `${javaHost}/user-service/api/v1/logout`;
export const sendOTPUrl = `${javaHost}/user-service/api/v1/users/forget-password/`;
export const validateOtpUrl = `${javaHost}/user-service/api/v1/users/validate-otp/`;
export const updatePasswordUrl = `${javaHost}/user-service/api/v1/users/change-password`;
export const addAllPeersUrl = `${javaHost}/graph-service/api/v1/graph/peers`;
export const addPeersBySearchUrl = `${javaHost}/graph-service/api/v1/graph/peers?keyword=`;
export const addPeersPaginationUrl = `${javaHost}/graph-service/api/v1/graph/peers?`;

export const Algorithm = 'aes-256-cbc';
export const Key = [
  4,
  240,
  99,
  8,
  217,
  84,
  168,
  177,
  175,
  164,
  29,
  16,
  228,
  178,
  206,
  16,
  95,
  86,
  240,
  224,
  64,
  171,
  105,
  193,
  182,
  235,
  136,
  135,
  211,
  91,
  39,
  223
]

export const toolbar = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'emoji',
    'colorPicker',
    'list',
    'textAlign',

    'link',
    // 'embedded',

    // 'image',
    // 'remove',
    'history',
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'monospace',
      //   'superscript',
      //   'subscript',
    ],
    // list: { inDropdown: true },
    // textAlign: { inDropdown: true },
    // link: { inDropdown: true },
  },
  colorPicker: { className: 'demo-option-custom', popupClassName: 'popup-custom' },
  blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'popup-custom' },
  fontSize: { className: 'demo-option-custom-medium', dropdownClassName: 'popup-custom' },
  fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'popup-custom' },
  emoji: {
    // icon: BsAirplane,
    className: 'demo-option-custom',
    popupClassName: 'popup-custom',
  },
  history: {
    undo: {
      // icon: previous,
      className: 'demo-option-custom',
    },
    // redo: { icon: next, className: 'demo-option-custom' },
  },
};

export const apiData = {
  data: [
    {
      objectId: 'abc09@yopmail.com',
      interests: null,
      city: 'Noida',
      state: null,
      country: null,
      profession: null,
      speciality: 'ORTHO',
      age: 0,
      firstName: 'Shivam',
      lastName: 'Gupta',
      emailId: null,
      profilePictureUrl: null,
    },
    {
      objectId: 'nishanttiwari2@email.com',
      interests: null,
      city: null,
      state: null,
      country: null,
      profession: null,
      speciality: 'Ortho',
      age: 0,
      firstName: 'Nishant',
      lastName: 'Tiwari',
      emailId: null,
      profilePictureUrl: null,
    },
  ],
  success: null,
  errorCode: null,
  errorMessages: null,
  hasMorePage: false,
  pageNo: 0,
  pageSize: 20,
  totalElements: 2,
};
