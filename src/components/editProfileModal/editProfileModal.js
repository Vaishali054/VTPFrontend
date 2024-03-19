import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
import { CustomModal, ModalContent } from "../../utilities/profileUtils";

const EditProfileModal = ({ isOpen, onRequestClose, formData, handleChange, handleSubmit, togglePasswordVisibility, showPassword }) => (
  <CustomModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Login Modal"
    ariaHideApp={false}
  >
    <ModalContent>
      <div className="edit-profile-button">
        <span>Edit Profile</span>
        <span className="close-modal" onClick={onRequestClose}>
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
          <span className="password-toggle-edit" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </span>
        </div>
        <div className="buttons">
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
          <Button variant="contained" color="secondary" type="button" onClick={onRequestClose}>
            Close
          </Button>
        </div>
      </form>
    </ModalContent>
  </CustomModal>
);

export default EditProfileModal;
