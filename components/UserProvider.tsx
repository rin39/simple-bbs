import React, { PropsWithChildren, useEffect, useState } from "react";
import axios from "axios";
import { ResponseData as ApiResponse } from "../pages/api/admin";
import UserContext from "../context/UserContext";

const UserProvider = ({ children }: PropsWithChildren) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<ApiResponse>("/api/admin");
        res.data.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  // To prevent UI flash
  if (isAdmin == null) return null;

  return (
    <UserContext.Provider value={{ isAdmin, login: () => setIsAdmin(true) }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
