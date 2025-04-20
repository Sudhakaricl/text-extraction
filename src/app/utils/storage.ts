export const saveUser = (user: { username: string; password: string }) => {
    localStorage.setItem('authUser', JSON.stringify(user)); // Save user to localStorage
  };
  
  export const getUser = () => {
    const user = localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null; // Return parsed user object or null if not found
  };
  
  export const clearUser = () => {
    localStorage.removeItem('authUser'); // Clear user data from localStorage
  };
  