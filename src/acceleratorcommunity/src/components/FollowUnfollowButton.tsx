import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import React ,{ useState } from 'react';


type FollowUnfollowButtonProps = ComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const FollowUnfollowButton = (): JSX.Element => {
  const [followButtonText, setButtonText] = useState("Follow"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
const changeText = (text:string) => setButtonText(text);
const [loginButtonText, setLoginButtonText] = useState("Login"); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
const changeLoginText = (text:string) => setLoginButtonText(text);
if (followButtonText=='Follow' && loginButtonText=='Logout')
{
  return(
    <div>
    <button type="button" className='followUnfollowButton' onClick={() => changeLoginText("Login")}>{loginButtonText}</button>
    <button type="button" className='followUnfollowButton' onClick={() => changeText("Unfollow")}>{followButtonText}</button>
    </div>
      );
}
else if (followButtonText=='Unfollow' && loginButtonText=='Logout'){
  return(
    <div>
    <button type="button" className='followUnfollowButton' onClick={() => changeLoginText("Login")}>{loginButtonText}</button>
<button type="button" className='followUnfollowButton' onClick={() => changeText("Follow")}>{followButtonText}</button>
 </div>
 );
}
else{
return( 
  <div>
  <button type="button" className='followUnfollowButton' onClick={() => changeLoginText("Logout")}>{loginButtonText}</button>
  <button type="button" className='followUnfollowButton' onClick={()=>window.location.href='/login'}>Follow</button>
  </div>
   );
}
}
export default FollowUnfollowButton;
