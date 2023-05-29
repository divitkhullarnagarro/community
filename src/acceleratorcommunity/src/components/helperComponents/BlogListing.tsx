import {
  getMyBlogsUrl,
  getSuggestedBlogsUrl,
  getBookmarkedMyBlogsUrl,
} from 'assets/helpers/constants';
import WebContext from '../../Context/WebContext';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import style from './../../assets/blogListing.module.css';
import darkTheme from './../../assets/darkTheme.module.css';
// import event from './../../assets/images/event.svg';
// import { Blog } from './../../assets/helpers/types';
import AxiosRequest from 'src/API/AxiosRequest';
import { AxiosResponse } from 'axios';
import BlogListingSkeleton from 'components/skeletons/BlogListingSkeleton';
import parser from 'html-react-parser';
const tablist = ['My Blogs', 'Suggested Blogs', 'Bookmarked Blogs'];

function BlogListing() {
  const { darkMode } = { ...useContext(WebContext) };
  const [activeTab, setActiveTab] = useState('My Blogs');
  const [blogList, setBlogList] = useState<any>([]);
  const [skeletonVisible, setSkeletonVisible] = useState(true);
  const getMyBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getMyBlogsUrl,
    });

    // const myblogData = data.data.map((ele: any) => ele.blog);
    setBlogList(data?.data);
    setSkeletonVisible(false);
  };
  const getSuggestedBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getSuggestedBlogsUrl,
    });
    // const suggesteBblogData = data.data.map((ele: any) => ele.blog);
    setBlogList(data?.data);
    setSkeletonVisible(false);
  };
  const getBookmarkedMyBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getBookmarkedMyBlogsUrl,
    });
    // const bookmarkedBlogData = data.data.map((ele: any) => ele.blog);
    setBlogList(data?.data);
    setSkeletonVisible(false);
  };
  useEffect(() => {
    if (activeTab == 'My Blogs') {
      setSkeletonVisible(true);
      setBlogList([]);
      getMyBlogs();
    } else if (activeTab == 'Suggested Blogs') {
      setSkeletonVisible(true);
      setBlogList([]);
      getSuggestedBlogs();
    } else {
      setSkeletonVisible(true);
      setBlogList([]);
      getBookmarkedMyBlogs();
    }
  }, [activeTab]);

  const router = useRouter();
  const navigateToEventPage = (id: string) => {
    router.push(`/post?postId=${id}`);
  };
  // console.log('ertyuirwerty', blogList);
  return (
    <>
      <div className={style.blogListingPage}>
        <div className={style.blogListNavbar}>
          <div className={style.blogTabList}>
            {tablist.map((ele, index) => (
              <div
                key={index}
                className={style.blogTab}
                onClick={() => setActiveTab(ele)}
                style={activeTab === ele ? { background: '#47d7ac', color: 'white' } : {}}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>
        <div className={`${style.blogListcontent} ${darkMode && darkTheme.darkMode_bgChild}`}>
          {blogList.length > 0 ? (
            <div className={style.blogList}>
              {blogList.map((ele: any, i: number) => (
                <div
                  key={i}
                  className={`${style.blogCard} ${darkMode && darkTheme.darkMode_textBg}`}
                >
                  <div className={style.BlogImage}>
                    <Image
                      style={{ cursor: 'pointer' }}
                      src={
                        ele?.blog?.imageUrl
                          ? ele?.blog?.imageUrl
                          : 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547'
                      }
                      alt={ele?.blog?.heading}
                      height={200}
                      width={300}
                      placeholder="blur"
                      //   blurDataURL={placeholderImg.src}
                      blurDataURL={
                        ele?.blog?.imageUrl
                          ? ele?.blog?.imageUrl
                          : 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547'
                      }
                      onClick={() => navigateToEventPage(ele.id)}
                    />
                  </div>
                  <div>
                    <div className={style.blogCardContent}>
                      <div
                        className={`${style.blogHeading} ${darkMode && darkTheme.text_green}`}
                        title={ele?.blog?.heading}
                      >
                        {ele?.blog?.heading.length <= 70
                          ? ele?.blog?.heading
                          : ele?.blog?.heading.substring(0, 70) + '...'}
                      </div>
                      <div
                        className={`${style.blogDescription} ${darkMode && darkTheme.text_light}`}
                      >
                        {parser(ele?.blog?.description)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !skeletonVisible ? (
            <div className={style.blogList}>No Blogs Found</div>
          ) : (
            <BlogListingSkeleton />
          )}
        </div>
      </div>
    </>
  );
}

export default BlogListing;
