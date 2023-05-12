// import Link from 'next/link';
// import React, { useContext } from 'react';
// import { Button, Collapse, Dropdown, Form } from 'react-bootstrap';
// import PollCard from './PollCard';
// import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';
// import darkModeCss from '../assets/darkTheme.module.css';
// import styles from '../assets/addPost.module.css';
// import bookmarkImage from '../assets/images/bookmark-outline.svg';
// import copylink from '../assets/images/copylink.svg';
// import reportPostImage from '../assets/images/flag-icon.svg';
// import WebContext from 'src/Context/WebContext';
// import Deleteimage from '../assets/images/deleteImg.png';
// import BlockUserImage from '../assets/images/BlockUser.jpg';
// import { modifyHtml } from 'assets/helpers/helperFunctions';
// import EventCard from './EventCard';
// import parser from 'html-react-parser';
// import AxiosRequest from 'src/API/AxiosRequest';
// import { voteInPollUrl } from 'assets/helpers/constants';
// import ShowShareCss from '../assets/ShowShare.module.css';
// import share from '../assets/images/share.png';
// import twitter from '../assets/images/twitter.png';
// import whatsapp from '../assets/images/whatsapp.png';
// import linkedin from '../assets/images/linkedin.png';
// import facebook from '../assets/images/facebook.svg';
// import downVote from '../assets/images/dislikeIcon.svg';








// const HelperPost = ({
//   openDoc,
//   post,
//   calculateTimeDifference,
//   user,
//   setReportPostId,
//   setReportPostType,
//   copyPostLinkToClipboard,
//   showReportPostPopup,
//   setSelectedBlockUserItem,
//   setShowBlockUserPopUp,
//   setShowReportUserPopUp,
//   setShowDeletePostPopup,
//   setDeletePostId,
//   like,
//   getAllupVotesAndDownVotes,
//   greylikeimage,
//   setOpenComments,
//   LikePost,
//   comment,
//   handleShowShare,
//   props,
//   postComments,
//   editComment,
//   openCommentReplies,
//   setDeleteCommentId,
//   setShowDeleteCommentPopup


// }: any) => {
//   const { userToken, objectId, userObject, darkMode } = {
//     ...useContext(WebContext),
//   };
//   const voteInAPoll = async (pollId: any, pollOptionId: any) => {
//     updatePollPost(pollId, pollOptionId);
//     await AxiosRequest({
//       method: 'PUT',
//       url: `${voteInPollUrl}${pollId}/poll-option/${pollOptionId}`,
//     });
//   };
//   const EventImage: any = {
//     Seminar:
//       'https://higherlogicdownload.s3.amazonaws.com/APSNET/UploadedImages/tAiEB79vTYq1gz2UEGu1_IMG_2866-L.jpg',
//     Conference: 'https://th.bing.com/th/id/OIP.IXdC6XgETCp5RaM3iQCb6QHaE8?pid=ImgDet&rs=1',
//     Announcement: 'https://th.bing.com/th/id/OIP.zPaWJzUBQwbXDjhCtCtI1gHaE8?pid=ImgDet&rs=1',
//     'Launch Event': 'https://live.staticflickr.com/808/39724254630_e9cdcb8e77_b.jpg',
//     Celebration: 'https://th.bing.com/th/id/OIP.E1RiHHXMHUcq0L0KvprXfQHaEn?pid=ImgDet&rs=1',
//   };
//   return (
//     <div className={`postContainer ${darkMode ? darkModeCss.grey_2 : ''}`} key={post?.id}>
//       <div className="postHeading">
//         <div className="postHeaderLeft">
//           <Link passHref={true} href={`/profile/${post?.createdBy?.objectId}`}>
//             <img
//               className="postUserImage"
//               src={
//                 post?.createdBy?.profilePictureUrl ? post?.createdBy?.profilePictureUrl : user.src
//               }
//               alt="User-Pic"
//             ></img>
//           </Link>

