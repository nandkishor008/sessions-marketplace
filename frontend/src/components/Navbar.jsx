import { Link, useNavigate } from "react-router-dom";

import {
  useContext,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { AuthContext } from "../context/AuthContext";

import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {

  const { user, logout } =
    useContext(AuthContext);

  const {
    darkMode,
    toggleTheme,
  } = useContext(ThemeContext);

  const navigate =
    useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      className="
        bg-white
        dark:bg-black

        text-black
        dark:text-white

        px-4
        md:px-8

        py-4

        flex
        justify-between
        items-center

        shadow-lg

        sticky
        top-0
        z-50

        transition
      "
    >

      {/* LOGO */}

      {user ? (

        <h1
          className="
            text-2xl
            md:text-3xl

            font-black
            tracking-wide

            cursor-default
          "
        >
          Sessions Marketplace
        </h1>

      ) : (

        <Link to="/">

          <h1
            className="
              text-2xl
              md:text-3xl

              font-black
              tracking-wide
            "
          >
            Sessions Marketplace
          </h1>

        </Link>

      )}

      {/* DESKTOP NAVIGATION */}

      <div
        className="
          hidden
          lg:flex

          gap-6
          items-center

          text-lg
        "
      >

        {/* PUBLIC SESSIONS */}

        <Link
          to="/sessions"
          className="
            hover:text-gray-500
            transition
          "
        >
          Sessions
        </Link>

        {user ? (
          <>
            {/* DASHBOARD */}

            <Link
              to={
                user?.role ===
                "creator"

                  ? "/creator-dashboard"

                  : "/dashboard"
              }
              className="
                hover:text-gray-500
                transition
              "
            >
              Dashboard
            </Link>

            {/* CREATOR NAVBAR */}

            {user?.role ===
            "creator" && (
              <>
                <Link
                  to="/my-sessions"
                  className="
                    hover:text-gray-500
                    transition
                  "
                >
                  My Sessions
                </Link>

                <Link
                  to="/creator-bookings"
                  className="
                    hover:text-gray-500
                    transition
                  "
                >
                  Bookings
                </Link>

                <Link
                  to="/create-session"
                  className="
                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    text-white

                    px-4
                    py-2

                    rounded-xl

                    font-semibold

                    hover:scale-105

                    transition
                  "
                >
                  Create Session
                </Link>
              </>
            )}

            {/* USER NAVBAR */}

            {user?.role !==
            "creator" && (

              <Link
                to="/my-bookings"
                className="
                  hover:text-gray-500
                  transition
                "
              >
                My Bookings
              </Link>

            )}

            {/* THEME */}

            <button
              onClick={toggleTheme}
              className="
                border
                border-black
                dark:border-white

                px-4
                py-2

                rounded-xl

                hover:bg-gray-200
                dark:hover:bg-gray-800

                transition
              "
            >

              {darkMode
                ? "☀️"
                : "🌙"}

            </button>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                bg-red-500

                text-white

                px-4
                py-2

                rounded-xl

                hover:bg-red-600

                transition
              "
            >
              Logout
            </button>

          </>
        ) : (
          <>
            {/* LOGIN */}

            <Link
              to="/login"
              className="
                hover:text-gray-500
                transition
              "
            >
              Login
            </Link>

            {/* REGISTER */}

            <Link
              to="/register"
              className="
                bg-black
                dark:bg-white

                text-white
                dark:text-black

                px-4
                py-2

                rounded-xl

                font-semibold

                hover:opacity-80

                transition
              "
            >
              Register
            </Link>

            {/* THEME */}

            <button
              onClick={toggleTheme}
              className="
                border
                border-black
                dark:border-white

                px-4
                py-2

                rounded-xl

                hover:bg-gray-200
                dark:hover:bg-gray-800

                transition
              "
            >

              {darkMode
                ? "☀️"
                : "🌙"}

            </button>

          </>
        )}

      </div>

      {/* MOBILE BUTTON */}

      <button
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        className="
          lg:hidden

          w-11
          h-11

          rounded-xl

          bg-gray-200
          dark:bg-gray-800

          text-xl
        "
      >
        ☰
      </button>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="
              absolute

              top-[80px]
              left-4
              right-4

              lg:hidden

              bg-white
              dark:bg-[#181c24]

              rounded-3xl

              shadow-2xl

              p-6

              flex
              flex-col
              gap-5

              z-50
            "
          >

            <Link
              to="/sessions"
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Sessions
            </Link>

            {user ? (
              <>
                <Link
                  to={
                    user?.role ===
                    "creator"

                      ? "/creator-dashboard"

                      : "/dashboard"
                  }
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Dashboard
                </Link>

                {user?.role ===
                "creator" && (
                  <>
                    <Link
                      to="/my-sessions"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      My Sessions
                    </Link>

                    <Link
                      to="/creator-bookings"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      Bookings
                    </Link>

                    <Link
                      to="/create-session"
                      onClick={() =>
                        setMenuOpen(false)
                      }
                    >
                      Create Session
                    </Link>
                  </>
                )}

                {user?.role !==
                "creator" && (

                  <Link
                    to="/my-bookings"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >
                    My Bookings
                  </Link>

                )}

                <button
                  onClick={() => {

                    toggleTheme();
                  }}
                  className="
                    text-left
                  "
                >
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    text-left
                    text-red-500
                    font-bold
                  "
                >
                  Logout
                </button>

              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  Register
                </Link>

                <button
                  onClick={() => {

                    toggleTheme();
                  }}
                  className="
                    text-left
                  "
                >
                  {darkMode
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode"}
                </button>

              </>
            )}

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;