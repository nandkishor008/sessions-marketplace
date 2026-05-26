import { useContext } from "react";

import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}) => {

  const {
    user,
    loading,
  } = useContext(AuthContext);

  // LOADING

  if (loading) {

    return (
      <div className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-black
        text-white
      ">

        <h1 className="
          text-5xl
          font-black
          animate-pulse
        ">
          Loading...
        </h1>

      </div>
    );
  }

  // NOT LOGGED IN

  if (!user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // LOGGED IN

  return children;
};

export default ProtectedRoute;