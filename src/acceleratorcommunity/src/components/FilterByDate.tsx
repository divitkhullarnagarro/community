import Dropdown from 'react-bootstrap/Dropdown';
import SideBarCss from '../assets/sidebar.module.css';

function FilterByDate(props: any) {
  return (
    <Dropdown className={SideBarCss.filteredDateContainer}>
      <Dropdown.Toggle id="dropdown-basic">Filter By date</Dropdown.Toggle>

      <Dropdown.Menu className={SideBarCss.filteredDateContainerMenu}>
        <Dropdown.Item onClick={props?.nowArticles}>Current</Dropdown.Item>
        <Dropdown.Item onClick={props?.upComingArticle}>Upcoming</Dropdown.Item>
        <Dropdown.Item onClick={props?.pastArticle}>Past</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterByDate;
