import { useContext } from 'react';
import WebContext from 'src/Context/WebContext';
import styles from '../assets/searchFilterContainer.module.css';
import darkModeCss from '../assets/darkTheme.module.css';
import SearchedJournal from './SearchedJournal';

const JournalContainer = () => {
  const { darkMode } = {
    ...useContext(WebContext),
  };
  return (
    <div className={`${styles.parentContainer} ${darkMode && darkModeCss.grey_1}`}>
      <div className={`${styles.generalcontainer} ${darkMode && darkModeCss.grey_3}`}>
        {[1, 2, 3, 4, 5].map(() => {
          return <SearchedJournal />;
        })}
      </div>
    </div>
  );
};

export default JournalContainer;
