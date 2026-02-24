import { Navigate } from "react-router-dom";
import { useContext } from "react";
import  CurrentUserContext  from "../../contexts/CurrentUserContext";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isCheckingAuth } = useContext(CurrentUserContext);

if (isCheckingAuth) {
  console.log("isCheckingAuth:", isCheckingAuth);
  return null; 
}

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};
