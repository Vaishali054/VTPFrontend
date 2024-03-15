import Modal from "react-modal";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../EditProfile/editProfile.css";
import Button from '@material-ui/core/Button';

const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 420px;
  flex-shrink: 0;
  border-radius: 16.477px;
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.16);
  background-color: #fff;
  border: 1px solid #888;
  border-radius: 8px;
  display: block;
  @media (max-width: 690px) {
    width: 300px;
    height: 460px;
    padding: 5px;
  }
`;

export default function EditProfile(props) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email_id: props.email_id,
    password: "",
    name: props.name,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      email_id: props.email_id,
      password: "",
      name: props.name,
    });
  }, [props.email_id, props.name]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openProfileModal = () => {
    setShow(true);
  };

  const closeProfileModal = () => {
    setShow(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Take this auth Toekn from Cookies, with be set on login,
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkZWFhNjhmZTYxNzE4ZmM0Yjk3OWMiLCJpYXQiOjE3MTAxNjY0MzEsImV4cCI6MTcxMDE3MDAzMX0.bLIhp3yb_fJhmAWjBwuDkqDgYhArzmztmuoQhaQ-3f4";
    const bodyData={};

    for (const key in formData) {
      // Skip the password field if it's empty
      if (key === 'password' && !formData[key]) {
        continue;
      }
      if (formData[key] !== props[key]) {
        bodyData[key] = formData[key];
      }
    }

    console.log(bodyData)

    // Check if bodyData is empty
    if (Object.keys(bodyData).length === 0) {
      alert("No field is changed");
      return; // Stop further execution
    }

    try {
      const response = await fetch(
        "http://localhost:3080/auth/profile-update",
        {
          method: "POST",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert("Error updating profile changes");
      }
    } catch (err) {
      console.error("Error updating profile changes:", err);
    }
  };

  return (
    <>
      <Button onClick={openProfileModal} className="hero-button" variant="contained" color="primary">
        Edit Profile
      </Button>

      <CustomModal
        isOpen={show}
        onRequestClose={closeProfileModal}
        contentLabel="Login Modal"
        ariaHideApp={false}
      >
        <ModalContent>
          <div class="edit-profile-button">
            <span>Edit Profile</span>
            <span class="close-modal" onClick={closeProfileModal}>
              &times;
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Change your email*"
              id="email_id"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Change your username*"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="password">Change Password</label>
            <div className="password_container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Change your password*"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="buttons">
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="contained" color="secondary" type="submit" onClick={closeProfileModal}>
                Close
              </Button>
            </div>
          </form>
        </ModalContent>
      </CustomModal>
    </>
  );
}
