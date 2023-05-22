import { addPeersBySearchUrl, addPeersPaginationUrl } from 'assets/helpers/constants';
import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import AxiosRequest from 'src/API/AxiosRequest';
import style from '../../assets/createGroup.module.css';
import uploadFilesCall from 'src/API/uploadFilesCall';
import WebContext from 'src/Context/WebContext';
import ToastNotification from './../ToastNotification';

function CreateGroup({
  createGroupVisibel,
  setCreateGroupVisibel,
}: {
  createGroupVisibel: any;
  setCreateGroupVisibel: any;
}) {
  const { userToken, userObject } = {
    ...useContext(WebContext),
  };

  const [addMemberValue, setAddMemberValue] = useState('');
  const [addMemberList, setAddMemberList] = useState<string[]>([]);
  const [invalidMemberError, setInvalidMemberError] = useState(false);
  const [duplicateMemberError, setDuplicateMemberError] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [membersSuggestionsList, setmembersSuggestionsList] = useState<any>([]);
  const [imageURL, setImageUrl] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);

  const getPeersbyName = async (name: string) => {
    const res: any = await AxiosRequest({
      url: `${addPeersBySearchUrl}${name}`,
      method: 'GET',
    });
    console.log(res);
    setmembersSuggestionsList(res.data);
  };

  const handleAddMemberChange = async (e: any) => {
    console.log('event', e.target.value);
    const filteredValue = membersSuggestionsList?.filter((ele: any) => {
      if (ele?.objectId === e.target.value.trim()) {
        return true;
      } else {
        return false;
      }
    });
    const filteredValueAddedMember = addMemberList?.filter((ele) => {
      if (ele === e.target.value.trim()) {
        return true;
      } else {
        return false;
      }
    });
    if (filteredValueAddedMember?.length > 0) {
      console.log('filtered', filteredValueAddedMember, e.target.value, addMemberList);
      setDuplicateMemberError(true);
    } else {
      setDuplicateMemberError(false);
    }

    if (filteredValue?.length > 0) {
      setInvalidMemberError(false);
    } else {
      setInvalidMemberError(true);
    }
    setAddMemberValue(e.target.value);
    // await getPeersbyName(e.target.value);
  };
  const addMemberButtonClick = async () => {
    setAddMemberList([...addMemberList, addMemberValue]);
    setAddMemberValue('');
    await getFirstTenPeers();
  };
  const removeMemberFromList = (index: number) => {
    const filteredItems = addMemberList
      .slice(0, index)
      .concat(addMemberList?.slice(index + 1, addMemberList?.length));
    setAddMemberList(filteredItems);
  };
  const getFirstTenPeers = async () => {
    const res: any = await AxiosRequest({
      url: `${addPeersPaginationUrl}page=0&size=10`,
      method: 'GET',
    });
    setmembersSuggestionsList(res.data);
  };

  const createGroupSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (nameValue && descriptionValue && addMemberList?.length > 0) {
        const date = new Date();
        const createdOn = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        const res: any = await AxiosRequest({
          url: 'https://accelerator-api-management.azure-api.net/graph-service/api/v1/graph/group',
          method: 'POST',
          data: {
            groupName: nameValue,
            description: descriptionValue,
            groupIconUrl: imageURL,
            groupBannerUrl: '',
            members: [...addMemberList, userObject.objectId],
            createdBy: 'vicky@yopmail.com',
            createdOn: createdOn,
          },
        });
        if (res?.success) {
          setToastSuccess(true);
          setToastMessage('Group Created Successfully');
          setShowNofitication(true);
          console.log('createGroupdata', res);
          setAddMemberList([]);
          setAddMemberValue('');
          setDescriptionValue('');
          setNameValue('');
          setCreateGroupVisibel(false);
          setImageUrl('');
        }
      } else {
        setToastError(true);
        setToastMessage(
          nameValue
            ? descriptionValue
              ? addMemberList.length > 0
                ? ''
                : 'Please add some member'
              : 'Description Required'
            : 'Name Nequired'
        );
        setShowNofitication(true);
      }
    } catch (error) {
      console.log('createGroupError', error);
    }
  };

  useEffect(() => {
    if (addMemberValue) {
      getPeersbyName(addMemberValue);
    } else {
      getFirstTenPeers();
    }
  }, [addMemberValue]);

  async function UploadFilesToServer(file: any, type: string) {
    return await uploadFilesCall(userToken, file, type).then((response) => {
      return response?.data;
    });
  }
  const handleChangeImage = async (e: any) => {
    try {
      setDisableButton(true);
      const files = e.target.files;
      const res = await UploadFilesToServer(files[0], 'IMAGE');
      if (res?.success) {
        setImageUrl(res?.data);
        // alert('got image url');
        setDisableButton(false);
      } else {
        setToastError(true);
        setToastMessage('Failed to upload Group Logo. Try another logo.');
        setShowNofitication(true);
        // alert('failed to upload group url');
        setDisableButton(false);
      }
      console.log('createGroupimageupload', res);
    } catch (error: any) {
      setToastError(true);
      setToastMessage(error?.message ?? 'Something went wrong');
      setShowNofitication(true);
      console.log('createGroupimageupload', error);
      setDisableButton(false);
    }
  };
  const resetToastState = () => {
    setShowNofitication(!showNotification);
    setToastSuccess(false);
    setToastError(false);
  };
  const clearAllFields = () => {
    setAddMemberList([]);
    setAddMemberValue('');
    setDescriptionValue('');
    setNameValue('');
    setCreateGroupVisibel(false);
    setImageUrl('');
  };
  console.log('userObject', userObject);
  return (
    <div className={style.createGroup}>
      <Modal
        show={createGroupVisibel}
        onHide={() => {
          setCreateGroupVisibel(false);
          clearAllFields();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.modalTitle}>Create Group</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={(e) => createGroupSubmit(e)}>
          <Modal.Body>
            <p className="text-danger" style={{ fontSize: '10px' }}>
              Mandatory Fields *
            </p>

            <div className="form-group">
              <input
                className="form-control"
                value={nameValue}
                style={{ marginBottom: '10px', height: '46px' }}
                placeholder="Name"
                onChange={(e) => setNameValue(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                rows={6}
                value={descriptionValue}
                style={{ height: '200px' }}
                placeholder="Description"
                onChange={(e) => setDescriptionValue(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
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
              style={{ height: '46px' }}
              className={`form-control ${
                (invalidMemberError || duplicateMemberError) && 'is-invalid'
              }`}
              placeholder="Search Member"
              value={addMemberValue}
              onChange={handleAddMemberChange}
            />
            <datalist id="suggestions">
              {membersSuggestionsList?.map((ele: any) => (
                <option key={ele.objectId} value={ele.objectId}>
                  {`${ele.firstName} ${ele.lastName}`}
                </option>
              ))}
            </datalist>
            {invalidMemberError && (
              <div
                style={{ color: 'red', fontSize: '12px', marginLeft: '10px', marginTop: '10px' }}
              >
                Inavlid Member Id
              </div>
            )}
            {duplicateMemberError && (
              <div
                style={{ color: 'red', fontSize: '12px', marginLeft: '10px', marginTop: '10px' }}
              >
                Member Already selected
              </div>
            )}

            <button
              type="button"
              className={style.addMemberButton}
              // style={{ fontSize: '15px', marginLeft: '15px', marginTop: '2px' }}
              onClick={addMemberButtonClick}
              disabled={invalidMemberError || addMemberValue.length < 1 || duplicateMemberError}
            >
              + Add Member
            </button>
            <br />
            <div className="form-group">
              <label
                className={`${style.requiredField} form-label`}
                style={{ marginLeft: '5px', marginTop: '12px' }}
              >
                Group Logo
              </label>
              <input
                id="uploadbutton"
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleChangeImage(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className={style.closeButton}
              onClick={() => setCreateGroupVisibel(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className={style.saveButton}
              // disabled={!(nameValue && descriptionValue && addMemberList.length > 0)}
              disabled={disableButton}
            >
              Save
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      {showNotification && (
        <ToastNotification
          showNotification={showNotification}
          success={toastSuccess}
          error={toastError}
          message={toastMessage}
          handleCallback={resetToastState}
        />
      )}
    </div>
  );
}

export default CreateGroup;
