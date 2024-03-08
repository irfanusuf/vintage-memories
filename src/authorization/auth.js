import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticatedUser = async () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {

    if (token === "") {
      navigate("/login");
    }
  }, [token , navigate]);

   
};

export default AuthenticatedUser;
