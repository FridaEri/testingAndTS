import React, { useState, useEffect } from 'react';
import './myAccount.css'

type UserData = {
  name: string;
  email: string;
  address: string;
  postal_code: string;
  password?: string;
};

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    address: '',
    postal_code: '',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: UserData = await response.json();
        if (response.ok) {
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...userData, password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        alert('Profile updated successfully!');
        setIsEditing(false);
      } else {
        alert(`Error updating profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-profile">
      <h1 className="user-profile__heading">My Profile</h1>
      {!isEditing ? (
        <div className="user-profile__info">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Postal Code:</strong> {userData.postal_code}</p>
          <button className="user-profile__edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      ) : (
        <form className="user-profile__form" onSubmit={handleSubmit}>
          <div className="user-profile__form-field">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="user-profile__input"
            />
          </div>
          <div className="user-profile__form-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="user-profile__input"
            />
          </div>
          <div className="user-profile__form-field">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="user-profile__input"
            />
          </div>
          <div className="user-profile__form-field">
            <label>Postal Code:</label>
            <input
              type="text"
              name="postal_code"
              value={userData.postal_code}
              onChange={handleInputChange}
              className="user-profile__input"
            />
          </div>
          
          {/* Password Change Fields */}
          <div className="user-profile__form-field">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              className="user-profile__input"
            />
          </div>
          <div className="user-profile__form-field">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handlePasswordChange}
              className="user-profile__input"
            />
          </div>

          <button className="user-profile__save-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button className="user-profile__cancel-btn" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
