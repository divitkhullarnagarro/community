export const javaHost = `https://accelerator-api-management.azure-api.net`;
export const LogoutUrl = `${javaHost}/user-service/api/v1/logout`;
export const sendOTPUrl = `${javaHost}/user-service/api/v1/users/forget-password/`;
export const validateOtpUrl = `${javaHost}/user-service/api/v1/users/validate-otp/`;
export const updatePasswordUrl = `${javaHost}/user-service/api/v1/users/change-password`;
export const addAllPeersUrl = `${javaHost}/graph-service/api/v1/graph/peers`;
export const addPeersBySearchUrl = `${javaHost}/graph-service/api/v1/graph/peers?keyword=`;
export const addPeersPaginationUrl = `${javaHost}/graph-service/api/v1/graph/peers?`;
export const editCommentUrl = `${javaHost}/graph-service/api/v1/graph/post/comment`;
export const voteInPollUrl = `${javaHost}/graph-service/api/v1/graph/post/poll/`

export const Algorithm = 'aes-256-cbc';
export const Key = [
  4, 240, 99, 8, 217, 84, 168, 177, 175, 164, 29, 16, 228, 178, 206, 16, 95, 86, 240, 224, 64, 171,
  105, 193, 182, 235, 136, 135, 211, 91, 39, 223,
];

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
export const demoMyEventList = [
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
];
export const demoSuggestedEventList = [
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },

  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
];
export const demoBookmarkedEventList = [
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Hip Hop Night',
    location: 'Cyber City, Gurugram',
    interested: 4,
  },
];

export const myBlogs = [
  {
    id: '',
    heading: 'random text. It has roots in a piece',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'Lorem Ipsum is not simply random text.',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'It has roots in a piece of classical',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'to popular belief, Lorem Ipsum is not',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'roots in a piece of classical',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
];
export const suggestedBlogs = [
  {
    id: '',
    heading: 'years old. Richard McClintock,',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'Latin literature from 45 BC, making it over 2000 years old',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: '',
    heading: 'Lorem Ipsum passage, and going through the',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
];
export const bookmarkedBlogs = [
  {
    id: '',
    heading:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classica',
    imageUrl: '',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
];