//           <div className="postDetailContainer">
//             <h5 className={`postOwner ${darkMode ? darkModeCss.text_green : ''}`}>
//               <span>{post?.createdBy?.firstName ? post?.createdBy?.firstName : 'Unknown'}</span>
//               &nbsp;
//               <span>{post?.createdBy?.lastName ? post?.createdBy?.lastName : 'User'}</span>
//             </h5>
//             <h6 className="postCreateDate">
//               <img
//                 width="9px"
//                 src="https://cdn-icons-png.flaticon.com/512/2088/2088617.png"
//                 alt="post time"
//                 style={darkMode ? { filter: 'invert(1)', opacity: 1 } : {}}
//               ></img>
//               <span>
//                 {post?.createdOn != 0 &&
//                 post?.createdOn &&
//                 post?.createdOn != undefined &&
//                 post?.createdOn != null
//                   ? calculateTimeDifference(post?.createdOn)
//                   : 'Recently'}
//               </span>
//             </h6>
//           </div>
//         </div>
//         <div className="postHeaderRight">
//           <Dropdown>
//             <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles.dropdownBtn}>
//               <button
//                 onClick={() => {
//                   setReportPostId(post?.id);
//                   setReportPostType(post?.postType);
//                 }}
//                 style={{
//                   border: 'none',
//                   backgroundColor: 'transparent',
//                   padding: '0',
//                 }}
//               >
//                 <img
//                   className="postMoreOptionsImage"
//                   src="https://cdn-icons-png.flaticon.com/512/463/463292.png"
//                   alt="pan"
//                 />
//               </button>
//             </Dropdown.Toggle>

