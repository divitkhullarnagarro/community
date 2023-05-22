import React from 'react';
import styles from '../assets/dotloader.module.css';

interface IProps {
  dotColor?: string;
}

const DotLoader = (props: IProps) => {
  const { dotColor } = props;
  return (
    <>
      <div className={styles.dotpulse}>
        <div style={dotColor ? { background: dotColor } : {}}></div>
        <div style={dotColor ? { background: dotColor } : {}}></div>
        <div style={dotColor ? { background: dotColor } : {}}></div>
      </div>
    </>
  );
};

export default DotLoader;
