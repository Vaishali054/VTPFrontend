import React from 'react'
import EditProfile from '../../components/EditProfile/EditProfile.jsx'
import "./profile.css"

export default function Profile() {
  const deleteAccount = async (event) => {
    event.preventDefault();
    //Take this auth Toekn from localStorage, with be set on login,
    const authToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkZWFhNjhmZTYxNzE4ZmM0Yjk3OWMiLCJpYXQiOjE3MTAwOTA5NjEsImV4cCI6MTcxMDA5NDU2MX0.o4soHPEQnoJjq90AjKOKfr9X6BAzI2h32_jWHP2igGk";
  

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
    <EditProfile name="vaishali" email_id="vaish@nith.ac.in"/>
    <div className='delete-button' onClick={deleteAccount}>Delete</div>
    </>
  )
}