//             <Dropdown.Menu
//               className={`${styles.dropdownMenu} ${darkMode ? darkModeCss.grey_1 : ''}`}
//             >
//               <Dropdown.Item
//                 className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//               >
//                 <div className={styles.overlayItem}>
//                   <div
//                     className={`${styles.dropdownImage} ${
//                       darkMode ? darkModeCss.invertFilter : ''
//                     }`}
//                   >
//                     <NextImage field={bookmarkImage} editable={true} />
//                   </div>
//                   <div className={styles.reportContainerBtn}>Save Post</div>
//                 </div>
//               </Dropdown.Item>
//               <Dropdown.Item
//                 className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//                 onClick={() => {
//                   copyPostLinkToClipboard(post?.id);
//                 }}
//               >
//                 <div className={styles.overlayItem}>
//                   <div
//                     className={`${styles.dropdownImage} ${
//                       darkMode ? darkModeCss.invertFilter : ''
//                     }`}
//                   >
//                     <NextImage field={copylink} editable={true} />
//                   </div>
//                   <div className={styles.reportContainerBtn}>Copy link to post</div>
//                 </div>
//               </Dropdown.Item>
//               {post?.createdBy?.objectId !== objectId ? (
//                 <>
//                   <Dropdown.Item
//                     className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//                     onClick={() => {
//                       showReportPostPopup();
//                     }}
//                   >
//                     <div className={styles.overlayItem}>
//                       <div
//                         className={`${styles.dropdownImage} ${
//                           darkMode ? darkModeCss.invertFilter : ''
//                         }`}
//                       >
//                         <NextImage field={reportPostImage} editable={true} />
//                       </div>
//                       <div className={styles.reportContainerBtn}>Report Post</div>
//                     </div>
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//                     onClick={() => {
//                       setSelectedBlockUserItem(post?.createdBy);
//                       setShowBlockUserPopUp(true);
//                     }}
//                   >
//                     <div className={styles.overlayItem}>
//                       <div
//                         className={`${styles.dropdownImage} ${
//                           darkMode ? darkModeCss.invertFilter : ''
//                         }`}
//                       >
//                         <NextImage field={BlockUserImage} editable={true} />
//                       </div>
//                       <div className={styles.reportContainerBtn}>
//                         Block {post?.createdBy?.firstName + ' ' + post?.createdBy?.lastName}
//                       </div>
//                     </div>
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//                     onClick={() => {
//                       setSelectedBlockUserItem(post?.createdBy);
//                       setShowReportUserPopUp(true);
//                     }}
//                   >
//                     <div className={styles.overlayItem}>
//                       <div
//                         className={`${styles.dropdownImage} ${
//                           darkMode ? darkModeCss.invertFilter : ''
//                         }`}
//                       >
//                         <NextImage field={reportPostImage} editable={true} />
//                       </div>
//                       <div className={styles.reportContainerBtn}>
//                         Report {post?.createdBy?.firstName + ' ' + post?.createdBy?.lastName}
//                       </div>
//                     </div>
//                   </Dropdown.Item>
//                 </>
//               ) : (
//                 ''
//               )}
//               {post?.createdBy?.objectId === objectId ? (
//                 <Dropdown.Item
//                   className={`${styles.dropdownItem} ${darkMode ? darkModeCss.grey_2 : ''}`}
//                   onClick={() => {
//                     setDeletePostId(post?.id);
//                     setShowDeletePostPopup(true);
//                   }}
//                 >
//                   <div className={styles.overlayItem}>
//                     <div className={styles.dropdownImage}>
//                       <NextImage field={Deleteimage} editable={true} />
//                     </div>
//                     <div className={styles.reportContainerBtn}>Delete Post</div>
//                   </div>
//                 </Dropdown.Item>
//               ) : (
//                 ''
//               )}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="postContent">
//         <div className="postMedia">
//           {post?.mediaList?.map((media: any, num: any) => {
//             if (media?.mediaType === 'VIDEO') {
//               return (
//                 <div key={num}>
//                   <video width="100%" src={media?.url} controls></video>
//                 </div>
//               );
//             } else if (media?.mediaType === 'DOCUMENT') {
//               return (
//                 <div className="docPreviewContainer" key={num}>
//                   <span className="openPrevButton">
//                     <button
//                       onClick={() => openDoc(media?.url)}
//                       style={{
//                         padding: '5px',
//                         borderRadius: '20px',
//                         borderColor: 'white',
//                       }}
//                     >
//                       <img
//                         width="50px"
//                         src="https://cdn-icons-png.flaticon.com/512/2991/2991112.png"
//                         alt={num}
//                         style={{ margin: '10px' }}
//                       ></img>
//                       {'DocFile'}
//                     </button>
//                   </span>
//                 </div>
//               );
//             } else if (media?.mediaType === 'IMAGE') {
//               return (
//                 <div key={num}>
//                   <img
//                     width="100%"
//                     src={media?.url}
//                     alt={media?.id}
//                     style={{ margin: '0 0 15px 0', objectFit: 'contain' }}
//                   ></img>
//                 </div>
//               );
//             }
//             return '';
//           })}
//         </div>
//         {post?.postType === 'EVENT' ? (
//           <>
//             <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
//               {parser(modifyHtml(post?.description))}
//             </div>
//             <EventCard
//               heading={post?.event?.title}
//               description={post?.event?.description}
//               date={post?.event?.eventDate}
//               eventType={post?.event?.eventType}
//               url={EventImage[post?.event?.eventType]}
//             />
//           </>
//         ) : post?.postType === 'POLL' ? (
//           <>
//             <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
//               {parser(modifyHtml(post?.description))}
//             </div>
//             <PollCard pollPost={{ poll: post?.poll }} voteInAPoll={voteInAPoll} />
//           </>
//         ) : post?.postType === 'BLOG_POST' ? (
//           <>
//             <div className={`blogHeading ${darkMode ? darkModeCss.text_green : ''}`}>
//               {post?.blog?.heading}
//             </div>
//             <img style={{ width: '100%' }} src={post?.blog?.imageUrl} alt="Post Image" />
//             <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
//               {parser(modifyHtml(post?.blog?.description))}
//             </div>
//           </>
//         ) : (
//           <div className={`postDescription ${darkMode ? 'darkModeDescription' : ''}`}>
//             {parser(modifyHtml(post?.description))}
//           </div>
//         )}
//       </div>

//       <div className={styles.postFooterContainer}>
//         <div className={styles.likeContainer}>
//           <button
//             className={styles.likeButton}
//             style={darkMode ? { backgroundColor: 'transparent' } : {}}
//             onClick={() => LikePost(post?.id)}
//             disabled={post?.isRespPending}
//           >
//             <NextImage
//               field={post?.isLikedByUser ? like : greylikeimage}
//               editable={true}
//               alt="PostItems"
//               width={18}
//               height={18}
//             />
//             <span
//               className={styles.likePost}
//               style={post?.isLikedByUser ? { color: '#2e86f9' } : {}}
//             >
//               {post?.isLikedByUser ? 'Liked Post' : 'Like Post'}
//             </span>
//           </button>

