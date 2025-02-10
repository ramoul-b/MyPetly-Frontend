// src/redux/reducers/userReducer.js
const initialState = {
    user: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_START':
        return { ...state, loading: true, error: null };
      case 'UPDATE_USER_SUCCESS':
        return { ...state, loading: false, user: action.payload, error: null };
      case 'UPDATE_USER_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  