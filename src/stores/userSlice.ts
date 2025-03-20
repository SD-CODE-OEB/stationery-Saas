interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
  avatar?: string;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}

interface UserActions {
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  getUser: (email: User["email"]) => User;
  clearUser: () => void;
}

export type UserSlice = User & UserActions;

export const initialState: User = {
  _id: "",
  name: "",
  email: "",
  token: "",
  avatar: "",
  isAdmin: false,
  isLoggedIn: false,
};