//           <div className={styles.likeCount}>
//             {post?.postMeasures?.likeCount ? post?.postMeasures?.likeCount : '0'}
//           </div>
//         </div>
//         <div className={styles.commentContainer}>
//           <button
//             className={styles.commentButton}
//             style={darkMode ? { backgroundColor: 'transparent' } : {}}
//             onClick={() => setOpenComments(post.id, !post.isOpenComment)}
//             aria-controls="anotherCommentsContainer"
//             aria-expanded={post?.isOpenComment}
//             disabled={post?.isRespPending}
//           >
//             <NextImage field={comment} editable={true} alt="PostItems" width={18} height={18} />
//             <span className={styles.commentPost}>Comment</span>
//           </button>
//           <div className={styles.commentCount}>
//             {post?.postMeasures?.commentCount ? post?.postMeasures?.commentCount : '0'}
//           </div>
//         </div>

//         {/* <div className={styles.shareContainer}>
//     <button
//       className={styles.shareButton}
//       onClick={() => {}}
//       aria-controls="anotherCommentsContainer"
//       aria-expanded={post?.isOpenComment}
//       disabled={post?.isRespPending}
//     >
//       <NextImage field={share} editable={true} alt="PostItems" width={18} height={18} />
//     </button>
//     <div className={styles.sharePost}>Share</div>
//   </div> */}

//         <div className={styles.shareContainer}>
//           <Dropdown style={{ alignItems: 'center', display: 'flex' }}>
//             <Dropdown.Toggle
//               variant="secondary"
//               id="dropdown-basic"
//               className={ShowShareCss.dropdownBtn}
//             >
//               <button
//                 onClick={() => handleShowShare(post.id, !post?.showShare)}
//                 className={styles.shareButton}
//                 style={darkMode ? { backgroundColor: 'transparent' } : {}}
//                 disabled={post?.isRespPending}
//               >
//                 <img src={share.src} alt="SharePost" />
//                 <div className={styles.sharePost}>Share</div>
//               </button>
//             </Dropdown.Toggle>

//             <Dropdown.Menu
//               className={`${ShowShareCss.dropdownMenu} ${darkMode ? darkModeCss.grey_1 : ''}`}
//             >
//               <Dropdown.Item
//                 className={`${ShowShareCss.dropdownItem} ${
//                   darkMode ? ShowShareCss.darkModeActive : ''
//                 }`}
//                 target="_blank"
//                 href={`${props?.fields?.data?.datasource?.whatsApp?.jsonValue?.value}${process.env.PUBLIC_URL}/post/${post.id}&utm_source=whatsapp&utm_medium=social&utm_term=${post.id}`}
//               >
//                 <div className={ShowShareCss.overlayItem}>
//                   <div className={ShowShareCss.dropdownImage}>
//                     <NextImage
//                       className={ShowShareCss.whatsappImage}
//                       field={whatsapp}
//                       editable={true}
//                       width={25}
//                       height={25}
//                     />
//                   </div>
//                   <span className={ShowShareCss.targetIcon}>Share on WhatsApp</span>
//                 </div>
//               </Dropdown.Item>
//               <Dropdown.Item
//                 className={`${ShowShareCss.dropdownItem} ${
//                   darkMode ? ShowShareCss.darkModeActive : ''
//                 }`}
//                 target="_blank"
//                 href={`${props?.fields?.data?.datasource?.twitter?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=twitter&utm_medium=social&utm_term=${post.id}`}
//               >
//                 <div className={ShowShareCss.overlayItem}>
//                   <div className={ShowShareCss.dropdownImage}>
//                     <NextImage
//                       className={ShowShareCss.whatsappImage}
//                       field={twitter}
//                       editable={true}
//                       width={25}
//                       height={25}
//                     />
//                   </div>
//                   <span className={ShowShareCss.targetIcon}>Share on Twitter</span>
//                 </div>
//               </Dropdown.Item>
//               <Dropdown.Item
//                 className={`${ShowShareCss.dropdownItem} ${
//                   darkMode ? ShowShareCss.darkModeActive : ''
//                 }`}
//                 target="_blank"
//                 href={`${props?.fields?.data?.datasource?.linkedIn?.jsonValue?.value}?url=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=linkdeIn&utm_medium=social&utm_term=${post.id}`}
//               >
//                 <div className={ShowShareCss.overlayItem}>
//                   <div className={ShowShareCss.dropdownImage}>
//                     <NextImage
//                       className={ShowShareCss.whatsappImage}
//                       field={linkedin}
//                       editable={true}
//                       width={25}
//                       height={25}
//                     />
//                   </div>
//                   <span className={ShowShareCss.targetIcon}>Share on LinkedIn</span>
//                 </div>
//               </Dropdown.Item>
//               <Dropdown.Item
//                 className={`${ShowShareCss.dropdownItem} ${
//                   darkMode ? ShowShareCss.darkModeActive : ''
//                 }`}
//                 target="_blank"
//                 href={`${props?.fields?.data?.datasource?.facebook?.jsonValue?.value}?u=${process.env.PUBLIC_URL}/post/${post.id}&utm_source=facebook&utm_medium=social&utm_term=${post.id}`}
//               >
//                 <div className={ShowShareCss.overlayItem}>
//                   <div className={ShowShareCss.dropdownImage}>
//                     <NextImage
//                       className={ShowShareCss.whatsappImage}
//                       field={facebook}
//                       editable={true}
//                       width={25}
//                       height={25}
//                     />
//                   </div>
//                   <span className={ShowShareCss.targetIcon}>Share on Facebook</span>
//                 </div>
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>

