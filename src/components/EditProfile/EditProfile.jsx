import React, { useState, useEffect } from "react";
import "./editProfile.css";
import Button from '@material-ui/core/Button';
import { editProfile } from "../../api/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
    const bodyData = {};

    for (const key in formData) {
      // Skip the password field if it's empty
      if (key === 'password' && !formData[key]) {
        continue;
      }
      if (formData[key] !== props[key]) {
        bodyData[key] = formData[key];
      }
    }

    // Check if bodyData is empty
    if (Object.keys(bodyData).length === 0) {
      alert("No field is changed");
      return; // Stop further execution
    }

    try {
      const data = await editProfile(bodyData);

      if (data) {
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

      <EditProfileModal
        isOpen={show}
        onRequestClose={closeProfileModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
    </>
  );
}
