import { createContext } from "react";

const UserContext = createContext({ isAdmin: false, login: () => {} });

export default UserContext;
