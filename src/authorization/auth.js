import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticatedUser = async () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {

    if (token === null) {
      navigate("/login");
    }
  }, [token]);
};

export default AuthenticatedUser;
