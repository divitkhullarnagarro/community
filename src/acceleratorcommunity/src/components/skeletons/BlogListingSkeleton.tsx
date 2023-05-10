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
          <div className={`${style.blogCard} ${style.blogCardLoader}`}>
            <div className={style.BlogImageLoader}>
              <Skeleton height={200} style={{ cursor: 'pointer' }}/>
            </div>
            <div className={style.blogCardContentLoader}>
              <Skeleton height={20} width={'100%'} className={style.blogHeading} />
              <Skeleton height={20} width={'100%'} className={style.blogDescription} />
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
