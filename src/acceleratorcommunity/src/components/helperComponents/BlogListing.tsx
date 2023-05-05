import {
  getMyBlogsUrl,
  getSuggestedBlogsUrl,
  getBookmarkedMyBlogsUrl,
} from 'assets/helpers/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './../../assets/blogListing.module.css';
// import event from './../../assets/images/event.svg';
import { Blog } from './../../assets/helpers/types';
import AxiosRequest from 'src/API/AxiosRequest';
import { AxiosResponse } from 'axios';
import BlogListingSkeleton from 'components/skeletons/BlogListingSkeleton';
import parser from 'html-react-parser';
const tablist = ['My Blogs', 'Suggested Blogs', 'Bookmarked Blogs'];

function BlogListing() {
  const [activeTab, setActiveTab] = useState('My Blogs');
  const [blogList, setBlogList] = useState<Blog>([] as Blog);
  const getMyBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getMyBlogsUrl,
    });
    const myblogData = data.data.map((ele: any) => ele.blog);
    setBlogList(myblogData);
  };
  const getSuggestedBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getSuggestedBlogsUrl,
    });
    const suggesteBblogData = data.data.map((ele: any) => ele.blog);
    setBlogList(suggesteBblogData);
  };
  const getBookmarkedMyBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: getBookmarkedMyBlogsUrl,
    });
    const bookmarkedBlogData = data.data.map((ele: any) => ele.blog);
    setBlogList(bookmarkedBlogData);
  };
  useEffect(() => {
    if (activeTab == 'My Blogs') {
      getMyBlogs();
    } else if (activeTab == 'Suggested Blogs') {
      getSuggestedBlogs();
    } else {
      getBookmarkedMyBlogs();
    }
  }, [activeTab]);

  const router = useRouter();
  const navigateToEventPage = (event: string) => {
    router.push(`/event/${event}`);
  };
  console.log('ertyuirwerty', blogList);
  return blogList.length > 0 ? (
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
        <div className={style.blogListcontent}>
          <div className={style.blogList}>
            {blogList.map((ele, i) => (
              <div key={i} className={style.blogCard}>
                <div className={style.BlogImage}>
                  <Image
                    style={{ cursor: 'pointer' }}
                    src={
                      ele.imageUrl
                        ? ele.imageUrl
                        : 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547'
                    }
                    alt={ele.heading}
                    height={200}
                    width={300}
                    placeholder="blur"
                    //   blurDataURL={placeholderImg.src}
                    blurDataURL={
                      ele.imageUrl
                        ? ele.imageUrl
                        : 'https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/blog/content/sitecore-dx-2023-europe-shows-brands-how-to-get-on-a-composable-path/dx23-europe_blog-hero.jpg?md=20230425T191825Z?mw=716&mh=465&hash=DDF8137DC1F93BF9DA09D5213D6EC547'
                    }
                    onClick={() => navigateToEventPage(ele.heading)}
                  />
                </div>
                <div>
                  <div className={style.blogCardContent}>
                    <div className={style.blogHeading} title={ele.heading}>
                      {ele.heading.length <= 30
                        ? ele.heading
                        : ele.heading.substring(0, 30) + '...'}
                    </div>
                    <div className={style.blogDescription}>{parser(ele.description)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <BlogListingSkeleton />
  );
}

export default BlogListing;
