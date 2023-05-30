import {
  addPeersBySearchUrl,
  addPeersPaginationUrl,
  createGroupUrl,
} from 'assets/helpers/constants';
import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import AxiosRequest from 'src/API/AxiosRequest';
import style from '../../assets/createGroup.module.css';
import uploadFilesCall from 'src/API/uploadFilesCall';
import WebContext from 'src/Context/WebContext';
import ToastNotification from './../ToastNotification';
// import Image from 'next/image';
import { Spinner } from 'react-bootstrap';
import { spaceRemover } from 'assets/helpers/helperFunctions';

function CreateGroup({
  createGroupVisibel,
  setCreateGroupVisibel,
  setWantToRerender,
  wantToRerender,
}: {
  createGroupVisibel: any;
  setCreateGroupVisibel: any;
  setWantToRerender: any;
  wantToRerender: any;
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
  const [bannerImageURL, setBannerImageURL] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>();
  const [showNotification, setShowNofitication] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);

  const handleNameChange = (value: string) => {
    const updatedValue = spaceRemover(value);
    if (updatedValue.length < 50) {
      setNameValue(updatedValue);
    }
  };
  const handleDescriptionChange = (value: string) => {
    const updatedValue = spaceRemover(value);
    if (updatedValue.length <= 150) {
      setDescriptionValue(updatedValue);
    }
  };

  const getPeersbyName = async (name: string) => {
    const res: any = await AxiosRequest({
      url: `${addPeersBySearchUrl}${name}`,
      method: 'GET',
    });
    if (res?.success) {
      // console.log('asdfgasdfg', res);
      setmembersSuggestionsList(res.data);
    } else {
      // console.log('responsecreateGroup', res);
      setToastError(true);
      setToastMessage(
        res?.data?.errorMessages?.[0]
          ? res?.data?.errorMessages?.[0]
          : 'Something Went Wrong. Please Try Again'
      );

      setShowNofitication(true);
    }
  };

  const handleAddMemberChange = async (e: any) => {
    // console.log('event', e.target.value);
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
      // console.log('filtered', filteredValueAddedMember, e.target.value, addMemberList);
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
    if (res?.success) {
      setmembersSuggestionsList(res.data);
    } else {
      setToastError(true);
      setToastMessage(
        res?.data?.errorMessages?.[0]
          ? res?.data?.errorMessages?.[0]
          : 'Something Went Wrong. Please Try Again'
      );

      setShowNofitication(true);
    }
  };

  const createGroupSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (nameValue && descriptionValue) {
        setCreatingGroup(true);
        const res: any = await AxiosRequest({
          url: `${createGroupUrl}`,
          method: 'POST',
          data: {
            groupName: nameValue,
            description: descriptionValue,
            groupIconUrl: imageURL,
            groupBannerUrl: bannerImageURL,
            members: [...addMemberList, userObject.objectId],
            createdBy: 'vicky@yopmail.com',
            createdOn: null,
          },
        });
        if (res?.success || !res?.errorCode) {
          setCreatingGroup(false);
          setWantToRerender(!wantToRerender);
          setToastSuccess(true);
          setToastMessage(
            res?.data?.errorMessages?.[0]
              ? res?.data?.errorMessages?.[0]
              : 'Something Went Wrong. Please Try Again'
          );
          setShowNofitication(true);
          setAddMemberList([]);
          setAddMemberValue('');
          setDescriptionValue('');
          setNameValue('');
          setCreateGroupVisibel(false);
          setImageUrl('');
          setBannerImageURL('');
        }
      } else {
        setCreatingGroup(false);
        setToastError(true);
        setToastMessage('Something Went Wrong. Please Try Again');

        setShowNofitication(true);
      }
    } catch (error) {
      setCreatingGroup(false);
      console.log(error);
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
        setDisableButton(false);
      } else {
        setToastError(true);
        setToastMessage('Failed to upload Group Logo. Try another logo.');
        setShowNofitication(true);
        setDisableButton(false);
      }
    } catch (error: any) {
      setToastError(true);
      setToastMessage(error?.message ?? 'Something went wrong');
      setShowNofitication(true);
      setDisableButton(false);
    }
  };

  const handleBannerChangeImage = async (e: any) => {
    try {
      setDisableButton(true);
      const files = e.target.files;
      const res = await UploadFilesToServer(files[0], 'IMAGE');
      if (res?.success) {
        setBannerImageURL(res?.data);
        setDisableButton(false);
      } else {
        setToastError(true);
        setToastMessage('Failed to upload Group Banner. Try another Banner.');
        setShowNofitication(true);
        setDisableButton(false);
      }
    } catch (error: any) {
      setToastError(true);
      setToastMessage(error?.message ?? 'Something went wrong');
      setShowNofitication(true);
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
    setBannerImageURL('');
  };
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
            <div className="form-group">
              <input
                className="form-control"
                value={nameValue}
                style={{ marginBottom: '10px', height: '46px' }}
                placeholder="Name"
                onChange={(e) => handleNameChange(e.target.value)}
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
                onChange={(e) => handleDescriptionChange(e.target.value)}
                required
              ></textarea>
              <span>Max Limit:{descriptionValue.length}/150</span>
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
              onClick={addMemberButtonClick}
              disabled={invalidMemberError || addMemberValue.length < 1 || duplicateMemberError}
            >
              + Add Member
            </button>
            <br />
            <div className="form-group">
              <label className={`form-label`} style={{ marginLeft: '5px', marginTop: '12px' }}>
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
            <div className="form-group">
              <label className={`form-label`} style={{ marginLeft: '5px', marginTop: '12px' }}>
                Group Banner
              </label>
              <input
                id="uploadbutton"
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => handleBannerChangeImage(e)}
              />
            </div>
            <br />
            {/* {bannerImageURL && <Image src={bannerImageURL} height={300} width={600} />} */}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className={style.closeButton}
              onClick={() => setCreateGroupVisibel(false)}
            >
              Close
            </button>
            <button type="submit" className={style.saveButton} disabled={disableButton}>
              {creatingGroup ? (
                <Spinner style={{ width: '15px', height: '15px' }} animation="border" />
              ) : (
                'Save'
              )}
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
