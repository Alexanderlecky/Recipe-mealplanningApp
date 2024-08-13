
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserProfile;
