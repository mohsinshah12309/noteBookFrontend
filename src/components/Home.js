import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token exists
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;