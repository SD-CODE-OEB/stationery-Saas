export interface User {
  $id: string | null;
  name: string;
  email: string;
  labels: string[];
  token?: string;
  isAdmin?: boolean;
  status?: boolean;
}

interface UserActions {
  setUser: (user: User) => void;
  updateUser: (user: User) => void;
  getUser: (email: User["email"]) => User;
  clearUser: () => void;
}

export type UserSlice = User & UserActions;

export const initialState: User = {
  $id: null,
  name: "",
  email: "",
  token: "",
  labels: [],
  isAdmin: false,
  status: false,
};
