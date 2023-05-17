const jssConfig = require('./src/temp/config');
const packageConfig = require('./package.json').config;
const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const plugins = require('./src/temp/next-config-plugins') || {};

const publicUrl = getPublicUrl();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: packageConfig.language,
  },

  // Enable React Strict Mode
  reactStrictMode: false,

  images: {
    domains: [
      'sitecoreinfrasa.blob.core.windows.net',
      'horizontal.blog',
      'www.teleinfotoday.com',
      'www.macaw.net',
      'www.aceinfoway.com',
      'wwwsitecorecom.azureedge.net',
      'nkdramblog.files.wordpress.com',
      'images.pexels.com',
      'xmc-nagarro1-communityac2a8e-communityace478.sitecorecloud.io',
      'xmc-nagarro1-communityac830d-communityace1c7.sitecorecloud.io'
    ],
  },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // visitor identification
      {
        source: '/layouts/system/:path*',
        destination: `${jssConfig.sitecoreApiHost}/layouts/system/:path*`,
      },
    ];
  },
};

module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
