import React from 'react'
import EditProfile from '../../components/EditProfile/EditProfile.jsx'
import "./profile.css"

export default function Profile() {
  const deleteAccount = async (event) => {
    event.preventDefault();
    //Take this auth Toekn from localStorage, with be set on login,
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU5NmI2YTNkMzkwNGJhYWVlNWIxM2IiLCJpYXQiOjE3MTAwODc2NTcsImV4cCI6MTcxMDA5MTI1N30.NRUxrnBmEPx0W6TmsoDoIY7HU-KHOClr4lDea6ZSfgo";
  

    try {
      const response = await fetch(
        "http://localhost:3080/auth/delete",
        {
          method: "PUT",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert("Error occured while deleting account")
      }
    } catch (err) {
      console.error("Error deleting account", err);
    }
  };
  return (
    <>
    {/* add this button to profile page */}
    <EditProfile name="vaishali" email="vaish@nith.ac.in"/>
    <div className='delete-button' onClick={deleteAccount}>Delete</div>
    </>
  )
}
