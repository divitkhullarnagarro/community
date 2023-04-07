import Head from 'next/head';
import cssError from './assets/500.module.css'
// import logo500 from './assets/images/500logo.png'
import custom500 from './assets/images/500custom.png'
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'next/link';
/**
 * Rendered in case if we have 404 error
 */
const Page500 = (props:any): JSX.Element => (
  <>
    <Head>
      <title>Error</title>
    </Head>
    <div className={cssError.container}>
    <div className="image">
      <NextImage
        field={custom500}
        editable={true}
      />
    </div>
    <div className={cssError.imageContainer}>
      {props?.statusCode}
    {/* <div className="image" >
      <NextImage
        field={logo500}
        editable={true}
        height = {200}
        width={200}
      />
    </div> */}
    <div className={cssError.textcls}>
      Oops! That page could not be found
    </div>
    </div>
    
    <div className={cssError.btn} >
    <Link passHref href={'/'}><a className={cssError.linkclass}>GO TO HOMEPAGE</a></Link>
    </div>
      
    </div>
  </>
);

export default Page500;
