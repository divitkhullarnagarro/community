import React from 'react';
import Event from './Event';
import ImageConatiner from './ImageConatiner';
import TextPost from './TextPost';
import VideoContainer from './VideoContainer';

const AllSearchResult = (props: any) => {
  console.log('alllllllllllllcontainer', props);
  return (
    <div>
      {props?.searchedData?.length > 0
        ? props?.searchedData?.map((data: any) => {
            {
              console.log('data?.sourceAsMap', data?.sourceAsMap?.postType === 'IMAGE');
            }
            return data?.sourceAsMap?.postType === 'IMAGE' ? (
              <ImageConatiner events={data?.sourceAsMap} flag={false} />
            ) : data?.sourceAsMap?.postType === 'EVENT' ? (
              <Event events={data?.sourceAsMap} flag={false} />
            ) : data?.sourceAsMap?.postType === 'TEXT_POST' ? (
              <TextPost events={data?.sourceAsMap} flag={false} />
            ) : data?.sourceAsMap?.postType === 'VIDEO'? (
              <VideoContainer events={data?.sourceAsMap} flag={false} />
            ) : (
              ''
            );
          })
        : ''}
    </div>
  );
};

export default AllSearchResult;
