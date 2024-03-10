import React, { useState, useEffect } from 'react';
import TopNavBar from '../../components/TopNavBar';
import EditProfile from '../../components/EditProfile/EditProfile'; // Adjust the path if necessary
import './profile.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [email_id, setEmail_id] = useState('');
  const authToken =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVkZWFhNjhmZTYxNzE4ZmM0Yjk3OWMiLCJpYXQiOjE3MTAxMDM3OTgsImV4cCI6MTcxMDEwNzM5OH0.J2y3mRBbFykUPFwnZlWf7iLBNmkr3ECgXBIECacWQHM';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3080/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(response);
        const data = await response.json();
        setName(data.user.name);
        setEmail_id(data.user.email_id);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteAccount = async (event) => {
    event.preventDefault();
    //Take this auth Toekn from localStorage, with be set on login,

    try {
      const response = await fetch('http://localhost:3080/auth/delete', {
        method: 'PUT',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert('Error occured while deleting account');
      }
    } catch (err) {
      console.error('Error deleting account', err);
    }
  };

  const logout = () => {
    //Implement logout logic
  };

  return (
    <>
      <TopNavBar />
      <div className='center'>

      <div className="profile_page">
        <div className="container-profile">
          <div className="profile-details">
            <div className='img-cnt'>
            <div className="profile-img"></div>
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
            
            <EditProfile name={name} email_id={email_id} className="hero-button"/>
            <div className="hero-button " onClick={logout}>LogOut</div>
            <div className="delete-button " onClick={deleteAccount}>Delete</div>
        </div>
      </div>
      </div>
    </>
  );
}
