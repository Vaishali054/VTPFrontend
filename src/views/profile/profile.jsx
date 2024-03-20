import React, { useState, useEffect } from "react";
import TopNavBar from "../../components/topNavbar/topNavBar";
import EditProfile from "../../components/editProfile/editProfile";
import "./profile.css";
import profile from "../../images/profile.jpeg";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import { fetchProfile, deleteProfile } from "../../api/profile";

export default function Profile() {
  const [name, setName] = useState("");
  const [email_id, setEmail_id] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const theme = useTheme();

  const fetchUserData = async () => {
    try {
      const data = await fetchProfile();
      if (data) {
        setName(data.user.name);
        setEmail_id(data.user.email_id);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteAccount = async (event) => {
    event.preventDefault();

    // Ask for confirmation
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    // If user confirms deletion
    if (confirmed) {
      try {
        const data = await deleteProfile();

        if (data) {
          alert(data.message);
          window.location.reload();
        } else {
          alert("Error occurred while deleting account");
        }
      } catch (err) {
        console.error("Error deleting account", err);
      }
    }
  };

  return (
    <>
      <TopNavBar />
      <div className="center">
        <div className="profile_page">
          <div className="container-profile">
            <div className="profile-details">
              <div className="img-cnt">
                <div className="profile-img">
                  <img src={profile} alt="demo-profile" />
                </div>
              </div>
              <div className="profile-cont">
                <div className="name">
                  <div className="title">Name</div>
                  <div className="name-box">{name}</div>
                </div>
                <div className="name">
                  <div className="title">Email</div>
                  <div className="name-box">{email_id}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons">
            <EditProfile name={name} email_id={email_id} />
            <Button
              style={{
                backgroundColor: theme.palette.delete.main,
                color: "#ffffff",
              }}
              variant="contained"
              onClick={deleteAccount}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
