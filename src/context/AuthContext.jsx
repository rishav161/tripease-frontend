import { createContext, useEffect, useReducer } from "react";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  accessToken: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, accessToken: null, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { 
        user: action.payload.user, 
        accessToken: action.payload.accessToken,
        loading: false, 
        error: null 
      };
    case "LOGIN_FAILURE":
      return { user: null, accessToken: null, loading: false, error: action.payload };
    case "LOGOUT":
      return { user: null, accessToken: null, loading: false, error: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }

    if (state.accessToken) {
      localStorage.setItem("accessToken", state.accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [state.user, state.accessToken]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
