import style from './../../assets/blogListing.module.css';
import Skeleton from 'react-loading-skeleton';

function BlogListingSkeleton() {
  // const tablist = ['My Blogs', 'Suggested Blogs', 'Bookmarked Blogs'];
  const blogList = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {/* <div className={style.blogListingPage}> */}
      {/* <div className={style.blogListNavbar}>
          <div className={style.blogTabList}>
            {tablist.map((ele, index) => (
              <div
                key={index}
                className={style.blogTab}
                // style={index == 0 ? { background: '#47d7ac', color: 'white' } : {}}
              >
                {ele}
              </div>
            ))}
          </div>
        </div> */}
      {/* <div className={style.blogListcontent}> */}
      <div className={style.blogList}>
        {blogList.map(() => (
          <div className={style.blogCard}>
            <div className={style.BlogImage}>
              <Skeleton style={{ cursor: 'pointer' }} height={200} width={300} />
            </div>
            <div>
              <div className={style.blogCardContent}>
                <Skeleton className={style.blogHeading} />
                <Skeleton className={style.blogDescription} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default BlogListingSkeleton;
