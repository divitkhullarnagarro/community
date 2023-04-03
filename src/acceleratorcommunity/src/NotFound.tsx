import Head from 'next/head';
import css404 from './assets/404.module.css'
import logo404 from './assets/images/404logo.png'
import custom404 from './assets/images/custom404.png'
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
/**
 * Rendered in case if we have 404 error
 */
const NotFound = (): JSX.Element => (
  <>
    <Head>
      <title>404: NotFound</title>
    </Head>
    <div className={css404.container}>
    <div className="image">
      <NextImage
        field={custom404}
        editable={true}
      />
    </div>
    <div className={css404.imageContainer}>
    <div className="image" >
      <NextImage
        field={logo404}
        editable={true}
        height = {200}
        width={200}
      />
    </div>
    <div className={css404.textcls}>
      Oops! That page could not be found
    </div>
    </div>
    
    <div className={css404.btn} >
    <Link passHref href={'/'}><a className={css404.linkclass}>GO TO HOMEPAGE</a></Link>
    </div>
      
    </div>
  </>
);

export default NotFound;
