// Create a dummy reducer file, e.g., dummyReducer.js

// Define initial state
const initialState = {
    isDummyOn: false,
  };
  
  // Define the dummy reducer function
  const dummyReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_DUMMY':
        return {
          ...state,
          isDummyOn: !state.isDummyOn,
        };
      default:
        return state;
    }
  };
  
  export default dummyReducer;
  