//       <Collapse in={post?.isOpenComment}>
//         <div id="anotherCommentsContainer" className="loadCommentContainer">
//           <Form
//             onSubmit={(e) => {
//               postComments(post?.id, e);
//             }}
//             style={{ border: '1px', borderColor: 'black' }}
//           >
//             <Form.Group
//               className="mb-2"
//               controlId="comments"
//               style={{ display: 'flex', padding: '5px 15px 0' }}
//             >
//               <img
//                 className="commentUserImage"
//                 src={
//                   userObject?.profilePictureUrl
//                     ? userObject?.profilePictureUrl
//                     : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
//                 }
//                 alt="User-Pic"
//                 style={{ marginLeft: '0' }}
//               ></img>
//               <Form.Control
//                 // onChange={(e) => setPostCommentValue(e.target.value)}
//                 type="text"
//                 placeholder="Write a Comment..."
//                 required
//                 autoFocus
//                 style={{ width: '100%', fontSize: '13px', color: '#a5a9ae' }}
//               />
//               <button type="submit" className="postCommentButton">
//                 Post
//               </button>
//             </Form.Group>
//           </Form>
//           {post?.comments?.map((comment: any) => {
//             return (
//               <>
//                 <div className="commentSection">
//                   <figure>
//                     <img
//                       className="commentUserImage"
//                       src={
//                         comment?.createdBy?.profilePictureUrl
//                           ? comment?.createdBy?.profilePictureUrl
//                           : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
//                       }
//                       alt="User-Pic"
//                       style={{
//                         marginLeft: '0',
//                       }}
//                     ></img>
//                   </figure>
//                   <div
//                     className="commentContainer"
//                     id={comment?.id}
//                     style={{
//                       padding: '10px',
//                       backgroundColor: '#F0F0F0',
//                       borderRadius: '10px',
//                     }}
//                   >
//                     <h5 className="commentHeadingTop">
//                       {comment?.createdBy?.firstName} {comment?.createdBy?.lastName}
//                     </h5>
//                     {comment?.isEditOn ? (
//                       <>
//                         <Form
//                           style={{ display: 'flex', marginTop: '8px' }}
//                           onSubmit={(e) => editComment(e, post?.id, comment?.id)}
//                         >
//                           <Form.Group style={{ width: '100%' }} controlId="formBasicEmail">
//                             <Form.Control type="text" defaultValue={comment?.text} />
//                           </Form.Group>
//                           <Button
//                             style={{
//                               marginLeft: '10px',
//                               backgroundColor: '#47D7AC',
//                               color: 'white',
//                               borderRadius: '5px',
//                               border: 'none',
//                             }}
//                             variant="primary"
//                             type="submit"
//                           >
//                             Save
//                           </Button>
//                         </Form>
//                         {/* <span>
//                     <p className="commentHeading" contentEditable={comment?.isEditOn}>
//                       {comment?.text}
//                     </p>{' '}
//                     <button
//                       style={{
//                         border: 'none',
//                         backgroundColor: '#47D7AC',
//                         color: 'white',
//                         borderRadius: '5px',
//                         marginTop: '5px',
//                       }}
//                     >
//                       save
//                     </button>
//                   </span> */}
//                       </>
//                     ) : (
//                       <p className="commentHeading">{comment?.text}</p>
//                     )}
//                     <div
//                       onClick={() => getAllupVotesAndDownVotes(comment?.id)}
//                       className="upvoteDownvoteContainer"
//                     >
//                       <div className="likecomments">
//                         <img
//                           className="likecomments"
//                           src="https://cdn-icons-png.flaticon.com/512/739/739231.png"
//                           alt="Like"
//                         />
//                       </div>
//                       <div className="likecomments">
//                         <img className="likecomments" src={downVote.src} alt="Dislike" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <div style={{ marginLeft: '55px' }}>
//                     {/* <span onClick={() => handleUpvote(comment?.id)}>
//                  <img
//                     className="likecomments"
//                     src={
//                        post?.isLikedByUser
//                        ? 'https://cdn-icons-png.flaticon.com/512/739/739231.png'
//                        : 'https://cdn-icons-png.flaticon.com/512/126/126473.png'
//                     }
//                     //https://cdn-icons-png.flaticon.com/512/739/739231.png
//                     alt="actions"
//                  />
//               </span>
//               <span onClick={() => handleDownvote(comment?.id)}>
//                  <img
//                     width="30px"
//                     style={{ margin: '5px' }}
//                     className="likecomments"
//                     src="https://img.icons8.com/ios/256/thumbs-down.png"
//                     alt="downVote"
//                  />
//               </span> */}
//                     <button
//                       onClick={() =>
//                         openCommentReplies(post?.id, comment?.id, !comment?.isOpenReply)
//                       }
//                       aria-controls="repliesContainer"
//                       aria-expanded={comment?.isOpenReply}
//                       className="commentReply"
//                       disabled={comment?.isRespPending}
//                       style={comment?.isRespPending ? { opacity: 0.5 } : {}}
//                     >
//                       Reply
//                     </button>
//                     <span className="commentPostDate" style={{ fontSize: '12px' }}>
//                       {' '}
//                       {calculateTimeDifference(comment?.createdOn)}
//                     </span>
//                     {comment?.createdBy.objectId === objectId && objectId ? (
//                       <button
//                         disabled={comment?.isRespPending}
//                         style={comment?.isRespPending ? { opacity: 0.5 } : {}}
//                         onClick={() => {
//                           setDeleteCommentId({ postId: post?.id, commentId: comment?.id });
//                           setShowDeleteCommentPopup(true);
//                         }}
//                         className="commentReply"
//                       >
//                         Delete
//                       </button>
//                     ) : (
//                       ''
//                     )}
//                     {comment?.createdBy.objectId === objectId && objectId ? (
//                       <button
//                         disabled={comment?.isRespPending}
//                         style={comment?.isRespPending ? { opacity: 0.5 } : {}}
//                         onClick={() => {
//                           commentEditOn(post?.id, comment?.id, !comment?.isEditOn);
//                         }}
//                         className="commentReply"
//                       >
//                         Edit
//                       </button>
//                     ) : (
//                       ''
//                     )}
//                   </div>
//                   <Collapse in={comment?.isOpenReply}>
//                     <div style={{ position: 'relative', left: '10%', width: '88%' }}>
//                       <Form
//                         onSubmit={(e) => {
//                           postCommentReply(post?.id, comment?.id, e);
//                         }}
//                         style={{ border: '1px', borderColor: 'black' }}
//                       >
//                         <Form.Group
//                           controlId="comments"
//                           style={{ display: 'flex', padding: '5px 0 15px 15px' }}
//                         >
//                           <img
//                             width="32px"
//                             className="commentUserImage"
//                             src={
//                               userObject?.profilePictureUrl
//                                 ? userObject?.profilePictureUrl
//                                 : user.src
//                             }
//                             alt="User-Pic"
//                             style={{ marginLeft: '0' }}
//                           ></img>
//                           <Form.Control
//                             // onChange={(e) => setPostCommentValue(e.target.value)}
//                             type="text"
//                             placeholder="Write a Reply..."
//                             required
//                             autoFocus
//                             style={{ width: '100%', color: '#a5a9ae', fontSize: '13px' }}
//                           />
//                           <button type="submit" className="postCommentButton">
//                             Reply
//                           </button>
//                         </Form.Group>
//                       </Form>
//                       {comment?.replies?.map((reply: any) => {
//                         return (
//                           <>
//                             <div className="commentSection">
//                               <figure>
//                                 <img
//                                   className="commentUserImage"
//                                   src={
//                                     reply?.createdBy?.profilePictureUrl
//                                       ? reply?.createdBy?.profilePictureUrl
//                                       : user.src
//                                   }
//                                   alt="User-Pic"
//                                   style={{
//                                     marginLeft: '0',
//                                   }}
//                                 ></img>
//                               </figure>
//                               <div
//                                 id={reply?.id}
//                                 style={{
//                                   padding: '10px',
//                                   backgroundColor: '#F0F0F0',
//                                   borderRadius: '10px',
//                                 }}
//                                 className="commentContainer"
//                               >
//                                 <h5 className="commentHeadingTop">
//                                   {reply?.createdBy?.firstName} {reply?.createdBy?.lastName}{' '}
//                                 </h5>
//                                 {reply?.isEditOn ? (
//                                   <Form
//                                     style={{ display: 'flex', marginTop: '8px' }}
//                                     onSubmit={(e) => editReply(e, post?.id, comment?.id, reply?.id)}
//                                   >
//                                     <Form.Group
//                                       style={{ width: '100%' }}
//                                       controlId="formBasicEmail"
//                                     >
//                                       <Form.Control type="text" defaultValue={reply?.text} />
//                                     </Form.Group>
//                                     <Button
//                                       style={{
//                                         marginLeft: '10px',
//                                         backgroundColor: '#47D7AC',
//                                         color: 'white',
//                                         borderRadius: '5px',
//                                         border: 'none',
//                                       }}
//                                       variant="primary"
//                                       type="submit"
//                                     >
//                                       Save
//                                     </Button>
//                                   </Form>
//                                 ) : (
//                                   <p className="commentHeading">{reply?.text}</p>
//                                 )}
//                                 <div
//                                   onClick={() => getAllupVotesAndDownVotes(reply?.id)}
//                                   className="upvoteDownvoteContainer"
//                                 >
//                                   <div className="likecomments">
//                                     <img
//                                       className="likecomments"
//                                       src="https://cdn-icons-png.flaticon.com/512/739/739231.png"
//                                       alt="Like"
//                                     />
//                                   </div>
//                                   <div className="likecomments">
//                                     <img
//                                       className="likecomments"
//                                       src={downVote.src}
//                                       alt="Dislike"
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>

