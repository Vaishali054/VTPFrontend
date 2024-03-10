import Modal from "react-modal";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../EditProfile/editProfile.css";

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
  height: 450px;
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
    email_id: props.email,
    password: "",
    name: props.name,
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFormData({
      email_id: props.email,
      password: "",
      name: props.name,
    });
  }, [props.email, props.name]);

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
    //Take this auth Toekn from localStorage, with be set on login,
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU5NmI2YTNkMzkwNGJhYWVlNWIxM2IiLCJpYXQiOjE3MTAwODc2NTcsImV4cCI6MTcxMDA5MTI1N30.NRUxrnBmEPx0W6TmsoDoIY7HU-KHOClr4lDea6ZSfgo";
    const bodyData={};
    for (const key in formData) {
      if (formData[key] !== props[key]) {
        bodyData[key] = formData[key];
      }
    }

    console.log(bodyData)

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
    <div>
      <div onClick={openProfileModal} className="button">
        Edit Profile
      </div>

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
            <div className="center">
              <button className="submit-button" type="submit">
                Save Changes
              </button>
            </div>
          </form>
        </ModalContent>
      </CustomModal>
    </div>
  );
}
