import React, { useContext, useState } from 'react';
import WebContext from '../Context/WebContext';

// type FollowUnfollowButtonProps = ComponentProps & {
//   fields: {
//     heading: Field<string>;
//   };
// };

const FollowUnfollowButton = (): JSX.Element => {
  const { isLoggedIn } = { ...useContext(WebContext) };
  const [followButtonText, setButtonText] = useState('Follow'); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
  const changeText = (text: string) => setButtonText(text);
  if (followButtonText == 'Follow' && isLoggedIn) {
    return (
      <div>
        <button
          type="button"
          className="followUnfollowButton"
          onClick={() => changeText('Unfollow')}
        >
          {followButtonText}
        </button>
      </div>
    );
  } else if (followButtonText == 'Unfollow' && isLoggedIn) {
    return (
      <div>
        <button type="button" className="followUnfollowButton" onClick={() => changeText('Follow')}>
          {followButtonText}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          type="button"
          className="followUnfollowButton"
          onClick={() => (window.location.href = '/login')}
        >
          Follow
        </button>
      </div>
    );
  }
};
export default FollowUnfollowButton;