//                             <div
//                               style={{
//                                 marginLeft: '55px',
//                               }}
//                             >
//                               {/* <span onClick={() => handleUpvote(reply?.id)}>
//                           <img
//                           style={{ margin: '5px' }}
//                           width="30px"
//                           className="likecomments"
//                           src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
//                           alt="upvote"
//                           />
//                        </span>
//                        <span onClick={() => handleDownvote(reply?.id)}>
//                           <img
//                           width="30px"
//                           style={{ margin: '5px' }}
//                           className="likecomments"
//                           src="https://img.icons8.com/ios/256/thumbs-down.png"
//                           alt="downVote"
//                           />
//                        </span> */}
//                               <button
//                                 aria-controls="replyOfReplyContainer"
//                                 aria-expanded={reply?.isOpenReplyOfReply}
//                                 className="commentReply"
//                                 onClick={() =>
//                                   openReplyOfReply(
//                                     post?.id,
//                                     comment?.id,
//                                     reply?.id,
//                                     !reply?.isOpenReplyOfReply
//                                   )
//                                 }
//                                 disabled={reply?.isRespPending}
//                                 style={reply?.isRespPending ? { opacity: 0.5 } : {}}
//                               >
//                                 Reply
//                               </button>
//                               <span className="commentPostDate" style={{ fontSize: '12px' }}>
//                                 {' '}
//                                 {calculateTimeDifference(reply?.createdOn)}
//                               </span>
//                               {comment?.createdBy.objectId === objectId && objectId ? (
//                                 <button
//                                   disabled={comment?.isRespPending}
//                                   onClick={() => {
//                                     setDeleteCommentId({
//                                       postId: post?.id,
//                                       commentId: comment?.id,
//                                       replyId: reply?.id,
//                                     });
//                                     setShowDeleteCommentPopup(true);
//                                   }}
//                                   className="commentReply"
//                                   style={reply?.isRespPending ? { opacity: 0.5 } : {}}
//                                 >
//                                   Delete
//                                 </button>
//                               ) : (
//                                 ''
//                               )}
//                               {reply?.createdBy?.objectId === objectId && objectId ? (
//                                 <button
//                                   disabled={reply?.isRespPending}
//                                   style={reply?.isRespPending ? { opacity: 0.5 } : {}}
//                                   onClick={() => {
//                                     replyEditOn(post?.id, comment?.id, reply?.id, !reply?.isEditOn);
//                                   }}
//                                   className="commentReply"
//                                 >
//                                   Edit
//                                 </button>
//                               ) : (
//                                 ''
//                               )}
//                             </div>
//                             <Collapse in={reply?.isOpenReplyOfReply}>
//                               <div style={{ position: 'relative', left: '10%', width: '88%' }}>
//                                 <Form
//                                   onSubmit={(e) => {
//                                     postCommentReply(post?.id, comment?.id, e);
//                                   }}
//                                   style={{ border: '1px', borderColor: 'black' }}
//                                 >
//                                   <Form.Group controlId="comments" style={{ display: 'flex' }}>
//                                     <img
//                                       width="32px"
//                                       className="commentUserImage"
//                                       src={
//                                         userObject?.profilePictureUrl
//                                           ? userObject?.profilePictureUrl
//                                           : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
//                                       }
//                                       alt="User-Pic"
//                                       style={{ marginLeft: '0' }}
//                                     ></img>
//                                     <Form.Control
//                                       // onChange={(e) => setPostCommentValue(e.target.value)}
//                                       type="text"
//                                       placeholder="Write a Reply..."
//                                       required
//                                       autoFocus
//                                       style={{
//                                         width: '100%',
//                                         color: '#a5a9ae',
//                                         fontSize: '13px',
//                                       }}
//                                     />
//                                     <button type="submit" className="postCommentButton">
//                                       Reply
//                                     </button>
//                                   </Form.Group>
//                                 </Form>
//                               </div>
//                             </Collapse>
//                           </>
//                         );
//                       })}
//                       {comment?.hasReply ? (
//                         <div
//                           style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             marginBottom: '16px',
//                             marginTop: '16px',
//                           }}
//                         >
//                           {comment.isLoadingReplies ? (
//                             <Spinner animation="border" />
//                           ) : (
//                             <button
//                               onClick={() => loadCommentReplies(post?.id, comment?.id)}
//                               className="postCommentButton"
//                               style={{
//                                 marginLeft: '0',
//                               }}
//                             >
//                               <span>Load Replies...</span>
//                             </button>
//                           )}
//                         </div>
//                       ) : (
//                         ''
//                       )}
//                     </div>
//                   </Collapse>
//                 </div>
//               </>
//             );
//           })}
//           {post?.postMeasures?.commentCount > 0 ? (
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//               {post.isLoadingComments ? (
//                 <Spinner animation="border" />
//               ) : (
//                 <button
//                   onClick={() => loadComments(post.id)}
//                   className="postCommentButton"
//                   style={{
//                     marginBottom: '16px',
//                     marginLeft: '0',
//                   }}
//                 >
//                   <span>Load Comments...</span>
//                 </button>
//               )}
//             </div>
//           ) : (
//             ''
//           )}
//         </div>
//       </Collapse>
//     </div>
//   );
// };

// export default HelperPost;
// function updatePollPost(pollId: any, pollOptionId: any) {
//   throw new Error('Function not implemented.');
// }



import React from 'react'

const HelperPost = () => {
  return (
    <div>HelperPost</div>
  )
}

export default HelperPost