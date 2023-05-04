import React from 'react';
import Head from 'next/head';
import {
  Placeholder,
  VisitorIdentification,
  getPublicUrl,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';

// Prefix public assets with a public URL to enable compatibility with Sitecore editors.
// If you're not supporting Sitecore editors, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
}

const Layout = ({ layoutData }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  let ogimage: any = route?.fields?.ogImage?.value;
  ogimage = ogimage?.src;
  let twitterImage: any = route?.fields?.twitterImage?.value;
  twitterImage = twitterImage?.src;
  let twitterCard: any = route?.fields?.twitterCard?.value;
  twitterCard = twitterCard?.src;
  let href = '';
  if (typeof window !== 'undefined') {
    href = window?.location?.href;
  }
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{route?.fields?.pageTitle?.value || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>

        <script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"></script>

        <meta property="og:locale" content={router?.locale} />
        <meta property="og:type" content={route?.fields?.ogType?.value.toString()} />
        <meta property="og:url" content={href} />
        <meta property="og:title" content={route?.fields?.ogTitle?.value.toString()} />
        <meta property="og:description" content={route?.fields?.ogDescription?.value.toString()} />
        <meta property="og:image" content={ogimage} />
        <meta property="og:image:width" content={route?.fields?.ogImageWidth?.value.toString()} />
        <meta property="og:image:height" content={route?.fields?.ogImageHeight?.value.toString()} />
        <meta property="twitter:card" content={route?.fields?.twitterCard?.value.toString()} />
        <meta property="twitter:title" content={route?.fields?.twitterTitle?.value.toString()} />
        <meta
          property="twitter:description"
          content={route?.fields?.twitterDescription?.value.toString()}
        />
        <meta property="twitter:image" content={twitterImage} />
        <meta property="twitter:url" content={href} />
      </Head>

      {/*
        VisitorIdentification is necessary for Sitecore Analytics to determine if the visitor is a robot.
        If Sitecore XP (with xConnect/xDB) is used, this is required or else analytics will not be collected for the JSS app.
        For XM (CMS-only) apps, this should be removed.

        VI detection only runs once for a given analytics ID, so this is not a recurring operation once cookies are established.
      */}
      <VisitorIdentification />
      {/* root placeholder for the app, which we add components to using route data */}
      <div className="header">{route && <Placeholder name="jss-header" rendering={route} />}</div>
      <div className="main">{route && <Placeholder name="jss-main" rendering={route} />}</div>
      <div>{route && <Placeholder name="jss-footer" rendering={route} />}</div>
    </>
  );
};

export default Layout;
