import React from 'react';
import pollCard from '../assets/pollCard.module.css';

function PollCard(props: any) {
  return (
    <div className={pollCard.pollCardContainer}>
      <div className={pollCard.pollheading}>
        <h2>Poll</h2>
      </div>
      <h3 className={pollCard.pollQuestion}>{props.pollPost?.poll?.pollQuestion}</h3>
      <div className={pollCard.polloptions}>
        {props.pollPost?.poll?.pollOptions?.map((option: any, index: any) => {
          return (
            <button
              key={index}
              style={{
                padding: '10px',
                margin: '5px',
                borderRadius: '8px',
                backgroundColor: 'cadetblue',
                color: 'white',
                border: 'none',
              }}
              type="button"
            >
              {option?.optionText}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PollCard;
