import React from 'react';
import pollCard from '../assets/pollCard.module.css';
import CheckedImage from '../assets/images/PollCheckedCiricle.svg';
import { NextImage } from '@sitecore-jss/sitecore-jss-nextjs';

function PollCard(props: any) {
  function calculatePercentage(value: any, totalValue: any) {
    const percentage = (value / totalValue) * 100;
    console.log('PERCENTAGE', percentage);
    if (isNaN(percentage)) {
      return 0;
    } else {
      return Math.floor(percentage);
    }
  }

  props?.pollPost?.poll?.pollOptions?.sort((a: any, b: any) => a.optionSequence - b.optionSequence);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return (
    <div className={pollCard.pollCardContainer}>
      <div className={pollCard.pollheading}>{/* <h2>Poll</h2> */}</div>
      <h3 className={pollCard.pollQuestion}>{props.pollPost?.poll?.pollQuestion}</h3>
      <div className={pollCard.polloptions}>
        {props.pollPost?.poll?.pollOptions?.map((option: any, index: any) => {
          return (
            <div className={pollCard.polloption} key={index}>
              {/* <input
                checked={
                  props.pollPost?.poll?.optedPollOptionID
                    ? props.pollPost?.poll?.optedPollOptionID === option?.id
                      ? true
                      : false
                    : false
                }
                disabled={
                  props?.pollPost?.poll?.optedPollOptionID || !props?.pollPost?.poll.id
                    ? true
                    : false
                }
                style={{ width: '16px', marginRight: '5px' }}
                type="checkbox"
                onClick={() => props?.voteInAPoll(props?.pollPost?.poll?.id, option?.id)}
              /> */}
              <button
                className={pollCard.voteButton}
                type="button"
                onClick={() => props?.voteInAPoll(props?.pollPost?.poll?.id, option?.id)}
                disabled={
                  props?.pollPost?.poll?.optedPollOptionID || !props?.pollPost?.poll.id
                    ? true
                    : false
                }
                // style={{
                //   opacity:
                //     props.pollPost.poll.optedPollOptionID || !props?.pollPost?.poll.id ? 0.5 : 1,
                // }}
              >
                <div
                  className={pollCard.pollBar}
                  style={{
                    width: `${calculatePercentage(
                      option?.responseCount,
                      props.pollPost?.poll?.pollResponseCount
                    )}%`,
                    borderBottomRightRadius:
                      calculatePercentage(
                        option?.responseCount,
                        props.pollPost?.poll?.pollResponseCount
                      ) === 100
                        ? '40px'
                        : '0px',
                    borderTopRightRadius:
                      calculatePercentage(
                        option?.responseCount,
                        props.pollPost?.poll?.pollResponseCount
                      ) === 100
                        ? '40px'
                        : '0px',
                  }}
                >
                  <div className={pollCard.pollOptionText}>
                    <div className={pollCard.pollOptionNumber}>
                      {props.pollPost?.poll?.optedPollOptionID ? (
                        props.pollPost?.poll?.optedPollOptionID === option?.id ? (
                          <span>
                            <NextImage field={CheckedImage} />
                          </span>
                        ) : (
                          <span className={pollCard.alphabet}>{letters[index]}</span>
                        )
                      ) : (
                        <span className={pollCard.alphabet}>{letters[index]}</span>
                      )}
                    </div>

                    {option?.optionText}
                  </div>
                </div>
              </button>
              <span className={pollCard.voteCount}>
                <span>{option?.responseCount ? option?.responseCount : '0'}</span> Votes
              </span>
            </div>
          );
        })}
      </div>
      {props.pollPost.poll.optedPollOptionID ? (
        <span style={{ fontSize: '10px', color: 'darkred', fontWeight: '600' }}>
          **You have participated in this poll.
        </span>
      ) : (
        ''
      )}
    </div>
  );
}

export default PollCard;
