import React, { useState } from 'react';
import styles from '../assets/searchFilterContainer.module.css';
import { voteInPollUrl } from 'assets/helpers/constants';
import AxiosRequest from 'src/API/AxiosRequest';
import SearchPost from './SearchPost';

const PollConatiner = (props: any) => {
  let [myAnotherArr, setMyAnotherArr] = useState<any>([]);

  const voteInAPoll = async (pollId: any, pollOptionId: any) => {
    updatePollPost(pollId, pollOptionId);
    await AxiosRequest({
      method: 'PUT',
      url: `${voteInPollUrl}${pollId}/poll-option/${pollOptionId}`,
    });
  };

  //Function to update with latest data of poll
  function updatePollPost(pollId: any, pollOptionId: any) {
    const updatedPollPosts = myAnotherArr.map((pollPost: any) => {
      if (pollPost?.poll?.id === pollId) {
        const updatedPollOptions = pollPost?.poll?.pollOptions?.map((option: any) => {
          if (option?.id === pollOptionId) {
            const updatedOption = { ...option };
            updatedOption.responseCount = updatedOption.responseCount + 1 || 1;
            return updatedOption;
          } else {
            return option;
          }
        });
        return {
          ...pollPost,
          poll: {
            ...pollPost.poll,
            pollResponseCount: pollPost?.poll?.pollResponseCount
              ? pollPost?.poll?.pollResponseCount + 1
              : 1,
            pollOptions: updatedPollOptions,
            optedPollOptionID: pollOptionId,
          },
        };
      } else {
        return pollPost;
      }
    });
    setMyAnotherArr(updatedPollPosts);
  }

  return (
    <div className={styles.parentContainer}>
      <div className={styles.filterContainer}>
        {props?.searchedData?.map((data: any) => {
          return data?.sourceAsMap?.postType === 'POLL' ? (
            <SearchPost
              pollPost={{ poll: data?.sourceAsMap?.poll }}
              poll={data?.sourceAsMap?.poll}
              voteInAPoll={voteInAPoll}
            />
          ) : (
            ''
          );
        })}
      </div>
    </div>
  );
};

export default PollConatiner;
