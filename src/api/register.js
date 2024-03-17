import axiosInstance from './axiosInstance';

export const registerUser = async (name, email_id, password) => {
  try {
    const response = await axiosInstance.post('http://localhost:3080/register', {
      name,
      email_id,
      password,
    });

    if (response.status === 200 && response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    if (error.response.status === 409 && error.response.data.message === 'Email already in use') {
      return { success: false, message: 'Email already in use' };
    } else {
      console.error('Error registering user:', error);
      return { success: false, error };
    }
  }
};
