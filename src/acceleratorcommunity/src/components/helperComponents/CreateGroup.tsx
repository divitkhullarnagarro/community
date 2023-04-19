import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import style from '../../assets/createGroup.module.css';

const list = [
  { objectId: 'vicky@gmail.com', name: 'Vicky Dhakar' },
  { objectId: 'john@abc.com', name: 'John' },
  { objectId: 'peter@gmail.com', name: 'Peter' },
  { objectId: 'rocky@nagarro.com', name: 'Rocky' },
];

function CreateGroup({
  createGroupVisibel,
  setCreateGroupVisibel,
}: {
  createGroupVisibel: any;
  setCreateGroupVisibel: any;
}) {
  const [addMemberValue, setAddMemberValue] = useState('');
  const [addMemberList, setAddMemberList] = useState<string[]>([]);
  const [invalidMemberError, setInvalidMemberError] = useState(false);
  const [duplicateMemberError, setDuplicateMemberError] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const handleAddMemberChange = (e: any) => {
    console.log('event', e.target.value);
    const filteredValue = list.filter((ele) => {
      if (ele.objectId === e.target.value.trim()) {
        return true;
      } else {
        return false;
      }
    });
    const filteredValueAddedMember = addMemberList.filter((ele) => {
      if (ele === e.target.value.trim()) {
        return true;
      } else {
        return false;
      }
    });
    if (filteredValueAddedMember.length > 0) {
      console.log('filtered', filteredValueAddedMember, e.target.value, addMemberList);
      setDuplicateMemberError(true);
    } else {
      setDuplicateMemberError(false);
    }

    if (filteredValue.length > 0) {
      setInvalidMemberError(false);
    } else {
      setInvalidMemberError(true);
    }
    setAddMemberValue(e.target.value);
  };
  const addMemberButtonClick = () => {
    setAddMemberList([...addMemberList, addMemberValue]);
    setAddMemberValue('');
  };
  const removeMemberFromList = (index: number) => {
    const filteredItems = addMemberList
      .slice(0, index)
      .concat(addMemberList.slice(index + 1, addMemberList.length));
    setAddMemberList(filteredItems);
  };

  const createGroupSubmit = () => {
    alert(
      `name:${nameValue} \n Description:${descriptionValue}\n memberList:${JSON.stringify(
        addMemberList
      )}`
    );
    setAddMemberList([]);
    setAddMemberValue('');
    setDescriptionValue('');
    setNameValue('');
    setCreateGroupVisibel(false);
  };
  return (
    <div className={style.createGroup}>
      <Modal show={createGroupVisibel} onHide={() => setCreateGroupVisibel(false)}>
        <Modal.Header closeButton>
          <Modal.Title className={style.modalTitle}>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger" style={{ fontSize: '10px' }}>
            Mendatory Fields *
          </p>
          <form className="form">
            <div className="form-group">
              {/* <label className={`${style.requiredField} form-label`}>Name</label> */}
              <input
                className="form-control"
                value={nameValue}
                style={{marginBottom:'10px',height:'46px'}}
                placeholder="Name"
                onChange={(e) => setNameValue(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              {/* <label className={`${style.requiredField} form-label`}>Description</label> */}
              <textarea
                className="form-control"
                rows={6}
                value={descriptionValue}
                style={{height:'200px'}}
                placeholder="Description"
                onChange={(e) => setDescriptionValue(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              {/* <label className={`${style.requiredField} form-label`}>Members</label> */}
              <div className={style.membersGroupList}>
                {addMemberList.map((ele, index: number) => (
                  <div className={style.singleMember}>
                    <span>{ele}</span>
                    <span
                      onClick={() => removeMemberFromList(index)}
                      className={style.memberCrossIcon}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        {' '}
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{' '}
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <br />
            <input
              type="text"
              list="suggestions"
              style={{height:'46px'}}
              className={`form-control ${
                (invalidMemberError || duplicateMemberError) && 'is-invalid'
              }`}
              placeholder="Search Member"
              value={addMemberValue}
              onChange={handleAddMemberChange}
            />
            <datalist id="suggestions">
              {list.map((ele) => (
                <option key={ele.objectId} value={ele.objectId}>
                  {ele.name}
                </option>
              ))}
            </datalist>
            {invalidMemberError && (
              <div style={{ color: 'red', fontSize: '8px', marginLeft: '10px', marginTop: '10px' }}>
                Invalid Value
              </div>
            )}
            {duplicateMemberError && (
              <div style={{ color: 'red', fontSize: '8px', marginLeft: '10px', marginTop: '10px' }}>
                Member Already Added
              </div>
            )}
            {/* <button
              type="submit"
              style={{ marginTop: '8px' }}
              className="btn btn-primary"
              onClick={addMemberButtonClick}
               
            > */}
            <button
              className={style.addMemberButton}
              // style={{ fontSize: '15px', marginLeft: '15px', marginTop: '2px' }}
              onClick={addMemberButtonClick}
              disabled={invalidMemberError || addMemberValue.length < 1 || duplicateMemberError}
            >
              + Add Member 
            </button>
            {/* </button> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={style.closeButton} onClick={() => setCreateGroupVisibel(false)}>
            Close
          </button>
          <button
            // variant="primary"
            className={style.saveButton}
            onClick={() => createGroupSubmit()}
            disabled={!(nameValue && descriptionValue && addMemberList.length > 0)}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateGroup;
