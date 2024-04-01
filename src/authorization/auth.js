const authenticated = () => {
  
  const isLoggedIn = localStorage.getItem('token'); // Example: checking local storage for authentication token

  if (isLoggedIn) {
    return true;
  } else {
    return false;
  }
};

export default authenticated