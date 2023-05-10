export const javaHost = `https://accelerator-api-management.azure-api.net`;
export const LogoutUrl = `${javaHost}/user-service/api/v1/logout`;
export const sendOTPUrl = `${javaHost}/user-service/api/v1/users/forget-password/`;
export const validateOtpUrl = `${javaHost}/user-service/api/v1/users/validate-otp/`;
export const updatePasswordUrl = `${javaHost}/user-service/api/v1/users/change-password`;
export const addAllPeersUrl = `${javaHost}/graph-service/api/v1/graph/peers`;
export const addPeersBySearchUrl = `${javaHost}/graph-service/api/v1/graph/peers?keyword=`;
export const addPeersPaginationUrl = `${javaHost}/graph-service/api/v1/graph/peers?`;
export const editCommentUrl = `${javaHost}/graph-service/api/v1/graph/post/comment`;
export const voteInPollUrl = `${javaHost}/graph-service/api/v1/graph/post/poll/`;
export const getMyBlogsUrl = `${javaHost}/graph-service/api/v1/graph/post/my-blogs`;
export const getBookmarkedMyBlogsUrl = `${javaHost}/graph-service/api/v1/graph/post/my-blogs`;
export const getSuggestedBlogsUrl = `${javaHost}/graph-service/api/v1/graph/post/bookmarked-blogs`;
export const viewProfileLinkUrl = `/viewProfile?id=`;

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
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/security/how-design-improves-personalization-through-user-experience/716_1.png?md=20210520T180615Z?mw=716&mh=465&hash=5E4394E618C47B5C1FE45F4E8FAA487E',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Data compliance and security in the software purchasing process',
    location: 'Cyber City, Gurugram',
    description:
      'The resources you need to understand how Sitecore supports your compliance and security journey.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/analytics/exceed-expectations-with-data-analytics-and-ai/29129_exceed_expectations_with_data_analytics_and_ai_blogimage_716x465.jpg?md=20211006T181618Z?mw=716&mh=465&hash=479181E1F0C5A3D4AC7EAD81C4FEE82D',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Sitecore Introduces OpenAI Generative AI Integration Functionality to its Fully Composable Software Solutions',
    location: 'Cyber City, Gurugram',
    description:
      'Comprehensive survey of over 400 US marketers reveals that Generative AI is leading investment concern',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/security/privacy-week-blog/gettyimages-1173279965-blog-hero-feature.jpg?md=20220120T175326Z?mw=716&mh=465&hash=3C8B490AE891DE5E47D82BBD9E5E3215',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Data Privacy Day at Sitecore',
    location: 'Cyber City, Gurugram',
    description:
      'Outlining what our continued commitment to data privacy and compliance means for our customers.',
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'WED 24 May',
    time: '11:00',
    name: 'Speeding up personalization with the help of AI',
    location: 'Cyber City, Gurugram',
    description:
      'What might be slowing down your personalization strategy and how artificial intelligence empowers marketing teams to optimize digital experiences.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/data/organizing-your-cdp-program/gettyimages-1304132658_insights_feature.png?md=20220217T204717Z?mw=716&mh=465&hash=58826421A58B1A0FC70787AA5B95121A',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'How to organize your CDP program',
    location: 'Cyber City, Gurugram',
    description: `The early-stage team responsible for the strategy, value-creation models, and CDP activation should include the following roles:
    Executive project sponsor (typically the CIO or CMO — someone who can advocate for and enforce new ways of doing business)
    Business business team leader (likely from marketing or e-commerce)
    Customer audience expert(s)
    Channel systems expert(s)
    Data analyses and engineering expert
    Front-end developer(s)`,
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/cloud/sitecore-and-xm-cloud-named-a-leader/blog_hero.jpg?md=20230321T205818Z?mw=716&mh=465&hash=DCD6A04FC33E1EA1E7B34720F49A379C',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Sitecore Reveals New Component Capability to Its Experience Manager (XM) Cloud Platform',
    location: 'Cyber City, Gurugram',
    description:
      'Company outlines key updates to its Product Suite; guides customers on the path to composable',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/knowledge-center/blog/2020/03/content-is-empathy-at-scale/expeur2020_blog_empathy-at-scale_featured-case-study_716x453.jpg?md=20200316T235803Z?mw=716&mh=465&hash=FC8ED348567428C2E90067587FFC061D',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Content is empathy at scale',
    location: 'Cyber City, Gurugram',
    description:
      'Featured Speaker Ryan Skinner, Forrester Principal Analyst, reveals how a thoughtful content strategy can scale empathy',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/resources/index/analyst-reports/gartner-mq-for-dxps/gettyimages-1030827902-blog-hero-feature.jpg?md=20220309T134616Z?mw=716&mh=465&hash=E2EAD8AE6FCD79055AD5D7185E0FA80A',
    date: 'FRI 26 May',
    time: '12:00',
    name: 'A look beyond the Magic Quadrant™ for Digital Experience Platforms',
    location: 'Cyber City, Gurugram',
    description:
      'There’s a lot of information that can be leveraged in the 2022 Gartner Magic Quadrant for DXPs, but its wide-angle view of the market can be rounded out for deeper insight.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/data/data-management-insight-from-idc-marketscape/gettyimage-970161196_insightsarticlefeature.jpg?md=20220105T174159Z?mw=716&mh=465&hash=27BBDDD26B6E2931931D803B9D521588',
    date: 'SAT 30 May',
    time: '11:00',
    name: 'Data management insight from IDC MarketScape',
    location: 'Cyber City, Gurugram',
    description:
      'Make sense of the customer data platform (CDP) market so you can make smarter marketing decisions',
  },
  {
    img: 'https://nkdramblog.files.wordpress.com/2022/11/xmcloudthumbnail.jpg?w=1084',
    date: 'THU 18 May',
    time: '02:30',
    name: 'XM CLOUD – COMPONENTS LIVE SESSION',
    location: 'Cyber City, Gurugram',
    description: `This next XM Cloud components session will show you how easy it is to create stunning websites, landing pages, and more, with the bonus of being able to integrate data from any content or data API.`,
  },
];
export const demoSuggestedEventList = [
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/resources/index/analyst-reports/gartner-mq-for-dxps/gettyimages-1030827902-blog-hero-feature.jpg?md=20220309T134616Z?mw=716&mh=465&hash=E2EAD8AE6FCD79055AD5D7185E0FA80A',
    date: 'FRI 26 May',
    time: '12:00',
    name: 'A look beyond the Magic Quadrant™ for Digital Experience Platforms',
    location: 'Cyber City, Gurugram',
    description:
      'There’s a lot of information that can be leveraged in the 2022 Gartner Magic Quadrant for DXPs, but its wide-angle view of the market can be rounded out for deeper insight.',
  },

  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/cloud/sitecore-and-xm-cloud-named-a-leader/blog_hero.jpg?md=20230321T205818Z?mw=716&mh=465&hash=DCD6A04FC33E1EA1E7B34720F49A379C',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Sitecore Reveals New Component Capability to Its Experience Manager (XM) Cloud Platform',
    location: 'Cyber City, Gurugram',
    description:
      'Company outlines key updates to its Product Suite; guides customers on the path to composable',
  },
  {
    img: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'WED 24 May',
    time: '11:00',
    name: 'Speeding up personalization with the help of AI',
    location: 'Cyber City, Gurugram',
    description:
      'What might be slowing down your personalization strategy and how artificial intelligence empowers marketing teams to optimize digital experiences.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547',
    date: 'TUE 9 May',
    time: '11:00',
    name: 'Sitecore DX 2023 Boston - Accelerate your journey',
    location: 'Cyber City, Gurugram',
    description:
      'The feedback after Sitecore Symposium 2022 was loud and clear. Brands want to be more agile, scale content better, and deliver digital experiences faster. Sitecore DX 2023 Boston kicks off a new global event series of free regional 1-day conferences, hosted alongside Sitecore’s trusted and valued partners. Register to walk away with practical steps and actions to speed up your transition to a cloud-native DXP. The how-to workshops, inspiring customer success stories, and informative keynotes from Sitecore executives will leave you with a clear vision for your composable future.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/fsi/blog-know-your-customers-better-it-header-img.jpg?md=20210708T213211Z?mw=716&mh=465&hash=001AD810EFB2CA03213A1229F5873A2C',
    date: 'MON 22 May',
    time: '11:00',
    name: 'Get a closer look at your Financial Services customers',
    location: 'Cyber City, Gurugram',
    description:
      'Understanding your customers - and the tools needed to deliver the digital experiences they expect - will get you successfully to your final destination',
  },
  {
    img: 'https://nkdramblog.files.wordpress.com/2022/11/xmcloudthumbnail.jpg?w=1084',
    date: 'THU 18 May',
    time: '02:30',
    name: 'XM CLOUD – COMPONENTS LIVE SESSION',
    location: 'Cyber City, Gurugram',
    description: `This next XM Cloud components session will show you how easy it is to create stunning websites, landing pages, and more, with the bonus of being able to integrate data from any content or data API.`,
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/analytics/exceed-expectations-with-data-analytics-and-ai/29129_exceed_expectations_with_data_analytics_and_ai_blogimage_716x465.jpg?md=20211006T181618Z?mw=716&mh=465&hash=479181E1F0C5A3D4AC7EAD81C4FEE82D',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Sitecore Introduces OpenAI Generative AI Integration Functionality to its Fully Composable Software Solutions',
    location: 'Cyber City, Gurugram',
    description:
      'Comprehensive survey of over 400 US marketers reveals that Generative AI is leading investment concern',
  },
];
export const demoBookmarkedEventList = [
  {
    img: 'https://nkdramblog.files.wordpress.com/2022/11/xmcloudthumbnail.jpg?w=1084',
    date: 'THU 18 May',
    time: '02:30',
    name: 'XM CLOUD – COMPONENTS LIVE SESSION',
    location: 'Cyber City, Gurugram',
    description: `This next XM Cloud components session will show you how easy it is to create stunning websites, landing pages, and more, with the bonus of being able to integrate data from any content or data API.`,
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547',
    date: 'TUE 9 May',
    time: '11:00',
    name: 'Sitecore DX 2023 Boston - Accelerate your journey',
    location: 'Cyber City, Gurugram',
    description:
      'The feedback after Sitecore Symposium 2022 was loud and clear. Brands want to be more agile, scale content better, and deliver digital experiences faster. Sitecore DX 2023 Boston kicks off a new global event series of free regional 1-day conferences, hosted alongside Sitecore’s trusted and valued partners. Register to walk away with practical steps and actions to speed up your transition to a cloud-native DXP. The how-to workshops, inspiring customer success stories, and informative keynotes from Sitecore executives will leave you with a clear vision for your composable future.',
  },
  {
    img: 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/cloud/sitecore-and-xm-cloud-named-a-leader/blog_hero.jpg?md=20230321T205818Z?mw=716&mh=465&hash=DCD6A04FC33E1EA1E7B34720F49A379C',
    date: 'SAT 13 May',
    time: '11:00',
    name: 'Sitecore Reveals New Component Capability to Its Experience Manager (XM) Cloud Platform',
    location: 'Cyber City, Gurugram',
    description:
      'Company outlines key updates to its Product Suite; guides customers on the path to composable',
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
];
export const suggestedBlogs = [
  {
    id: '',
    heading: 'Elephant in the Room: Diversity in Digital Experience',
    imageUrl:
      'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sym/1666215805275.jpeg?md=20221114T180657Z?mw=716&mh=465&hash=600E15F42647E82508FA162E486FE398',
    description: `The technology powering today’s leading brand experiences are influencing everything from serving up content to users across the globe, to hyper-personalizing experiences based on individual data. With 1-in-3 marketers also currently experimenting with immersive experiences of the future, what should we be taking into consideration when designing our experience strategies to ensure diversity, inclusion, and representation?
      Six Women of Sitecore panelists surfaced key considerations and shared real-life examples of experiences gone wrong during a two-part session at Sitecore Symposium 2022. Explore detailed answers on personalization, user testing and personas, and automated processing by panelists: Deepthi Katta, Technical Director, Verndale; Amy Turrin, Sr. Product & Engineering Manager, Kimberly-Clark; Jaina Baumgartner, Director of Digital Strategy, RDA; Kimberly McCabe, Sr. Director of Solutions, ICREON; and Daniela Millitaru, Sr. Sales Engineer, Sitecore.`,
  },
  {
    id: '',
    heading: 'How AI, machine learning, and predictive analytics drive conversion',
    imageUrl:
      'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/commerce/how-ai-machine-learning-and-predictive-analytics-drive-conversion/gettyimages-458858471.jpg?md=20220615T150945Z?mw=716&mh=465&hash=A86894B088EB7D7797F9D1CB5A03D71A',
    description: `Today’s consumers are kind of a tough crowd. In order to keep up with ever-increasing demands and expectations, not only do brands need to show up wherever their customers want to do business, but they also need to show their customers that they understand who they are, recognize that they want to be treated as individuals, remember their previous interactions, and make them feel valued — these days 71% of consumers expect personalization and 76% of consumers get frustrated when they don’t receive tailored communications or relevant experiences.
      The good news is that getting to know your customers at a deeper level and delivering the types of experiences that help drive conversion is easier than you think. Thanks to a combination of AI-powered algorithms and the advanced data crunching capabilities of CDPs, brands can create impactful, tailored experiences that have the potential to turn customers into brand advocates.
      The (data) science bit
      Behind every “recommended for you”, “surprise me”, or “we think you might like” digital experience is a predictive analytics process. Predictive analytics is a branch of advanced analytics that uses historical data, data mining, statistical modeling, plus AI/machine learning techniques to forecast future behavior, events, and trends. The technique can be used in several ways to help brands improve conversion and boost revenue.
      Taking the guesswork out of product recommendations
      Leveraging advanced machine learning algorithms, brands and retailers can create the types of relevant product recommendations that make customers feel like you really ‘get’ them and understand their taste in clothing, music, movies, groceries, homeware, content, travel destinations, or whatever goods or services they are browsing. And it certainly pays to put in this extra effort. According to statistics, 91% of consumers are more likely to purchase from a brand that remembers their preferences and delivers relevant recommendations.`,
  },
  {
    id: '',
    heading: 'Understanding the CDP program lifecycle',
    imageUrl:
      'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/data/the-cdp-program-lifecycle/gettyimages-175130384_insights_feature.png?md=20220217T161955Z?mw=716&mh=465&hash=1DD3C6D161E8998285A5B06CE00B9D42',
    description: `A customer data platform (CDP) collects and unifies first-party, as well as second- and third-party user data from multiple sources to build a single, unified, 360-degree view of each prospect or customer. CDPs provide end-to-end customer lifecycle experience management capabilities: they give you a deep understanding of your customers, allowing you to turn your data assets into forward motion. If data is the oil in your car, a CDP is the engine, powering your personalization strategy.
      A smart CDP enables you to activate your user data, personalize, and optimize every interaction seamlessly across every digital experience, and transition effortlessly from channel to channel. To continue with the car analogy, if a CDP is the engine, the personalization capability is the drive train and steering wheel. A CDP should do more than ingest customer data. It should also activate it and support your personalization and optimization capabilities.`,
  },
];
export const bookmarkedBlogs = [
  {
    id: '',
    heading: 'Sitecore DX 2023 Europe shows brands how to get on a composable path',
    imageUrl:
      'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/digital-transformation/how-ai-powered-cdps-drive-exceptional-cx/gettyimage-1089279438_insightsarticlefeature.jpg?md=20220127T184436Z?mw=716&mh=465&hash=C913ED94DE48800DAEAC490FF9F356B2',
    description: `After months of planning and preparation, the first Sitecore DX 2023 Europe – Accelerate your journey, took place in London. It was a day full of exciting announcements, informative and visionary keynotes, mainstage spotlight sessions on market trends, and how-to breakout sessions on how to speed up the move to a composable architecture.

    Jose Valles, Sitecore President of EMEA, delivered the opening remarks and welcomed everyone to the event, then introduced our CEO Steve Tzikakis to deliver his keynote.
    
    Steve emphasized to all the brands in attendance, that despite recent economic headwinds including rising inflation, higher interest rates, and shrinking budgets, today offers an incredible chance to reshape how they are delivering digital experiences to their customers.
    
    “I’m personally convinced that the time is now,” he said. “Innovations emerge in a time of crisis, and it should be looked at as an opportunity to differentiate your position.” Adding, “As a company that serves some of the most recognizable brands in the world, we’ve made it our mission to help our customers create brilliant experiences.”
    
    He also mentioned that the brands that have embraced Sitecore’s composable products are seeing amazing time to value.
    
    “At a time when margins matter, our customers are reporting that they are seeing a break-even point after only 9-10 months,” he said.
    
    Steve then capped his keynote with the announcement that Sitecore will soon be offering deep integration with ChatGPT across several of our products, which is sure to have immediate and long-term benefits for marketers to better scale and optimize their content.
    
    “Innovation will continue to be part of our DNA,” Steve said.`,
  },
  {
    id: '',
    heading: 'How AI-powered CDPs drive exceptional CX',
    imageUrl:
      'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547',
    description: `A smart hub Customer Data Platform brings together data management, intelligence, and orchestration for reimagining the customer experience.Is your business set up to thrive in a customer-centric world? If the rapid pace of innovation has taught us anything, it’s to recognize that what is working for us today will likely not be enough to win tomorrow’s customers. As more brands move to a digital-first model, consumer expectations for a dynamic and personalized experience continue to rise. Marketers now understand that in order to build customer relationships that stand the test of time, they need to deliver the right experiences across all channels, and at increasingly precise moments.

    This is difficult enough to do for a small test campaign – nearly impossible for many organizations to accomplish at an enterprise scale. And adding another layer of complexity, we now have a new trend to navigate: a key source of data – third-party cookies – is going away, making first-party data (and privacy compliance) ever more critical to success. You may already have a basic customer data platform (CDP) in place to unify information from disparate enterprise systems. The question is, does your CDP have the power to drive the kinds of rich customer experiences (CX) that will determine success in the future?
    
    When you combine the data management capabilities of a CDP with the decision-making advantages of artificial intelligence (AI) and then take it all the way through to orchestration with a marketing hub, you have a futureproof approach to the next era of CX.`,
  },
];
