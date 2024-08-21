import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useAuth = () => {
  const context = useContext(AppContext);
  ;
  return { user: context.user, setUser: context.setUser };
};

export default useAuth;
