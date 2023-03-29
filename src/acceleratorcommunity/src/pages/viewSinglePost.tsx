import { Cookie } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import getPostByIdCall from 'src/API/getPostByIdCall';
import WebContext from '../Context/WebContext';

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

  function getQueryParams(url: string): { [key: string]: string } {
    const queryString = url.split('?')[1];
    if (!queryString) {
      return {};
    }
    const params = new URLSearchParams(queryString);
    const result: { [key: string]: string } = {};
    params.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let params = getQueryParams(window?.location?.href);
      setPostId(params?.postId);
    }
    if (
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('RouteToPage') != '' &&
      localStorage.getItem('RouteToPage') != null
    ) {
      localStorage.setItem('RouteToPage', '');
    }
  }, []);

  useEffect(() => {
    if (userToken == '') {
      if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('UserToken') != '' &&
        localStorage.getItem('UserToken') != null
      ) {
        let token = localStorage.getItem('UserToken');
        if (token != null && setUserToken != undefined) {
          setUserToken(token);
        }
      } else {
        if (typeof localStorage !== 'undefined' && typeof window !== 'undefined') {
          let CurrUrl = window?.location?.href;
          localStorage.setItem('RouteToPage', CurrUrl);
          router.push('/login');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (postId != '') {
      getPostByIdCall(userToken, postId).then((response) => {
        console.log('GetPostByIdResponse', response);
        setPost(response?.data?.data);
      });
    }
  }, [postId]);

  if (typeof document !== 'undefined') {
    document.cookie = `${'hello'}=${'world'}`;
  }

  console.log('Post', post);

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
