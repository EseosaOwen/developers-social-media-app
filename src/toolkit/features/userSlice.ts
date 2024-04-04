import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type TInitialStateProps = {
  user: {
    _id: null | string;
    firstName: null | string;
    lastName: null | string;
    email: null | string;
    password: null | string;
    phoneNo: null | string;
  };
  isLoggedIn: boolean;
};

const initialState: TInitialStateProps = {
  user: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    phoneNo: null,
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignInUser: (state, action) => {
      state.user = {
        _id: action.payload._id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        phoneNo: action.payload.phoneNo,
      };
      state.isLoggedIn = true;
    },
    setSignOutUser: (state, _action) => {
      state.user = {
        _id: null,
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        phoneNo: null,
      };
      state.isLoggedIn = false;
    },
  },
});

export default userSlice.reducer;
export const { setSignInUser, setSignOutUser } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn;
