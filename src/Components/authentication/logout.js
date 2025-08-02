// src/utils/logout.js
import axios from 'axios';

const logout = async (navigate) => {
  try {
    await axios.post('http://api.fremikecnsult.com/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Clear local storage or any user-related info
    localStorage.clear();
   
    // Redirect to login page
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default logout;
