import { useNavigate } from "react-router-dom";

const IsAuthenticated = () => {
    const navigate = useNavigate();
  
    const token = localStorage.getItem("token");
  
    if (!token) {
     return  navigate("/login");
    }
  };
  
  export default IsAuthenticated;