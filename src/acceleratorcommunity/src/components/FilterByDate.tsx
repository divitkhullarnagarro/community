import Dropdown from 'react-bootstrap/Dropdown';

function FilterByDate(props: any) {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">Filter By date</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={props?.nowArticles}>Current</Dropdown.Item>
        <Dropdown.Item onClick={props?.upComingArticle}>Upcoming</Dropdown.Item>
        <Dropdown.Item onClick={props?.pastArticle}>Past</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterByDate;
