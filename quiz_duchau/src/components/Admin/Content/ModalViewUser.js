import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GoPlusCircle } from "react-icons/go";
import {toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";
import _ from "lodash"
const ModalViewUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(()=>{
    if(!_.isEmpty(dataUpdate)){
        setEmail(dataUpdate.email);
        setUsername(dataUpdate.username);
        setRole(dataUpdate.role);
        setImage("");
        if(dataUpdate.image){
            setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
        }
    }
  },[dataUpdate])
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      //   setPreviewImage("");
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async () => {
    // validate data
    const isValidEMail=validateEmail(email);
    if(!isValidEMail){
      toast.error("Invalid email");
      return;
    }
    
    let data = await putUpdateUser(dataUpdate.id,username, role, image);
    
    if(data && data.EC === 0 ){
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers(); 
      // props.setCurrentPage(1);
      await props.fetchListUsersWithPaginate(props.currentPage);    
      
    }
    if(data && data.EC !== 0 ){
      toast.error(data.EM);
      
    }
  };
  return (
    <>
     

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Usermame</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                <option selected value="USER">
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <GoPlusCircle /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              ></input>
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage}></img>
              ) : (
                <span>preview</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
