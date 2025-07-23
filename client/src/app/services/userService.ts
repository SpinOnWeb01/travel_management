const API_URL = "http://localhost:5000/api/v1";

export const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};