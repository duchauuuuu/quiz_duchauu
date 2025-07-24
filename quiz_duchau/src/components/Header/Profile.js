import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {toast } from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Profile = (props) => {
  const { show, setShow} = props;

  const handleClose = () => setShow(false);


  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Main Info">
        Tab content for Home
      </Tab>
      <Tab eventKey="profile" title="Password">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="History">
        Tab content for Contact
      </Tab>
    </Tabs>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default Profile;
