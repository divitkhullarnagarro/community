export const javaHost = `https://accelerator-api-management.azure-api.net`;
export const LogoutUrl = `https://accelerator-api-management.azure-api.net/user-service/api/v1/logout`;
export const sendOTPUrl = `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/forget-password/`;
export const validateOtpUrl = `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/validate-otp/`;
export const updatePasswordUrl = `https://accelerator-api-management.azure-api.net/user-service/api/v1/users/change-password`;
export const addAllPeersUrl = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/peers`;
export const addPeersBySearchUrl = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/peers?keyword=`;
export const addPeersPaginationUrl = `https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/peers?`;
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

    // 'link',
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
    history: { inDropdown: true },
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
