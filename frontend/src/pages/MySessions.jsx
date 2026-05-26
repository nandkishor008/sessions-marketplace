import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import API from "../api/axios";

const MySessions = () => {

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [hasNext, setHasNext] =
    useState(false);

  useEffect(() => {

    fetchSessions(1, true);

  }, []);

  const fetchSessions = async (
    currentPage = 1,
    reset = false
  ) => {

    try {

      const res =
        await API.get(

          `/sessions/my-sessions/?page=${currentPage}`

        );

      if (reset) {

        setSessions(
          res.data.sessions
        );

      } else {

        setSessions((prev) => [

          ...prev,

          ...res.data.sessions,
        ]);
      }

      setHasNext(
        res.data.has_next
      );

      setPage(
        res.data.current_page
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const loadMore = () => {

    fetchSessions(page + 1);
  };

  if (loading && sessions.length === 0) {

    return (
      <div className="
        min-h-screen
        flex
        justify-center
        items-center
        text-5xl
        font-black
        bg-gray-100
        dark:bg-[#0f1117]
        text-black
        dark:text-white
        transition
      ">
        Loading...
      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-gray-100
      dark:bg-[#0f1117]
      text-black
      dark:text-white
      py-10
      px-6
      transition
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          flex
          justify-between
          items-center
          mb-12
        ">

          <div>

            <h1 className="
              text-6xl
              font-black
              mb-4
            ">
              My Sessions
            </h1>

            <p className="
              text-gray-600
              dark:text-gray-400
              text-lg
            ">
              Manage all your mentorship sessions
            </p>

          </div>

        </div>

        {/* EMPTY */}

        {sessions.length === 0 ? (

          <div className="
            bg-white
           dark:bg-[#181c24]
            border
            border-gray-300
            dark:border-white/10
            rounded-3xl
            p-20
            text-center
            backdrop-blur-xl
            transition
          ">

            <h2 className="
              text-4xl
              font-black
              mb-4
            ">
              No Sessions Yet
            </h2>

            <p className="
              text-gray-600
              dark:text-gray-400
            ">
              Start creating sessions
            </p>

          </div>

        ) : (

          <>
            {/* GRID */}

            <div className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            ">

              {sessions.map((session) => (

                <motion.div
                  key={session.id}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    bg-white
                    dark:bg-white/5
                    border
                    border-gray-300
                    dark:border-white/10
                    rounded-3xl
                    overflow-hidden
                    shadow-2xl
                    backdrop-blur-xl
                    transition
                  "
                >

                  {/* IMAGE */}

                  <img
                    src={session.image}
                    alt={session.title}
                    className="
                      w-full
                      h-60
                      object-cover
                    "
                  />

                  {/* CONTENT */}

                  <div className="
                    p-6
                  ">

                    <h2 className="
                      text-3xl
                      font-black
                      mb-3
                    ">
                      {session.title}
                    </h2>

                    <p className="
                      text-gray-600
                      dark:text-gray-400
                      mb-6
                      line-clamp-3
                    ">
                      {session.description}
                    </p>

                    <div className="
                      flex
                      justify-between
                      items-center
                    ">

                      <span className="
                        text-3xl
                        font-black
                        text-purple-400
                      ">
                        ₹{session.price}
                      </span>

                      <Link
                        to={`/sessions/${session.id}`}
                        className="
                          bg-black
                          dark:bg-white
                          text-white
                          dark:text-black
                          px-5
                          py-3
                          rounded-2xl
                          font-black
                          hover:scale-105
                          transition
                        "
                      >
                        Manage
                      </Link>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

            {/* LOAD MORE */}

            {hasNext && (

              <div className="
                flex
                justify-center
                mt-16
              ">

                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="
                    bg-black
                    dark:bg-white
                    text-white
                    dark:text-black
                    px-10
                    py-4
                    rounded-2xl
                    text-lg
                    font-black
                    hover:scale-105
                    transition
                    disabled:opacity-50
                  "
                >

                  {loading
                    ? "Loading..."
                    : "Load More"}

                </button>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
};

export default MySessions;