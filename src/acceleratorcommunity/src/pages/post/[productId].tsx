import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import getPostByIdCall from 'src/API/getPostByIdCall';
import WebContext from '../../Context/WebContext';

function viewSinglePost() {
  const { userToken, objectId, userObject, setUserToken } = {
    ...useContext(WebContext),
  };

  const router = useRouter();

  //DeleteMe
  userToken;
  objectId;
  userObject;

  let [postId, setPostId] = useState('');
  let [post, setPost] = useState<any>([]);

  function getValueFromCookie(key: string): string | null {
    if (typeof document !== 'undefined') {
      const cookieString = document.cookie;
      const cookies = cookieString.split(';').reduce((acc: any, cookie: string) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        acc[name] = value;
        return acc;
      }, {});

      return cookies[key] || null;
    }
    return null;
  }

  function getQueryParams(url: string): string {
    const path = url.split('?')[0]; // Extract the path from the URL
    const routeSegments = path.split('/'); // Split the path by forward slash
    const lastRoute = routeSegments[routeSegments.length - 1]; // Get the last route segment

    return lastRoute;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPostId(getQueryParams(window?.location?.href));
    }
    if (typeof document != 'undefined') {
      let url = getValueFromCookie('routeToUrl');
      if (url != null) {
        url = decodeURIComponent(url);
      }
      let currUrl = window?.location?.pathname;
      if (currUrl == url) {
        document.cookie = `routeToUrl=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }
  }, []);

  useEffect(() => {
    if (userToken == '') {
      let token = getValueFromCookie('UserToken');
      if (typeof document !== 'undefined' && token != '' && token != null) {
        if (setUserToken != undefined) {
          setUserToken(token);
        }
      } else {
        router.push('/login');
      }
    }
  }, []);

  useEffect(() => {
    if (postId != '') {
      getPostByIdCall(userToken, postId).then((response) => {
        if (response?.status == 200) {
          setPost(response?.data?.data);
        } else router.push('/404');
      });
    }
  }, [postId]);

  // if (typeof document !== 'undefined') {
  //   document.cookie = 'hello=world;path=/';
  // }

  return (
    <>
      <div className="showSinglePostContainer">
        <div>
          <img src="https://placeimg.com/1920/512/any" alt="Banner"></img>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30%' }}>
            {' Created By :  '}
            <div>
              <span>age : </span>
              {post?.createdBy?.age}
            </div>
            <div>
              <span>city : </span>
              {post?.createdBy?.city}
            </div>
            <div>
              <span>country : </span>
              {post?.createdBy?.country}
            </div>
            <div>
              <span>emailId : </span>
              {post?.createdBy?.emailId}
            </div>
            <div>
              <span>firstName : </span>
              {post?.createdBy?.firstName}
            </div>
            <div>
              <span>interests : </span>
              {post?.createdBy?.interests}
            </div>
            <div>
              <span>lastName : </span>
              {post?.createdBy?.lastName}
            </div>
            <div>
              <span>objectId : </span>
              {post?.createdBy?.objectId}
            </div>
            <div>
              <span>profession : </span>
              {post?.createdBy?.profession}
            </div>
            <div>
              <span>profilePictureUrl : </span>
              {post?.createdBy?.profilePictureUrl}
            </div>
            <div>
              <span>speciality : </span>
              {post?.createdBy?.speciality}
            </div>
            <div>
              <span>state : </span>
              {post?.createdBy?.state}
            </div>
          </div>
          <div style={{ width: '70%' }}>
            {'Post : Data '}
            <div>
              <div>
                <span>CreatedOn : </span>
                {post?.createdOn}
              </div>
              <div>
                <span>description : </span>
                {post?.description}
              </div>
              <div>
                <span>id : </span>
                {post?.id}
              </div>
              <div>
                <span>isLikedByUser : </span>
                {post?.isLikedByUser}
              </div>
              <div>
                <span>mediaList : </span>
                {post?.mediaList}
              </div>
              <div>
                <span>postType : </span>
                {post?.postType}
              </div>
              <div>
                <span>likeCount : </span>
                {post?.postMeasures?.likeCount}
              </div>
              <div>
                <span>commentCount : </span>
                {post?.postMeasures?.commentCount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default viewSinglePost;
