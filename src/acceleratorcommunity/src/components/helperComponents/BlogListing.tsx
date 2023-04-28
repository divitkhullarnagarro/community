import { suggestedBlogs, bookmarkedBlogs } from 'assets/helpers/constants';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './../../assets/blogListing.module.css';
import event from './../../assets/images/event.svg';
import { Blog } from './../../assets/helpers/types';
import AxiosRequest from 'src/API/AxiosRequest';
import { AxiosResponse } from 'axios';
import BlogListingSkeleton from 'components/skeletons/BlogListingSkeleton';
const tablist = ['My Blogs', 'Suggested Blogs', 'Bookmarked Blogs'];

function BlogListing() {
  const [activeTab, setActiveTab] = useState('My Blogs');
  const [blogList, setBlogList] = useState<Blog>([] as Blog);
  const getMyBlogs = async () => {
    const data: AxiosResponse<any> = await AxiosRequest({
      method: 'GET',
      url: 'https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/post/my-blogs',
    });
    const myblogData = data.data.map((ele: any) => ele.blog);
    setBlogList(myblogData);
  };
  useEffect(() => {
    if (activeTab == 'My Blogs') {
      getMyBlogs();
    } else if (activeTab == 'Suggested Blogs') {
      setBlogList(suggestedBlogs);
    } else {
      setBlogList(bookmarkedBlogs);
    }
  }, [activeTab]);

  const router = useRouter();
  const navigateToEventPage = (event: string) => {
    router.push(`/event/${event}`);
  };
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
                    src={event.src}
                    alt={ele.heading}
                    height={200}
                    width={300}
                    placeholder="blur"
                    //   blurDataURL={placeholderImg.src}
                    blurDataURL={'placeholderImg.src'}
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
                    <div className={style.blogDescription}>
                      {ele.description.length <= 250
                        ? ele.heading
                        : ele.description.substring(0, 250) + '...'}
                    </div>
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
