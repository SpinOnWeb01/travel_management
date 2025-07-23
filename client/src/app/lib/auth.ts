// Store user session in localStorage
export const setUserSession = (user: any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user session from localStorage
export const getUserSession = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Clear user session
export const clearUserSession = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
};