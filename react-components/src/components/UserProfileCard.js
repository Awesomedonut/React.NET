import React, { useState } from 'react';
import './UserProfileCard.css';

const UserProfileCard = ({ userData = {}, editable = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name || 'John Doe',
    email: userData.email || 'john.doe@example.com',
    role: userData.role || 'User',
    avatar: userData.avatar || null,
    joinDate: userData.joinDate || new Date().toLocaleDateString(),
    status: userData.status || 'Active'
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', profileData);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return '#28a745';
      case 'inactive': return '#6c757d';
      case 'pending': return '#ffc107';
      default: return '#007bff';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <div className="avatar-section">
          {profileData.avatar ? (
            <img src={profileData.avatar} alt="Profile" className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              {getInitials(profileData.name)}
            </div>
          )}
          <div className="status-indicator" 
               style={{ backgroundColor: getStatusColor(profileData.status) }}>
          </div>
        </div>
        
        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="edit-input name-input"
            />
          ) : (
            <h3 className="profile-name">{profileData.name}</h3>
          )}
          
          {isEditing ? (
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="edit-input email-input"
            />
          ) : (
            <p className="profile-email">{profileData.email}</p>
          )}
          
          <div className="profile-meta">
            <span className="role-badge">{profileData.role}</span>
            <span className="join-date">Joined {profileData.joinDate}</span>
          </div>
        </div>

        {editable && (
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn btn-save">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="btn btn-cancel">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-edit">
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;